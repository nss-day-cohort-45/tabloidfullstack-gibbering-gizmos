using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }
        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId, c.[Name] AS CategoryName, u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation AS UserImage, u.UserTypeId, ut.[Name] AS UserTypeName
                        FROM Post p
                            LEFT JOIN Category c ON p.CategoryId = c.Id
                            LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                            LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                        WHERE IsApproved = true AND PublishDateTime < SYSDATETIME()";
                    var reader = cmd.ExecuteReader();

                    var posts = new List<Post>();

                    while (reader.Read())
                    {
                        posts.Add(NewPostFromReader(reader));
                    }

                    reader.Close();

                    return posts;
                }
            }
        }
        public List<Post> GetCurrentUserPosts(int userProfileId)
        { return null; }
        public Post GetPostById(int id)
        { return null; }
        public void AddPost(Post post)
        { }
        public void UpdatePost(Post post)
        { }
        public void DeletePost(int id)
        { }

        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                ImageLocation = reader.GetString(reader.GetOrdinal("HeaderImage")),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                //Category = new Category()
                //{
                //    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                //    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                //},
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                //UserProfile = new UserProfile()
                //{
                //    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                //    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                //    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                //    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                //    Email = reader.GetString(reader.GetOrdinal("Email")),
                //    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                //    ImageLocation = DbUtils.GetNullableString(reader, "AvatarImage"),
                //    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                //    UserType = new UserType()
                //    {
                //        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                //        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                //    }
                //}
            };
        }
    }
}

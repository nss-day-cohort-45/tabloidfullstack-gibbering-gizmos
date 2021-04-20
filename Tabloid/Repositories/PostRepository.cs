﻿using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using System.Collections.Generic;
using System;
using System.Data;
using System.Reflection.PortableExecutable;
using Microsoft.Data.SqlClient;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }
        
        /// <summary>
        /// This method returns all posts, regardless of author. It includes category, user profile, and user type information on each object.
        /// </summary>
        public List<Post> GetAllPosts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved, p.CategoryId, p.UserProfileId, c.[Name] AS CategoryName, u.FirstName, u.LastName, u.DisplayName, u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage, u.UserTypeId, ut.[Name] AS UserTypeName
                        FROM Post p
                            LEFT JOIN Category c ON p.CategoryId = c.Id
                            LEFT JOIN UserProfile u ON p.UserProfileId = u.Id
                            LEFT JOIN UserType ut ON u.UserTypeId = ut.Id
                        WHERE IsApproved = 'true' AND PublishDateTime < SYSDATETIME()";
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

    /// <summary>
    ///  Add summary?
    /// </summary>
    /// <param name="userProfileId">An integer that represents the UserProfileId of a post.</param>
    /// <returns></returns>
    public List<Post> GetCurrentUserPosts(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT p.Id, p.Title, p.Content, 
                                p.ImageLocation AS HeaderImage,
                                p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                                p.CategoryId, p.UserProfileId,
                                c.[Name] AS CategoryName,
                                u.FirstName, u.LastName, u.DisplayName, 
                                u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                                u.UserTypeId, 
                                ut.[Name] AS UserTypeName
                            FROM Post p
                                LEFT JOIN Category c ON p.CategoryId = c.id
                                LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                                LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                            WHERE p.UserProfileId = @id
                            ORDER BY p.CreateDateTime DESC
                    ";

                    cmd.Parameters.AddWithValue("id", userProfileId);
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

        /// <summary>
        ///  Fetch a post by Id. Uses NewPostFromReader method to create new Post "object"
        /// </summary>
        public Post GetPostById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT p.Id, p.Title, p.Content, 
                              p.ImageLocation AS HeaderImage,
                              p.CreateDateTime, p.PublishDateTime, p.IsApproved,
                              p.CategoryId, p.UserProfileId,
                              c.[Name] AS CategoryName,
                              u.FirstName, u.LastName, u.DisplayName, 
                              u.Email, u.CreateDateTime, u.ImageLocation AS AvatarImage,
                              u.UserTypeId, 
                              ut.[Name] AS UserTypeName
                         FROM Post p
                              LEFT JOIN Category c ON p.CategoryId = c.id
                              LEFT JOIN UserProfile u ON p.UserProfileId = u.id
                              LEFT JOIN UserType ut ON u.UserTypeId = ut.id
                        WHERE PublishDateTime < SYSDATETIME()
                              AND p.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    Post post = null;

                    if (reader.Read())
                    {
                        post = NewPostFromReader(reader);
                    }

                    reader.Close();

                    return post;
                }
            }
        }
        public void AddPost(Post post)
        { }
        public void UpdatePost(Post post)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Post
                        SET Title = @Title,
                            Content = @Content,
                            ImageLocation = @ImageLocation,
                            CreateDateTime = @CreateDateTime,
                            PublishDateTime = @PublishDateTime,
                            isApproved = @isApproved,
                            CategoryId = @CategoryId,
                            UserProfileId = @UserProfileId
                    WHERE id = @id

                     UPDATE PostTag 
                            SET TagId = @tagId
                        WHERE PostId = @id
                    ";

                    cmd.Parameters.AddWithValue("@Title", post.Title);
                    cmd.Parameters.AddWithValue("@Content", post.Content);
                    cmd.Parameters.AddWithValue("@ImageLocation", post.ImageLocation);
                    cmd.Parameters.AddWithValue("@CreateDateTime", post.CreateDateTime);
                    cmd.Parameters.AddWithValue("@PublishDateTime", post.PublishDateTime);
                    cmd.Parameters.AddWithValue("@isApproved", post.IsApproved);
                    cmd.Parameters.AddWithValue("@CategoryId", post.CategoryId);
                    cmd.Parameters.AddWithValue("@UserProfileId", post.UserProfileId);
                    cmd.Parameters.AddWithValue("@id", post.Id);
                    cmd.Parameters.AddWithValue("@tagId", post.Tag);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        
        /// <summary>
        /// Deletes a Post and any PostTags/PostReactions/Comments that has the same PostId from the Database
        /// </summary>
        /// <param name="id">The Id of the post to be Deleted.</param>
        /// <returns></returns>
        public void DeletePost(int id)
        { 
            using (var conn = Connection)
            {
                conn.Open();
                
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE  FROM PostTag
                        WHERE   PostId = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE  FROM PostReaction
                        WHERE   PostId = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE  FROM Comment
                        WHERE   PostId = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE  FROM Post
                        WHERE   Id = @id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        private Post NewPostFromReader(SqlDataReader reader)
        {
            return new Post()
            {
                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                Title = reader.GetString(reader.GetOrdinal("Title")),
                Content = reader.GetString(reader.GetOrdinal("Content")),
                ImageLocation = DbUtils.GetString(reader, "HeaderImage"),
                CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                PublishDateTime = DbUtils.GetNullableDateTime(reader, "PublishDateTime"),
                CategoryId = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                Category = new Category()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("CategoryId")),
                    Name = reader.GetString(reader.GetOrdinal("CategoryName"))
                },
                UserProfileId = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                UserProfile = new UserProfile()
                {
                    Id = reader.GetInt32(reader.GetOrdinal("UserProfileId")),
                    FirstName = reader.GetString(reader.GetOrdinal("FirstName")),
                    LastName = reader.GetString(reader.GetOrdinal("LastName")),
                    DisplayName = reader.GetString(reader.GetOrdinal("DisplayName")),
                    Email = reader.GetString(reader.GetOrdinal("Email")),
                    CreateDateTime = reader.GetDateTime(reader.GetOrdinal("CreateDateTime")),
                    ImageLocation = DbUtils.GetString(reader, "AvatarImage"),
                    UserTypeId = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                    UserType = new UserType()
                    {
                        Id = reader.GetInt32(reader.GetOrdinal("UserTypeId")),
                        Name = reader.GetString(reader.GetOrdinal("UserTypeName"))
                    }
                }
            };
        }

        public void InsertTag(int postId, int tagId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PostTag (PostId, TagId)
                                        VALUES (@postId, @tagId)";

                    cmd.Parameters.AddWithValue("@postId", postId);
                    cmd.Parameters.AddWithValue("@tagId", tagId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        //public List<Post> GetTagByPostId(int postId)
        //{
        //    using (SqlConnection conn = Connection)
        //    {
        //        conn.Open();
        //        using (SqlCommand cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //            SELECT *
        //            FROM Post p
        //            LEFT JOIN PostTag pt ON pt.PostId = p.id
        //            LEFT JOIN Tag t ON t.Id = pt.TagId
        //            WHERE p.Id = @id";

        //            cmd.Parameters.AddWithValue("@id", postId);

        //            var reader = cmd.ExecuteReader();
        //            var posts = new List<Post>();
        //            while (reader.Read())
        //            {
        //                Post post = new Post
        //                {

        //                    tag = new Tag
        //                    {
        //                        Id = reader.GetInt32(reader.GetOrdinal("Id")),
        //                        Name = reader.GetString(reader.GetOrdinal("Name"))
        //                    },

        //                };
        //                posts.Add(post);
        //            }
        //            reader.Close();
        //            return posts;
        //        }
        //    }
        //}
    }
}

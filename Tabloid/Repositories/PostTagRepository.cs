using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostTagRepository : BaseRepository, IPostTagRepository
    {
        public PostTagRepository(IConfiguration configuration) : base(configuration) { }
        public void InsertTag(PostTag postTag)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PostTag (PostId, TagId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@postId, @tagId)";

                    cmd.Parameters.AddWithValue("@postId", postTag.PostId);
                    cmd.Parameters.AddWithValue("@tagId", postTag.TagId);
                    int id = (int)cmd.ExecuteScalar();
                    postTag.id = id;
                   
                }
            }
        }

        public void DeletePostTag(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    DELETE From PostTag
                    WHERE id = @postTagId
                    ";

                    DbUtils.AddParameter(cmd, "@postTagId", id);

                    cmd.ExecuteNonQuery(); 
                }
            }
        }

        public List<PostTag> GetTagByPostId(int postId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT *
                    FROM Post p
                    JOIN PostTag pt ON pt.PostId = p.id
                    JOIN Tag t ON t.Id = pt.TagId
                    WHERE p.Id = @id";

                    cmd.Parameters.AddWithValue("@id", postId);

                    var reader = cmd.ExecuteReader();
                    var postTags = new List<PostTag>();
                    while (reader.Read())
                    {
                        PostTag postTag = new PostTag
                        {
                            id = reader.GetInt32(reader.GetOrdinal("Id")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId")),
                            TagId = reader.GetInt32(reader.GetOrdinal("TagId")),
                            Name = reader.GetString(reader.GetOrdinal("Name"))

                        };
                        postTags.Add(postTag);
                    }
                    reader.Close();
                    return postTags;
                }
            }
        }
    }
   
}

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
    }
   
}

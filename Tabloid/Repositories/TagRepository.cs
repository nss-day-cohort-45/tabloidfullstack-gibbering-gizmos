using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }

        public void AddTag(Tag tag)
        {
            throw new NotImplementedException();
        }

        public void DeleteTag(int id)
        {
            throw new NotImplementedException();
        }

        public List<Tag> GetAllTags()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name FROM Tag ORDER BY [Name]";
                    var reader = cmd.ExecuteReader();

                    var categories = new List<Tag>();

                    while (reader.Read())
                    {
                        categories.Add(new Tag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                        });
                    }

                    reader.Close();

                    return categories;
                }
            }
        }

        public Tag GetTagById(int id)
        {
            throw new NotImplementedException();
        }

        public void UpdateTag(Tag tag)
        {
            throw new NotImplementedException();
        }

        public List<Tag> GetTagsByPostId()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT t.Name, pt.PostId, t.Id FROM Tag t 
                                        LEFT JOIN PostTag pt ON t.Id = pt.TagId 
                                        LEFT JOIN Post p ON p.Id = pt.PostId
                                        WHERE pt.PostId IS NOT NULL";

                    List<Tag> tags = new List<Tag>();

                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        Tag tag = new Tag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            Name = reader.GetString(reader.GetOrdinal("Name")),
                            PostId = reader.GetInt32(reader.GetOrdinal("PostId"))
                        };
                        tags.Add(tag);
                    }

                    reader.Close();

                    return tags;
                }
            }
        }
    }
}

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
    }
}

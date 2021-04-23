using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class UserTypeRepository : BaseRepository, IUserTypeRepository
    {
        public UserTypeRepository(IConfiguration configuration) : base(configuration) { }

        public void UpdateUserTypeById(int id, int userTypeId)
        {
            using(var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE UserProfile
                        SET UserTypeId = @userTypeId
                    WHERE id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    DbUtils.AddParameter(cmd, "@userTypeId", userTypeId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

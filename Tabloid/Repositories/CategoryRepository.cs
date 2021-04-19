using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using System.Collections.Generic;
using System;
using System.Data;
using System.Reflection.PortableExecutable;

namespace Tabloid.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public void AddCategory(Category category)
        {
            using (SqlConnection conn = Connection)
            { 
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    INSERT INTO Category ([Name])
                    OUTPUT INSERTED.ID
                    VALUES (@name);
                    ";

                    cmd.Parameters.AddWithValue("@name", category.Name);

                    int newlyCreatedId = (int)cmd.ExecuteScalar();

                    category.Id = newlyCreatedId;
                }
            }
        }
    

        public void DeleteCategory(int id)
        {
            throw new NotImplementedException();
        }

        public List<Category> GetAllCategories()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "SELECT Id, Name FROM Category ORDER BY [Name]";
                    var reader = cmd.ExecuteReader();

                    var categories = new List<Category>();

                    while (reader.Read())
                    {
                        categories.Add(new Category()
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

        public Category GetCategoryById(int id)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// Allows user to edit a category.
        /// </summary>
        /// <param name="category">The selected category object to be edited. </param>
        /// 
        public void UpdateCategory(Category category)
        {
            using(var conn=Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Category
                       SET Name = @Name
                     WHERE Id = @Id";

                    cmd.Parameters.AddWithValue("@Name", category.Name);
                    cmd.Parameters.AddWithValue("@Id", category.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

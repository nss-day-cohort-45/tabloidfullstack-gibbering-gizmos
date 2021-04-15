using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;
using System.Collections.Generic;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }
        public List<Post> GetAllPosts()
        { }
        public List<Post> GetCurrentUserPosts(int userProfileId)
        { }
        public Post GetPostById(int id)
        { }
        public void AddPost(Post post)
        { }
        public void UpdatePost(Post post)
        { }
        public void DeletePost(int id)
        { }
    }
}

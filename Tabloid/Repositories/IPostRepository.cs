using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        int AddPost(Post post);
        void DeletePost(int id);
        List<Post> GetAllPosts();
        List<Post> GetCurrentUserPosts(int userProfileId);
        Post GetPostById(int id);
        void UpdatePost(Post post);
       
        
    }
}
using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        void DeletePostTag(int id);
        List<PostTag> GetTagByPostId(int postId);
        public void InsertTag(PostTag postTag);
    }
}
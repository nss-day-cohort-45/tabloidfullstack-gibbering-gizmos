using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostTagRepository
    {
        void DeletePostTag(int id);
        public void InsertTag(PostTag postTag);
    }
}
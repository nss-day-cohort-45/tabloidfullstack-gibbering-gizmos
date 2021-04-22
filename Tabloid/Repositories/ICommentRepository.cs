using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        void AddComment(Comment comment);
        List<Comment> GetAllComments();
    }
}
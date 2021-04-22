using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        void AddComment(Comment comment);
        void EditComment(Comment comment);
        List<Comment> GetAllComments();
        Comment GetCommentById(int id);
    }
}
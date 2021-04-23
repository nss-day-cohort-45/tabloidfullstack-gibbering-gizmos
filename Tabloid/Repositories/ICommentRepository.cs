using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface ICommentRepository
    {
        void AddComment(Comment comment);
        void DeleteComment(int id);
        void EditComment(Comment comment);
        List<Comment> GetAllComments();
        List<Comment> GetCommentsByPostId(int PostId);
        Comment GetCommentById(int id);
    }
}
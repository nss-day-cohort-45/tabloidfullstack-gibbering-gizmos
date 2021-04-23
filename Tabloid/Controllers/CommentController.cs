using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        public CommentController(ICommentRepository commentRepository) 
        {
            _commentRepository = commentRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var comments = _commentRepository.GetAllComments();

            return Ok(comments);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var comments = _commentRepository.GetCommentsByPostId(id);


            return Ok(comments);

        }

        [HttpPost]
        public IActionResult Post(Comment comment)
        {
            comment.CreateDateTime = DateTime.Now;
            _commentRepository.AddComment(comment);
            return CreatedAtAction("Get", new { id = comment.Id }, comment);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.DeleteComment(id);
            return NoContent();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;

        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository, ITagRepository tagRepository)
        {
            _postRepository = postRepository;
            _tagRepository = tagRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var posts = _postRepository.GetAllPosts();
            var tags = _tagRepository.GetTagsByPostId();
            return Ok(posts); 
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = _postRepository.GetPostById(id);


            return Ok(post);
        }

        [HttpPost]
        public IActionResult Post(Post post)
        { return null; }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            //if(id != post.UserProfileId)
            //{
            //    return BadRequest();
            //}

            _postRepository.UpdatePost(post);
            return NoContent();
        }
       
        [HttpGet("GetAllPostsByUserId")]
        public IActionResult GetAllPostsByUserId(int id)
        {
            var posts = _postRepository.GetCurrentUserPosts(id);
            return Ok(posts);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postRepository.DeletePost(id);
            return NoContent();
        }

    }
}

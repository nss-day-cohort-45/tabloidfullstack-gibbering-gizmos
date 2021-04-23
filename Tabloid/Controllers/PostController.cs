using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using Tabloid.Models;
using Tabloid.Repositories;


namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {

        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository, IUserProfileRepository userProfileRepository)
        {
            _postRepository = postRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var posts = _postRepository.GetAllPosts();
           
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
        {
            post.CreateDateTime = DateTime.Now;
            _postRepository.AddPost(post);
            return CreatedAtAction("Get", new { id = post.Id }, post);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile.Id != post.UserProfileId)
            {
                return Unauthorized();
            }
            

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

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}

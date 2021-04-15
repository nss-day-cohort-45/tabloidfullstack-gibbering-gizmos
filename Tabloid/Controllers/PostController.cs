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
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        [HttpGet]
        public IActionResult Get()
        { return null; }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        { return null; }

        [HttpPost]
        public IActionResult Post(Post post)
        { return null; }
        
        [HttpPut("{id}")]
        public IActionResult Put(int id, Post post)
        { return null; }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        { return null; }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostTagController : ControllerBase
    {
        private readonly IPostTagRepository _postTagRepository;

        public PostTagController(IPostTagRepository postTagRepository)
        {
            _postTagRepository = postTagRepository;

        }
        [HttpPost]

        public IActionResult Post(PostTag postTag)
        {
            _postTagRepository.InsertTag(postTag);
            return CreatedAtAction("Get", new { id = postTag.id }, postTag);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _postTagRepository.DeletePostTag(id);
            return NoContent();
        }

    }
}

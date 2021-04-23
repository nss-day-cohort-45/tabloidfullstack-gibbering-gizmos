using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ITagRepository _tagRepository;

        public TagController(ITagRepository tagRepository, IUserProfileRepository userProfileRepository)
        {
            _tagRepository = tagRepository;
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAllTags());
        }
        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile.UserType.Name != "admin")
            {
                return Unauthorized();
            }
            _tagRepository.AddTag(tag);
            return CreatedAtAction("Get", new { id = tag.Id }, tag);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var tag = _tagRepository.GetTagById(id);
            if (tag == null)
            {
                return null;
            }

            return Ok(tag);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Tag tag)
        {
            var currentUserProfile = GetCurrentUserProfile();
            if (currentUserProfile.UserType.Name != "admin")
            {
                return Unauthorized();
            }
            _tagRepository.UpdateTag(tag);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _tagRepository.DeleteTag(id);
            return NoContent();
        }

        [HttpGet("GetTagsByPost/{id}")]
        public IActionResult GetAllTagsByPost(int id)
        {

            var tags = _tagRepository.GetTagsByPostId(id);

            return Ok(tags);

        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }


    }
}

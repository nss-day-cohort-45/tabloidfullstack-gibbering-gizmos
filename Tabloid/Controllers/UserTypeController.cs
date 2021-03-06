using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tabloid.Repositories;
using Tabloid.Models;

namespace Tabloid.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserTypeController : ControllerBase
    {
        private readonly IUserTypeRepository _userTypeRepository;

        public UserTypeController(IUserTypeRepository userTypeRepository)
        {
            _userTypeRepository = userTypeRepository;
        }

        [HttpPut("{id}/{userTypeId}")]
        public IActionResult Put(int id, int userTypeId)
        {
            _userTypeRepository.UpdateUserTypeById(id, userTypeId);
            return NoContent();
        }

        [HttpGet]
        public IActionResult Get()
        {
            var userTypes = _userTypeRepository.GetAllUserTypes();
            return Ok(userTypes);
        }
    }
}

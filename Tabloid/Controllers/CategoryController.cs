using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;
        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_categoryRepository.GetAllCategories());
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            _categoryRepository.UpdateCategory(category);
            return NoContent();
        }
        [HttpPost]
        public IActionResult Category(Category category)
        {
            _categoryRepository.AddCategory(category);
            return NoContent(); 
        }

    }
}

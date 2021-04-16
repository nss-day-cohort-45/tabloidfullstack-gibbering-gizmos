﻿using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }

        [DisplayName("Header Image URL")]
        public string ImageLocation { get; set; }

        public DateTime CreateDateTime { get; set; }

        [DisplayName("Published")]
        [DataType(DataType.Date)]
        public DateTime? PublishDateTime { get; set; }

        public bool IsApproved { get; set; }
        public int CategoryId { get; internal set; }
        public Category Category { get; internal set; }
        public int UserProfileId { get; internal set; }
        public UserProfile UserProfile { get; internal set; }
    }
}

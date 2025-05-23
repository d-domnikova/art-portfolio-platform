﻿using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace BLL.DTO.User
{
    public class UpdateUser
    {
        public string? Nickname { get; set; }
        public string Username { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Biography { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Website { get; set; }
        public string? Location { get; set; }
        public string? ProfileImage { get; set; }
        public string? BannerImage { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [NotMapped]
        public IFormFile? ProfileImageFile { get; set; }
        [NotMapped]
        public IFormFile? BannerImageFile { get; set; }

    }
}

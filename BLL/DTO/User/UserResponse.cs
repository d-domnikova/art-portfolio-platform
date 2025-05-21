using System.ComponentModel.DataAnnotations.Schema;

namespace BLL.DTO.User
{
    public class UserResponse
    {
        public Guid Id { get; set; }
        public string? Nickname { get; set; }
        public string Username { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Biography { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string? Website { get; set; }
        public string? Location { get; set; }
        public string? ProfileImage { get; set; }
        public string? BannerImage { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        [NotMapped]
        public string? ProfileImageSrc { get; set; }
        [NotMapped]
        public string? BannerImageSrc { get; set; }

    }
}

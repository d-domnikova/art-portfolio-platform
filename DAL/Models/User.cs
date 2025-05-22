using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string? Nickname { get; set; }
        public string Username { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Biography { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public Guid RoleId {  get; set; }
        public Role Role { get; set; }
        public string? Website { get; set; }
        public string? Location { get; set; }
        public string? ProfileImage { get; set; }
        public string? BannerImage { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<Post> Posts { get; set; } = new List<Post>();
        public ICollection<LikedPost> LikedPosts { get; set; } = new List<LikedPost>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public ICollection<CommissionSlot> CommisionSlots { get; set; } = new List<CommissionSlot>();
        public ICollection<ShopItem> ShopItems { get; set; } = new List<ShopItem>();


        [NotMapped]
        public IFormFile? ProfileImageFile { get; set; }
        [NotMapped]
        public IFormFile? BannerImageFile { get; set; }

    }
}

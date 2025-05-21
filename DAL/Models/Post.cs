using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Models
{
    public class Post
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public string PostImage { get; set; }
        public string? AlterText { get; set; }
        public bool IsVisibleInPortfolio { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<Category> Categories { get; set; } = new List<Category>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public ICollection<LikedPost> Likes { get; set; } = new List<LikedPost>();

        [NotMapped]
        public IFormFile ImageFile { get; set; }
    }
}

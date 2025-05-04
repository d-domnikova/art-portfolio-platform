namespace BLL.DTO.Post
{
    public class PostResponse
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public Guid UserId { get; set; }
        public string PostImage { get; set; }
        public string? AlterText { get; set; }
        public bool IsVisibleInPortfolio { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

    }
}

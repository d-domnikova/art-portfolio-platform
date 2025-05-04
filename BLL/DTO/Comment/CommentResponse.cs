namespace BLL.DTO.Comment
{
    public class CommentResponse
    {
        public Guid Id { get; set; }
        public string CommentBody { get; set; }
        public Guid UserId { get; set; }
        public Guid PostId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

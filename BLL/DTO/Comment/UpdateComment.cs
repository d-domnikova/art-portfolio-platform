namespace BLL.DTO.Comment
{
    public class UpdateComment
    {
        public Guid Id { get; set; }
        public string CommentBody { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

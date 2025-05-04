namespace BLL.DTO.Comment
{
    public class CreateComment
    {
        public string CommentBody { get; set; }
        public Guid UserId { get; set; }
        public Guid PostId { get; set; }
    }
}

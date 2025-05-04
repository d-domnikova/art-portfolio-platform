namespace BLL.DTO.Post
{
    public class CreatePost
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public Guid UserId { get; set; }
        public string PostImage { get; set; }
        public string? AlterText { get; set; }
        public bool IsVisibleInPortfolio { get; set; }
    }
}

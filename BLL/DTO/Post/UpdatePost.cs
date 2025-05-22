namespace BLL.DTO.Post
{
    public class UpdatePost
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? AlterText { get; set; }
        public bool IsVisibleInPortfolio { get; set; }
        public DateTime? UpdatedAt { get; set; }

    }
}

namespace BLL.DTO.Category
{
    public class CategoryResponse
    {
        public Guid Id { get; set; }
        public string CategoryName { get; set; }
        public string Description {  get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

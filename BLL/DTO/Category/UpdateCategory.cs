namespace BLL.DTO.Category
{
    public class UpdateCategory
    {
        public Guid Id { get; set; }
        public string CategoryName { get; set; }
        public string Description {  get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

namespace DAL.Models
{
    public class Category
    {
        public Guid Id { get; set; }
        public string CategoryName { get; set; }
        public string Description {  get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }
}

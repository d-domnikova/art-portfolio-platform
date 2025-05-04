namespace DAL.Models
{
    public class ShopItem
    {
        public Guid Id { get; set; }
        public string ItemName { get; set; }
        public string? ItemDescription { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public string PreviewImage { get; set; }
        public decimal Price { get; set; }
        public bool InStock { get; set; }
        public Guid TypeId { get; set; }
        public ShopType Type { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}

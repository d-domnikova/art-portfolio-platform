namespace DAL.Models
{
    public class CommissionSlot
    {
        public Guid Id { get; set; }
        public string SlotName { get; set; }
        public string? SlotDescription { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public string PreviewImage { get; set; }
        public decimal PriceMin { get; set; }
        public decimal? PriceMax { get; set; }
        public bool IsActive { get; set; }
        public Guid TypeId { get; set; }
        public ShopType Type { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}

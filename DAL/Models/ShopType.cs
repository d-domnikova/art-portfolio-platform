namespace DAL.Models
{
    public class ShopType
    {
        public Guid Id { get; set; }
        public string TypeName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<ShopItem> Items { get; set; } = new List<ShopItem>();
        public ICollection<CommissionSlot> CommisionSlots { get; set; } = new List<CommissionSlot>();
    }
}

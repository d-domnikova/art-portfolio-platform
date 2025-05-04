namespace BLL.DTO.ShopItem
{
    public class UpdateShopItem
    {
        public Guid Id { get; set; }
        public string ItemName { get; set; }
        public string? ItemDescription { get; set; }
        public string PreviewImage { get; set; }
        public decimal Price { get; set; }
        public bool InStock { get; set; }
        public Guid TypeId { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

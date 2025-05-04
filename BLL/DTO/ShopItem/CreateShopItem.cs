namespace BLL.DTO.ShopItem
{
    public class CreateShopItem
    {
        public string ItemName { get; set; }
        public string? ItemDescription { get; set; }
        public Guid UserId { get; set; }
        public string PreviewImage { get; set; }
        public decimal Price { get; set; }
        public bool InStock { get; set; }
        public Guid TypeId { get; set; }
    }
}

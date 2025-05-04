namespace BLL.DTO.ShopType
{
    public class ShopTypeResponse
    {
        public Guid Id { get; set; }
        public string TypeName { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

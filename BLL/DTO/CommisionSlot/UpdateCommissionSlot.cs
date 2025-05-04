namespace BLL.DTO.CommisionSlot
{
    public class UpdateCommissionSlot
    {
        public string SlotName { get; set; }
        public string? SlotDescription { get; set; }
        public string PreviewImage { get; set; }
        public decimal PriceMin { get; set; }
        public decimal? PriceMax { get; set; }
        public bool IsActive { get; set; }
        public Guid TypeId { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

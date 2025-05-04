using BLL.DTO.CommisionSlot;

namespace BLL.Services.Interfaces
{
    public interface ICommissionSlotService
    {
        Task<IEnumerable<CommissionSlotResponse>> GetAsync();
        Task<CommissionSlotResponse> GetByIdAsync(Guid id);
        Task CreateAsync(CreateCommissionSlot createCommissionSlot);
        Task UpdateAsync(Guid id, UpdateCommissionSlot updateCommissionSlot);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<CommissionSlotResponse>> FindByKeywordAsync(string keyword);
    }
}

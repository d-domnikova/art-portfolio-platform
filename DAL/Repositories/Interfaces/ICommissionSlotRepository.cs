using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface ICommissionSlotRepository : IGenericRepository<CommissionSlot>
    {
        public Task<IEnumerable<CommissionSlot>> FindByKeywordAsync(string keyword);
    }
}

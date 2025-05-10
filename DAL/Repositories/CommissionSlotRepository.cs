using DAL.Context;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class CommissionSlotRepository : GenericRepository<CommissionSlot>, ICommissionSlotRepository
    {
        public CommissionSlotRepository(PlatformContext platformContext) : base(platformContext)
        {
        }

        public async Task<IEnumerable<CommissionSlot>> FindByKeywordAsync(string keyword)
        {
            return await FindAsync(cms => cms.SlotName.Contains(keyword) || cms.SlotDescription.Contains(keyword));
        }
    }
}

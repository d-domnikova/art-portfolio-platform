using DAL.Context;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class ShopItemRepository : GenericRepository<ShopItem>, IShopItemRepository
    {
        public ShopItemRepository(PlatformContext platformContext) : base(platformContext)
        {
        }

        public async Task<IEnumerable<ShopItem>> FindByKeywordAsync(string keyword)
        {
            return await FindAsync(item => item.ItemName.Contains(keyword) || item.ItemDescription.Contains(keyword));
        }
    }
}

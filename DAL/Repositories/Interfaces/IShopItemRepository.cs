using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface IShopItemRepository : IGenericRepository<ShopItem>
    {
        public Task<IEnumerable<ShopItem>> FindByKeywordAsync(string keyword);
    }
}

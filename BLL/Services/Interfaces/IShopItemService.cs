using BLL.DTO.ShopItem;

namespace BLL.Services.Interfaces
{
    public interface IShopItemService
    {
        Task<IEnumerable<ShopItemResponse>> GetAsync();
        Task<ShopItemResponse> GetByIdAsync(Guid id);
        Task CreateAsync(CreateShopItem createShopItem);
        Task UpdateAsync(Guid id, UpdateShopItem updateShopItem);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<ShopItemResponse>> FindByKeywordAsync(string keyword);
    }
}

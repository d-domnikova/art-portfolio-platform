using BLL.DTO.ShopType;

namespace BLL.Services.Interfaces
{
    public interface IShopTypeService
    {
        Task<IEnumerable<ShopTypeResponse>> GetAsync();
        Task<ShopTypeResponse> GetByIdAsync(Guid id);
        Task CreateAsync(CreateShopType createShopType);
        Task UpdateAsync(Guid id, UpdateShopType updateShopType);
        Task DeleteAsync(Guid id);
    }
}

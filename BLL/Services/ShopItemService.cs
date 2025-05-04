using AutoMapper;
using BLL.DTO.ShopItem;
using BLL.Services.Interfaces;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace BLL.Services
{
    public class ShopItemService : IShopItemService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ShopItemService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task CreateAsync(CreateShopItem createShopItem)
        {
            var shopItem = _mapper.Map<ShopItem>(createShopItem);
            shopItem.CreatedAt = DateTime.UtcNow;
            shopItem.UpdatedAt = DateTime.UtcNow;

            await _unitOfWork.ShopItemRepository.AddAsync(shopItem);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateAsync(Guid id, UpdateShopItem updateShopItem)
        {
            var shopItem = await _unitOfWork.ShopItemRepository.GetByIdAsync(id);
            if (shopItem == null) return;

            _mapper.Map(updateShopItem, shopItem);
            shopItem.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.ShopItemRepository.Update(shopItem);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var shopItem = await _unitOfWork.ShopItemRepository.GetByIdAsync(id);
            if (shopItem == null) return;

            _unitOfWork.ShopItemRepository.Remove(shopItem);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<ShopItemResponse>> FindByKeywordAsync(string keyword)
        {
            var shopItems = await _unitOfWork.ShopItemRepository.FindByKeywordAsync(keyword);
            return _mapper.Map<IEnumerable<ShopItemResponse>>(shopItems);
        }

        public async Task<IEnumerable<ShopItemResponse>> GetAsync()
        {
            var shopItems = await _unitOfWork.ShopItemRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ShopItemResponse>>(shopItems);
        }

        public async Task<ShopItemResponse> GetByIdAsync(Guid id)
        {
            var shopItem = await _unitOfWork.ShopItemRepository.GetByIdAsync(id);
            return _mapper.Map<ShopItemResponse>(shopItem);
        }
    }
}

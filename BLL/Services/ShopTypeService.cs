using AutoMapper;
using BLL.DTO.ShopType;
using BLL.Services.Interfaces;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace BLL.Services
{
    public class ShopTypeService : IShopTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ShopTypeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task CreateAsync(CreateShopType createShopType)
        {
            var shopType = _mapper.Map<ShopType>(createShopType);
            shopType.CreatedAt = DateTime.UtcNow;
            shopType.UpdatedAt = DateTime.UtcNow;

            await _unitOfWork.ShopTypeRepository.AddAsync(shopType);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateAsync(Guid id, UpdateShopType updateShopType)
        {
            var shopType = await _unitOfWork.ShopTypeRepository.GetByIdAsync(id);
            if (shopType == null) return;

            _mapper.Map(updateShopType, shopType);
            shopType.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.ShopTypeRepository.Update(shopType);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var shopType = await _unitOfWork.ShopTypeRepository.GetByIdAsync(id);
            if (shopType == null) return;

            _unitOfWork.ShopTypeRepository.Remove(shopType);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<ShopTypeResponse>> GetAsync()
        {
            var shopTypes = await _unitOfWork.ShopTypeRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ShopTypeResponse>>(shopTypes);
        }

        public async Task<ShopTypeResponse> GetByIdAsync(Guid id)
        {
            var shopType = await _unitOfWork.ShopTypeRepository.GetByIdAsync(id);
            return _mapper.Map<ShopTypeResponse>(shopType);
        }
    }
}

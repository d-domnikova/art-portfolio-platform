using AutoMapper;
using BLL.DTO.CommisionSlot;
using BLL.Services.Interfaces;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace BLL.Services
{
    public class CommissionSlotService : ICommissionSlotService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CommissionSlotService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task CreateAsync(CreateCommissionSlot createCommissionSlot)
        {
            var commissionSlot = _mapper.Map<CommissionSlot>(createCommissionSlot);
            commissionSlot.CreatedAt = DateTime.UtcNow;
            commissionSlot.UpdatedAt = DateTime.UtcNow;

            await _unitOfWork.CommissionSlotRepository.AddAsync(commissionSlot);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateAsync(Guid id, UpdateCommissionSlot updateCommissionSlot)
        {
            var commissionSlot = await _unitOfWork.CommissionSlotRepository.GetByIdAsync(id);
            if (commissionSlot == null) return;

            _mapper.Map(updateCommissionSlot, commissionSlot);
            commissionSlot.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.CommissionSlotRepository.Update(commissionSlot);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var commissionSlot = await _unitOfWork.CommissionSlotRepository.GetByIdAsync(id);
            if (commissionSlot == null) return;

            _unitOfWork.CommissionSlotRepository.Remove(commissionSlot);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<CommissionSlotResponse>> FindByKeywordAsync(string keyword)
        {
            var commissionSlots = await _unitOfWork.CommissionSlotRepository.FindByKeywordAsync(keyword);
            return _mapper.Map<IEnumerable<CommissionSlotResponse>>(commissionSlots);
        }

        public async Task<IEnumerable<CommissionSlotResponse>> GetAsync()
        {
            var commissionSlots = await _unitOfWork.CommissionSlotRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CommissionSlotResponse>>(commissionSlots);
        }

        public async Task<CommissionSlotResponse> GetByIdAsync(Guid id)
        {
            var commissionSlot = await _unitOfWork.CommissionSlotRepository.GetByIdAsync(id);
            return _mapper.Map<CommissionSlotResponse>(commissionSlot);
        }

        //search request
    }
}

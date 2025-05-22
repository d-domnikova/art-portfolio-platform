using AutoMapper;
using BLL.DTO.Role;
using BLL.Services.Interfaces;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace BLL.Services
{
    public class RoleService : IRoleService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public RoleService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task CreateAsync(CreateRole createRole)
        {
            var role = _mapper.Map<Role>(createRole);
            role.CreatedAt = DateTime.UtcNow;
            role.UpdatedAt = DateTime.UtcNow;

            await _unitOfWork.RoleRepository.AddAsync(role);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateAsync(Guid id, UpdateRole updateRole)
        {
            var role = await _unitOfWork.RoleRepository.GetByIdAsync(id);
            if (role == null) return;

            _mapper.Map(updateRole, role);
            role.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.RoleRepository.Update(role);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var role = await _unitOfWork.RoleRepository.GetByIdAsync(id);
            if (role == null) return;

            _unitOfWork.RoleRepository.Remove(role);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<RoleResponce>> GetAsync()
        {
            var roles = await _unitOfWork.RoleRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<RoleResponce>>(roles);
        }

        public async Task<RoleResponce> GetByIdAsync(Guid id)
        {
            var role = await _unitOfWork.RoleRepository.GetByIdAsync(id);
            return _mapper.Map<RoleResponce>(role);
        }
    }
}

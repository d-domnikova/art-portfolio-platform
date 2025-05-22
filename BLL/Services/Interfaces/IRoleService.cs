using BLL.DTO.Role;

namespace BLL.Services.Interfaces
{
    public interface IRoleService
    {
        Task<IEnumerable<RoleResponce>> GetAsync();
        Task<RoleResponce> GetByIdAsync(Guid id);
        Task CreateAsync(CreateRole createRole);
        Task UpdateAsync(Guid id, UpdateRole updateRole);
        Task DeleteAsync(Guid id);
    }
}

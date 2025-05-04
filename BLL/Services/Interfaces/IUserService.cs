using BLL.DTO.User;

namespace BLL.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserResponse>> GetAsync();
        Task<UserResponse> GetByIdAsync(Guid id);
        Task CreateAsync(CreateUser createUser);
        Task UpdateAsync(Guid id, UpdateUser updateUser);
        Task DeleteAsync(Guid id);
        Task<UserResponse> FindByCredentialAsync(string credential);
    }
}

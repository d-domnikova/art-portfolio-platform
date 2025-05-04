using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface IUserRepository : IGenericRepository<User>
    {
        public Task<User> FindByEmailAsync(string email);
        public Task<User> FindByUsernameAsync(string username);
    }
}

using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface IRoleRepository : IGenericRepository<Role>
    {
        public Task<Role> GetRoleByName(string name);

    }
}

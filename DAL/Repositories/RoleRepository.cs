using DAL.Context;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class RoleRepository : GenericRepository<Role>, IRoleRepository
    {
        public RoleRepository(PlatformContext platformContext) : base(platformContext)
        {
        }

        public async Task<Role> GetRoleByName(string name)
        {
            var roles = await FindAsync(role => role.RoleName == name);
            return roles.FirstOrDefault();
        }
    }
}

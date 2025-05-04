using DAL.Context;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(PlatformContext platformContext, DbSet<User> dbSet) : base(platformContext, dbSet)
        {
        }

        public async Task<User> FindByEmailAsync(string email)
        {
            var users = await FindAsync(user => user.Email == email);
            return users.FirstOrDefault();
        }

        public async Task<User> FindByUsernameAsync(string username)
        {
            var users = await FindAsync(user => user.Username == username);
            return users.FirstOrDefault();
        }
    }
}

using DAL.Context;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(PlatformContext platformContext, DbSet<Category> dbSet) : base(platformContext, dbSet) {}

        public async Task<IEnumerable<Category>> GetPopularCategoriesAsync()
        {
            return await _dbSet.OrderByDescending(category => category.Posts.Count).Take(10).ToListAsync();
        }
    }
}

using DAL.Context;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(PlatformContext platformContext) : base(platformContext) {}

        public async Task<IEnumerable<Category>> GetPopularCategoriesAsync()
        {
            return await _platformContext.Set<Category>().OrderByDescending(category => category.Posts.Count).Take(10).ToListAsync();
        }
    }
}

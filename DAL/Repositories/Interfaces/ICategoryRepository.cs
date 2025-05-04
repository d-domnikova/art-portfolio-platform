using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        Task<IEnumerable<Category>> GetPopularCategoriesAsync();
    }
}

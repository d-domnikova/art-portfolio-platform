using BLL.DTO.Category;

namespace BLL.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryResponse>> GetPopularCategoriesAsync();
        Task<IEnumerable<CategoryResponse>> GetAsync();
        Task<CategoryResponse> GetByIdAsync(Guid id);
        Task CreateAsync(CreateCategory createCategory);
        Task UpdateAsync(Guid id, UpdateCategory updateCategory);
        Task DeleteAsync(Guid id);
    }
}

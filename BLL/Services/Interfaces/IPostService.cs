using BLL.DTO.Post;

namespace BLL.Services.Interfaces
{
    public interface IPostService
    {
        Task<IEnumerable<PostResponse>> GetAsync();
        Task<PostResponse> GetByIdAsync(Guid id);
        Task CreateAsync(CreatePost createPost);
        Task UpdateAsync(Guid id, UpdatePost updatePost);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<PostResponse>> FindByKeywordAsync(string keyword);
    }
}

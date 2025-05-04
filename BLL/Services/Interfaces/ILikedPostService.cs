using BLL.DTO.LikedPost;

namespace BLL.Services.Interfaces
{
    public interface ILikedPostService
    {
        Task<IEnumerable<LikedPostResponse>> GetAllAsync();
        Task<IEnumerable<LikedPostResponse>> GetForPostAsync(Guid postId);
        Task<IEnumerable<LikedPostResponse>> GetForUserAsync(Guid userId);
        Task CreateAsync(CreateLikedPost createLikedPost);
        Task DeleteAsync(Guid userId, Guid postId);
    }
}

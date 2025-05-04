using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface ILikedPostRepository : IGenericRepository<LikedPost>
    {
        Task<IEnumerable<LikedPost>> GetAllForPostAsync(Guid postId);
        Task<IEnumerable<LikedPost>> GetAllForUserAsync(Guid userId);
        Task<LikedPost> GetByUserIdAndPostIdAsync(Guid userId, Guid postId);
    }
}

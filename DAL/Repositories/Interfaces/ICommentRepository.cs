using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface ICommentRepository : IGenericRepository<Comment>
    {
        Task<IEnumerable<Comment>> GetAllForPostAsync(Guid postId);
        Task<IEnumerable<Comment>> GetAllForUserAsync(Guid userId);
    }
}

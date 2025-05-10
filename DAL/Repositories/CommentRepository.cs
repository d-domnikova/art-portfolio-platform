using DAL.Context;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository(PlatformContext platformContext) : base(platformContext)
        {
        }

        public async Task<IEnumerable<Comment>> GetAllForPostAsync(Guid postId)
        {
            return await FindAsync(comments => comments.PostId == postId);
        }

        public async Task<IEnumerable<Comment>> GetAllForUserAsync(Guid userId)
        {
            return await FindAsync(comments => comments.UserId == userId);
        }
    }
}

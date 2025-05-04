using DAL.Context;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class PostRepository : GenericRepository<Post>, IPostRepository
    {
        public PostRepository(PlatformContext platformContext, DbSet<Post> dbSet) : base(platformContext, dbSet) {}

        public async Task<IEnumerable<Post>> FindByKeywordAsync(string keyword)
        {
            return await FindAsync(post => post.Title.Contains(keyword) || post.Description.Contains(keyword));
        }
    }
}

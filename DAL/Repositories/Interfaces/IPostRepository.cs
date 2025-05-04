using DAL.Models;

namespace DAL.Repositories.Interfaces
{
    public interface IPostRepository : IGenericRepository<Post>
    {
        public Task<IEnumerable<Post>> FindByKeywordAsync(string keyword);
    }
}

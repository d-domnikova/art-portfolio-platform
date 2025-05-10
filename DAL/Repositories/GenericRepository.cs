using DAL.Context;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace DAL.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly PlatformContext _platformContext;
       // protected readonly DbSet<T> _dbSet;

        public GenericRepository(PlatformContext platformContext)
        {
            _platformContext = platformContext;
           // _dbSet = this._platformContext.Set<T>();
        }

        public async Task<T> GetByIdAsync(Guid id) => await _platformContext.Set<T>().FindAsync(id);
        
        public async Task<IEnumerable<T>> GetAllAsync() => await _platformContext.Set<T>().ToListAsync();

        public async Task AddAsync(T entity) => await _platformContext.Set<T>().AddAsync(entity);

        public async Task AddRangeAsync(IEnumerable<T> entities) => await _platformContext.Set<T>().AddRangeAsync(entities);

        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> predicate) => await _platformContext.Set<T>().Where(predicate).ToListAsync();
        public void Update(T entity) => _platformContext.Set<T>().Update(entity);

        public void Remove(T entity) => _platformContext.Set<T>().Remove(entity);

        public void RemoveRange(IEnumerable<T> entities) => _platformContext.Set<T>().RemoveRange(entities);
    }
}

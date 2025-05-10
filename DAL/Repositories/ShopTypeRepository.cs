using DAL.Context;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class ShopTypeRepository : GenericRepository<ShopType>, IShopTypeRepository
    {
        public ShopTypeRepository(PlatformContext platformContext) : base(platformContext)
        {
        }
    }
}

using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using DAL.Context;

namespace ReservationServiceDAL
{
    public class PlatformContextFactory : IDesignTimeDbContextFactory<PlatformContext>
    {
        public PlatformContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<PlatformContext>();
            optionsBuilder.UseSqlServer("server=LAPTOP-2DRKP9DN\\SQLEXPRESS; database=ArtFocus; Integrated Security=true;Trusted_Connection=True;TrustServerCertificate=True;");
            
            return new PlatformContext(optionsBuilder.Options);
        }
    }
}

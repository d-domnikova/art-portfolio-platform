using DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Context
{
    public class PlatformContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<LikedPost> Like { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<CommissionSlot> CommisionSlots { get; set; }
        public DbSet<ShopItem> ShopItems { get; set; }
        public DbSet<ShopType> Types { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Users
            modelBuilder.Entity<User>()
                .HasMany(u => u.Followers)
                .WithOne();

            modelBuilder.Entity<User>()
                .HasMany(u => u.Followings)
                .WithOne();

            //LikedPosts
            modelBuilder.Entity<LikedPost>()
                .HasKey(likedPost => new {likedPost.UserId, likedPost.PostId});

            modelBuilder.Entity<LikedPost>()
                .HasOne(lp => lp.User)
                .WithMany(u => u.LikedPosts)
                .HasForeignKey(lp => lp.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<LikedPost>()
                .HasOne(lp => lp.Post)
                .WithMany(p => p.Likes)
                .HasForeignKey(lp => lp.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            //Comments
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId)
                .OnDelete(DeleteBehavior.Cascade);

            //Posts
            modelBuilder.Entity<Post>()
                .HasOne(p => p.User)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<Post>()
                .HasMany(p => p.Categories)
                .WithMany(c => c.Posts);

            //CommisionSlots
            modelBuilder.Entity<CommissionSlot>()
                .HasOne(cms => cms.User)
                .WithMany(u => u.CommisionSlots)
                .HasForeignKey(cms => cms.UserId);

            modelBuilder.Entity<CommissionSlot>()
                .HasOne(cms => cms.Type)
                .WithMany(t => t.CommisionSlots)
                .HasForeignKey(cms => cms.TypeId);

            //ShopItems
            modelBuilder.Entity<ShopItem>()
                .HasOne(i => i.User)
                .WithMany(u => u.ShopItems)
                .HasForeignKey(i => i.UserId);

            modelBuilder.Entity<ShopItem>()
                .HasOne(i => i.Type)
                .WithMany(t => t.Items)
                .HasForeignKey(i => i.TypeId);
        }

        public PlatformContext(DbContextOptions<PlatformContext> options) : base(options) { }
    }
}

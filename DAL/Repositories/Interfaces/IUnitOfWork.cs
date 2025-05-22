namespace DAL.Repositories.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository UserRepository { get; }
        IRoleRepository RoleRepository { get; }
        IPostRepository PostRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        ILikedPostRepository LikedPostRepository { get; }
        ICommentRepository CommentRepository { get; }
        IShopItemRepository ShopItemRepository { get; }
        IShopTypeRepository ShopTypeRepository { get; }
        ICommissionSlotRepository CommissionSlotRepository { get; }
        Task SaveChangesAsync();
    }
}

using DAL.Context;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly PlatformContext _platformContext;

        public IUserRepository UserRepository { get; }
        public IRoleRepository RoleRepository { get; }
        public IPostRepository PostRepository { get; }
        public ICategoryRepository CategoryRepository { get; }
        public ILikedPostRepository LikedPostRepository { get; }
        public ICommentRepository CommentRepository { get; }
        public IShopItemRepository ShopItemRepository { get; }
        public IShopTypeRepository ShopTypeRepository { get; }
        public ICommissionSlotRepository CommissionSlotRepository { get; }

        public UnitOfWork(PlatformContext platformContext, IUserRepository userRepository, IRoleRepository roleRepository, IPostRepository postRepository, 
            ICategoryRepository categoryRepository, ILikedPostRepository likedPostRepository, ICommentRepository commentRepository, 
            IShopItemRepository shopItemRepository, IShopTypeRepository shopTypeRepository, ICommissionSlotRepository commissionSlotRepository)
        {
            _platformContext = platformContext;
            UserRepository = userRepository;
            RoleRepository = roleRepository;
            PostRepository = postRepository;
            CategoryRepository = categoryRepository;
            LikedPostRepository = likedPostRepository;
            CommentRepository = commentRepository;
            ShopItemRepository = shopItemRepository;
            ShopTypeRepository = shopTypeRepository;
            CommissionSlotRepository = commissionSlotRepository;
        }

        public async Task SaveChangesAsync() => await _platformContext.SaveChangesAsync();
        public void Dispose() => _platformContext.Dispose();
    }
}

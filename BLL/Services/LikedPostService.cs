using AutoMapper;
using BLL.DTO.LikedPost;
using BLL.Services.Interfaces;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace BLL.Services
{
    public class LikedPostService : ILikedPostService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public LikedPostService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task CreateAsync(CreateLikedPost createLikedPost)
        {
            var likedPost = _mapper.Map<LikedPost>(createLikedPost);
            likedPost.CreatedAt = DateTime.Now;

            await _unitOfWork.LikedPostRepository.AddAsync(likedPost);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid userId, Guid postId)
        {
            var likedPost = await _unitOfWork.LikedPostRepository.GetByUserIdAndPostIdAsync(userId, postId);
            if (likedPost == null) return;

            _unitOfWork.LikedPostRepository.Remove(likedPost);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<LikedPostResponse>> GetAllAsync()
        {
            var likedPosts = await _unitOfWork.LikedPostRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<LikedPostResponse>>(likedPosts);
        }

        public async Task<IEnumerable<LikedPostResponse>> GetForPostAsync(Guid postId)
        {
            var likedPost = await _unitOfWork.LikedPostRepository.GetAllForPostAsync(postId);
            return _mapper.Map<IEnumerable<LikedPostResponse>>(likedPost);
        }

        public async Task<IEnumerable<LikedPostResponse>> GetForUserAsync(Guid userId)
        {
            var likedPost = await _unitOfWork.LikedPostRepository.GetAllForUserAsync(userId);
            return _mapper.Map<IEnumerable<LikedPostResponse>>(likedPost);
        }
    }
}

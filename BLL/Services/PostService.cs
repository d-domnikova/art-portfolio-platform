using AutoMapper;
using BLL.DTO.Post;
using BLL.Services.Interfaces;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace BLL.Services
{
    public class PostService : IPostService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public PostService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task CreateAsync(CreatePost createPost)
        {
            var post = _mapper.Map<Post>(createPost);
            post.CreatedAt = DateTime.UtcNow;
            post.UpdatedAt = DateTime.UtcNow;

            await _unitOfWork.PostRepository.AddAsync(post);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateAsync(Guid id, UpdatePost updatePost)
        {
            var post = await _unitOfWork.PostRepository.GetByIdAsync(id);
            if (post == null) return;

            _mapper.Map(updatePost, post);
            post.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.PostRepository.Remove(post);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var post = await _unitOfWork.PostRepository.GetByIdAsync(id);
            if (post == null) return;

            _unitOfWork.PostRepository.Remove(post);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task<IEnumerable<PostResponse>> FindByKeywordAsync(string keyword)
        {
            var posts = await _unitOfWork.PostRepository.FindByKeywordAsync(keyword);
            return _mapper.Map<IEnumerable<PostResponse>>(posts);
        }

        public async Task<IEnumerable<PostResponse>> GetAsync()
        {
            var posts = await _unitOfWork.PostRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<PostResponse>>(posts);
        }

        public async Task<PostResponse> GetByIdAsync(Guid id)
        {
            var posts = await _unitOfWork.PostRepository.GetByIdAsync(id);
            return _mapper.Map<PostResponse>(posts);
        }
    }
}

using AutoMapper;
using BLL.DTO.Comment;
using BLL.Services.Interfaces;
using DAL.Models;
using DAL.Repositories.Interfaces;

namespace BLL.Services
{
    public class CommentService : ICommentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CommentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CommentResponse>> GetAsync()
        {
            var comments = await _unitOfWork.CommentRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<CommentResponse>>(comments);
        }

        public async Task<CommentResponse> GetByIdAsync(Guid id)
        {
            var comment = await _unitOfWork.CommentRepository.GetByIdAsync(id);
            return _mapper.Map<CommentResponse>(comment);
        }

        public async Task<IEnumerable<CommentResponse>> GetForPostAsync(Guid postId)
        {
            var comments = await _unitOfWork.CommentRepository.GetAllForPostAsync(postId);
            return _mapper.Map<IEnumerable<CommentResponse>>(comments);
        }

        public async Task<IEnumerable<CommentResponse>> GetForUserAsync(Guid userId)
        {
            var comments = await _unitOfWork.CommentRepository.GetAllForUserAsync(userId);
            return _mapper.Map<IEnumerable<CommentResponse>>(comments);
        }

        public async Task CreateAsync(CreateComment createComment)
        {
            var comment = _mapper.Map<Comment>(createComment);
            comment.CreatedAt = DateTime.UtcNow;
            comment.UpdatedAt = DateTime.UtcNow;
            
            await _unitOfWork.CommentRepository.AddAsync(comment);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateAsync(Guid id, UpdateComment updateComment)
        {
            var comment = await _unitOfWork.CommentRepository.GetByIdAsync(id);
            if (comment == null) return;

            _mapper.Map(updateComment, comment);
            comment.UpdatedAt = DateTime.UtcNow;

            _unitOfWork.CommentRepository.Update(comment);
            await _unitOfWork.SaveChangesAsync();
        }
        public async Task DeleteAsync(Guid id)
        {
            var comment = await _unitOfWork.CommentRepository.GetByIdAsync(id);
            if (comment == null) return;

            _unitOfWork.CommentRepository.Remove(comment);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}

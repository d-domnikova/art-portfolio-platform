using BLL.DTO.Comment;

namespace BLL.Services.Interfaces
{
    public interface ICommentService
    {
        Task<IEnumerable<CommentResponse>> GetForPostAsync(Guid postId);
        Task<IEnumerable<CommentResponse>> GetForUserAsync(Guid userId);
        Task<IEnumerable<CommentResponse>> GetAsync();
        Task<CommentResponse> GetByIdAsync(Guid id);
        Task CreateAsync(CreateComment createComment);
        Task UpdateAsync(Guid id, UpdateComment updateComment);
        Task DeleteAsync(Guid id);
    }
}

using BLL.DTO.Category;
using BLL.DTO.Comment;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace art_portfolio_webAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/comment/")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<CommentResponse>>> GetAllComments()
        {
            var comment = await _commentService.GetAsync();
            return Ok(comment);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<CommentResponse>> GetCommentById(Guid id)
        {
            var comment = await _commentService.GetByIdAsync(id);
            if (comment == null)
                return NotFound();

            return Ok(comment);
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory([FromBody] CreateComment createComment)
        {
            await _commentService.CreateAsync(createComment);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(Guid id, [FromBody] UpdateComment updateComment)
        {
            await _commentService.UpdateAsync(id, updateComment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            await _commentService.DeleteAsync(id);
            return NoContent();
        }
    }
}

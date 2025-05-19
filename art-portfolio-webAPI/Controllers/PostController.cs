using BLL.DTO.Comment;
using BLL.DTO.LikedPost;
using BLL.DTO.Post;
using BLL.DTO.User;
using BLL.Services;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace art_portfolio_webAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/post/")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly ILikedPostService _likedPostService;
        private readonly ICommentService _commentService;

        public PostController(IPostService postService, ILikedPostService likedPostService, ICommentService commentService)
        {
            _postService = postService;
            _likedPostService = likedPostService;
            _commentService = commentService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<PostResponse>>> GetAllPosts()
        {
            var post = await _postService.GetAsync();
            return Ok(post);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<PostResponse>> GetPostById(Guid id)
        {
            var post = await _postService.GetByIdAsync(id);
            if (post == null)
                return NotFound();

            return Ok(post);
        }

        [HttpPost]
        public async Task<IActionResult> AddPost([FromBody] CreatePost createPost)
        {
            await _postService.CreateAsync(createPost);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(Guid id, [FromBody] UpdatePost updatePost)
        {
            await _postService.UpdateAsync(id, updatePost);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            await _postService.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("{id}/comments")]
        [AllowAnonymous]
        public async Task<ActionResult<CommentResponse>> GetPostsComments(Guid id)
        {
            var comments = await _commentService.GetForPostAsync(id);
            if (comments == null)
                return NotFound();

            return Ok(comments);
        }

        [HttpGet("{id}/likedPosts")]
        [AllowAnonymous]
        public async Task<ActionResult<LikedPostResponse>> GetPostsLikes(Guid id)
        {
            var likedPosts = await _likedPostService.GetForPostAsync(id);
            if (likedPosts == null)
                return NotFound();

            return Ok(likedPosts);
        }

        [HttpGet("search/{value}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<UserResponse>>> GetPostsByParam(string value)
        {
            var posts = await _postService.FindByKeywordAsync(value);
            if (posts == null)
                return NotFound();

            return Ok(posts);
        }
    }
}

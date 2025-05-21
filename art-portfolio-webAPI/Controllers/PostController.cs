using art_portfolio_webAPI.Controllers.ImagesProcessing;
using BLL.DTO.Comment;
using BLL.DTO.LikedPost;
using BLL.DTO.Post;
using BLL.DTO.User;
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
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IProcessingImages _processingImages;

        public PostController(IPostService postService, ILikedPostService likedPostService, ICommentService commentService, 
                                IWebHostEnvironment hostEnvironment, IProcessingImages processingImages)
        {
            _postService = postService;
            _likedPostService = likedPostService;
            _commentService = commentService;
            _hostEnvironment = hostEnvironment;
            _processingImages = processingImages;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<PostResponse>>> GetAllPosts()
        {
            var post = await _postService.GetAsync();
            foreach (var postResponse in post) {
                postResponse.ImageSrc = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, postResponse.PostImage);
            }
            return Ok(post);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<PostResponse>> GetPostById(Guid id)
        {
            var post = await _postService.GetByIdAsync(id);

            if (post == null)
            { return NotFound(); } else
            {
                post.ImageSrc = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, post.PostImage);
            }

            return Ok(post);
        }

        [HttpPost]
        public async Task<IActionResult> AddPost([FromForm] CreatePost createPost)
        {
            createPost.PostImage = await _processingImages.UploadImage(createPost.ImageFile, _hostEnvironment);
            await _postService.CreateAsync(createPost);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(Guid id, [FromForm] UpdatePost updatePost)
        {
            await _postService.UpdateAsync(id, updatePost);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            var post = await _postService.GetByIdAsync(id);
            if (post != null)
                _processingImages.DeleteImage(post.PostImage, _hostEnvironment);

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
            { return NotFound(); } else
            {
                foreach (var postResponse in posts)
                {
                    postResponse.ImageSrc = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, postResponse.PostImage);
                }
            }

            return Ok(posts);
        }
    }
}

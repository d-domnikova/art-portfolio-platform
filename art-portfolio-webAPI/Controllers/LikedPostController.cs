using BLL.DTO.LikedPost;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace art_portfolio_webAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/likedPost/")]
    public class LikedPostController : ControllerBase
    {
        private readonly ILikedPostService _likedPostService;

        public LikedPostController(ILikedPostService likedPostService)
        {
            _likedPostService = likedPostService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<LikedPostResponse>>> GetAllLikedPosts()
        {
            var likedPosts = await _likedPostService.GetAllAsync();
            return Ok(likedPosts);
        }

        [HttpGet("{postId}/{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetByUserAndByPost(Guid userId, Guid postId)
        {
            var likedPost = await _likedPostService.GetByUserAndByPost(userId, postId);
            return Ok(likedPost);
        }

        [HttpPost]
        public async Task<IActionResult> AddLikedPost([FromBody] CreateLikedPost createLikedPost)
        {
            await _likedPostService.CreateAsync(createLikedPost);
            return Ok();
        }

        [HttpDelete("{postId}/{userId}")]
        public async Task<IActionResult> DeleteLikedPost(Guid userId, Guid postId)
        {
            await _likedPostService.DeleteAsync(userId, postId);
            return NoContent();
        }
    }
}

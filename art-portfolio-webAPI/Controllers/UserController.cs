using BLL.DTO.Comment;
using BLL.DTO.LikedPost;
using BLL.DTO.User;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace art_portfolio_webAPI.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/user/")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILikedPostService _likedPostService;
        private readonly ICommentService _commentService;

        public UserController(IUserService userService, ILikedPostService likedPostService, ICommentService commentService)
        {
            _userService = userService;
            _likedPostService = likedPostService;
            _commentService = commentService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<UserResponse>>> GetAllUsers()
        {
            var user = await _userService.GetAsync();
            return Ok(user);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<UserResponse>> GetUserById(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] CreateUser createUser)
        {
            await _userService.CreateAsync(createUser);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUser updateUser)
        {
            await _userService.UpdateAsync(id, updateUser);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            await _userService.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("{id}/comments")]
        [AllowAnonymous]
        public async Task<ActionResult<CommentResponse>> GetUsersComments(Guid id)
        {
            var comments = await _commentService.GetForUserAsync(id);
            if (comments == null)
                return NotFound();

            return Ok(comments);
        }

        [HttpGet("{id}/likedPosts")]
        [AllowAnonymous]
        public async Task<ActionResult<LikedPostResponse>> GetUserLikedPosts(Guid id)
        {
            var likedPosts = await _likedPostService.GetForPostAsync(id);
            if (likedPosts == null)
                return NotFound();

            return Ok(likedPosts);
        }

        //search request
    }
}

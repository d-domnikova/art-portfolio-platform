using art_portfolio_webAPI.Controllers.ImagesProcessing;
using BLL.DTO.Comment;
using BLL.DTO.LikedPost;
using BLL.DTO.User;
using BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace art_portfolio_webAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/user/")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILikedPostService _likedPostService;
        private readonly ICommentService _commentService;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IProcessingImages _processingImages;

        public UserController(IUserService userService, ILikedPostService likedPostService, 
                                ICommentService commentService, IWebHostEnvironment hostEnvironment, IProcessingImages processingImages)
        {
            _userService = userService;
            _likedPostService = likedPostService;
            _commentService = commentService;
            _hostEnvironment = hostEnvironment; 
            _processingImages = processingImages;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<UserResponse>>> GetAllUsers()
        {
            var user = await _userService.GetAsync();
            foreach (var userResponse in user)
            {
                userResponse.ProfileImageSrc = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, userResponse.ProfileImage);
                userResponse.BannerImageSrc = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, userResponse.BannerImage);
            }
            return Ok(user);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<UserResponse>> GetUserById(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            } else
            {
                user.ProfileImageSrc = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, user.ProfileImage);
                user.BannerImageSrc = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, user.BannerImage);
            }

            return Ok(user);
        }

        [HttpGet("{attribute}/{value}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<UserResponse>>> GetUserByParam(string attribute, string value)
        {
            var users = await _userService.FindByCredentialAsync(attribute, value);
            if (users == null) 
            { 
            return NotFound(); 
            } else
            {
                foreach (var userResponse in users)
                {
                    userResponse.ProfileImageSrc = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, userResponse.ProfileImage);
                    userResponse.BannerImageSrc = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, userResponse.BannerImage);
                }
            }

            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromForm] CreateUser createUser)
        {
            createUser.ProfileImage = await _processingImages.UploadImage(createUser.ProfileImageFile, _hostEnvironment);
            createUser.BannerImage = await _processingImages.UploadImage(createUser.BannerImageFile, _hostEnvironment);
            await _userService.CreateAsync(createUser);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(Guid id, [FromForm] UpdateUser updateUser)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user != null)
            {
                if (user.ProfileImage != null)
                    _processingImages.DeleteImage(user.ProfileImage, _hostEnvironment);

                if (user.BannerImage != null)
                     _processingImages.DeleteImage(user.BannerImage, _hostEnvironment);


                user.ProfileImage = await _processingImages.UploadImage(updateUser.ProfileImageFile, _hostEnvironment);
                user.BannerImage = await _processingImages.UploadImage(updateUser.BannerImageFile, _hostEnvironment);
            }
            await _userService.UpdateAsync(id, updateUser);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user != null)
            {
                _processingImages.DeleteImage(user.ProfileImage, _hostEnvironment);
                _processingImages.DeleteImage(user.BannerImage, _hostEnvironment);
            }

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
    }
}

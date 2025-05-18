using AutoMapper;
using BLL.DTO.Auth;
using BLL.DTO.User;
using BLL.Services.Interfaces;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Isopoh.Cryptography.Argon2;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserService _userService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public AuthService(IUserService userService, IUnitOfWork unitOfWork, IConfiguration configuration, IMapper mapper)
        {
            _userService = userService;
            _unitOfWork = unitOfWork;
            _configuration = configuration;
            _mapper = mapper;
        }
        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Username)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = request.Credential.Contains('@') ?
               await _unitOfWork.UserRepository.FindByEmailAsync(request.Credential) :
               await _unitOfWork.UserRepository.FindByUsernameAsync(request.Credential);

            if (user == null || !Argon2.Verify(user.PasswordHash, request.Password))
            {
                throw new UnauthorizedAccessException("Invalid email/username or password.");
            }

            var token = GenerateJwtToken(user);

            var response = _mapper.Map<UserResponse>(user);
            return new AuthResponse
            {
                Token = token,
                User = response
            };
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            if (! (await _userService.FindByCredentialAsync("Username", request.Username)).IsNullOrEmpty())
            {
                throw new Exception("User with this username already exists.");
            }
            if (! (await _userService.FindByCredentialAsync("Email", request.Email)).IsNullOrEmpty())
            {
                throw new Exception("User with this email already exists.");
            }

            var newUser = _mapper.Map<User>(request);

            newUser.Id = Guid.NewGuid();
            newUser.PasswordHash = Argon2.Hash(request.Password);
            newUser.CreatedAt = DateTime.Now;
            newUser.UpdatedAt = DateTime.Now;

            await _unitOfWork.UserRepository.AddAsync(newUser);
            await _unitOfWork.SaveChangesAsync();

            var token = GenerateJwtToken(newUser);

            var userResponse = _mapper.Map<UserResponse>(newUser);
            return new AuthResponse
            {
                Token = token,
                User = userResponse
            };
        }
    }
}

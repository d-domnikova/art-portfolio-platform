using BLL.DTO.Auth;

namespace BLL.Services.Interfaces
{
    public interface IAuthService
    {
        public Task<AuthResponse> RegisterAsync(RegisterRequest request);
        public Task<AuthResponse> LoginAsync(LoginRequest login);
    }
}

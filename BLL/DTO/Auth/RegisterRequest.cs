namespace BLL.DTO.Auth
{
    public class RegisterRequest
    {
        public string? Nickname { get; set; }
        public string Username { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string? ProfileImage { get; set; }
        public string? BannerImage { get; set; }
    }
}

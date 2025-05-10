namespace BLL.DTO.User
{
    public class UpdateUser
    {
        public string? Nickname { get; set; }
        public string Username { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string? Biography { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string? Website { get; set; }
        public string? Location { get; set; }
        public string? ProfileImage { get; set; }
        public string? BannerImage { get; set; }
        public DateTime? UpdatedAt { get; set; }

    }
}

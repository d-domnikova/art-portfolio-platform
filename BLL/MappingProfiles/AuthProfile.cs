using AutoMapper;
using BLL.DTO.Auth;
using BLL.DTO.User;
using DAL.Models;

namespace BLL.MappingProfiles
{
    public class AuthProfile : Profile
    {
        public AuthProfile()
        {
            CreateMap<User, UserResponse>();

            CreateMap<RegisterRequest, User>()
                .ForMember(resp => resp.PasswordHash, opt => opt.Ignore());

            CreateMap<User, AuthResponse>()
                .ForMember(resp => resp.Token, opt => opt.Ignore());
        }
    }
}

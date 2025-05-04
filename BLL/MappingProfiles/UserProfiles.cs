using AutoMapper;
using BLL.DTO.User;
using DAL.Models;

namespace BLL.MappingProfiles
{
    public class UserProfiles : Profile
    {
        public UserProfiles()
        {
            CreateMap<CreateUser, User>();
            CreateMap<UpdateUser, User>();
            CreateMap<User, UserResponse>().ReverseMap();
        }
    }
}
 
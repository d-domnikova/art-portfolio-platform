using AutoMapper;
using BLL.DTO.Role;
using DAL.Models;

namespace BLL.MappingProfiles
{
    public class RoleProfile : Profile
    {
        public RoleProfile() {
            CreateMap<CreateRole, Role>();
            CreateMap<UpdateRole, Role>();
            CreateMap<Role, RoleResponce>().ReverseMap();
        }
    }
}

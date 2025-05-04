using AutoMapper;
using BLL.DTO.Post;
using DAL.Models;

namespace BLL.MappingProfiles
{
    public class PostProfile : Profile
    {
        public PostProfile()
        {
            CreateMap<CreatePost, Post>();
            CreateMap<UpdatePost, Post>();
            CreateMap<Post, PostResponse>().ReverseMap();
        }
    }
}

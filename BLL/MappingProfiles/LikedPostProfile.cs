using AutoMapper;
using BLL.DTO.LikedPost;
using DAL.Models;

namespace BLL.MappingProfiles
{
    public class LikedPostProfile : Profile
    {
        public LikedPostProfile()
        {
            CreateMap<CreateLikedPost, LikedPost>();
            CreateMap<LikedPost, LikedPostResponse>().ReverseMap();
        }
    }
}

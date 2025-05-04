using AutoMapper;
using BLL.DTO.Comment;
using DAL.Models;

namespace BLL.MappingProfiles
{
    public class CommentProfile : Profile
    {
        public CommentProfile()
        {
            CreateMap<CreateComment, Comment>();
            CreateMap<UpdateComment, Comment>();
            CreateMap<Comment, CommentResponse>().ReverseMap();
        }
    }
}

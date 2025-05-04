using AutoMapper;
using BLL.DTO.Category;
using DAL.Models;

namespace BLL.MappingProfiles
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<CreateCategory, Category>();
            CreateMap<UpdateCategory, Category>();
            CreateMap<Category, CategoryResponse>().ReverseMap();
        }
    }
}

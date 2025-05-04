using AutoMapper;
using BLL.DTO.ShopType;
using DAL.Models;

namespace BLL.MappingProfiles
{
    public class ShopTypeProfile : Profile
    {
        public ShopTypeProfile() 
        {
            CreateMap<CreateShopType, ShopType>();
            CreateMap<UpdateShopType, ShopType>();
            CreateMap<ShopType, ShopTypeResponse>().ReverseMap();
        }
    }
}

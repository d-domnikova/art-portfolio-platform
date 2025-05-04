using AutoMapper;
using BLL.DTO.ShopItem;
using DAL.Models;

namespace BLL.MappingProfiles
{
    public class ShopItemProfile : Profile
    {
        public ShopItemProfile()
        {
            CreateMap<CreateShopItem, ShopItem>();
            CreateMap<UpdateShopItem, ShopItem>();
            CreateMap<ShopItem, ShopItemResponse>().ReverseMap();
        }
    }
}

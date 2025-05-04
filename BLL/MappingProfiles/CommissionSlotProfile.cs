using AutoMapper;
using BLL.DTO.CommisionSlot;
using DAL.Models;

namespace BLL.MappingProfiles
{
    public class CommissionSlotProfile : Profile
    {
        public CommissionSlotProfile()
        {
            CreateMap<CreateCommissionSlot, CommissionSlot>();
            CreateMap<UpdateCommissionSlot, CommissionSlot>();
            CreateMap<CommissionSlot, CommissionSlotResponse>().ReverseMap();
        }
    }
}

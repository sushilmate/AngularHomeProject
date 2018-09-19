using AutoMapper;
using CVAHelper.Data.Model;
using CVAHelper.Data.ViewModel;

namespace CVAHelper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PidPsrMapping, PidPsrMappingViewModel>();
        }
    }
}
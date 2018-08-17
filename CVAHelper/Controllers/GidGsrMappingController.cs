using AutoMapper;
using CVAHelper.Data.Interface;
using CVAHelper.Data.Model;
using CVAHelper.Data.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace CVAHelper.Controllers
{
    [Route("api/[controller]")]
    public class GidGsrMappingController : Controller
    {
        private readonly IMapper _mapper;

        public GidGsrMappingController(IGidGsrMappingRepository gidGsrMappingRepository, IMapper mapper)
        {
            _gidGsrMappingRepository = gidGsrMappingRepository;
            _mapper = mapper;
        }

        private IGidGsrMappingRepository _gidGsrMappingRepository;

        [HttpGet("[action]")]
        public IEnumerable<GidGsrMappingViewModel> GetGidGsrMapping()
        {
            var gidGsrMappings = _gidGsrMappingRepository.GetAllMappingsWithTenor();
            return _mapper.Map<IEnumerable<GidGsrMapping>, IEnumerable<GidGsrMappingViewModel>>(gidGsrMappings);
        }

        [HttpPost("[action]")]
        public bool UpdateGidGsrMappings([FromBody] IEnumerable<GidGsrMappingViewModel> gidGsrMappingViewModels)
        {
            if (gidGsrMappingViewModels == null)
            {
                return false;
                //return BadRequest("Invalid passed data");
            }

            if (!ModelState.IsValid)
            {
                return false;
                // return BadRequest(ModelState);
            }
            try
            {
                return _gidGsrMappingRepository.UpdateOrAddMapping(_mapper.Map<IEnumerable<GidGsrMappingViewModel>, IEnumerable<GidGsrMapping>>(gidGsrMappingViewModels));
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
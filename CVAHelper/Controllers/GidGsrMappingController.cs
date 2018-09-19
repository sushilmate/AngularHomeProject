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
    public class PidPsrMappingController : Controller
    {
        private readonly IMapper _mapper;

        public PidPsrMappingController(IPidPsrMappingRepository gidGsrMappingRepository, IMapper mapper)
        {
            _gidGsrMappingRepository = gidGsrMappingRepository;
            _mapper = mapper;
        }

        private IPidPsrMappingRepository _gidGsrMappingRepository;

        [HttpGet("[action]")]
        public IEnumerable<PidPsrMappingViewModel> GetPidPsrMapping()
        {
            var gidGsrMappings = _gidGsrMappingRepository.GetAllMappingsWithTenor();
            return _mapper.Map<IEnumerable<PidPsrMapping>, IEnumerable<PidPsrMappingViewModel>>(gidGsrMappings);
        }

        [HttpPost("[action]")]
        public bool UpdatePidPsrMappings([FromBody] IEnumerable<PidPsrMappingViewModel> gidGsrMappingViewModels)
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
                return _gidGsrMappingRepository.UpdateOrAddMapping(_mapper.Map<IEnumerable<PidPsrMappingViewModel>, IEnumerable<PidPsrMapping>>(gidGsrMappingViewModels));
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        [HttpDelete("[action]")]
        public void DeletePidPsrMappings([FromBody] int[] gidGsrMappingIds)
        {
            _gidGsrMappingRepository.Delete(gidGsrMappingIds);
        }
    }
}
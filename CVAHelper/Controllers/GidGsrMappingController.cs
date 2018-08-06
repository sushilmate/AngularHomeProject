using System;
using System.Collections.Generic;
using AutoMapper;
using CVAHelper.Data.Interface;
using CVAHelper.Data.Model;
using CVAHelper.Data.ViewModel;
using Microsoft.AspNetCore.Mvc;

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
        public void UpdateGidGsrMappings([FromBody] string temp)
        {
            var gidGsrMappingViewModel = new GidGsrMappingViewModel();
            if (gidGsrMappingViewModel == null)
            {
                //return BadRequest("Invalid passed data");
            }

            if (!ModelState.IsValid)
            {
                // return BadRequest(ModelState);
            }
            try
            {
                _gidGsrMappingRepository.Update(_mapper.Map<GidGsrMappingViewModel, GidGsrMapping>(gidGsrMappingViewModel));
            }
            catch (Exception ex)
            {
            }
        }
    }
}
using CVAHelper.Data.Model;
using System.Collections.Generic;

namespace CVAHelper.Data.Interface
{
    public interface IPidPsrMappingRepository : IRepository<PidPsrMapping>
    {
        IEnumerable<PidPsrMapping> GetAllMappingsWithTenor();

        bool UpdateOrAddMapping(IEnumerable<PidPsrMapping> gidGsrMappings);
    }
}
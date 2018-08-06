using CVAHelper.Data.Model;
using System.Collections.Generic;

namespace CVAHelper.Data.Interface
{
    public interface IGidGsrMappingRepository: IRepository<GidGsrMapping>
    {
         IEnumerable<GidGsrMapping> GetAllMappingsWithTenor();
    }
}

using CVAHelper.Data.DatabaseContext;
using CVAHelper.Data.Interface;
using CVAHelper.Data.Model;
using System.Collections.Generic;

namespace CVAHelper.Data.Repository
{
    public class GidGsrMappingRepository : Repository<GidGsrMapping>, IGidGsrMappingRepository
    {
        public GidGsrMappingRepository(PrismDbContext context) : base(context)
        {
        }
        public IEnumerable<GidGsrMapping> GetAllMappingsWithTenor()
        {
            return _context.GidGsrMapping;
        }
    }
}

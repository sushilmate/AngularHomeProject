using CVAHelper.Data.DatabaseContext;
using CVAHelper.Data.Interface;
using CVAHelper.Data.Model;
using System;
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

        public bool UpdateOrAddMapping(IEnumerable<GidGsrMapping> entities)
        {
            try
            {
                foreach (var entity in entities)
                {
                    if (entity.Id == 0)
                    {
                        _context.Add(entity);
                    }
                    else
                    {
                        _context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    }
                }
                Save();
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }
    }
}

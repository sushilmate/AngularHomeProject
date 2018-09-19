using CVAHelper.Data.DatabaseContext;
using CVAHelper.Data.Interface;
using CVAHelper.Data.Model;
using System;
using System.Collections.Generic;

namespace CVAHelper.Data.Repository
{
    public class PidPsrMappingRepository : Repository<PidPsrMapping>, IPidPsrMappingRepository
    {
        public PidPsrMappingRepository(PrismDbContext context) : base(context)
        {
        }

        public IEnumerable<PidPsrMapping> GetAllMappingsWithTenor()
        {
            return _context.PidPsrMapping;
        }

        public bool UpdateOrAddMapping(IEnumerable<PidPsrMapping> entities)
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
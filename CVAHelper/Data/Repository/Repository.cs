using CVAHelper.Data.DatabaseContext;
using CVAHelper.Data.Interface;
using System;
using System.Collections.Generic;

namespace CVAHelper.Data.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly PrismDbContext _context;

        public Repository(PrismDbContext context)
        {
            _context = context;
        }

        protected void Save()
        {
            _context.SaveChanges();
        }
        public void Create(T entity)
        {
            _context.Add(entity);
            Save();
        }

        public void Delete(T entity)
        {
            _context.Remove(entity);
            Save();
        }

        public bool Update(T entity)
        {
            _context.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            Save();
            return true;
        }

        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>();
        }

        public T Get(int id)
        {
            throw new System.NotImplementedException();
        }

        public bool UpdateAll(IEnumerable<T> entities)
        {
            throw new NotImplementedException();
        }
    }
}
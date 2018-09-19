using CVAHelper.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace CVAHelper.Data.DatabaseContext
{
    public partial class PrismDbContext : DbContext
    {
        public PrismDbContext()
        {
        }

        public PrismDbContext(DbContextOptions<PrismDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<PidPsrMapping> PidPsrMapping { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=CVA;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PidPsrMapping>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Gid)
                    .IsRequired()
                    .HasColumnName("GID")
                    .HasMaxLength(50);

                entity.Property(e => e.Gsr)
                    .IsRequired()
                    .HasColumnName("GSR")
                    .HasMaxLength(50);
            });
        }
    }
}
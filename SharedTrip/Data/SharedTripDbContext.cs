using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SharedTrip.Data.Model;

namespace SharedTrip.Data
{
    public class SharedTripDbContext : IdentityDbContext<User>
    {
        public SharedTripDbContext(DbContextOptions<SharedTripDbContext> options)
            : base(options)
        {
        }
        public DbSet<Trip> Trips { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .Entity<Trip>()
                .HasOne(p=>p.User)
                .WithMany(p => p.TripsOrganized)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Trip>()
                .HasMany(p => p.Passengers)
                .WithMany(p => p.TripsParticipated);
             
            base.OnModelCreating(builder);
        }
    }
}
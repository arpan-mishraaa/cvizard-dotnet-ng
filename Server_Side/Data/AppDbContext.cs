using Microsoft.EntityFrameworkCore;
using Server_Side.Models;
using System.Collections.Generic;

namespace Server_Side.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Resume> Resumes { get; set; }
        public DbSet<JobDescription> JobDescriptions { get; set; }
        public DbSet<Analysis> Analyses { get; set; }
        public DbSet<LatexOutput> LatexOutputs { get; set; }
    }
}

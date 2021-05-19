using Microsoft.EntityFrameworkCore;
using CompanyTalk_WebApi_v2.Models;

namespace CompanyTalk_WebApi_v2.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Departamento> Departamento { get; set; }
        public DbSet<Funcao> Funcao { get; set; }
        public DbSet<Pessoa> Pessoa { get; set; }
        public DbSet<Reuniao> Reuniao { get; set; }
        public DbSet<Feed> Feed { get; set; }
        public DbSet<LogEntrada> LogEntrada { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Data Source=localhost;Initial Catalog=CompanyTalk;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
        }
    }
}
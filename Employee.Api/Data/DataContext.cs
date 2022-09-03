using Data.Model;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class DataContext : DbContext
    {

        public DataContext()
        {
        }
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }



        public DbSet<Employee> Employees { set; get; } = null!;
        public DbSet<User> Users { set; get; } = null!;
    }
}
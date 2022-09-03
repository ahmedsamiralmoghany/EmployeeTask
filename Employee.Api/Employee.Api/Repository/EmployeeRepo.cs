using Data;
using Microsoft.EntityFrameworkCore;

namespace Employee.Api.Repository
{
    public interface IEmployeeRepo
    {
        Task<Data.Model.Employee> AddEmployee(Data.Model.Employee employee);
        Task<Data.Model.Employee> GetEmployee(int id);
        Task<List<Data.Model.Employee>> GetAllEmployee();
        Data.Model.Employee EditEmployee(Data.Model.Employee employee);
        void DeleteEmployee(Data.Model.Employee employee);
        Task Save();
    }
    public class EmployeeRepo : IEmployeeRepo
    {
        private readonly DataContext _context;

        public EmployeeRepo(DataContext context)
        {
            _context = context;
        }

        public async Task<Data.Model.Employee> AddEmployee(Data.Model.Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            return employee;
        }

        public void DeleteEmployee(Data.Model.Employee employee)
        {
            _context.Employees.Remove(employee);
        }

        public Data.Model.Employee EditEmployee(Data.Model.Employee employee)
        {
            _context.Employees.Update(employee);
            return employee;
        }

        public async Task<List<Data.Model.Employee>> GetAllEmployee()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<Data.Model.Employee> GetEmployee(int id)
        {
            return await _context.Employees.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}

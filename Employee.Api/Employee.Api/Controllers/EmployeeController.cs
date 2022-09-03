using AutoMapper;
using Employee.Api.Dto;
using Employee.Api.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Employee.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepo _employeeRepo;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeRepo employeeRepo, IMapper mapper)
        {
            _employeeRepo = employeeRepo;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _employeeRepo.GetAllEmployee();
            return Ok(employees);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployee(int id)
        {
            var employee = await _employeeRepo.GetEmployee(id);
            if (employee == null)
                return NotFound();
            return Ok(employee);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee(EmployeeDto employeeDto)
        {
            var employee = _mapper.Map<Data.Model.Employee>(employeeDto);
            var userid = int.Parse(HttpContext.User.Identity.Name);

            employee.CreatedById = userid;
            employee.CreatedDate = DateTime.Now;

            await _employeeRepo.AddEmployee(employee);
            await _employeeRepo.Save();
            return Ok(employee);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateEmployee(EmployeeDto employeeDto)
        {
            var employee = await _employeeRepo.GetEmployee(employeeDto.Id);
            if (employee == null)
                return BadRequest("Employee Not Found");
            _mapper.Map(employeeDto, employee);


            _employeeRepo.EditEmployee(employee);
            await _employeeRepo.Save();

            return Ok(employeeDto);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _employeeRepo.GetEmployee(id);
            if (employee == null)
                return NotFound();
            _employeeRepo.DeleteEmployee(employee);
            await _employeeRepo.Save();

            return Ok();
        }
    }
}

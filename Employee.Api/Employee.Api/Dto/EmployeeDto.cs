namespace Employee.Api.Dto
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? PhoneNumber { get; set; }

        public DateTime? CreatedDate { get; set; }
        public int? CreatedById { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? Createdby { get; set; }
        public DateTime? BirthDate { get; set; }

    }
}

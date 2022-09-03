using AutoMapper;
using Employee.Api.Dto;

namespace Employee.Api.Mapper
{
    public class MapperSetting : Profile
    {
        public MapperSetting()
        {
            CreateMap<Data.Model.Employee, EmployeeDto>().ReverseMap();
        }

    }
}

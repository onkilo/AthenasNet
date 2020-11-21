using Athenas.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto.Mapper
{
    public class TrabajadorMapper
    {
        public static TrabajadorDto ToTrabajadorDto(Trabajador trabajador)
        {
            if (trabajador == null) return null;

            return new TrabajadorDto
            {
                Id = trabajador.Id,
                Nombre = trabajador.Nombre,
                Apellido = trabajador.Apellido,
                Direccion = trabajador.Direccion,
                Dni = trabajador.Dni,
                Email = trabajador.Email,
                Sexo = trabajador.Sexo,
                Telefono = trabajador.Telefono,
                Usuario = trabajador.Usuario,
                Roles = RolMapper.ToRolDtos(trabajador.Roles),
                Activo = trabajador.Activo,
                SexoDescripcion = (trabajador.Sexo == "M") ? "Masculino" : "Femenino"
            };
        }

        public static Trabajador ToTrabajador(TrabajadorDto dto)
        {
            if (dto == null) return null;

            return new Trabajador
            {
                Id = dto.Id,
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Direccion = dto.Direccion,
                Dni = dto.Dni,
                Email = dto.Email,
                Sexo = dto.Sexo,
                Telefono = dto.Telefono,
                Usuario = dto.Usuario,
                Roles = RolMapper.ToRoles(dto.Roles),
                Contrasenia = dto.Contrasenia,
                Activo = dto.Activo
            };
        }

        public static IEnumerable<TrabajadorDto> ToTrabajdoresDto(IEnumerable<Trabajador> trabajadores)
        {
            if (trabajadores == null) return null;

            List<TrabajadorDto> trabajadoresDto = new List<TrabajadorDto>();

            foreach (Trabajador t in trabajadores)
            {
                trabajadoresDto.Add(ToTrabajadorDto(t));
            }

            return trabajadoresDto;
        }
    }
}

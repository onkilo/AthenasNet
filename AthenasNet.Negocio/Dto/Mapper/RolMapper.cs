using Athenas.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto.Mapper
{
    public class RolMapper
    {
        public static RolDto ToRolDto(Rol rol)
        {
            if (rol == null) return null;

            return new RolDto
            {
                Id = rol.Id,
                Nombre = rol.Nombre,
                Activo = rol.Activo
            };
        }

        public static Rol ToRol(RolDto dto)
        {
            if (dto == null) return null;

            return new Rol
            {
                Id = dto.Id,
                Nombre = dto.Nombre,
                Activo = dto.Activo
            };
        }

        public static IEnumerable<RolDto> ToRolDtos(IEnumerable<Rol> roles)
        {
            if (roles == null) return null;

            List<RolDto> rolDtos = new List<RolDto>();

            foreach(Rol r in roles)
            {
                rolDtos.Add(ToRolDto(r));
            }

            return rolDtos;
        }

        public static IEnumerable<Rol> ToRoles(IEnumerable<RolDto> roles)
        {
            if (roles == null) return null;

            List<Rol> rolDtos = new List<Rol>();

            foreach (RolDto r in roles)
            {
                rolDtos.Add(ToRol(r));
            }

            return rolDtos;
        }

    }
}

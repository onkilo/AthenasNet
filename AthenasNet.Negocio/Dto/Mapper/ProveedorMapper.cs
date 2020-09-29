using Athenas.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto.Mapper
{
    public class ProveedorMapper
    {
        public static ProveedorDto ToProveedorDto(Proveedor proveedor)
        {
            ProveedorDto dto = new ProveedorDto
            {
                Id = proveedor.Id,
                Direccion = proveedor.Direccion,
                Email = proveedor.Email,
                Representante = proveedor.Representante,
                RUC = proveedor.RUC,
                RzSocial = proveedor.RzSocial,
                Telefono = proveedor.Telefono,
                Activo = proveedor.Activo
            };

            return dto;
        }

        public static Proveedor ToProveedor(ProveedorDto dto)
        {
            if (dto == null) return null;

            Proveedor proveedor = new Proveedor
            {
                Id = dto.Id,
                Direccion = dto.Direccion,
                Email = dto.Email,
                Representante = dto.Representante,
                RUC = dto.RUC,
                RzSocial = dto.RzSocial,
                Telefono = dto.Telefono,
                Activo = dto.Activo
            };

            return proveedor;
        }

        public static IEnumerable<ProveedorDto> ToProveedoresDto(IEnumerable<Proveedor> proveedores)
        {
            if (proveedores == null) return null;

            List<ProveedorDto> dtos = new List<ProveedorDto>();

            foreach(Proveedor p in proveedores)
            {
                dtos.Add(ToProveedorDto(p));
            }

            return dtos;
        }
    }
}

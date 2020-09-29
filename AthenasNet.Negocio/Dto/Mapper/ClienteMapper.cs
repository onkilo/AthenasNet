using Athenas.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto.Mapper
{
    public class ClienteMapper
    {
        public static Cliente ToCliente(ClienteDto dto)
        {
            if (dto == null) return null;

            Cliente cliente = new Cliente
            {
                Id = dto.Id,
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Dni = dto.Dni,
                Sexo = dto.Sexo,
                Telefono = dto.Telefono,
                FechaCreacion = dto.FechaCreacion,
                Activo = dto.Activo
            };

            return cliente;
        }

        public static ClienteDto ToClienteDto(Cliente cliente)
        {
            if (cliente == null) return null;

            ClienteDto dto = new ClienteDto
            {
                Id = cliente.Id,
                Nombre = cliente.Nombre,
                Apellido = cliente.Apellido,
                Dni = cliente.Dni,
                Sexo = cliente.Sexo,
                Telefono = cliente.Telefono,
                FechaCreacion = cliente.FechaCreacion,
                Activo = cliente.Activo
            };

            return dto;
        }

        public static IEnumerable<ClienteDto> ToClientesDto(IEnumerable<Cliente> clientes)
        {
            if (clientes == null) return null;

            List<ClienteDto> dtos = new List<ClienteDto>();

            foreach(Cliente c in clientes)
            {
                dtos.Add(ToClienteDto(c));
            }

            return dtos;
        }
    }
}

using Athenas.Data.MSSQLRepositorio;
using Athenas.Data.Repositorio;
using AthenasNet.Negocio.Dto;
using AthenasNet.Negocio.Dto.Mapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Servicio
{
    public class ClienteServicio
    {
        private IClienteRepositorio repositorio;

        public ClienteServicio()
        {
            repositorio = new ClienteRepositorio();
        }

        public void Crear(ClienteDto cliente)
        {
            repositorio.Crear(ClienteMapper.ToCliente(cliente));
        }

        public void Actualizar(ClienteDto cliente)
        {
            repositorio.Actualizar(ClienteMapper.ToCliente(cliente));
        }

        public void Eliminar(int id)
        {
            repositorio.Eliminar(id);
        }

        public IEnumerable<ClienteDto> Listar(string nombre)
        {
            return ClienteMapper.ToClientesDto(repositorio.Listar(nombre));
        }

        public ClienteDto BuscarPorId(int id)
        {
            return ClienteMapper.ToClienteDto(repositorio.BuscarPorId(id));
        }
    }
}

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
    public class ProveedorServicio
    {
        private IProveedorRepositorio repositorio;

        public ProveedorServicio()
        {
            repositorio = new ProveedorRepositorio();
        }

        public void Crear(ProveedorDto proveedor)
        {
            repositorio.Crear(ProveedorMapper.ToProveedor(proveedor));
        }

        public void Actualizar(ProveedorDto proveedor)
        {
            repositorio.Actualizar(ProveedorMapper.ToProveedor(proveedor));
        }

        public void Eliminar(int id)
        {
            repositorio.Eliminar(id);
        }

        public ProveedorDto BuscarPorId(int id)
        {
            return ProveedorMapper.ToProveedorDto(repositorio.BuscarPorId(id));
        }

        public IEnumerable<ProveedorDto> Listar(string rzSocial)
        {
            return ProveedorMapper.ToProveedoresDto(repositorio.Listar(rzSocial));
        }

    }
}

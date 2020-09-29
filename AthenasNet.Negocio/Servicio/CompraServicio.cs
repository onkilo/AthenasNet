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
    public class CompraServicio
    {
        private ICompraRepositorio repositorio;

        public CompraServicio()
        {
            repositorio = new CompraRepositorio();
        }

        public void Crear(CompraDto compra)
        {
            repositorio.Crear(CompraMapper.ToCompra(compra));
        }

        public void Actualizar(CompraDto compra)
        {
            repositorio.Actualizar(CompraMapper.ToCompra(compra));
        }

        public void Eliminar(int id)
        {
            repositorio.Eliminar(id);
        }

        public CompraDto BuscarPorId(int id)
        {
            return CompraMapper.ToCompraDto(repositorio.BuscarPorId(id));
        }

        public IEnumerable<CompraDto> Listar(string proveedor)
        {
            return CompraMapper.ToComprasDto(repositorio.Listar(proveedor));
        }
    }
}

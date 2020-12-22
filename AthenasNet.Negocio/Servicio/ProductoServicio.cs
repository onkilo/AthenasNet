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
    public class ProductoServicio
    {
        private IProductoRepositorio repositorio;

        public ProductoServicio()
        {
            repositorio = new ProductoRepositorio();
        }

        public void Actualizar(ProductoDto entidad)
        {
            repositorio.Actualizar(ProductoMapper.ToProducto(entidad));
        }

        public ProductoDto BuscarPorId(int Id)
        {
            
            return ProductoMapper.ToProductoDto(repositorio.BuscarPorId(Id));
        }

        public void Crear(ProductoDto entidad)
        {
            repositorio.Crear(ProductoMapper.ToProducto(entidad));
        }

        public void Eliminar(int Id)
        {
            repositorio.Eliminar(Id);
        }

        
        public IEnumerable<ProductoDto> Listar(string Criterio, int BajoStock)
        {
            return ProductoMapper.ToProductosDto(repositorio.Listar(Criterio, BajoStock));
        }
    }
}

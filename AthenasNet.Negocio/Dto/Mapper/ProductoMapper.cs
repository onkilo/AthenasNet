using Athenas.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto.Mapper
{
    public class ProductoMapper
    {
        public static ProductoDto ToProductoDto(Producto producto)
        {
            if (producto == null) return null;

            ProductoDto dto = new ProductoDto
            {
                Id = producto.Id,
                Descripcion = producto.Descripcion,
                PrecioCompra = producto.PrecioCompra,
                PrecioVenta = producto.PrecioVenta,
                StockActual = producto.StockActual,
                StockMin = producto.StockMin,
                Imagen = producto.Imagen,
                Descuento = producto.Descuento,
                Activo = producto.Activo,
                Categoria = CategoriaMapper.GetCategoriaDto(producto.Categoria)
            };

            return dto;
        }

        public static Producto ToProducto(ProductoDto dto)
        {
            if (dto == null) return null;

            Producto producto = new Producto
            {
                Id = dto.Id,
                Descripcion = dto.Descripcion,
                PrecioCompra = dto.PrecioCompra,
                PrecioVenta = dto.PrecioVenta,
                StockActual = dto.StockActual,
                StockMin = dto.StockMin,
                Imagen = dto.Imagen,
                Descuento = dto.Descuento,
                Activo = dto.Activo,
                Categoria = CategoriaMapper.GetCategoria(dto.Categoria)
            };

            return producto;
        }

        public static IEnumerable<ProductoDto> ToProductosDto(IEnumerable<Producto> productos)
        {
            if (productos == null) return null;

            List<ProductoDto> dtos = new List<ProductoDto>();

            foreach(Producto p in productos)
            {
                dtos.Add(ToProductoDto(p));
            }

            return dtos;
        }
    }
}

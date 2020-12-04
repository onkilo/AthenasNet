using Athenas.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto.Mapper
{
    public class CompraMapper
    {
        public static DetalleCompraDto ToDetalleDto(DetalleCompra detalle)
        {
            if (detalle == null) return null;

            DetalleCompraDto dto = new DetalleCompraDto
            {
                Id = detalle.Id,
                Activo = detalle.Activo,
                Cantidad = detalle.Cantidad,
                Precio = detalle.Precio,
                Producto = ProductoMapper.ToProductoDto(detalle.Producto),
                //Compra = new CompraDto { Id = detalle.Compra.Id}
            };

            return dto;
        }

        public static DetalleCompra ToDetalle(DetalleCompraDto dto)
        {
            if (dto == null) return null;

            DetalleCompra detalle = new DetalleCompra
            {
                Id = dto.Id,
                Activo = dto.Activo,
                Cantidad = dto.Cantidad,
                Precio = dto.Precio,
                Producto = ProductoMapper.ToProducto(dto.Producto),
               // Compra = new Compra { Id = dto.Compra.Id }
            };

            return detalle;
        }

        public static IEnumerable<DetalleCompraDto> ToDetallesDto(IEnumerable<DetalleCompra> detalles)
        {
            List<DetalleCompraDto> dtos = new List<DetalleCompraDto>();

            foreach(DetalleCompra det in detalles)
            {
                dtos.Add(ToDetalleDto(det));
            }

            return dtos;
        }

        public static IEnumerable<DetalleCompra> ToDetalles(IEnumerable<DetalleCompraDto> dto)
        {
            if (dto == null) return null;

            List<DetalleCompra> detalles = new List<DetalleCompra>();

            foreach (DetalleCompraDto det in dto)
            {
                detalles.Add(ToDetalle(det));
            }

            return detalles;
        }

        public static Compra ToCompra(CompraDto dto)
        {
            if(dto== null) { return null;  }

            Compra compra = new Compra
            {
                Id = dto.Id,
                Activo = dto.Activo,
                Proveedor = ProveedorMapper.ToProveedor(dto.Proveedor),
                Fecha = dto.Fecha,
                Trabajador = TrabajadorMapper.ToTrabajador(dto.Trabajador),
                Detalles = ToDetalles(dto.Detalles),
                Estado = dto.Estado
            };

            return compra;
        }

        public static CompraDto ToCompraDto(Compra compra)
        {
            if (compra == null) { return null;  }

            CompraDto dto = new CompraDto
            {
                Id = compra.Id,
                Activo = compra.Activo,
                Proveedor = ProveedorMapper.ToProveedorDto(compra.Proveedor),
                Fecha = compra.Fecha,
                Trabajador = TrabajadorMapper.ToTrabajadorDto(compra.Trabajador),
                Detalles = ToDetallesDto(compra.Detalles),
                Estado = compra.Estado
            };

            return dto;
        }

        public static IEnumerable<CompraDto> ToComprasDto(IEnumerable<Compra> compras)
        {
            if (compras == null) return null;

            List<CompraDto> dtos = new List<CompraDto>();

            foreach(Compra c in compras)
            {
                dtos.Add(ToCompraDto(c));
            }

            return dtos;
        }
    }
}

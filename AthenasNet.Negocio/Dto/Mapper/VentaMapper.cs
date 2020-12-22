using Athenas.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto.Mapper
{
    public class VentaMapper
    {
        public static DetalleVentaDto ToDetalleDto(DetalleVenta detalle)
        {
            if (detalle == null) return null;

            DetalleVentaDto dto = new DetalleVentaDto
            {
                Id = detalle.Id,
                Cantidad = detalle.Cantidad,
                Activo = detalle.Activo,
                DesctUni = detalle.DesctUni,
                Precio = detalle.Precio,
                Producto = ProductoMapper.ToProductoDto(detalle.Producto)
                /*,
                Venta = new VentaDto { Id = detalle.Venta.Id}*/
            };

            return dto;
        }

        public static DetalleVenta ToDetalle(DetalleVentaDto dto)
        {
            if (dto == null) return null;

            DetalleVenta detalle = new DetalleVenta
            {
                Id = dto.Id,
                Cantidad = dto.Cantidad,
                Activo = dto.Activo,
                DesctUni = dto.DesctUni,
                Precio = dto.Precio,
                Producto = ProductoMapper.ToProducto(dto.Producto)
                /*Venta = new Venta { Id = dto.Venta.Id }*/
            };

            return detalle;
        }

        public static IEnumerable<DetalleVentaDto> ToDetallesDto(IEnumerable<DetalleVenta> detalles)
        {
            if (detalles == null) return null;

            List<DetalleVentaDto> dtos = new List<DetalleVentaDto>();

            foreach(DetalleVenta det in detalles)
            {
                dtos.Add(ToDetalleDto(det));
            }

            return dtos;
        }

        public static IEnumerable<DetalleVenta> ToDetalles(IEnumerable<DetalleVentaDto> dto)
        {

            List<DetalleVenta> detalles = new List<DetalleVenta>();

            foreach (DetalleVentaDto det in dto)
            {
                detalles.Add(ToDetalle(det));
            }

            return detalles;
        }

        public static Venta ToVenta(VentaDto dto)
        {
            Venta venta = new Venta
            {
                Id = dto.Id,
                Descuento = dto.Descuento,
                Fecha = dto.Fecha,
                Trabajador = TrabajadorMapper.ToTrabajador(dto.Trabajador),
                Cliente = ClienteMapper.ToCliente(dto.Cliente),
                Activo = dto.Activo,
                Detalles = ToDetalles(dto.Detalles)
            };

            return venta;
        }

        public static VentaDto ToVentaDto(Venta dto)
        {
            VentaDto venta = new VentaDto
            {
                Id = dto.Id,
                Descuento = dto.Descuento,
                Fecha = dto.Fecha,
                Trabajador = TrabajadorMapper.ToTrabajadorDto(dto.Trabajador),
                Cliente = ClienteMapper.ToClienteDto(dto.Cliente),
                Activo = dto.Activo,
                Detalles = ToDetallesDto(dto.Detalles)
            };

            return venta;
        }

        public static IEnumerable<VentaDto> ToVentasDto(IEnumerable<Venta> ventas)
        {
            List<VentaDto> dtos = new List<VentaDto>();

            foreach(Venta v in ventas)
            {
                dtos.Add(ToVentaDto(v));
            }

            return dtos;
        }
    }
}

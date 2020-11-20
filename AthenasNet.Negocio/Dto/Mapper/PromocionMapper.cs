using Athenas.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto.Mapper
{
    public class PromocionMapper
    {
        public static PromocionDto ToPromocionDto(Promocion promocion)
        {
            if (promocion == null) return null;

            PromocionDto dto = new PromocionDto
            {
                Id = promocion.Id,
                FechaFin = promocion.FechaFin,
                FechaInicio = promocion.FechaInicio,
                Tipo = promocion.Tipo,
                Valor = promocion.Valor,
                Activo = promocion.Activo,
                Producto = ProductoMapper.ToProductoDto(promocion.Producto)
            };

            return dto;
        }

        public static Promocion ToPromocion(PromocionDto dto)
        {
            if (dto == null) return null;

            Promocion promocion = new Promocion
            {
                Id = dto.Id,
                FechaFin = dto.FechaFin,
                FechaInicio = dto.FechaInicio,
                Tipo = dto.Tipo,
                Valor = dto.Valor,
                Activo = dto.Activo,
                Producto = ProductoMapper.ToProducto(dto.Producto)
            };

            return promocion;
        }

        public static IEnumerable<PromocionDto> ToPromocionesDto(IEnumerable<Promocion> promociones)
        {
            if (promociones == null) return null;

            List<PromocionDto> dtos = new List<PromocionDto>();

            foreach(Promocion p in promociones)
            {
                dtos.Add(ToPromocionDto(p));
            }

            return dtos;
        }
    }
}

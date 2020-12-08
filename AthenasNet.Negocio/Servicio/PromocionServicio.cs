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
    public class PromocionServicio
    {
        private IPromocionRepositorio repositorio;

        public PromocionServicio()
        {
            repositorio = new PromocionRepositorio();
        }

        public void Crear(PromocionDto promocion)
        {
            repositorio.Crear(PromocionMapper.ToPromocion(promocion));
        }

        public void Actualizar(PromocionDto promocion)
        {
            repositorio.Actualizar(PromocionMapper.ToPromocion(promocion));
        }

        public void Eliminar(int id)
        {
            repositorio.Eliminar(id);
        }

        public PromocionDto BuscarPorId(int id)
        {
            return PromocionMapper.ToPromocionDto(repositorio.BuscarPorId(id));
        }

        public IEnumerable<PromocionDto> Listar(string producto,int estado)
        {
            return PromocionMapper.ToPromocionesDto(repositorio.Listar(producto, estado));
        }

    }
}

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
    public class VentaServicio
    {
        private IVentaRepositorio repositorio;

        public VentaServicio()
        {
            repositorio = new VentaRepositorio();
        }

        public void Crear(VentaDto venta)
        {
            repositorio.Crear(VentaMapper.ToVenta(venta));
        }

        public void Eliminar(int id)
        {
            repositorio.Eliminar(id);
        }

        public VentaDto BuscarPorId(int id)
        {
            return VentaMapper.ToVentaDto(repositorio.BuscarPorId(id));

        }

        public IEnumerable<VentaDto> Listar(string cliente, int UsuarioId)
        {
            return VentaMapper.ToVentasDto(repositorio.Listar(cliente, UsuarioId));
        }
    }
}

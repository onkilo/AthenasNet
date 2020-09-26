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
    public class TrabajadorServicio
    {
        private ITrabajadorRepositorio repositorio;

        public TrabajadorServicio()
        {
            repositorio = new TrabajadorRepositorio();
        }

        public void Crear(TrabajadorDto trabajador)
        {
            repositorio.Crear(TrabajadorMapper.ToTrabajador(trabajador));
        }

        public void Actualizar(TrabajadorDto trabajador)
        {
            repositorio.Actualizar(TrabajadorMapper.ToTrabajador(trabajador));
        }

        public TrabajadorDto BuscarPorId(int id)
        {
            return TrabajadorMapper.ToTrabajadorDto(repositorio.BuscarPorId(id));
        }

        public IEnumerable<TrabajadorDto> Listar(String criterio)
        {
            return TrabajadorMapper.ToTrabajdoresDto(repositorio.Listar(criterio));
        }

        public TrabajadorDto Login(TrabajadorDto usuario)
        {
            // Chequeo contraseña


            return TrabajadorMapper.ToTrabajadorDto(repositorio.Login(usuario.Usuario));
        }
    }
}

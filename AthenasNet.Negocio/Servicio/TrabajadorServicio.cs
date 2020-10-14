using Athenas.Data.Entidades;
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

            string hash = BCrypt.Net.BCrypt.HashPassword(trabajador.Contrasenia, 10);
            trabajador.Contrasenia = hash;
            repositorio.Crear(TrabajadorMapper.ToTrabajador(trabajador));
        }

        public void Actualizar(TrabajadorDto trabajador)
        {
            if(trabajador.Contrasenia != null || trabajador.Contrasenia.Trim() != "")
            {
                string hash = BCrypt.Net.BCrypt.HashPassword(trabajador.Contrasenia, 10);
                trabajador.Contrasenia = hash;
            }
            else
            {
                TrabajadorDto trabActual = BuscarPorId(trabajador.Id);

                trabajador.Contrasenia = trabActual.Contrasenia;
                //trabajador.Nombre = (trabajador.Nombre == null || trabajador.Nombre == "") ? trabActual.Nombre : trabajador.Nombre;
            }

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
            Trabajador trabajador = repositorio.Login(usuario.Usuario);

            if (trabajador == null) return null;

            bool contraseniaOk = BCrypt.Net.BCrypt.Verify(usuario.Contrasenia, trabajador.Contrasenia);

            if (!contraseniaOk)
            {
                return null;
            }

            return TrabajadorMapper.ToTrabajadorDto(trabajador);
        }

        public void Eliminar (int Id)
        {
            repositorio.Eliminar(Id);
        }
    }
}

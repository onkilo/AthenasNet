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
            Trabajador trabajadorActual = repositorio.BuscarPorId(trabajador.Id);


            trabajadorActual.Nombre = (trabajador.Nombre != null && trabajador.Nombre.Trim() != "")
                ? trabajador.Nombre
                : trabajadorActual.Nombre;
            trabajadorActual.Apellido = (trabajador.Apellido != null && trabajador.Apellido.Trim() != "")
                ? trabajador.Apellido
                : trabajadorActual.Apellido;
            trabajadorActual.Telefono = (trabajador.Telefono != null && trabajador.Telefono.Trim() != "")
                ? trabajador.Telefono
                : trabajadorActual.Telefono;
            trabajadorActual.Dni = (trabajador.Dni != null && trabajador.Dni.Trim() != "")
                ? trabajador.Dni
                : trabajadorActual.Dni;
            trabajadorActual.Email = (trabajador.Email != null && trabajador.Email.Trim() != "")
               ? trabajador.Email
               : trabajadorActual.Email;
            trabajadorActual.Direccion = (trabajador.Direccion != null && trabajador.Direccion.Trim() != "")
               ? trabajador.Direccion
               : trabajadorActual.Direccion;
            trabajadorActual.Sexo = (trabajador.Sexo != null && trabajador.Sexo.Trim() != "")
               ? trabajador.Sexo
               : trabajadorActual.Sexo;
            trabajadorActual.Usuario = (trabajador.Usuario != null && trabajador.Usuario.Trim() != "")
               ? trabajador.Usuario
               : trabajadorActual.Usuario;
            trabajadorActual.Roles = (trabajador.Roles != null && trabajador.Roles.Count() > 0)
               ? RolMapper.ToRoles(trabajador.Roles)
               : trabajadorActual.Roles;

            if (trabajador.Contrasenia != null && trabajador.Contrasenia.Trim() != "")
            {
                string hash = BCrypt.Net.BCrypt.HashPassword(trabajador.Contrasenia, 10);
                trabajador.Contrasenia = hash;
            }
            else
            {
                Trabajador trabActual = repositorio.BuscarPorId(trabajador.Id);

                trabajador.Contrasenia = trabActual.Contrasenia;
                //trabajador.Nombre = (trabajador.Nombre == null || trabajador.Nombre == "") ? trabActual.Nombre : trabajador.Nombre;
            }

            repositorio.Actualizar(trabajadorActual);
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

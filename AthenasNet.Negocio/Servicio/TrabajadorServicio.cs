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
            Trabajador trabActual = repositorio.BuscarPorId(trabajador.Id);
            trabActual.Nombre = trabajador.Nombre != null && trabajador.Nombre.Trim() != "" ? trabajador.Nombre : trabActual.Nombre;
            trabActual.Apellido = trabajador.Apellido != null && trabajador.Apellido.Trim() != "" ? trabajador.Apellido : trabActual.Apellido;
            trabActual.Direccion = trabajador.Direccion != null && trabajador.Direccion.Trim() != "" ? trabajador.Direccion : trabActual.Direccion;
            trabActual.Telefono = trabajador.Telefono != null && trabajador.Telefono.Trim() != "" ? trabajador.Telefono : trabActual.Telefono;
            trabActual.Dni = trabajador.Dni != null && trabajador.Dni.Trim() != "" ? trabajador.Dni : trabActual.Dni;
            trabActual.Email = trabajador.Email != null && trabajador.Email.Trim() != "" ? trabajador.Email : trabActual.Email;
            trabActual.Sexo = trabajador.Sexo != null && trabajador.Sexo.Trim() != "" ? trabajador.Sexo : trabActual.Sexo;
            trabActual.Usuario = trabajador.Usuario != null && trabajador.Usuario.Trim() != "" ? trabajador.Usuario : trabActual.Usuario;
            trabActual.Roles = trabajador.Roles != null && trabajador.Roles.Count() > 0 ? RolMapper.ToRoles(trabajador.Roles) : trabActual.Roles;
            //if (trabajador.Contrasenia != null && trabajador.Contrasenia.Trim() != "")
            //{
            //    string hash = BCrypt.Net.BCrypt.HashPassword(trabajador.Contrasenia, 10);
            //    trabajador.Contrasenia = hash;
            //}
            //else
            //{
            //    trabajador.Contrasenia = trabActual.Contrasenia;
            //}

            trabActual.Contrasenia = trabajador.Contrasenia != null && trabajador.Contrasenia.Trim() != "" 
                ? BCrypt.Net.BCrypt.HashPassword(trabajador.Contrasenia, 10) 
                : trabActual.Contrasenia;


            repositorio.Actualizar(trabActual);
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

using Athenas.Data.Conexion;
using Athenas.Data.Entidades;
using Athenas.Data.Repositorio;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.MSSQLRepositorio
{
    public class TrabajadorRepositorio : ITrabajadorRepositorio
    {

        private SqlConnection cn;
        private DBConexion db;
        private IRolRepositorio rolRepositorio = new RolRepositorio();

        private readonly string USP_MNT_TRABAJADOR = "USP_MNT_TRABAJADOR";

        public TrabajadorRepositorio()
        {
            db = new DBConexion();
            cn = db.Cn;
        }

        public void Actualizar(Trabajador entidad)
        {

            cn.Open();
            SqlTransaction tn = cn.BeginTransaction();
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_TRABAJADOR;
                cmd.Transaction = tn;

                cmd.Parameters.AddWithValue("@Opcion", "2");
                cmd.Parameters.AddWithValue("@Id", entidad.Id);
                cmd.Parameters.AddWithValue("@Nombre", entidad.Nombre);
                cmd.Parameters.AddWithValue("@Apellido", entidad.Apellido);
                cmd.Parameters.AddWithValue("@Telefono", entidad.Telefono);
                cmd.Parameters.AddWithValue("@DNI", entidad.Dni);
                cmd.Parameters.AddWithValue("@Email", entidad.Email);
                cmd.Parameters.AddWithValue("@Direccion", entidad.Direccion);
                cmd.Parameters.AddWithValue("@Sexo", entidad.Sexo);
                cmd.Parameters.AddWithValue("@Usuario", entidad.Usuario);
                cmd.Parameters.AddWithValue("@Contrasenia", entidad.Contrasenia);

                cmd.ExecuteNonQuery();


                IEnumerable<Rol> rolesActuales = rolRepositorio.GetRolUsuario(entidad.Id);
                //Eliminar roles

                IEnumerable<Rol> tmp = new List<Rol>();

                foreach(Rol r in rolesActuales)
                {
                    bool encontrado = false;
                    foreach(Rol r2 in entidad.Roles)
                    {
                        if(r2.Id == r.Id)
                        {
                            encontrado = true;
                            break;
                        }
                    }

                    if (!encontrado)
                    {
                        rolRepositorio.ElimiarRolUsuario(new RolUsuario { Rol = r, Usuario = entidad }, cn, tn);
                    }
                }


                // Insertar roles
                foreach (Rol r in entidad.Roles)
                {
                    bool encontrado = false;
                    foreach (Rol r2 in rolesActuales)
                    {
                        if (r2.Id == r.Id)
                        {
                            encontrado = true;
                            break;
                        }
                    }

                    if (!encontrado)
                    {
                        rolRepositorio.CrearRolUsuario(new RolUsuario { Usuario = entidad, Rol = r }, cn, tn);
                    }
                }

                tn.Commit();
            }
            catch (Exception ex)
            {
                tn.Rollback();
                throw ex;
            }
            finally
            {
                if (cn.State == ConnectionState.Open)
                {
                    cn.Close();
                }

            }

        }

        public Trabajador BuscarPorId(int Id)
        {
            Trabajador trabajador = new Trabajador();

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_TRABAJADOR;

                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@Id", Id);
                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.Read())
                {
                    trabajador = new Trabajador
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        Nombre = dr["Nombre"].ToString(),
                        Apellido = dr["Apellido"].ToString(),
                        Telefono = dr["Telefono"].ToString(),
                        Dni = dr["DNI"].ToString(),
                        Direccion = dr["Direccion"].ToString(),
                        Email = dr["Email"].ToString(),
                        Usuario = dr["Usuario"].ToString(),
                        Contrasenia = dr["Contrasenia"].ToString(),
                        Sexo = dr["Sexo"].ToString(),
                        Activo = dr["Activo"].ToString()
                    };

                    trabajador.Roles = rolRepositorio.GetRolUsuario(Id);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (cn.State == ConnectionState.Open)
                {
                    cn.Close();
                }

            }

            return trabajador;
        }

        public void Crear(Trabajador entidad)
        {
            cn.Open();
            SqlTransaction tn = cn.BeginTransaction();
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_TRABAJADOR;
                cmd.Transaction = tn;

                cmd.Parameters.AddWithValue("@Opcion", "1");
                cmd.Parameters.AddWithValue("@Id", 0);
                cmd.Parameters.AddWithValue("@Nombre", entidad.Nombre);
                cmd.Parameters.AddWithValue("@Apellido", entidad.Apellido);
                cmd.Parameters.AddWithValue("@Telefono", entidad.Telefono);
                cmd.Parameters.AddWithValue("@DNI", entidad.Dni);
                cmd.Parameters.AddWithValue("@Email", entidad.Email);
                cmd.Parameters.AddWithValue("@Direccion", entidad.Direccion);
                cmd.Parameters.AddWithValue("@Sexo", entidad.Sexo);
                cmd.Parameters.AddWithValue("@Usuario", entidad.Usuario);
                cmd.Parameters.AddWithValue("@Contrasenia", entidad.Contrasenia);

               

                SqlDataReader dr  = cmd.ExecuteReader();

                if (dr.Read())
                {

                    int id = Convert.ToInt32(dr["Id"]);

                    dr.Close();

                    foreach(Rol r in entidad.Roles)
                    {
                        rolRepositorio.CrearRolUsuario(new RolUsuario
                        {
                            Usuario = new Trabajador { Id = id },
                            Rol = r
                        },cn , tn);
                    }

                }

                tn.Commit();
            }
            catch (Exception ex)
            {
                tn.Rollback();
                throw ex;
            }
            finally
            {
                if (cn.State == ConnectionState.Open)
                {
                    cn.Close();
                }

            }
        }

        public void Eliminar(int Id)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_TRABAJADOR;

                cmd.Parameters.AddWithValue("@Opcion", "3");
                cmd.Parameters.AddWithValue("@Id", Id);

                cn.Open();

                int filas = cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (cn.State == ConnectionState.Open)
                {
                    cn.Close();
                }

            }
        }

        public IEnumerable<Trabajador> Listar(string Criterio)
        {
            List<Trabajador> trabajadores = new List<Trabajador>();

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_TRABAJADOR;

                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@Nombre", Criterio);

                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Trabajador t = new Trabajador
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        Nombre = dr["Nombre"].ToString(),
                        Apellido = dr["Apellido"].ToString(),
                        Telefono = dr["Telefono"].ToString(),
                        Dni = dr["DNI"].ToString(),
                        Direccion = dr["Direccion"].ToString(),
                        Email = dr["Email"].ToString(),
                        Usuario = dr["Usuario"].ToString(),
                        Contrasenia = dr["Contrasenia"].ToString(),
                        Sexo = dr["Sexo"].ToString(),
                        Activo = dr["Activo"].ToString()
                    };

                    t.Roles = rolRepositorio.GetRolUsuario(t.Id);

                    trabajadores.Add(t);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (cn.State == ConnectionState.Open)
                {
                    cn.Close();
                }

            }

            return trabajadores;
        }

        public Trabajador Login(string usuario)
        {
            Trabajador trabajador = new Trabajador();

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_TRABAJADOR;

                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@Usuario", usuario);
                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.Read())
                {
                    trabajador = new Trabajador
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        Nombre = dr["Nombre"].ToString(),
                        Apellido = dr["Apellido"].ToString(),
                        Telefono = dr["Telefono"].ToString(),
                        Dni = dr["DNI"].ToString(),
                        Direccion = dr["Direccion"].ToString(),
                        Email = dr["Email"].ToString(),
                        Usuario = dr["Usuario"].ToString(),
                        Contrasenia = dr["Contrasenia"].ToString(),
                        Sexo = dr["Sexo"].ToString(),
                        Activo = dr["Activo"].ToString()
                    };

                    trabajador.Roles = rolRepositorio.GetRolUsuario(trabajador.Id);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (cn.State == ConnectionState.Open)
                {
                    cn.Close();
                }

            }

            return trabajador;
        }
    }
}

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
    public class RolRepositorio : IRolRepositorio
    {
        private SqlConnection cn;
        private DBConexion db;

        private readonly string USP_MNT_ROL = "USP_MNT_ROL";

        public RolRepositorio()
        {
            db = new DBConexion();
            cn = db.Cn;
        }

        public void Actualizar(Rol entidad)
        {
            throw new NotImplementedException();
        }

        public Rol BuscarPorId(int Id)
        {
            throw new NotImplementedException();
        }

        public void Crear(Rol entidad)
        {
            throw new NotImplementedException();
        }

        public void CrearRolUsuario(RolUsuario rolUsuario, SqlConnection cn, SqlTransaction tn)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.Transaction = tn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_ROL;

                cmd.Parameters.AddWithValue("@Opcion", "5");
                cmd.Parameters.AddWithValue("@Id", rolUsuario.Rol.Id);
                cmd.Parameters.AddWithValue("@Usuario", rolUsuario.Usuario.Id);

                int filas = cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void ElimiarRolUsuario(RolUsuario rolUsuario, SqlConnection cn, SqlTransaction tn)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = tn;
                cmd.CommandText = USP_MNT_ROL;

                cmd.Parameters.AddWithValue("@Opcion", "6");
                cmd.Parameters.AddWithValue("@Id", rolUsuario.Rol.Id);
                cmd.Parameters.AddWithValue("@Usuario", rolUsuario.Usuario.Id);

                int filas = cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public void Eliminar(int Id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Rol> GetRolUsuario(int UsuarioId)
        {
            List<Rol> roles = new List<Rol>();

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_ROL;

                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@Usuario", UsuarioId);

                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    roles.Add(new Rol
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        Nombre = dr["Nombre"].ToString(),
                        Activo = dr["Activo"].ToString()
                    });
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

            return roles;
        }

        public IEnumerable<Rol> Listar(string Criterio)
        {
            List<Rol> roles = new List<Rol>();

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_ROL;

                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@Nombre", Criterio);

                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    roles.Add(new Rol
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        Nombre = dr["Nombre"].ToString(),
                        Activo = dr["Activo"].ToString()
                    });
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

            return roles;
        }
    }
}

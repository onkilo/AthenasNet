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
    public class ProveedorRepositorio : IProveedorRepositorio
    {
        private SqlConnection cn;
        private DBConexion db;

        private readonly string USP_MNT_PROVEEDOR = "USP_MNT_PROVEEDOR";

        public ProveedorRepositorio()
        {
            db = new DBConexion();
            cn = db.Cn;
        }
        public void Actualizar(Proveedor entidad)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PROVEEDOR;

                cmd.Parameters.AddWithValue("@Opcion", "2");
                cmd.Parameters.AddWithValue("@Id", entidad.Id);
                cmd.Parameters.AddWithValue("@RzSocial", entidad.RzSocial);
                cmd.Parameters.AddWithValue("@Ruc", entidad.RUC);
                cmd.Parameters.AddWithValue("@Representate", entidad.Representante);
                cmd.Parameters.AddWithValue("@Email", entidad.Email);
                cmd.Parameters.AddWithValue("@Telefono", entidad.Telefono);
                cmd.Parameters.AddWithValue("@Direccion", entidad.Direccion);
                cmd.Parameters.AddWithValue("@Activo", "1");

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

        public Proveedor BuscarPorId(int Id)
        {
            Proveedor proveedor = new Proveedor();

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PROVEEDOR;

                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@RzSocial", "");
                cmd.Parameters.AddWithValue("@Activo", "1");

                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.Read())
                {
                    proveedor = new Proveedor
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        RzSocial = dr["RzSocial"].ToString(),
                        Activo = dr["Activo"].ToString()
                    };
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

            return proveedor;
        }

        public void Crear(Proveedor entidad)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PROVEEDOR;

                cmd.Parameters.AddWithValue("@Opcion", "1");
                cmd.Parameters.AddWithValue("@Id", 0);
                cmd.Parameters.AddWithValue("@RzSocial", entidad.RzSocial);
                cmd.Parameters.AddWithValue("@Ruc", entidad.RUC);
                cmd.Parameters.AddWithValue("@Representate", entidad.Representante);
                cmd.Parameters.AddWithValue("@Email", entidad.Email);
                cmd.Parameters.AddWithValue("@Telefono", entidad.Telefono);
                cmd.Parameters.AddWithValue("@Direccion", entidad.Direccion);
                cmd.Parameters.AddWithValue("@Activo", "1");

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

        public void Eliminar(int Id)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PROVEEDOR;

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

        public IEnumerable<Proveedor> Listar(string Criterio)
        {
            List<Proveedor> proveedores = new List<Proveedor>();

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PROVEEDOR;

                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@Id", 0);
                cmd.Parameters.AddWithValue("@RzSocial", Criterio);
                cmd.Parameters.AddWithValue("@Activo", "1");

                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    proveedores.Add(new Proveedor
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        RzSocial = dr["RzSocial"].ToString(),
                        RUC = dr["Ruc"].ToString(),
                        Representante = dr["Representante"].ToString(),
                        Email = dr["Email"].ToString(),
                        Telefono = dr["Telefono"].ToString(),
                        Direccion = dr["Direccion"].ToString(),
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


            return proveedores;
        }
    }
}

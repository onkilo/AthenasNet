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
    public class PromocionRepositorio : IPromocionRepositorio
    {
        private SqlConnection cn;
        private DBConexion db;

        private readonly string USP_MNT_PROMOCION = "USP_MNT_PROMOCION";

        public PromocionRepositorio()
        {
            db = new DBConexion();
            cn = db.Cn;
        }
        public void Actualizar(Promocion entidad)
        {

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PROMOCION;

                cmd.Parameters.AddWithValue("@Opcion", "2");
                cmd.Parameters.AddWithValue("@Id", entidad.Id);
                cmd.Parameters.AddWithValue("@ProductoId", entidad.Producto.Id);
                cmd.Parameters.AddWithValue("@Tipo", entidad.Tipo);
                cmd.Parameters.AddWithValue("@Valor", entidad.Valor);
                cmd.Parameters.AddWithValue("@FechaInicio", entidad.FechaInicio);
                cmd.Parameters.AddWithValue("@FechaFin", entidad.FechaFin);
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

        public Promocion BuscarPorId(int Id)
        {
            Promocion promocion = new Promocion();

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PROMOCION;

                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@Activo", "1");

                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.Read())
                {
                    promocion = new Promocion
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        Tipo = Convert.ToInt32(dr["Tipo"]),
                        Valor = Convert.ToDouble(dr["Valor"]),
                        FechaInicio = Convert.ToDateTime(dr["FechaInicio"]),
                        FechaFin = Convert.ToDateTime(dr["FechaFin"]),
                        Activo = dr["Activo"].ToString(),
                        Producto = new Producto
                        {
                            Id = Convert.ToInt32(dr["ProductoId"]),
                            Descripcion = dr["Producto"].ToString(),
                            PrecioVenta = Convert.ToDouble(dr["PrecioVenta"])
                        },

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

            return promocion;
        }

        public void Crear(Promocion entidad)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PROMOCION;

                cmd.Parameters.AddWithValue("@Opcion", "1");
                cmd.Parameters.AddWithValue("@Id", 0);
                cmd.Parameters.AddWithValue("@ProductoId", entidad.Producto.Id);
                cmd.Parameters.AddWithValue("@Tipo", entidad.Tipo);
                cmd.Parameters.AddWithValue("@Valor", entidad.Valor);
                cmd.Parameters.AddWithValue("@FechaInicio", entidad.FechaInicio);
                cmd.Parameters.AddWithValue("@FechaFin", entidad.FechaFin);
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
                cmd.CommandText = USP_MNT_PROMOCION;

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

        public IEnumerable<Promocion> Listar(string Criterio)
        {
            return Listar(Criterio, 0);
        }


        public IEnumerable<Promocion> Listar(string Criterio, int estado)
        {
            List<Promocion> promociones = new List<Promocion>();

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PROMOCION;

                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@Id", 0);
                cmd.Parameters.AddWithValue("@ProductoDesc", Criterio);
                cmd.Parameters.AddWithValue("@Activo", "1");
                cmd.Parameters.AddWithValue("@Estado", estado);

                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    promociones.Add(new Promocion
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        Tipo = Convert.ToInt32(dr["Tipo"]),
                        Valor = Convert.ToDouble(dr["Valor"]),
                        FechaInicio = Convert.ToDateTime(dr["FechaInicio"]),
                        FechaFin = Convert.ToDateTime(dr["FechaFin"]),
                        Activo = dr["Activo"].ToString(),
                        Producto = new Producto
                        {
                            Id = Convert.ToInt32(dr["ProductoId"]),
                            Descripcion = dr["Producto"].ToString(),
                            PrecioVenta = Convert.ToDouble(dr["PrecioVenta"])
                        }
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


            return promociones;
        }

        public bool TienePromociones(int ProductoId, DateTime FechaInicio, DateTime FechaFin, int PromocionId = 0)
        {
            int promociones = 0;

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandText = "USP_VALIDAPROMO";
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@ProductoId", ProductoId);
                cmd.Parameters.AddWithValue("@FechaInicio", FechaInicio);
                cmd.Parameters.AddWithValue("@FechaFin", FechaFin);
                cmd.Parameters.AddWithValue("@PromocionId", PromocionId);
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.Read())
                {
                    promociones = Int32.Parse(dr["Promociones"].ToString());
                }

            }
            catch(Exception ex)
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


            return promociones > 0;
        }
    }
}

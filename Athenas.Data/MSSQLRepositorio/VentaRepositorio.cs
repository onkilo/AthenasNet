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
    public class VentaRepositorio : IVentaRepositorio
    {
        private SqlConnection cn;
        private DBConexion db;

        private readonly string USP_MNT_VENTA = "USP_MNT_VENTA";
        private readonly string USP_MNT_DETALLEVENTA = "USP_MNT_DETALLEVENTA";
        private readonly string USP_MNT_PRODUCTO = "USP_MNT_PRODUCTO";

        public VentaRepositorio()
        {
            db = new DBConexion();
            cn = db.Cn;
        }

        public void Actualizar(Venta entidad)
        {
            throw new NotImplementedException();
        }

        public Venta BuscarPorId(int Id)
        {
            throw new NotImplementedException();
        }

        public void Crear(Venta entidad)
        {
            cn.Open();
            SqlTransaction tn = cn.BeginTransaction();
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Transaction = tn;
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_VENTA;

                cmd.Parameters.AddWithValue("@Opcion", "1");
                cmd.Parameters.AddWithValue("@ClienteId", entidad.Cliente.Id);
                cmd.Parameters.AddWithValue("@TrabajadorId", entidad.Trabajador.Id);
                cmd.Parameters.AddWithValue("@DescTotal", entidad.DescTotal);


                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.Read())
                {
                    int id = Convert.ToInt32(dr["Id"]);

                    entidad.Detalles.ToList().ForEach(d =>
                    {

                        cmd.CommandText = USP_MNT_DETALLEVENTA;
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@Opcion", "1");
                        cmd.Parameters.AddWithValue("@VentaId", id);
                        cmd.Parameters.AddWithValue("@ProductoId", d.Producto.Id);
                        cmd.Parameters.AddWithValue("@Cantidad", d.Cantidad);
                        cmd.Parameters.AddWithValue("@Precio", d.Precio);
                        cmd.Parameters.AddWithValue("@DesctUni", d.DesctUni);

                        cmd.ExecuteNonQuery();

                        cmd.CommandText = USP_MNT_PRODUCTO;
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@Opcion", "5");
                        cmd.Parameters.AddWithValue("@VentaId", d.Producto.Id);
                        cmd.Parameters.AddWithValue("@StockActual", d.Cantidad * -1);

                        cmd.ExecuteNonQuery();
                    });
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
            cn.Open();
            SqlTransaction tn = cn.BeginTransaction();
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Transaction = tn;
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_VENTA;

                cmd.Parameters.AddWithValue("@Opcion", "3");
                cmd.Parameters.AddWithValue("@Id", Id);

                int filas = cmd.ExecuteNonQuery();

                List<DetalleVenta> detalles = new List<DetalleVenta>();

                cmd.CommandText = USP_MNT_DETALLEVENTA;
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@VentaId", Id);

                SqlDataReader dr = cmd.ExecuteReader();

                while(dr.Read())
                {
                    detalles.Add(new DetalleVenta
                    {
                        Producto = new Producto
                        {
                            Id = Convert.ToInt32(dr["ProductoId"])
                        },
                        Cantidad = Convert.ToInt32(dr["Cantidad"])
                    });
                }

                detalles.ForEach(d =>
                {
                    cmd.CommandText = USP_MNT_PRODUCTO;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@Opcion", "5");
                    cmd.Parameters.AddWithValue("@VentaId", d.Producto.Id);
                    cmd.Parameters.AddWithValue("@StockActual", d.Cantidad);
                });

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

        public IEnumerable<Venta> Listar(string Criterio)
        {
            throw new NotImplementedException();
        }
    }
}

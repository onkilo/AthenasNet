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
    public class ProductoRepositorio : IProductoRepositorio
    {
        private SqlConnection cn;
        private DBConexion db;

        private readonly string USP_MNT_PRODUCTO = "USP_MNT_PRODUCTO";

        public ProductoRepositorio()
        {
            db = new DBConexion();
            cn = db.Cn;
        }

        public void Actualizar(Producto entidad)
        {

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PRODUCTO;

                cmd.Parameters.AddWithValue("@Opcion", "2");
                cmd.Parameters.AddWithValue("@Id", entidad.Id);
                cmd.Parameters.AddWithValue("@Descripcion", entidad.Descripcion);
                cmd.Parameters.AddWithValue("@PrecioCompra", entidad.PrecioCompra);
                cmd.Parameters.AddWithValue("@PrecioVenta", entidad.PrecioVenta);
                cmd.Parameters.AddWithValue("@StockActual", entidad.StockActual);
                cmd.Parameters.AddWithValue("@StockMin", entidad.StockMin);
                cmd.Parameters.AddWithValue("@CategoriaId", entidad.Categoria.Id);
                cmd.Parameters.AddWithValue("@Imagen", entidad.Imagen); // url
                cmd.Parameters.AddWithValue("@Activo", "1");

                cn.Open();

                int filas = cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {

                if (cn.State == ConnectionState.Open)
                {
                    cn.Close();
                }

                throw ex;
            }
        }

        public Producto BuscarPorId(int Id)
        {
            Producto producto = new Producto();

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PRODUCTO;

                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@Activo", "1");

                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.Read())
                {
                    producto = new Producto
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        Descripcion = dr["Descripcion"].ToString(),
                        PrecioCompra = Convert.ToDouble(dr["PrecioCompra"]),
                        PrecioVenta = Convert.ToDouble(dr["PrecioVenta"]),
                        StockActual = Convert.ToInt32(dr["StockActual"]),
                        StockMin = Convert.ToInt32(dr["StockMin"]),
                        Imagen = dr["Imagen"].ToString(),
                        Descuento = Convert.ToDouble(dr["Descuento"]),
                        Activo = dr["Activo"].ToString(),
                        Categoria = new Categoria
                        {
                            Id = Convert.ToInt32(dr["CategoriaId"]),
                            Descripcion = dr["Categoria"].ToString()
                        }
                    };
                }
            }
            catch (Exception ex)
            {

                if (cn.State == ConnectionState.Open)
                {
                    cn.Close();
                }

                throw ex;
            }

            return producto;
        }

        public void Crear(Producto entidad)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PRODUCTO;

                cmd.Parameters.AddWithValue("@Opcion", "1");
                cmd.Parameters.AddWithValue("@Id", 0);
                cmd.Parameters.AddWithValue("@Descripcion", entidad.Descripcion);
                cmd.Parameters.AddWithValue("@PrecioCompra", entidad.PrecioCompra);
                cmd.Parameters.AddWithValue("@PrecioVenta", entidad.PrecioVenta);
                cmd.Parameters.AddWithValue("@StockActual", entidad.StockActual);
                cmd.Parameters.AddWithValue("@StockMin", entidad.StockMin);
                cmd.Parameters.AddWithValue("@CategoriaId", entidad.Categoria.Id);
                cmd.Parameters.AddWithValue("@Imagen", entidad.Imagen); // url
                cmd.Parameters.AddWithValue("@Activo", "1");

                cn.Open();

                int filas = cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {

                if (cn.State == ConnectionState.Open)
                {
                    cn.Close();
                }

                throw ex;
            }
        }

        public void Eliminar(int Id)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PRODUCTO;

                cmd.Parameters.AddWithValue("@Opcion", "3");
                cmd.Parameters.AddWithValue("@Id", Id);

                cn.Open();

                int filas = cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {

                if (cn.State == ConnectionState.Open)
                {
                    cn.Close();
                }

                throw ex;
            }
        }

        public double GetDescuento(int id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Producto> Listar(string Criterio)
        {
            List<Producto> productos = new List<Producto>();
            

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_PRODUCTO;

                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@Descripcion", Criterio);
                cmd.Parameters.AddWithValue("@Activo", "1");

                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    productos.Add(new Producto
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        Descripcion = dr["Descripcion"].ToString(),
                        PrecioCompra = Convert.ToDouble(dr["PrecioCompra"]),
                        PrecioVenta = Convert.ToDouble(dr["PrecioVenta"]),
                        StockActual = Convert.ToInt32(dr["StockActual"]),
                        StockMin = Convert.ToInt32(dr["StockMin"]),
                        Imagen = dr["Imagen"].ToString(),
                        Descuento = Convert.ToDouble(dr["Descuento"]),
                        Activo = dr["Activo"].ToString(),
                        Categoria = new Categoria
                        {
                            Id = Convert.ToInt32(dr["CategoriaId"]),
                            Descripcion = dr["Categoria"].ToString()
                        }
                    });
                }
            }
            catch (Exception ex)
            {

                if (cn.State == ConnectionState.Open)
                {
                    cn.Close();
                }

                throw ex;
            }

            return productos;
        }
    }
}

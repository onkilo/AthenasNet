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
    public class CompraRepositorio : ICompraRepositorio
    {
        private SqlConnection cn;
        private DBConexion db;

        private readonly string USP_MNT_COMPRA = "USP_MNT_COMPRA";
        private readonly string USP_MNT_DETALLECOMPRA = "USP_MNT_DETALLECOMPRA";
        private readonly string USP_MNT_PRODUCTO = "USP_MNT_PRODUCTO";

        public CompraRepositorio()
        {
            db = new DBConexion();
            cn = db.Cn;
        }
        public void Actualizar(Compra entidad)
        {
            cn.Open();
            SqlTransaction tn = cn.BeginTransaction();
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.Transaction = tn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_COMPRA;

                cmd.Parameters.AddWithValue("@Opcion", "2");
                cmd.Parameters.AddWithValue("@Id", entidad.Id);
                cmd.Parameters.AddWithValue("@Estado", entidad.Estado);
                cmd.Parameters.AddWithValue("@Activo", "1");
                


                int filas = cmd.ExecuteNonQuery();

                List<DetalleCompra> detalles = new List<DetalleCompra>();

                SqlCommand cmdDetalle = new SqlCommand(USP_MNT_DETALLECOMPRA, cn);
                cmdDetalle.CommandType = CommandType.StoredProcedure;
                cmdDetalle.Transaction = tn;
                cmdDetalle.Parameters.AddWithValue("@Opcion", "4");
                cmdDetalle.Parameters.AddWithValue("@CompraId", entidad.Id);

                SqlDataReader drDetalle = cmdDetalle.ExecuteReader();

                detalles.Clear();

                while (drDetalle.Read())
                {
                    DetalleCompra det = new DetalleCompra();
                    det.Producto = new Producto
                    {
                        Id = Convert.ToInt32(drDetalle["ProductoId"]),
                        Descripcion = drDetalle["Producto"].ToString(),
                    };
                    det.Cantidad = Convert.ToInt32(drDetalle["Cantidad"]);
                    det.Precio = Convert.ToDouble(drDetalle["Precio"]);
                    det.Activo = drDetalle["Activo"].ToString();
                    detalles.Add(det);
                }
                
                drDetalle.Close();

                detalles.ForEach(d =>
                {
                    
                    cmd.CommandText = USP_MNT_PRODUCTO;
                    cmd.Parameters.Clear();
                    cmd.Parameters.AddWithValue("@Opcion", "5");
                    cmd.Parameters.AddWithValue("@Id", d.Producto.Id);
                    cmd.Parameters.AddWithValue("@StockActual", d.Cantidad);

                    cmd.ExecuteNonQuery();
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

        public Compra BuscarPorId(int Id)
        {
            List<DetalleCompra> detalles = new List<DetalleCompra>();
            Compra compra = new Compra();
            try
            {
                cn.Open();

                SqlCommand cmdCompra = new SqlCommand(USP_MNT_COMPRA, cn);


                cmdCompra.Parameters.AddWithValue("@Opcion", "4");
                cmdCompra.CommandType = CommandType.StoredProcedure;
                cmdCompra.Parameters.AddWithValue("@Id", Id);



                SqlDataReader drCompra = cmdCompra.ExecuteReader();

                if (drCompra.Read())
                {

                    compra.Id = Convert.ToInt32(drCompra["Id"]);
                    compra.Proveedor = new Proveedor
                    {
                        Id = Convert.ToInt32(drCompra["ProveedorId"]),
                        RzSocial = drCompra["Proveedor"].ToString(),
                        Representante = drCompra["Representante"].ToString(),
                        RUC = drCompra["RUC"].ToString(),
                        Direccion = drCompra["Direccion"].ToString(),
                        Telefono = drCompra["Telefono"].ToString(),
                    };
                    compra.Trabajador = new Trabajador
                    {
                        Id = Convert.ToInt32(drCompra["TrabajadorId"]),
                        Nombre = drCompra["NomTrabajador"].ToString(),
                        Apellido = drCompra["ApeTrabajador"].ToString()
                    };
                    compra.Fecha = Convert.ToDateTime(drCompra["Fecha"]);
                    compra.Estado = Convert.ToInt32(drCompra["Estado"]);
                    compra.Activo = drCompra["Activo"].ToString();


                }

                drCompra.Close();

                SqlCommand cmdDetalle = new SqlCommand(USP_MNT_DETALLECOMPRA, cn);
                cmdDetalle.CommandType = CommandType.StoredProcedure;
                cmdDetalle.Parameters.AddWithValue("@Opcion", "4");
                cmdDetalle.Parameters.AddWithValue("@CompraId", Id);

                SqlDataReader drDetalle = cmdDetalle.ExecuteReader();

                detalles.Clear();

                while (drDetalle.Read())
                {
                    DetalleCompra det = new DetalleCompra();
                    det.Producto = new Producto
                    {
                        Id = Convert.ToInt32(drDetalle["ProductoId"]),
                        Descripcion = drDetalle["Producto"].ToString(),
                    };
                    det.Cantidad = Convert.ToInt32(drDetalle["Cantidad"]);
                    det.Precio = Convert.ToDouble(drDetalle["Precio"]);
                    det.Activo = drDetalle["Activo"].ToString();
                    detalles.Add(det);
                }

                compra.Detalles = detalles;
                drDetalle.Close();

            }
            catch (Exception ex)
            {
                //tn.Rollback();
                throw ex;
            }
            finally
            {
                if (cn.State == ConnectionState.Open)
                {
                    cn.Close();
                }

            }

            return compra;
        }

        public void Crear(Compra entidad)
        {

            cn.Open();
            SqlTransaction tn = cn.BeginTransaction();
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Transaction = tn;
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_COMPRA;

                cmd.Parameters.AddWithValue("@Opcion", "1");
                cmd.Parameters.AddWithValue("@ProveedorId", entidad.Proveedor.Id);
                cmd.Parameters.AddWithValue("@TrabajadorId", entidad.Trabajador.Id);
                cmd.Parameters.AddWithValue("@Estado", entidad.Estado);


                SqlDataReader dr = cmd.ExecuteReader();

                if (dr.Read())
                {
                    int id = Convert.ToInt32(dr["Id"]);

                    dr.Close();

                    entidad.Detalles.ToList().ForEach(d =>
                    {

                        cmd.CommandText = USP_MNT_DETALLECOMPRA;
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@Opcion", "1");
                        cmd.Parameters.AddWithValue("@CompraId", id);
                        cmd.Parameters.AddWithValue("@ProductoId", d.Producto.Id);
                        cmd.Parameters.AddWithValue("@Cantidad", d.Cantidad);
                        cmd.Parameters.AddWithValue("@Precio", d.Precio);
                        //cmd.Parameters.AddWithValue("@DesctUni", d.DesctUni);

                        cmd.ExecuteNonQuery();

                        cmd.CommandText = USP_MNT_PRODUCTO;
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@Opcion", "5");
                        cmd.Parameters.AddWithValue("@Id", d.Producto.Id);
                        //cmd.Parameters.AddWithValue("@StockActual", d.Cantidad);

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
                cmd.Connection = cn;
                cmd.Transaction = tn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_COMPRA;

                cmd.Parameters.AddWithValue("@Opcion", "3");
                cmd.Parameters.AddWithValue("@Id", Id);

                SqlDataReader drCompra = cmd.ExecuteReader();
                string Estado = "";

                if (drCompra.Read())
                {
                    Estado = drCompra["Estado"].ToString();
                }

                drCompra.Close();

                if(Estado == "1")
                {
                    List<DetalleCompra> detalles = new List<DetalleCompra>();

                    SqlCommand cmdDetalle = new SqlCommand(USP_MNT_DETALLECOMPRA, cn);
                    cmdDetalle.CommandType = CommandType.StoredProcedure;
                    cmdDetalle.Transaction = tn;
                    cmdDetalle.Parameters.AddWithValue("@Opcion", "4");
                    cmdDetalle.Parameters.AddWithValue("@CompraId", Id);

                    SqlDataReader drDetalle = cmdDetalle.ExecuteReader();

                    detalles.Clear();

                    while (drDetalle.Read())
                    {
                        DetalleCompra det = new DetalleCompra();
                        det.Producto = new Producto
                        {
                            Id = Convert.ToInt32(drDetalle["ProductoId"]),
                            Descripcion = drDetalle["Producto"].ToString(),
                        };
                        det.Cantidad = Convert.ToInt32(drDetalle["Cantidad"]);
                        det.Precio = Convert.ToDouble(drDetalle["Precio"]);
                        det.Activo = drDetalle["Activo"].ToString();
                        detalles.Add(det);
                    }

                    drDetalle.Close();

                    detalles.ForEach(d =>
                    {

                        cmd.CommandText = USP_MNT_PRODUCTO;
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@Opcion", "5");
                        cmd.Parameters.AddWithValue("@Id", d.Producto.Id);
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

        public IEnumerable<Compra> Listar(string Criterio)
        {
            return Listar(Criterio, 0);
        }

        public IEnumerable<Compra> Listar(string Criterio, int UsuarioId)
        {
            List<Compra> compras = new List<Compra>();
            
            try
            {
                cn.Open();

                SqlCommand cmdCompra = new SqlCommand(USP_MNT_COMPRA, cn);


                cmdCompra.Parameters.AddWithValue("@Opcion", "4");
                cmdCompra.CommandType = CommandType.StoredProcedure;
                cmdCompra.Parameters.AddWithValue("@RzProveedor", Criterio);
                cmdCompra.Parameters.AddWithValue("@TrabajadorId", UsuarioId);



                SqlDataReader drCompra = cmdCompra.ExecuteReader();

                while (drCompra.Read())
                {

                    Compra compra = new Compra();

                    compra.Id = Convert.ToInt32(drCompra["Id"]);
                    compra.Proveedor = new Proveedor
                    {
                        Id = Convert.ToInt32(drCompra["ProveedorId"]),
                        RzSocial = drCompra["Proveedor"].ToString(),
                        Representante = drCompra["Representante"].ToString(),
                        Direccion = drCompra["Direccion"].ToString(),
                        Telefono = drCompra["Telefono"].ToString(),
                        RUC = drCompra["RUC"].ToString(),
                    };
                    compra.Trabajador = new Trabajador
                    {
                        Id = Convert.ToInt32(drCompra["TrabajadorId"]),
                        Nombre = drCompra["NomTrabajador"].ToString(),
                        Apellido = drCompra["ApeTrabajador"].ToString()
                    };
                    compra.Fecha = Convert.ToDateTime(drCompra["Fecha"]);
                    compra.Estado = Convert.ToInt32(drCompra["Estado"]);
                    compra.Activo = drCompra["Activo"].ToString();

                    compras.Add(compra);

                }

                drCompra.Close();

                foreach (Compra compra in compras)
                {
                    List<DetalleCompra> detalles = new List<DetalleCompra>();
                    SqlCommand cmdDetalle = new SqlCommand(USP_MNT_DETALLECOMPRA, cn);
                    cmdDetalle.CommandType = CommandType.StoredProcedure;
                    cmdDetalle.Parameters.AddWithValue("@Opcion", "4");
                    cmdDetalle.Parameters.AddWithValue("@CompraId", compra.Id);

                    SqlDataReader drDetalle = cmdDetalle.ExecuteReader();

                    detalles.Clear();

                    while (drDetalle.Read())
                    {
                        DetalleCompra det = new DetalleCompra();
                        det.Producto = new Producto
                        {
                            Id = Convert.ToInt32(drDetalle["ProductoId"]),
                            Descripcion = drDetalle["Producto"].ToString(),
                        };
                        det.Cantidad = Convert.ToInt32(drDetalle["Cantidad"]);
                        det.Precio = Convert.ToDouble(drDetalle["Precio"]);
                        det.Activo = drDetalle["Activo"].ToString();
                        detalles.Add(det);
                    }

                    compra.Detalles = detalles;
                    drDetalle.Close();
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

            return compras;
        }
    }
}

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
    public class CategoriaRepositorio : ICategoriaRepositorio
    {
        private SqlConnection cn;
        private DBConexion db;

        private readonly string USP_MNT_CATEGORIA = "USP_MNT_CATEGORIA";

        public CategoriaRepositorio()
        {
            db = new DBConexion();
            cn = db.Cn;
        }

        public void Actualizar(Categoria entidad)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_CATEGORIA;

                cmd.Parameters.AddWithValue("@Opcion", "2");
                cmd.Parameters.AddWithValue("@Id", entidad.Id);
                cmd.Parameters.AddWithValue("@Descripcion", entidad.Descripcion);
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

        public Categoria BuscarPorId(int Id)
        {
            Categoria categoria = new Categoria();

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_CATEGORIA;

                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@Descripcion", "");
                cmd.Parameters.AddWithValue("@Activo", "1");

                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();
                if (dr.Read())
                {
                    categoria = new Categoria
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        Descripcion = dr["Descripcion"].ToString(),
                        Activo = dr["Activo"].ToString()
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

            return categoria;
        }

        public void Crear(Categoria entidad)
        {
            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_CATEGORIA;

                cmd.Parameters.AddWithValue("@Opcion", "1");
                cmd.Parameters.AddWithValue("@Id", 0);
                cmd.Parameters.AddWithValue("@Descripcion", entidad.Descripcion);
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
                cmd.CommandText = USP_MNT_CATEGORIA;

                cmd.Parameters.AddWithValue("@Opcion", "3");
                cmd.Parameters.AddWithValue("@Id", Id);
                cmd.Parameters.AddWithValue("@Descripcion", "");
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

        public IEnumerable<Categoria> Listar(string Criterio)
        {
            List<Categoria> categorias = new List<Categoria>();

            try
            {
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = cn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = USP_MNT_CATEGORIA;

                cmd.Parameters.AddWithValue("@Opcion", "4");
                cmd.Parameters.AddWithValue("@Id", 0);
                cmd.Parameters.AddWithValue("@Descripcion", Criterio);
                cmd.Parameters.AddWithValue("@Activo", "1");

                cn.Open();

                SqlDataReader dr = cmd.ExecuteReader();
                while(dr.Read())
                {
                    categorias.Add(new Categoria
                    {
                        Id = Convert.ToInt32(dr["Id"]),
                        Descripcion = dr["Descripcion"].ToString(),
                        Activo = dr["Activo"].ToString()
                    });
                }
            }
            catch(Exception ex)
            {

                if(cn.State == ConnectionState.Open)
                {
                    cn.Close();
                }

                throw ex;
            }


            return categorias;
        }
    }
}

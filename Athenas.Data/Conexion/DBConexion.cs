using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Conexion
{
    public class DBConexion
    {
        public SqlConnection Cn { get; set; }

        public DBConexion()
        {
            Cn = new SqlConnection(Environment.GetEnvironmentVariable("AthenasDbMSSQL"));
        }

    }
}

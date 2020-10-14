using System;
using System.Collections.Generic;
using System.Configuration;
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
            string cnBackUp = ConfigurationManager.AppSettings["AthenasDbMSSQL"];

            //Cn = new SqlConnection(Environment.GetEnvironmentVariable("AthenasDbMSSQL"));
            Cn = new SqlConnection(cnBackUp);
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Entidades
{
    public class Promocion
    {
        public int Id { get; set; }

        public int Tipo { get; set; }

        public double Valor { get; set; }

        public DateTime FechaInicio { get; set; }

        public DateTime FechaFin { get; set; }

        public string Activo { get; set; }

        public Producto Producto { get; set; }
    }
}

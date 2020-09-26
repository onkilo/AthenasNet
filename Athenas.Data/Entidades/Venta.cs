using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Entidades
{
    public class Venta
    {
        public int Id { get; set; }

        public Trabajador Trabajador { get; set; }

        public Cliente Cliente { get; set; }

        public DateTime Fecha { get; set; }

        public double DescTotal { get; set; }

        public string Activo { get; set; }

        public IEnumerable<DetalleVenta> Detalles { get; set; }

    }
}

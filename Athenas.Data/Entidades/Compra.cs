using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Entidades
{
    public class Compra
    {
        public int Id { get; set; }

        public Trabajador Trabajador { get; set; }

        public Proveedor Proveedor { get; set; }

        public DateTime Fecha { get; set; }

        public int Estado { get; set; }

        public string Activo { get; set; }

        public IEnumerable<DetalleCompra> Detalles { get; set; } // Interfaz > ArrayList, List

    }
}

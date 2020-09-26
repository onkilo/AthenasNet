using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Entidades
{
    public class DetalleVenta
    {
        public int Id { get; set; }

        public Venta Venta { get; set; }

        public Producto Producto { get; set; }

        public int Cantidad { get; set; }

        public Double Precio { get; set; }

        public double DesctUni { get; set; } // Promociones 0.5

        public string Activo { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athenas.MVCUI.Models
{
    public class DetVentaViewModel
    {
        public int Id { get; set; }

        public VentaViewModel Venta { get; set; }

        public ProductoViewModel Producto { get; set; }

        public int Cantidad { get; set; }

        public Double Precio { get; set; }

        public double DesctUni { get; set; }

        public string Activo { get; set; }
    }
}
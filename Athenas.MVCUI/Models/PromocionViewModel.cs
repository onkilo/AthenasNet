using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athenas.MVCUI.Models
{
    public class PromocionViewModel
    {

        public int Id { get; set; }

        public int Tipo { get; set; }

        public double Valor { get; set; }

        public DateTime FechaInicio { get; set; }

        public DateTime FechaFin { get; set; }

        public string Activo { get; set; }

        public ProductoViewModel Producto { get; set; }
    }

}
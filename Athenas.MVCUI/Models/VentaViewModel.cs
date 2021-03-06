﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athenas.MVCUI.Models
{
    public class VentaViewModel
    {
         public int Id { get; set; }

        public UsuarioViewModel Trabajador { get; set; }

        public ClienteViewModel Cliente { get; set; }

        public DateTime Fecha { get; set; }

        public double Descuento { get; set; }

        public string Activo { get; set; }

        public IEnumerable<DetVentaViewModel> Detalles { get; set; }
        public string FFecha { get => Fecha.ToString("yyyy-MM-dd"); }

        public double SubTotal
        {
            get
            {
                if (Detalles == null) return 0;
                else return Detalles.Sum(d => d.Cantidad * d.Precio);
            }
        }
        public double DescuentoTotal
        {
            get
            {
                if (Detalles == null) return 0;
                else return Detalles.Sum(d => d.Cantidad * d.DesctUni);
            }
        }
        public double Total
        {
            get
            {
                if (Detalles == null) return 0;
                else return Detalles.Sum(d => (d.Cantidad * d.Precio) - DescuentoTotal);
            }
        }
        public string FId { get => String.Format("VEN{0:D4}", Id); }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athenas.MVCUI.Models
{
    public class PedidoViewModel
    {
        public int Id { get; set; }

        public UsuarioViewModel Trabajador { get; set; }

        public ProveedorViewModel Proveedor { get; set; }

        public DateTime Fecha { get; set; }

        public int Estado { get; set; }

        public string Activo { get; set; }

        public IEnumerable<DetPedidoViewModel> Detalles { get; set; }

        public string FFecha { get => Fecha.ToString("yyyy-MM-dd"); }
    }
}
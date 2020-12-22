using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athenas.MVCUI.Models
{
    public class InfoPrincipalViewModel
    {
        public int CantProductos { get; set; }

        public int CantClientes { get; set; }

        public int CantVentas { get; set; }

        public int CantUsuarios { get; set; }

        public IEnumerable<PromocionViewModel> PromosActuales { get; set; }

        public IEnumerable<ProductoViewModel> ProdBajoStock { get; set; }

    }
}
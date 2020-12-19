using AthenasNet.Negocio.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AthenasNet.Api.Models
{
    public class InfoPrincipalModel
    {
        public int CantProductos { get; set; }

        public int CantClientes { get; set; }

        public int CantVentas { get; set; }

        public int CantUsuarios { get; set; }

        public IEnumerable<PromocionDto> PromosActuales { get; set; }

        public IEnumerable<ProductoDto> ProdBajoStock { get; set; }


    }
}
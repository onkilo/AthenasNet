using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto
{
    public class ProductoDto
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public double PrecioCompra { get; set; }
        public double PrecioVenta { get; set; }
        public int StockActual { get; set; }
        public int StockMin { get; set; }
        public string Imagen { get; set; }
        public string Activo { get; set; }

        //public double Descuento { get; set; }

        public string Base64Imagen { get; set; }

        public CategoriaDto Categoria { get; set; }
    }
}

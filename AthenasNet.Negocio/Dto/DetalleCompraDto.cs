using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto
{
    public class DetalleCompraDto
    {
        public int Id { get; set; }

        public CompraDto Compra { get; set; }

        public ProductoDto Producto { get; set; }

        public int Cantidad { get; set; }

        public Double Precio { get; set; }

        public string Activo { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Entidades
{
    public class DetalleCompra
    {
        public int Id { get; set; }

        public Compra Compra { get; set; }

        public Producto Producto { get; set; }

        public int Cantidad { get; set; }

        public Double Precio { get; set; }

        public string Activo { get; set; }
    }
}

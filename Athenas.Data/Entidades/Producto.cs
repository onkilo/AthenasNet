using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Entidades
{
    public class Producto
    {

        public int Id { get; set; }
        public string Descripcion { get; set; }
        public int MyProperty { get; set; }
        public Categoria Categoria { get; set; }
    }
}

using Athenas.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Repositorio
{
    public  interface IProductoRepositorio : IGenericRepositorio<Producto>
    {
        IEnumerable<Producto> Listar(string Criterio, int BajoStock);
    }
}

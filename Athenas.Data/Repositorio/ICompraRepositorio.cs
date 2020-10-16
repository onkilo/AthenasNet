using Athenas.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Repositorio
{
    public interface ICompraRepositorio : IGenericRepositorio<Compra>
    {
        IEnumerable<Compra> Listar(string Criterio, int UsuarioId);
    }
}

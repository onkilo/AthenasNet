using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Repositorio
{
    public interface IGenericRepositorio<T>
    {
        void Crear(T entidad);
        void Actualizar(T entidad);
        T BuscarPorId(int Id);
        IEnumerable<T> Listar(string Criterio);
        void Eliminar(int Id);
    }
}

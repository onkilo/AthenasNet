using Athenas.Data.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Repositorio
{
    public interface IPromocionRepositorio : IGenericRepositorio<Promocion>
    {
        IEnumerable<Promocion> Listar(string Criterio, int Estado);

        bool TienePromociones(int ProductoId, DateTime FechaInicio, DateTime FechaFin, int PromocionId = 0);
    }
}

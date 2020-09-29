using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto
{
    public class PromocionDto
    {
        public int Id { get; set; }

        public int Tipo { get; set; }

        public double Valor { get; set; }

        public DateTime FechaInicio { get; set; }

        public DateTime FechaFin { get; set; }

        public string Activo { get; set; }

        public ProductoDto Producto { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto
{
    public class VentaDto
    {
        public int Id { get; set; }

        public TrabajadorDto Trabajador { get; set; }

        public ClienteDto Cliente { get; set; }

        public DateTime Fecha { get; set; }

        public double Descuento { get; set; }

        public string Activo { get; set; }

        public IEnumerable<DetalleVentaDto> Detalles { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto
{
    public class CompraDto
    {
        public int Id { get; set; }

        public TrabajadorDto Trabajador { get; set; }

        public ProveedorDto Proveedor { get; set; }

        public DateTime Fecha { get; set; }

        public int Estado { get; set; }

        public string Activo { get; set; }

        public IEnumerable<DetalleCompraDto> Detalles { get; set; }
    }
}

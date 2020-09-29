using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AthenasNet.Negocio.Dto
{
    public class ProveedorDto
    {
        public int Id { get; set; }

        public string RzSocial { get; set; }

        public string RUC { get; set; }

        public string Representante { get; set; }

        public string Email { get; set; }

        public string Telefono { get; set; }

        public string Direccion { get; set; }

        public string Activo { get; set; }
    }
}

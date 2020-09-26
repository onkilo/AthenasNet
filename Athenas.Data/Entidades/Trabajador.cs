using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Entidades
{
    public class Trabajador
    {
        public int Id { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public string Telefono { get; set; }

        public string Dni { get; set; }

        public string Direccion { get; set; }

        public string Email { get; set; }

        public string Sexo { get; set; }

        public string Usuario { get; set; }

        public string Contrasenia { get; set; }

        public string Activo { get; set; }

        public IEnumerable<Rol> Roles { get; set; }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Entidades
{
    public class Cliente
    {
        public int Id { get; set; }

        public string Nombre { get; set; }

        public string Apellido { get; set; }

        public string Telefono { get; set; }

        public string Dni { get; set; }

        public string Sexo { get; set; }

        public DateTime FechaCreacion { get; set; }

        public string Activo { get; set; }
    }
}

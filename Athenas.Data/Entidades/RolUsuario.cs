﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Athenas.Data.Entidades
{
    public class RolUsuario
    {

        public RolUsuario()
        {
            Usuario = new Trabajador();
            Rol = new Rol();
        }

        public int Id { get; set; }

        public Rol Rol { get; set; }

        public Trabajador Usuario { get; set; }

        public string Activo { get; set; }
    }
}

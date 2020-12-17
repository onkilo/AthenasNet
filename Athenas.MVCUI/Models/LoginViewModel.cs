using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athenas.MVCUI.Models
{
    public class LoginViewModel
    {
        public string Usuario { get; set; }

        public string Contrasenia { get; set; }

        public string RedirectUrl { get; set; }
    }
}
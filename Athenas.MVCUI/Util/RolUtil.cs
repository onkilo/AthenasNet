using Athenas.MVCUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athenas.MVCUI.Util
{
    public class RolUtil
    {
        public static bool IsInRol(string RolesPermitidos)
        {
            UsuarioViewModel usuario = (UsuarioViewModel)HttpContext.Current.Session["usuario"];

            List<RolViewModel> roles = usuario.Roles.ToList();

            string[] arrRolesPermitidos = RolesPermitidos.Split(',');

            bool encontrado = false;

            encontrado = roles.Exists(r => arrRolesPermitidos.Contains(r.Nombre));

            return encontrado;
        }
    }
}
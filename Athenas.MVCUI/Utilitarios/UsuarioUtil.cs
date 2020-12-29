using Athenas.MVCUI.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace Athenas.MVCUI.Utilitarios
{
    public class UsuarioUtil
    {

        public static bool EsVendedor()
        {
            bool esVendedor = true;
            UsuarioViewModel usuario = (UsuarioViewModel) HttpContext.Current.Session["usuario"];
            List<RolViewModel> rolesActuales = usuario.Roles.ToList();

            string rolVendedorDescripcion = ConfigurationManager.AppSettings["ROL_VENDEDOR"];

            esVendedor = rolesActuales.Count() == 1 && rolesActuales.Exists(rol => rol.Nombre == rolVendedorDescripcion);

            return esVendedor;
        }

        ////public static bool EstaEnRoles(string Roles)//Vendedor,Supervisor
        ////{



        ////}

    }
}
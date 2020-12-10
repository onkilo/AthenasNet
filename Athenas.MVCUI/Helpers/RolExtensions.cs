using Athenas.MVCUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Athenas.MVCUI.Helpers
{
    public static class RolExtensions
    {

        public static bool IsInRol(this HtmlHelper helper)
        {

            UsuarioViewModel usuario = (UsuarioViewModel)HttpContext.Current.Session["usuario"];



            return false;
        }

    }
}
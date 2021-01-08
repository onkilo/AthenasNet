using AthenasNet.Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace AthenasNet.Api.Utilitarios
{
    public class UsuarioUtil
    {
        public static JwtDecodeModel GetUsuarioActual()
        {
            JwtDecodeModel model = (JwtDecodeModel)Thread.CurrentPrincipal;

            return model;
        }

        public static bool EsVendedor()
        {
            JwtDecodeModel model = (JwtDecodeModel)Thread.CurrentPrincipal;

            return model.Roles.Count() == 1 && model.IsInRole("Vendedor");
        }
    }
}
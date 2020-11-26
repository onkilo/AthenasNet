using Athenas.MVCUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Athenas.MVCUI.Filters
{
    public class CustomAutorizacionFilter : AuthorizeAttribute
    {

        public string TipoResultado { get; set; }

        public string RolesPermitidos { get; set; }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool autorizado = base.AuthorizeCore(httpContext);


            UsuarioViewModel usuario = (UsuarioViewModel)httpContext.Session["usuario"];
            List<RolViewModel> rolesActuales = usuario.Roles.ToList();
            string[] arrRolesPermitidos = RolesPermitidos.Split(',');

            autorizado = rolesActuales.Exists(rolActual => arrRolesPermitidos.Contains(rolActual.Nombre));

            return autorizado;
        }


        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);

            if (filterContext.Result != null)
            {
                if (filterContext.Result.GetType() == typeof(HttpUnauthorizedResult))
                {


                    if (TipoResultado == "View")
                    {
                        filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary
                                {
                                      { "controller", "Usuario" },
                                     { "action", "Login" }
                                });
                    }
                    else
                    {
                        GenericResponseModel<String> response = new GenericResponseModel<string>
                        {
                            Codigo = 403,
                            Error = true,
                            Data = "No tiene permisos para realizar esta acción",
                            Mensaje = "No tiene permisos para realizar esta acción"
                        };

                        filterContext.Result = new JsonResult
                        {
                            JsonRequestBehavior = JsonRequestBehavior.AllowGet,
                            Data = response
                        };

                    }

                }
            }
        }

       
    }
}
using Athenas.MVCUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Athenas.MVCUI.Filters
{
    public class CustomAuthorizationFilter: AuthorizeAttribute
    {

        public string TipoResultado { get; set; }

        public string RolesPermitidos { get; set; }

        protected override bool AuthorizeCore(System.Web.HttpContextBase httpContext)
        {
            bool auth = base.AuthorizeCore(httpContext);

            if (httpContext.Session["usuario"] == null)
            {
                auth = false;
            }
            else
            {
                UsuarioViewModel usuario = (UsuarioViewModel)httpContext.Session["usuario"];
                List<RolViewModel> roles = usuario.Roles.ToList();
                string[] arrRolesPermitidos = RolesPermitidos.Split(',');

                bool encontrado = false;

                encontrado = roles.Exists(r => arrRolesPermitidos.Contains(r.Nombre));

                auth = encontrado;
            }
            return auth;
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
                                 { "controller", "Seguridad" },
                                 { "action", "Index" }
                            });
                    }
                    else
                    {

                        GenericResponseModel<String> response = new GenericResponseModel<String>();
                        response.Codigo = 403;
                        response.Data = "No tiene permisos para realizar esta acción";
                        response.Mensaje = "No tiene permisos para realizar esta acción";
                        response.Error = true;

                        filterContext.Result = new JsonResult
                        {
                            Data = response,
                            JsonRequestBehavior = JsonRequestBehavior.AllowGet
                        };
                    }
                }

            }
        }
    }
}
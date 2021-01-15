using Athenas.MVCUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Athenas.MVCUI.Filters
{
    public class CustomAutenticacionFilter : AuthorizeAttribute
    {

        public string TipoResultado { get; set; }//View, Json

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool autenticado =  base.AuthorizeCore(httpContext);

            if(httpContext.Session["usuario"] != null)
            {
                autenticado = true;
            }
            else
            {
                autenticado = false;
            }

            return autenticado;
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
                                      { "action", "Login" },
                                      { "redirectUrl", filterContext.HttpContext.Request.Url },
                                       { "mensajeError", "Debe estar logueado para relizar esta acción"}

                                });
                    }
                    else
                    {
                        GenericResponseModel<String> response = new GenericResponseModel<string>
                        {
                            Codigo = 401,
                            Error = true,
                            Data = "No está logueado en el sistema",
                            Mensaje = "No está logueado en el sistema"
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
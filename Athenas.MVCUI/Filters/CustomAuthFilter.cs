using Athenas.MVCUI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Athenas.MVCUI.Filters
{
    public class CustomAuthenticationFilter : AuthorizeAttribute
    {

        public string TipoResultado { get; set; }

        protected override bool AuthorizeCore(System.Web.HttpContextBase httpContext)
        {
            bool auth =  base.AuthorizeCore(httpContext);

            if(httpContext.Session["usuario"] == null)
            {
                auth = false;
            }
            else
            {
                auth = true;
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
                                 { "action", "Index" },
                                  { "redirectUrl", filterContext.HttpContext.Request.Url }
                            });
                    }
                    else
                    {

                        GenericResponseModel<String> response = new GenericResponseModel<String>();
                        response.Codigo = 401;
                        response.Data = "No esta logueado en el sistema";
                        response.Mensaje = "No esta logueado en el sistema";
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
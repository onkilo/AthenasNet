using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Athenas.MVCUI.Filters
{
    public class CustomAuthFilter : AuthorizeAttribute
    {
        private string _myKeys;
        public string MyKeys
        {
            get { return _myKeys; }
            set
            {
                Roles = value;
            }
        }

        public string ResultType { get; set; }

        protected override bool AuthorizeCore(System.Web.HttpContextBase httpContext)
        {
            return base.AuthorizeCore(httpContext);
        }

        public override void OnAuthorization(AuthorizationContext filterContext)
        {
            base.OnAuthorization(filterContext);
            if (filterContext.Result != null)
            {
                if (filterContext.Result.GetType() == typeof(HttpUnauthorizedResult))
                {
                    if(filterContext.HttpContext.Session["usuario"] == null)
                    {
                        if(ResultType == "View")
                        {
                            filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary
                            {
                                 { "controller", "Seguridad" },
                                 { "action", "Index" }
                            });
                        }
                        else
                        {
                            
                        }
                        
                    }
                }
            }
        }
    }
}
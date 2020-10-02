using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace AthenasNet.Api.Filters
{
    public class CustomAutenticacionFilter : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            base.OnAuthorization(actionContext);

            /*
             * Verificar el token
             * IPrincipal => Usuario actual
             * Thread.CurrentPrincipal
             * HtttpContext.Current.User
             * 
             * */


        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace AthenasNet.Api.Filters
{
    public class CustomAutorizacionFilter : AuthorizationFilterAttribute
    {

        private string _Roles;
        private string[] arrRoles;

        public CustomAutorizacionFilter(string Roles):base()
        {
            _Roles = Roles;
        }

        public CustomAutorizacionFilter() : base()
        {
            _Roles = "";
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            base.OnAuthorization(actionContext);

            /**
             * Leer el Principal isInRol(r)
             * Roles separo por la coma con el Split('')
             * 
             * */

        }
    }
}
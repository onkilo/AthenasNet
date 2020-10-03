using AthenasNet.Api.Models;
using AthenasNet.Api.Utilitarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
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

            arrRoles = _Roles.Split(',');

            JwtDecodeModel model = (JwtDecodeModel)Thread.CurrentPrincipal;

            bool estaEnRol = false;

            foreach(String r in arrRoles)
            {
                if(model.IsInRole(r.Trim()))
                {
                    estaEnRol = true;
                    break;
                }
            }

            if (!estaEnRol)
            {
                actionContext.Response = actionContext.Request.CreateResponse(HttpStatusCode.Unauthorized,
                ResponseUtil.CreaRespuestaError(401, "No tiene permisos para esta acción", "Error de autorización"));
            }

        }
    }
}
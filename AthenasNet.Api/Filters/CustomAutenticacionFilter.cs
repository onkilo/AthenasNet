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
    public class CustomAutenticacionFilter : AuthorizationFilterAttribute
    {
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            base.OnAuthorization(actionContext);

            HttpResponseMessage response = actionContext.Request.CreateResponse( HttpStatusCode.Forbidden,
                ResponseUtil.CreaRespuestaError(403, "Por favor identificarse", "Error de autenticación")); 
             if(actionContext.Request.Headers.Authorization != null)
            {
                string Bearer = actionContext.Request.Headers.Authorization.ToString();

                if(Bearer.StartsWith("Bearer "))
                {
                    string[] arrAuth = Bearer.Split(' ');

                    if(arrAuth.Count() > 1)
                    {
                        string token = arrAuth[1];

                        JwtDecodeModel model = JwtUtil.ValidaToken(token);

                        if(model != null)
                        {
                            Thread.CurrentPrincipal = model;
                            HttpContext.Current.User = model;
                        }
                        else
                        {
                            actionContext.Response = response;
                        }
                    }
                    else
                    {
                        actionContext.Response = response;
                    }

                }
                else
                {
                    actionContext.Response = response;
                }
            }
            else
            {
                actionContext.Response = response;
            }

        }
    }
}
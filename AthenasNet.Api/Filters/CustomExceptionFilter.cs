using AthenasNet.Api.Excepciones;
using AthenasNet.Api.Response;
using AthenasNet.Api.Utilitarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Filters;

namespace AthenasNet.Api.Filters
{
    public class CustomExceptionFilter : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            base.OnException(actionExecutedContext);

            HttpResponseMessage response;

            if( actionExecutedContext.Exception is CustomResponseException)
            {

                CustomResponseException exception = (CustomResponseException)actionExecutedContext.Exception;
                response = actionExecutedContext.Request.CreateResponse<GenericResponse<String>>(
                        (HttpStatusCode)exception.HttpCode,
                        ResponseUtil.CreaRespuestaError(exception.HttpCode, exception.Message)
                    );
            }
            else
            {
                response = actionExecutedContext.Request.CreateResponse<GenericResponse<String>>(
                        HttpStatusCode.InternalServerError,
                        ResponseUtil.CreaRespuestaError(500, actionExecutedContext.Exception.Message)
                    );
            }

            actionExecutedContext.Response = response;

        }
    }
}
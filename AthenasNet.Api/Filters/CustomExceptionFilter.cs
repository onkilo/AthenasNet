using AthenasNet.Api.Excepciones;
using AthenasNet.Api.Response;
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

            if( actionExecutedContext.Exception is CustomResponseException)
            {

                CustomResponseException exception = (CustomResponseException)actionExecutedContext.Exception;
                GenericResponse<String> responseData = new GenericResponse<string>();
                responseData.Codigo = exception.HttpCode;
                responseData.Mensaje = exception.Message;
                responseData.Error = true;
                responseData.Data = "Ocurrió un error";

                actionExecutedContext.Response = actionExecutedContext.Request.CreateResponse<GenericResponse<String>>(
                        (HttpStatusCode)exception.HttpCode,
                        responseData
                    );
            }
            else
            {
                GenericResponse<String> responseData = new GenericResponse<string>();
                responseData.Codigo = 500;
                responseData.Mensaje = actionExecutedContext.Exception.Message;
                responseData.Error = true;
                responseData.Data = "Ocurrió un error";
                actionExecutedContext.Response = actionExecutedContext.Request.CreateResponse<GenericResponse<String>>(
                        HttpStatusCode.InternalServerError,
                        responseData
                    );
            }

        }
    }
}
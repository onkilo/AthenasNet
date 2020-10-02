using AthenasNet.Api.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AthenasNet.Api.Utilitarios
{
    public class ResponseUtil
    {

        public static GenericResponse<String> CreaRespuestaError(int code = 500, string errorMsg = "Ocurrió un error", string dataMsg = "Ocurrió un error")
        {
            GenericResponse<String> responseData = new GenericResponse<string>();
            responseData.Codigo = code;
            responseData.Mensaje = errorMsg;
            responseData.Error = true;
            responseData.Data = dataMsg;

            return responseData;
        }

    }
}
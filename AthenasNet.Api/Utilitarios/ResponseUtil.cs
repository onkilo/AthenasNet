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

        public static GenericResponse<IEnumerable<T>> GetListaPaginada<T>(IEnumerable<T> data, int pagina = 1, int registros = 10, string msj = "Ok")
        {
            GenericResponse<IEnumerable<T>> listado = new GenericResponse<IEnumerable<T>>();
            List<T> dataFiltrada = new List<T>();
            List<T> dataOriginal = data.ToList();

            int filas = data.Count();

            int primerRegistro, ultimoRegistro, totalPaginas;

            totalPaginas = (filas % registros == 0) ? filas / registros : (filas / registros) + 1;

            primerRegistro = (pagina-1)* registros;

            ultimoRegistro = primerRegistro + registros;

            for(int i = primerRegistro; i < ultimoRegistro; i++)
            {
                if (i >= filas) break;

                dataFiltrada.Add(dataOriginal[i]);
            }

            listado.Pagina = pagina;
            listado.RegistrosXPag = registros;
            listado.TotalPaginas = totalPaginas;
            listado.TotalRegistros = filas;
            listado.Data = dataFiltrada;
            listado.Codigo = 200;
            listado.Error = false;
            listado.Mensaje = msj;
            listado.RegistrosRetornados = dataFiltrada.Count();


            return listado;
        }

    }
}
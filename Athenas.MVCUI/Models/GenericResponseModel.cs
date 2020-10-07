using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Athenas.MVCUI.Models
{
    public class GenericResponseModel<T>
    {

            public T Data { get; set; }

            public string Mensaje { get; set; }

            public bool Error { get; set; }

            public int Codigo { get; set; }

            //Paginado
            public int Pagina { get; set; }

            public int TotalPaginas { get; set; }

            public int RegistrosXPag { get; set; }

            public int TotalRegistros { get; set; }

            public int RegistrosRetornados { get; set; }

            //public string RedireccionUrl { get; set; }
        
    }

}
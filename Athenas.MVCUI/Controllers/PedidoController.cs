using Athenas.MVCUI.ClienteHttp;
using Athenas.MVCUI.Models;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Athenas.MVCUI.Controllers
{
    public class PedidoController : Controller
    {
        GenericResponseModel<String> errorResponse;
        string baseUrl = "Compra";
        // GET: Pedido
        public ActionResult Index()
        {
            return View();
        }

        

        // GET: Pedido/Create
        public ActionResult Create()
        {
            PedidoViewModel pedido = new PedidoViewModel();
            pedido.Trabajador = (UsuarioViewModel)Session["usuario"];

            return View(pedido);
        }

        

        // GET: Pedido/Edit/5
        public ActionResult Recibir(int id)
        {
            String url = $"{baseUrl}/{id}";

            GenericResponseModel<PedidoViewModel> responseModel = ApiRequests
                .Get<GenericResponseModel<PedidoViewModel>, GenericResponseModel<String>>(url, out errorResponse);

            if (errorResponse == null)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return View(responseModel.Data);
            }

        }




        [HttpGet]
        public ActionResult Listar(string Proveedor = "")
        {
            string url = $"{baseUrl}?";
            NameValueCollection queryString = HttpUtility.ParseQueryString(String.Empty);
            queryString.Add("registros", "0");
            if (Proveedor != "") queryString.Add("Proveedor", Proveedor);

            url += queryString.ToString();

            GenericResponseModel<IEnumerable<PedidoViewModel>> responseModel = ApiRequests
                .Get<GenericResponseModel<IEnumerable<PedidoViewModel>>, GenericResponseModel<String>>(url, out errorResponse);

            if (errorResponse == null)
            {
                return Json(responseModel, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(errorResponse, JsonRequestBehavior.AllowGet);
            }

        }


        [HttpGet]
        public ActionResult Obtener(int Id)
        {

            String url = $"{baseUrl}/{Id}";

            GenericResponseModel<PedidoViewModel> responseModel = ApiRequests
                .Get<GenericResponseModel<PedidoViewModel>, GenericResponseModel<String>>(url, out errorResponse);

            if (errorResponse == null)
            {
                return Json(responseModel, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(errorResponse, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public ActionResult Crear(PedidoViewModel pedido)
        {


            GenericResponseModel<String> responseModel = ApiRequests
                .Post<GenericResponseModel<String>, PedidoViewModel, GenericResponseModel<String>>(baseUrl, pedido, out errorResponse);

            if (errorResponse == null)
            {
                return Json(responseModel, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(errorResponse, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpPost]
        public ActionResult Actualizar(PedidoViewModel pedido)
        {

            String url = $"{baseUrl}/{pedido.Id}";

            GenericResponseModel<String> responseModel = ApiRequests
                .Put<GenericResponseModel<String>, PedidoViewModel, GenericResponseModel<String>>(url, pedido, out errorResponse);

            if (errorResponse == null)
            {
                return Json(responseModel, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(errorResponse, JsonRequestBehavior.AllowGet);
            }

        }

        [HttpGet]
        public ActionResult Eliminar(int Id)
        {

            String url = $"{baseUrl}/{Id}";

            GenericResponseModel<String> responseModel = ApiRequests
                .Delete<GenericResponseModel<String>, GenericResponseModel<String>>(url, out errorResponse);

            if (errorResponse == null)
            {
                return Json(responseModel, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(errorResponse, JsonRequestBehavior.AllowGet);
            }

        }
    }
}

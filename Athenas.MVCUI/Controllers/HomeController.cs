using Athenas.MVCUI.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Athenas.MVCUI.Controllers
{
    public class HomeController : Controller
    {
        [CustomAuthenticationFilter(TipoResultado = "View")]
        public ActionResult Index()
        {
            return View();
        }

        
    }
}
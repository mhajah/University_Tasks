using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using z1_2.Models;
//debugowanie i kolekcje
namespace z1_2.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ZgloszenieModel model = new ZgloszenieModel();
            return View(model);
        }

        public ActionResult Wydruk(ZgloszenieModel zgloszenie)
        {
            return View(zgloszenie);
        }

        [HttpPost]
        public ActionResult Index(ZgloszenieModel zgloszenie)
        {
            if (this.ModelState.IsValid)
            {
                return PartialView("Wydruk", zgloszenie);
            }
            else
            {
                return View();
            }
            
        }


    }
}
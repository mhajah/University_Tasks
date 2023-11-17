using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using z3.Models;

namespace z3.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {

            return View();
        }

        [HttpPost]
        public ActionResult Upload(HttpPostedFileBase file)
        {
            if (file != null && file.ContentLength > 0)
            {
                var fname = Path.GetFileName(file.FileName);
                var fsize = file.ContentLength;
                var fsignature = fsize % 0xFFFF;

                var fContent = $"<opis>\n" +
                               $"\t<nazwa>{fname}</nazwa>\n" +
                               $"\t<rozmiar>{fsize}</rozmiar>\n" +
                               $"\t<sygnatura>{fsignature}</sygnatura>\n" +
                               $"</opis>";

                return File(new System.Text.UTF8Encoding().GetBytes(fContent), "text/xml", "opis_pliku.xml");
            }


            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        [HttpPost]
        public ActionResult Index(TestModel model)
        {
            if (this.ModelState.IsValid)
            {
                return PartialView("Zad4", model);
            }
            return View();

        }

    }
}
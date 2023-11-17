using Microsoft.AspNetCore.Mvc;
using z2.Models;

namespace z2.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            var model = new ZgloszenieModel();
            return View(model);
        }

        [HttpGet]
        public IActionResult Wydruk(ZgloszenieModel zgloszenie)
        {
            return View(zgloszenie);
        }

        [HttpPost]
        public IActionResult Index(ZgloszenieModel zgloszenie)
        {
            return PartialView("Wydruk", zgloszenie);

        }


    }
}
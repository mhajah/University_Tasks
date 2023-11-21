using System.Web.Mvc;

public class PageController : Controller
{
    public ActionResult Render()
    {
        var routeData = this.Request.RequestContext.RouteData.Values;
        string site = routeData[MyCustomRoute.SITENAME] as string;
        string page = routeData[MyCustomRoute.PAGENAME] as string;
        // odczyt z magazynu danych
        // renderowanie
        var model = new PageRenderModel()
        {
            Site = site,
            Page = page
        };
        return View(model);
    }
}
public class PageRenderModel
{
    public string Site { get; set; }
    public string Page { get; set; }
}
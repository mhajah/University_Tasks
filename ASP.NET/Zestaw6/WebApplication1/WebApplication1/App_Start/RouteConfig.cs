using System.Web.Mvc;
using System.Web.Routing;

public class RouteConfig
{
    public static void RegisterRoutes(RouteCollection routes)
    {
        routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
        // routy postaci CMS/site/subsite/page
        routes.Add(
                "customroute",
                new MyCustomRoute(
                    new RouteValueDictionary(new { controller = "Page", action ="Render" }),
                new MvcRouteHandler())
                );
        // domyślny routing MVC
        routes.MapRoute(
            name: "Default",
            url: "{controller}/{action}/{id}",
            defaults: new
            {
                controller = "Home",
                action = "Index",
                id = UrlParameter.Optional
            }
        );
    }
}

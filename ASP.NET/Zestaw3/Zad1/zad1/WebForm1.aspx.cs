using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace zad1
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string requestPath = HttpContext.Current.Request.Path;
            CustomRegexRoute customRoute = new CustomRegexRoute(@".*WebForm1.*");
            customRoute.ProcessRequest(HttpContext.Current);
        }
    }
}
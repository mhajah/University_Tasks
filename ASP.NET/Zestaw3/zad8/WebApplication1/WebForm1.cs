using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Zad8
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        // róznice pomiedzy asp:label a label
        protected void Page_Load(object sender, EventArgs e)
        {

            if (HttpContext.Current.Session["User"] == null)
            {
                Response.Redirect("Login.aspx");
            }
            else
            {
                StringBuilder sb = new StringBuilder();
                sb.Append("Witaj ");
                sb.Append(HttpContext.Current.Session["User"].ToString());

                Label1.Text = sb.ToString();
            }

        }

        protected string Home_page()
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("Witaj ");
            sb.Append(HttpContext.Current.Session["User"].ToString());

            return sb.ToString();
        }
    }
}
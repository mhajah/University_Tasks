using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;

namespace WebApplication2
{
    public partial class WebForm1 : System.Web.UI.Page
    {

        protected void UstawCiastko_Click(object sender, EventArgs e)
        {
            // Dodawanie ciastka
            HttpCookie cookie = new HttpCookie("Ciacho");
            cookie.Value = "ciasteczko";
            Response.Cookies.Add(cookie);
        }

        protected void OdczytajCiastko_Click(object sender, EventArgs e)
        {
            // Odczytywanie ciastka
            if (Request.Cookies["Ciacho"] != null)
            {
                string value = Request.Cookies["Ciacho"].Value;
                lblWartoscCiastka.Text = "Wartość ciastka: " + value;
            }
            else
            {
                lblWartoscCiastka.Text = "Brak ciastka o danej nazwie.";
            }
        }

        protected void UsunCiastko_Click(Object sender, EventArgs e)
        {
            if (Request.Cookies["Ciacho"] != null)
            {
                HttpCookie cookie = new HttpCookie("Ciacho");
                cookie.Expires = DateTime.Now.AddYears(-1);
                Response.Cookies.Add(cookie);
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Zad8
{
    public partial class Login : System.Web.UI.Page
    {
        protected void loginButton_Click(object sender, EventArgs e)
        {
            string username = textUsername.Text;
            string password = textPassword.Text;

            if (username == "qwer" && password == "qwer")
            {
                HttpContext.Current.Session["User"] = username;
                Response.Redirect("WebForm1.aspx");
            }
            else
            {
                lblMessage.Text = "Nieprawidłowa nazwa użytkownika lub hasło.";
            }
        }
        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
}
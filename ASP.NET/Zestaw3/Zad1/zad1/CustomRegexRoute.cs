using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace zad1
{
    public class CustomRegexRoute : IHttpHandler
    {
        private string pattern;

        public CustomRegexRoute(string pattern)
        {
            this.pattern = pattern;
        }

        public bool IsReusable
        {
            get { return false; }
        }

        public void ProcessRequest(HttpContext context)
        {
            string requestPath = context.Request.Path;
            Regex regex = new Regex(pattern);

            if (regex.IsMatch(requestPath))
            {
                context.Response.Write("Dopasowano ścieżkę: " + requestPath);
            }
            else
            {
                context.Response.Write("Nie dopasowano ścieżki do wzorca.");
            }
        }
    }
}
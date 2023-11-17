using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1
{
    public class WebFrom1
    {
        public static int GetGlobalCounter()
        {
            int globalCounter = 0;
            if (HttpContext.Current.Application["GlobalCounter"] != null)
            {
                globalCounter = (int)HttpContext.Current.Application["GlobalCounter"];
            }
            return globalCounter;
        }
        public static void IncrementGlobalCounter()
        {
            int globalCounter = GetGlobalCounter();
            globalCounter++;
            HttpContext.Current.Application["GlobalCounter"] = globalCounter;
        }

        public static string GetUsername()
        {
            if (HttpContext.Current.Session["Username"] != null)
            {
                return HttpContext.Current.Session["Username"].ToString();
            }
            return "Brak użytkownika";
        }

        public static void SetUsername(string username)
        {
            HttpContext.Current.Session["Username"] = username;
        }

        //ITEMS
        public static string GetRequestData()
        {
            if (HttpContext.Current.Items["RequestData"] != null)
            {
                return HttpContext.Current.Items["RequestData"].ToString();
            }
            return "Brak danych";
        }

        public static void SetRequestData(string data)
        {
            HttpContext.Current.Items["RequestData"] = data;
        }
    }
}
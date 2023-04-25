using System;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Net.Http;

namespace Zad4q {

    public static class Program {
            public static async Task<string> DownloadStringAsync(this string url) {
                using var httpClient = new HttpClient();
                return await httpClient.GetStringAsync(url);
            }

            public static TaskAwaiter<string> GetAwaiter(this string url) {
                return url.DownloadStringAsync().GetAwaiter();
            }
 
        public static async Task Main(string[] args) {
            Console.WriteLine(await "https://www.google.com");
        }
    }
}
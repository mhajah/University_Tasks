using System;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Zad3 {

    public static class Program {
        /*        internal static TaskAwaiter GetAwaiter(this int milliseconds)
                    => Task.Delay(milliseconds).GetAwaiter();*/

        internal static TaskAwaiter GetAwaiter(this int time) {
            return Task.Delay(time).GetAwaiter();
        }
        public static async Task Main(string[] args) {
            Console.WriteLine("1");
            await 2000;
            Console.WriteLine("1");
        } 
    }
}
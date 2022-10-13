#include <iostream>
#include <math.h>

using namespace std;

/*
Występuje niedomiar (maks. 15 miejsc).
*/

double zad3(int n) {
    double y0 = 1.0;
    double y1 = -1.0/7.0;
    if (n == 0) return y0;
    if (n == 1) return y1;


    double res = 146.0/7.0 * zad3(n - 1) + 3 * zad3(n - 2);
    return res;
}

int main()
{
    for (int i = 0; i < 40; i++ ) {
      cout << i << " . " <<  zad3(i) << endl;
    }
    return 0;
}

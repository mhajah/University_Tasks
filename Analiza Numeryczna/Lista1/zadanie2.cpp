#include <iostream>
#include <math.h>

using namespace std;

/*
Wynik nie jest wiarygodny, ponieważ przy funcji sin(x) występuje zaokrąglenie do części dziesiętnych, setnych, tysięcznych itd.
Powodując od pewnego momentu wyniki dające same zera.
*/

double zad2(double x) { 
    double res = 12132 * (x + cos(M_PI_2 + x)) / pow(x, 3);
    return res;
}

int main() {
    for (int i = 1; i < 21; i++) {
        double pot = pow(10, i * (-1));
        cout << i << ". " << zad2(pot) << " : " << cos(M_PI_2 + pot) << endl;
    }
    return 0; 
}

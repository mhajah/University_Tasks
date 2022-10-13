#include <iostream>
#include <math.h>

using namespace std;

/*
Wynik nie jest wiarygodny, bo występuje niedomiar na x^13 - przy 0,0001 komputer
zaokrągla to do 0, przez co pod pierwiastkiem wychodzi 1, a 1-1=0.
*/

 double zad1(double x) {
    double pot = pow(x, 13);
    double pier = sqrt(pot + 1);
    double res = (4044.0*(pier - 1.0)) / pot;
    return res;
}

int main() {
    cout << zad1(0.001);
    return 0;
}

#include <iostream>
#include <math.h>

using namespace std;

 double zad1(double x) {
    double pot = pow(x, 13);
    double pier = sqrt(pot + 1);
    double res = 4044 * (1/pier + 1);
    return res;
}

int main() {
    cout << zad1(0.001);
    return 0;
}

#include <iostream>
#include <math.h>
#include <iomanip>

using namespace std;



double zad2(double x) { 
    double res = 12132 * ((pow(-x, 3) + 6*x - 6*sin(x)) / (6 * pow(x, 3)));
    return res;
}

int main() {
    cout << setprecision(16); // show 16 digits of precision
    for (int i = 1; i < 21; i++) {
        double pot = pow(10, i * (-1));
        cout << i << ". " << zad2(pot) << " : " << sin(pot) << endl;
    }
    return 0; 
}

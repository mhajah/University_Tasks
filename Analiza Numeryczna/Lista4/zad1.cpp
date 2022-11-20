#include <stdio.h>
#include <iostream>
#include <cmath>

using namespace std;

//2
void stare(float a, float b, float c) {
    float delta = pow(b, 2.0) - 4*a*c;
    float x1, x2;
    x2 = (-b - sqrt(delta))/2.0*a;
    x1 = (-b + sqrt(delta))/2.0*a;

    cout << "x1: " << x1 << endl;
    cout << "x2: " << x2 << endl;

}

void nowe(float a, float b, float c) {
    float delta = pow(b, 2.0) - 4.0*a*c;
    float x1, x2;
    if (b > 0.0) {
        x1 = -2.0*c/b+sqrt(delta);
        x2 = (-b - sqrt(delta))/2.0*a;
    } else {
        x1 = (-b + sqrt(delta))/2.0*a;
        x2 = 2.0*c/(-b + sqrt(delta));
    }
    cout << "x1: " << x1 << endl;
    cout << "x2: " << x2 << endl;
}

int main() {
    //1a
    for (float x = 1.00; x > -5000.00; x -= 100.0) {
        float res =  pow(x + sqrt(pow(x, 2.0) + pow(2022.0, 2.0)), -1.0);
        cout << x << ": " << res << endl;
    }

    //2
    stare(1, 900000, 1);
    nowe(1, 900000, 1);

    return 0;
}
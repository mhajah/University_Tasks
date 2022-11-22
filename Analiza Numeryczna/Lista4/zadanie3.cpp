#include <stdio.h>
#include <iostream>
#include <cmath>
#include <iomanip>

using namespace std;

float f(float x) {
    return x - 0.49;
}

void zad3() {
    float a = 0;
    float b = 1;
    float e = b - a;
    float m;
    for (int i = 1; i <= 5; i++) {
        m = (a+b)/2.0;
        e = e/2;
        if (f(m) > 0.0) {
            b = m;
        } 
        else if (f(m) < 0.0) {
            a = m;
        } else {
            cout << "Znaleziono miejsce zerowe: " << m;
        }

        cout << "[" << a << ", " << b << "]" << ", m = " << m << ", e = " << e << ", |e| = " << 0.49-m << endl;
    }
}

double g(double x) {
    return pow(x, 4) - 6*sin(3*x - 1);
}

void zad4() {
    double eps = pow(10, -8);
    double a = 0;
    double b = 1;
    int i = 0;
    double m;
    if (g(a) > 0 && g(b) < 0) {
        double temp;
        temp = a;
        a = b;
        b = temp;
    }
    while (abs(b-a) > eps && a != b) {
        m = (a+b)/2.0;
        if (g(m) > 0.0) {
            b = m;
        } 
        else if (g(m) < 0.0) {
            a = m;
        } else {
            cout << "Znaleziono miejsce zerowe: " << m;
        }
        cout << setprecision(10) << i << ". [" << a << ", " << b << "]" << ", m = " << m << ", g(x) =" << g(m) << endl;
        i = i+1;
    }
}

void zad6() {
    double R = 3;
    double x = 0.34;
    while((abs(1.0/sqrt(R) - x)) > 1.0e-8) {
        x = 0.5*x*(3-R*x*x);
        cout << x << endl;
    }
}

void zad7() {
    double R = 3;
    double x = 2;
    while((abs(sqrt(x) - x)) > 1.0e-8) {
        x = 0.5*(x+(R/x));
        cout << x << endl;
    }
}

void zad5() {
    double R = 6;
    double x = 0.2;
    for (int i = 0; i < 10; i++) {
        x = x*(2-x*R);
        cout << x << endl;
    }
}


int main() {
    zad5();

    return 0;
}
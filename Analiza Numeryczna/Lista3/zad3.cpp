#include <bits/stdc++.h>
#include <math.h>
#include <iomanip>

using namespace std;

float a(float x) {
    return ((float)4.0 * (float)pow(cos(x), 2)) - (float)3.0;
}

float b(float x) {
    return (float)(cos(3*x))/(float)(cos(x));
}

int main() {
    float x = -10.0;
    cout << setprecision(7);
    for (int i = 1; i < 43; i += 2) {
        cout << right << a(pow(x,i)) << setw(30) << b(pow(x, i));
    }
}
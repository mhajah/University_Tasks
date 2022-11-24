#include <bits/stdc++.h>
#include <math.h>
#include <iomanip>

using namespace std;

float a(float x) {
    return pow(x + sqrt(pow(x, 2) + pow(2022, 2)), -1);
}

float b(float x) {
    if (x < 0.0) {
        return (sqrt(pow(x, 2) +pow(2022, 2)) - x)/pow(2022,2);
    }
    return pow(x + sqrt(pow(x, 2) + pow(2022, 2)), -1);
}

int main() {
    float x = -10.0;
    cout << setprecision(7);
    for (int i = 1; i < 43; i += 2) {
        cout << right << a(pow(x,i)) << setw(30) << b(pow(x, i));
    }
}
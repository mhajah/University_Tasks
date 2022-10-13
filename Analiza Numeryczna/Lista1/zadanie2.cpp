#include <iostream>
#include <math.h>

using namespace std;

/*
Wynik nie jest wiarygodny, ponieważ przy funcji sin(x) występuje zaokrąglenie do części dziesiętnych, setnych, tysięcznych itd.
Powodując od pewnego momentu wyniki dające same zera.
*/

float zad2(float x) { 
    float res = 12132 * ((x - sin(x)) / pow(x, 3));
    return res;
}

int main() {
    zad2
    for (int i = 1; i < 21; i++) {
        float pot = pow(10, i * (-1));
        cout << i << ". " << zad2(pot) << " : " << sin(pot) << endl;
    }
    return 0; 
}

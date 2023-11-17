package obliczenia;

public abstract class Wyrazenie implements Obliczalny {

    public static double suma(Wyrazenie... wyr) {
        double suma = 0;
        for (Wyrazenie wyrazenie : wyr) {
            suma += wyrazenie.oblicz();
        }
        return suma;
    }

    public static double iloczyn(Wyrazenie... wyr) {
        double iloczyn = 1;
        for (Wyrazenie wyrazenie : wyr) {
            iloczyn *= wyrazenie.oblicz();
        }
        return iloczyn;
    }
}

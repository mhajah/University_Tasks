import obliczenia.Wymierna;

public class Tests {
    public static void WymiarnaTests() {
        Wymierna x = new Wymierna(3, 4);
        Wymierna y = new Wymierna(2, 2);

        System.out.println("x = " + x);
        System.out.println("y = " + y);

        System.out.println("x + y = " + Wymierna.dodaj(x, y));
        System.out.println("x - y = " + Wymierna.odejmij(x, y));
        System.out.println("x * y = " + Wymierna.pomnoz(x, y));

        try {
            System.out.println("x / y = " + Wymierna.podziel(x, y));
        } catch (ArithmeticException e) {
            System.out.println("Dzielenie przez 0!");
        }
    }
}

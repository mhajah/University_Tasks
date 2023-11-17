import struktury.*;
import obliczenia.*;

public class Testy {
    public static void test1() {
        Wyrazenie z1 = new Zmienna("x");
        Zmienna.ustawWartosc("x", 1.618);

        Wyrazenie w = new Dodawanie(
                new Odejmowanie(
                        new Stala(5),
                        new Stala(2)
                ),
                new Mnozenie(
                        new Dodawanie(new Stala(4), new Stala(6)),
                        new Stala(5)
                )
        );

        Wyrazenie w2 = new Sinus(new Stala(90));
        Wyrazenie w3 = new Odwrotnosc(w);
        Wyrazenie w4 = new Logarytm(
                new Stala(10),
                new Stala(100)
        );

        System.out.println(w.toString());
        System.out.println(w.oblicz());
        System.out.println(w2.oblicz());
        System.out.println(w3.toString());
        System.out.println(w3.oblicz());

        System.out.println(w4.toString());
        System.out.println(w4.oblicz());

        System.out.println(z1.toString());
        System.out.println(z1.oblicz());
        Zmienna.ustawWartosc("x", 40);
        System.out.println(z1.oblicz());
    }

    public static void test2() {
        Wyrazenie w = new Mnozenie(
                new Dodawanie(
                        new Stala(7),
                        new Stala(5)
                ),
                new Odejmowanie(
                        new Stala(3),
                        new Stala(1)
                )
        );
        System.out.println(w.toString());
        System.out.println(w.oblicz());
    }

    public static void test3() {
        Wyrazenie w = new ZmianaZnaku(
                new Mnozenie(
                        new Odejmowanie(
                                new Stala(2),
                                new Zmienna("x")
                        ),
                        Stala.PI
                )
        );
        Zmienna.ustawWartosc("x", 1.618);
        System.out.println(w.toString());
        System.out.println(w.oblicz());
    }

    public static void test4() {
        Wyrazenie w = new Sinus(
                new Mnozenie(
                        new Dodawanie(
                                new Zmienna("x"),
                                new Liczba(13)
                        ),
                        new Dzielenie(
                                Stala.PI,
                                new Odejmowanie(
                                        new Liczba(1),
                                        new Zmienna("x")
                                )
                        )
                )
        );
        System.out.println(w.toString());
        System.out.println(w.oblicz());
    }
    public static void test5() {
        Wyrazenie w = new Dodawanie(
                new Exp(new Liczba( 5)),
                new Mnozenie(
                        new Zmienna("x"),
                        new Logarytm(Stala.E, new Zmienna("x"))
                )
        );
        System.out.println(w.toString());
        System.out.println(w.oblicz());
    }
}

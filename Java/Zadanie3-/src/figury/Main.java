package figury;

public class Main {
    public static void main(String[] args) throws IllegalArgumentException {
        System.out.println("===> Wypisanie punktów <===");
        Punkt a = new Punkt(1, 2);
        Punkt b = new Punkt(1, 2);
        Punkt c = new Punkt();
        Punkt d = new Punkt(0, 5);
        Punkt e = new Punkt(0, -9);
        System.out.println("Punkt a:" + a.toString());
        System.out.println("Punkt b:" + b.toString());
        System.out.println("Punkt c:" + c.toString());
        System.out.println("Punkt d:" + d.toString());
        System.out.println("Punkt e:" + e.toString());

        System.out.println("\n===> Wypisanie wektorów <===");
        Wektor v = new Wektor(-4, 3);
        Wektor w = new Wektor(3, 7);
        System.out.println("Punkt v: " + v.toString());
        System.out.println("Punkt w: " + w.toString());

        /* wyjatek -> wspolliniowe! */
        //Trojkat T1 = new Trojkat(c, d, e);

        /* wyjatek -> Punkty nie sa rozne! */
        //Trojkat T2 = new Trojkat(a, b, c);

        /* wyjatek -> Punkty nie sa rozne! */
        //Odcinek O1 = new Odcinek(a, b);

        System.out.println("\n===> Testowanie prostych <===");
        Prosta k = new Prosta(1.0, 5.0, 3.0);
        Prosta l = new Prosta(1.0, 2.0, 5.0);
        Prosta m = new Prosta(11.0, 3.0, -1.0);
        System.out.println("k: " + k.toString());
        System.out.println("l: " + l.toString());
        System.out.println("m: " + m.toString());

        if (figury.Prosta.czyRownolegle(k, l)) System.out.println("Proste k i l są równoległe.");
        Punkt x = figury.Prosta.punktPrzecieciaProstych(k, m);
        System.out.println("Punkt przecięcia prostych k i m: " + x.toString());

        System.out.println("\n===> Testowanie trójkątów <===");
        Trojkat T3 = new Trojkat(d, e, a);
        System.out.println(T3.toString());

        System.out.println("... przesunięcie trójkąta o wektor w");
        T3.przesun(w);
        System.out.println(T3.toString());

        System.out.println("... obrócenie trójkąta względem punktu (0, 0) o 180 stopni");
        T3.obroc(c, 180);
        System.out.println(T3.toString());

        System.out.println("... odbicie trójkąta względem prostej k");
        T3.odbij(k);
        System.out.println(T3.toString());

        System.out.println("\n===> Testowanie odcinków <===");
        Odcinek O1 = new Odcinek(c, b);
        System.out.println(O1.toString());

        System.out.println("... przesunięcie odcinka o wektor v");
        O1.przesun(v);
        System.out.println(O1.toString());

        System.out.println("... odbicie odcinka względem prostej l");
        O1.odbij(l);
        System.out.println(O1.toString());

        System.out.println("... obrócenie odcinka względem punktu (0, 0) o 180 stopni");
        O1.obroc(c, 180);
        System.out.println(O1.toString());


    }
}
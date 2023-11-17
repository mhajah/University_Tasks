package figury;

public class Trojkat {
    Punkt p1, p2, p3;

    // Constructor
    public Trojkat(Punkt p1, Punkt p2, Punkt p3) throws IllegalArgumentException {
        // czy punkty sa rozne?
        if (p1.equals(p2) || p2.equals(p3) || p1.equals(p3))
            throw new IllegalArgumentException("Przynajmniej 2 te same punkty!");

        // czy punkty sa wspolliniowe?
        if ( figury.Punkt.czyPunktyWspolliniowe(p1, p2, p3) )
            throw new IllegalArgumentException("Punkty sa wspolliniowe!");

        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }

    public void przesun(Wektor v) {
        this.p1.przesun(v);
        this.p2.przesun(v);
        this.p3.przesun(v);
    }
    public void obroc(Punkt p, double kat) {
        this.p1.obroc(p, kat);
        this.p2.obroc(p, kat);
        this.p3.obroc(p, kat);
    }
    public void odbij(Prosta p) {
        this.p1.odbij(p);
        this.p2.odbij(p);
        this.p3.odbij(p);
    }

    @Override
    public String toString() {
        return "TRÓJKĄT: " + p1.toString() + ", " + p2.toString() + ", " + p3.toString();
    }
}

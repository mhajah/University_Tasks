package figury;

public class Odcinek {
    Punkt p1, p2;

    public Odcinek(Punkt p1, Punkt p2) throws IllegalArgumentException {
        if ( !figury.Punkt.czyRoznePunkty(p1, p2) ) throw new IllegalArgumentException("Punkty nie sa rozne!");
        this.p1 = p1;
        this.p2 = p2;
    }

    public void przesun(Wektor v) {
        this.p1.przesun(v);
        this.p2.przesun(v);
    }

    public void obroc(Punkt p, double kat) {
        this.p1.obroc(p, kat);
        this.p2.obroc(p, kat);
    }

    public void odbij(Prosta p) {
        this.p1.odbij(p);
        this.p2.odbij(p);
    }

    @Override
    public String toString() {
        return "ODCINEK: " + p1.toString() + " - " + p2.toString();
    }
}

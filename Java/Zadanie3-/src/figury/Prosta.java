package figury;

public class Prosta {
    public final double A, B, C;

    public Prosta(double A, double B, double C) {
        if (A == 0 && B == 0) throw new IllegalArgumentException("A i B są równe 0, to nie jest prosta.");
        this.A = A;
        this.B = B;
        this.C = C;
    }

    public static boolean czyRownolegle(Prosta k, Prosta l) {
        return (k.A == l.A);
    }

    public static boolean czyProstopadle(Prosta k, Prosta l) {
        return (k.A * l.A == -1);
    }

    public static Prosta przesunProsta(Prosta k, Wektor v) {
        return new Prosta(k.A, k.B, (k.A + v.dy - k.A * v.dx));
    }

    public static Punkt punktPrzecieciaProstych(Prosta k, Prosta l) {
        if(czyRownolegle(k, l)) throw new IllegalArgumentException("Proste rownolegle");

        double wyznacznik = k.A * l.B - k.B * l.A;
        double x = (k.C * l.B - l.C * k.B) / wyznacznik;
        double y = (k.A * l.C - l.A * k.C) / wyznacznik;

        return new Punkt(x, y);
    }

    @Override
    public String toString() {
        return "PROSTA: " + this.A + "x + " + this.B + "y + " + this.C;
    }
}

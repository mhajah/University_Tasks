package obliczenia;

public class Stala extends Operand {
    public static final Stala PI = new Stala(Math.PI);
    public static final Stala E = new Stala(Math.E);

    private final double wartosc;

    public Stala(double wartosc) {
        this.wartosc = wartosc;
    }

    @Override
    public double oblicz() {
        return wartosc;
    }

    @Override
    public String toString() {
        if (this.equals(PI)) {
            return "π";
        } else if (this.equals(E)) {
            return "e";
        } else {
            return String.valueOf(wartosc);
        }
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Stala stala = (Stala) obj;
        return Double.compare(stala.wartosc, wartosc) == 0;
    }
}

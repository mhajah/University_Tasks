package obliczenia;

public class Liczba extends Operand {
    private final double wartosc;

    public Liczba(double wartosc) {
        this.wartosc = wartosc;
    }

    @Override
    public double oblicz() {
        return wartosc;
    }

    @Override
    public String toString() {
        return String.valueOf(wartosc);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Liczba liczba = (Liczba) obj;
        return Double.compare(liczba.wartosc, wartosc) == 0;
    }
}

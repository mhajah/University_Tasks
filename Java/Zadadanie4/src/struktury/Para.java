package struktury;
import java.util.Objects;

public class Para implements Cloneable, Comparable<Para> {
    public final String klucz;
    private double wartosc;

    public Para(String klucz, double wartosc) {
        this.klucz = klucz;
        this.wartosc = wartosc;
    }

    public double getWartosc() {
        return this.wartosc;
    }

    public void setWartosc(double d) {
        this.wartosc = d;
    }

    @Override
    public String toString() {
        return ("klucz= " + this.klucz + ", wartosc=" + this.getWartosc());
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (this == obj) {
            return true;
        }
        if (this.getClass() != obj.getClass()) {
            return false;
        }
        return this.klucz.equals(((Para) obj).klucz);
    }

    @Override
    public int compareTo(Para p) {
        // Porównywanie wartości dla sortowania (rosnąco)
        return Double.compare(this.wartosc, p.wartosc);
    }

    @Override
    public Para clone() {
        try {
            return (Para) super.clone();
        } catch (CloneNotSupportedException e) {
            // Obsługa błędu klonowania
            e.printStackTrace();
            return null;
        }
    }
}

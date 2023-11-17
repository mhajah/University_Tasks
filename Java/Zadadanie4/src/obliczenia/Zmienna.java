package obliczenia;

import struktury.*;

public class Zmienna extends Operand {
    private static final ZbiorTablicowy zbiorZmiennych = new ZbiorTablicowy(10);
    private final String identyfikator;

    public Zmienna(String identyfikator) {
        this.identyfikator = identyfikator;
        Para para = zbiorZmiennych.szukaj(identyfikator);
        if (para == null) {
            zbiorZmiennych.wstaw(new Para(identyfikator, 0.0));
        }
    }

    public static void ustawWartosc(String identyfikator, double wartosc) {
        Para para = zbiorZmiennych.szukaj(identyfikator);
        if (para != null) {
            para.setWartosc(wartosc);
        }
    }

    @Override
    public double oblicz() {
        Para para = zbiorZmiennych.szukaj(identyfikator);
        if (para != null) {
            return para.getWartosc();
        } else {
            throw new IllegalArgumentException("Zmienna o identyfikatorze " + identyfikator + " nie została zdefiniowana.");
        }
    }

    @Override
    public String toString() {
        return identyfikator;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Zmienna zmienna = (Zmienna) obj;
        return identyfikator.equals(zmienna.identyfikator);
    }
}

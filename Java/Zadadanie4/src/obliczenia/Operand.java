package obliczenia;
import struktury.*;

public abstract class Operand extends Wyrazenie {
    @Override
    public double oblicz() {
        throw new UnsupportedOperationException("Metoda oblicz() musi być zaimplementowana w klasach dziedziczących.");
    }

    @Override
    public String toString() {
        throw new UnsupportedOperationException("Metoda toString() musi być zaimplementowana w klasach dziedziczących.");
    }
}


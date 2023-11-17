package obliczenia;

public class Fun1 extends Dzialanie {
    public Fun1(Wyrazenie operand) {
        super(operand, null);
    }

    @Override
    public double oblicz() {
        throw new UnsupportedOperationException("Metoda oblicz() musi być zaimplementowana w klasach dziedziczących.");
    }

    @Override
    public String toString() {
        throw new UnsupportedOperationException("Metoda toString() musi być zaimplementowana w klasach dziedziczących.");
    }
}

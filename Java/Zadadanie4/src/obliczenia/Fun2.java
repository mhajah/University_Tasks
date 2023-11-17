package obliczenia;

public class Fun2 extends Fun1 {
    protected final Wyrazenie operand2;

    public Fun2(Wyrazenie operand1, Wyrazenie operand2) {
        super(operand1);
        this.operand2 = operand2;
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
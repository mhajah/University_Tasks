package obliczenia;

public class Oper2 extends Oper1 {
    protected final Wyrazenie operand2;

    public Oper2(Wyrazenie operand1, Wyrazenie operand2) {
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

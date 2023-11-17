package obliczenia;

public class Dzialanie extends Wyrazenie {
    protected final Wyrazenie operand1;
    protected final Wyrazenie operand2;

    public Dzialanie(Wyrazenie operand1, Wyrazenie operand2) {
        this.operand1 = operand1;
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
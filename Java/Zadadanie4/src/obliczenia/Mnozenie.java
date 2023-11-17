package obliczenia;

public class Mnozenie extends Oper2 {
    public Mnozenie(Wyrazenie operand1, Wyrazenie operand2) {
        super(operand1, operand2);
    }

    @Override
    public double oblicz() {
        return operand1.oblicz() * operand2.oblicz();
    }

    @Override
    public String toString() {
        return "(" + operand1 + " * " + operand2 + ")";
    }
}

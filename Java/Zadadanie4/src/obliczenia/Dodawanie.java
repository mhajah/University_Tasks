package obliczenia;

public class Dodawanie extends Oper2 {
    public Dodawanie(Wyrazenie operand1, Wyrazenie operand2) {
        super(operand1, operand2);
    }

    @Override
    public double oblicz() {
        return operand1.oblicz() + operand2.oblicz();
    }

    @Override
    public String toString() {
        return "(" + operand1 + " + " + operand2 + ")";
    }
}

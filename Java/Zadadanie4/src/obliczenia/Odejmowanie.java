package obliczenia;

public class Odejmowanie extends Oper2 {
    public Odejmowanie(Operand operand1, Operand operand2) {
        super(operand1, operand2);
    }

    @Override
    public double oblicz() {
        return operand1.oblicz() - operand2.oblicz();
    }

    @Override
    public String toString() {
        return "(" + operand1 + " - " + operand2 + ")";
    }
}

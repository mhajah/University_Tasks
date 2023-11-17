package obliczenia;

public class Exp extends Fun1 {
    public Exp(Wyrazenie x) {
        super(x);
    }

    @Override
    public double oblicz() {
        return Math.exp(operand1.oblicz());
    }

    @Override
    public String toString() {
        return "exp(" + operand1 + ")";
    }
}

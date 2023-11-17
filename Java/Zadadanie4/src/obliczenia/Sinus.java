package obliczenia;

public class Sinus extends Fun1 {

    public Sinus(Wyrazenie operand1) {
        super(operand1);
    }

    @Override
    public double oblicz() {
        return Math.sin(Math.toRadians(operand1.oblicz()));
    }

    @Override
    public String toString() {
        return "sin(" + operand1 + ")";
    }
}

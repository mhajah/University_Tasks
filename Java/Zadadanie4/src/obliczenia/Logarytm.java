package obliczenia;

public class Logarytm extends Fun2 {
    public Logarytm(Wyrazenie base, Wyrazenie x) {
        super(base, x);
    }

    @Override
    public double oblicz() {
        double podstawa = operand1.oblicz();
        double argument = operand2.oblicz();

        if (podstawa <= 0 || podstawa == 1 || argument <= 0) {
            throw new ArithmeticException("Logarytm nie jest określony dla tych argumentów.");
        }

        return Math.log(argument) / Math.log(podstawa);
    }

    @Override
    public String toString() {
        return "log_" + operand1 + "(" + operand2 + ")";
    }
}
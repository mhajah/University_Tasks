package obliczenia;

public class Odwrotnosc extends Oper1 {
    public Odwrotnosc(Wyrazenie operand) {
        super(operand);
    }

    @Override
    public double oblicz() {
        double dzielnik = operand1.oblicz();
        if (dzielnik == 0) {
            throw new ArithmeticException("Dzielenie przez zero.");
        }
        return 1 / dzielnik;
    }

    @Override
    public String toString() {
        return "(1/" + operand1 + ")";
    }
}
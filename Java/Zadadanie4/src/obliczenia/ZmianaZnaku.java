package obliczenia;

public class ZmianaZnaku extends Oper1 {
    private final Wyrazenie operand;

    public ZmianaZnaku(Wyrazenie operand) {
        super(operand);
        this.operand = operand;
    }

    @Override
    public double oblicz() {
        return -operand.oblicz();
    }

    @Override
    public String toString() {
        return "-" + operand;
    }
}

package figury;

public final class Wektor {
    public final double dx, dy;

    public Wektor(double dx, double dy) {
        this.dx = dx;
        this.dy = dy;
    }

    public static Wektor zlozWektory(Wektor w1, Wektor w2) {
        return new Wektor(w1.dx + w2.dx, w1.dx + w2.dy);
    }

    @Override
    public String toString() {
        return "["+this.dx+", "+this.dy+"]";
    }
}

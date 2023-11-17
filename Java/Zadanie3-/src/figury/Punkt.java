package figury;

public class Punkt {
    private double x, y;

    // Constructors
    public Punkt(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public Punkt() {
        this.x = 0;
        this.y = 0;
    }

    public static boolean czyPunktyWspolliniowe(Punkt p1, Punkt p2, Punkt p3) {
        // Wyznacznik: (Ax * (By - Cy)) + (Bx * (Cy - Ay)) + (Cx * (Ay - By)), jeżeli wyznacznik == 0, to punkty leza na 1 linii
        double wyznacznik = p1.x * (p2.y - p3.y) + p2.x * (p3.y - p1.y) + p3.x * (p1.y - p2.y);
        return (wyznacznik == 0);
    }

    public void przesun(Wektor v) {
        this.x = this.x += v.dx;
        this.y = this.y += v.dy;
    }

    public void obroc(Punkt p, double kat) {
        double deltaX = this.x - p.x;
        double deltaY = this.y - p.y;
        this.x = deltaX * Math.cos(kat*(Math.PI/180)) + deltaY * Math.sin(kat*(Math.PI/180)) + p.x;
        this.y  = deltaX * Math.sin(kat*(Math.PI/180)) + deltaY * Math.cos(kat*(Math.PI/180)) - p.y;
    }

    public void odbij(Prosta p) {
        double d = (p.A * this.x + p.B * this.y + p.C) / (p.A * p.A + p.B * p.B);
        this.x = this.x - 2 * p.A * d;
        this.y = this.y - 2 * p.B * d;
    }

    @Override
    public String toString() {
        return "("+this.x+", "+this.y+")";
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Punkt other = (Punkt) obj;
        if (Double.doubleToLongBits(x) != Double.doubleToLongBits(other.x))
            return false;
        if (Double.doubleToLongBits(y) != Double.doubleToLongBits(other.y))
            return false;
        return true;
    }
}

package rozgrywka;
import obliczenia.Wymierna;

public class Gra {
    public int zakres;
    public Wymierna liczba;
    public int maksIloscProb;
    public int licznikProb;
    public boolean czyOdgadniete;
    public String komunikat;

    public void start(int z) {
        if (z < 5 || z > 20) throw new IllegalArgumentException("Zakres musi być z przedziału [5, 20]");
        zakres = z;
        int licz, mian;
        do {
            licz = (int) (Math.random() * zakres) + 1;
            mian = (int) (Math.random() * zakres) + 1;
        } while (licz >= mian);

        liczba = new Wymierna(licz, mian);
        maksIloscProb = (int) Math.ceil(3 * Math.log(zakres));
        licznikProb = 0;
        czyOdgadniete = false;

        assert 0 < liczba.getLicznik() && liczba.getLicznik() < liczba.getMianownik();
        System.out.println("Gra rozpoczęta! Maksymalna libcza prób: " + maksIloscProb);
        komunikat = "Gra rozpoczęta! Maksymalna libcza prób: " + maksIloscProb;
    }

    public void sprawdzPropozycje(Wymierna propozycja) {
        if (czyOdgadniete || licznikProb >= maksIloscProb) {
            komunikat = "Gra zakończona";
            throw new IllegalStateException("Gra zakończona");
        }

        licznikProb++;

        if (propozycja.equals(liczba)) {
            czyOdgadniete = true;
            System.out.println("Zgadza się! Wygrałeś!");
            komunikat = "Zgadza się, wygrałeś!";
            return ;
        } else if (propozycja.compareTo(liczba) < 0) {
            komunikat = "Za mało. Liczba prób: " + licznikProb;
            System.out.println("Za mało. Liczba prób: " + licznikProb);
        } else {
            komunikat = "Za dużo. Liczba prób: " + licznikProb;
            System.out.println("Za dużo. Liczba prób: " + licznikProb);
        }

        if (licznikProb == maksIloscProb) {
            System.out.println("Przegrałeś. Przekroczono maksymalną liczbę prób.");
            komunikat = "Przekroczono liczbę prób. Przegrałeś.";
        }
    }
}

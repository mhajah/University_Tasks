import static java.lang.Math.abs;
import static java.lang.Math.log;

public class LiczbyPierwsze {
    private final static int POTEGA2 = 21;
    private final static int MAKS=1<<POTEGA2;
    private final static int[] SITO = new int[MAKS];

    static {
        //Zainicjalizowanie SITA zerami
        for (int i=1; i < MAKS; i++) {
            SITO[i] = 0;
        }
        //WSZYSTKIE PARZYSTE NA =2
        for (int i=4; i < MAKS; i+=2) {
            SITO[i] = 2;
        }
        for (int i=3; i < MAKS; i+=1) {
            if (SITO[i] == 0) {
                for (int j=i; j < MAKS; j+=i) {
                    if (SITO[j]==0)
                        SITO[j] = i;
                }
            }
        }


    }

    public static boolean czyPierwsza(long x) {
        if (x<1) {
            return false;
        }

        if (x<MAKS) {
            return SITO[(int)x]==x;
        }
        else {
            if (x%2==0) {
                return false;
            }
            if (x%3==0) {
                return false;
            }
            //Sprawdzanie reszt z dzielenia przez liczby w postaci 6k +- 1
            for (long i = 5; i * i <= x; i += 6) {
                if (x % i == 0 || x % (i + 2) == 0) {
                    return false;
                }
            }
            //Zaden warunek nie jest spelniony, to liczba uznajemy za liczbe pierwsza
            return true;
        }
    }

    public static long[] naCzynnikiPierwsze(long x){

        // Największa potęga dwójki, która mieści się w liczbie
        int p = (int)(log(abs(x)) / log(2));
        // oczywiście nie możemy rozłożyć liczbę na więcej czynników niż p
        long[] primes = new long[p];
        int n = 0;

        if(x == 1 || x == 0 || x == -1){
            primes[0] = x;
            return primes;
        }

        if (x < 0){
            primes[0] =- 1;
            x *= -1;
            n = 1;
        }

        if (x < MAKS){
            while(x > 1){
                primes[n] = SITO[(int)x];
                x/=SITO[(int)x];
                n++;
            }
            return primes;
        }


        while (x%2==0) {
            primes[n]=2;
            x/=2;
            n++;
        }

        while (x%3==0){
            primes[n]= 3;
            x/=3;
            n++;
        }

        for (long i=5;i*i<=x;i+=6) {
            if (czyPierwsza(i) && x % i == 0) {
                primes[n]=i;
                x/=i;
                n++;
            }
            if (czyPierwsza(i + 2) && x % (i + 2) == 0) {
                primes[n]=i+2;
                x/=(i+2);
                n++;
            }
        }


        if (x>1) primes[n]=x;

        return primes;

    }


    public static void main(String[] args) {
        if (args.length == 0) {
            System.err.println("Brak argumentów wywołania. Podaj liczby do rozkładu.");
            return;
        }

        for (String arg : args) {
            long liczba = Long.parseLong(arg);
            System.out.print(liczba + " = ");
            long[] czynniki = naCzynnikiPierwsze(liczba);
            int n = 0;
            while (czynniki[n] != 0) {
                if (n > 0) {
                    System.out.print(" * ");
                }
                System.out.print(czynniki[n]);
                n++;
            }
            System.out.println();
        }
    }
}
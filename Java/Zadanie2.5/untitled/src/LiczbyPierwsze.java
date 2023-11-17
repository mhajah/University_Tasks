import java.util.Arrays;
import java.util.Vector;
import static java.lang.Math.sqrt;
import static java.lang.Math.floor;

public class LiczbyPierwsze {
    private final static int POTEGA2 = 21;
    private final static int MAKS=1<<POTEGA2;
    private final static int[] SITO = new int[MAKS];
    private final static Vector<Integer> prime = new Vector<>();

    static {

        // This method finds all primes smaller than 'limit'
        // using simple sieve of eratosthenes. It also stores
        // found primes in vector prime[]
            // Create a boolean array "mark[0..n-1]" and initialize
            // all entries of it as true. A value in mark[p] will
            // finally be false if 'p' is Not a prime, else true.
            boolean mark[] = new boolean[MAKS+1];

            for (int i = 0; i < mark.length; i++)
                mark[i] = true;

            for (int p=2; p*p<MAKS; p++)
            {
                // If p is not changed, then it is a prime
                if (mark[p] == true)
                {
                    // Update all multiples of p
                    for (int i=p*p; i<MAKS; i+=p)
                        mark[i] = false;
                }
            }

            // Print all prime numbers and store them in prime
            for (int p=2; p<MAKS; p++)
            {
                if (mark[p] == true)
                {
                    prime.add(p);
                    System.out.print(p + "  ");
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

        // Divide the range [0..n-1] in different segments
        // We have chosen segment size as sqrt(n).
        long low  = MAKS;
        long high = 2*MAKS;

        // While all segments of range [0..n-1] are not processed,
        // process one segment at a time
        while (low < x)
        {
            if (high >= x)
                high = x;

            // To mark primes in current range. A value in mark[i]
            // will finally be false if 'i-low' is Not a prime,
            // else true.
            boolean mark[] = new boolean[MAKS+1];

            for (int i = 0; i < mark.length; i++)
                mark[i] = true;

            // Use the found primes by simpleSieve() to find
            // primes in current range
            for (int i = 0; i < prime.size(); i++)
            {
                // Find the minimum number in [low..high] that is
                // a multiple of prime.get(i) (divisible by prime.get(i))
                // For example, if low is 31 and prime.get(i) is 3,
                // we start with 33.
                int loLim = (int) (floor(low/prime.get(i)) * prime.get(i));
                if (loLim < low)
                    loLim += prime.get(i);

                /*  Mark multiples of prime.get(i) in [low..high]:
                    We are marking j - low for j, i.e. each number
                    in range [low, high] is mapped to [0, high-low]
                    so if range is [50, 100]  marking 50 corresponds
                    to marking 0, marking 51 corresponds to 1 and
                    so on. In this way we need to allocate space only
                    for range  */
                for (int j=loLim; j<high; j+=prime.get(i))
                    mark[j-low] = false;
            }

            // Numbers which are not marked as false are prime
            for (int i = low; i<high; i++)
                if (mark[i - low] == true)
                    System.out.print(i + "  ");

            // Update low and high for next segment
            low  = low + MAKS;
            high = high + MAKS;
        }

    }


    public static void main(String args[])
    {
        int n = 100;
        System.out.println("Primes smaller than " + n + ":");
        naCzynnikiPierwsze(n);
    }
}
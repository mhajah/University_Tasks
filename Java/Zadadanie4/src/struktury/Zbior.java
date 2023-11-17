package struktury;
import java.util.ArrayList;
import java.util.List;

public interface Zbior {

    Para szukaj(String k);

    void wstaw(Para p);

    void usun(String k);

    void czysc();

    int ile();
}

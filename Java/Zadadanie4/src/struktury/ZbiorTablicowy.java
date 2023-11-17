package struktury;

import java.util.Arrays;

public class ZbiorTablicowy implements Zbior, Cloneable {
    private Para[] zbior;
    private int zapelnienie;
    
    public ZbiorTablicowy(int rozmiar) {
        this.zbior = new Para[rozmiar];
        this.zapelnienie = 0;
    }

    @Override
    public Para szukaj(String k) {
        for (Para para : zbior) {
            if (para != null && para.klucz.equals(k)) {
                return para;
            }
        }
        return null;
    }

    @Override
    public void wstaw(Para p) {
        if (zapelnienie == zbior.length) {
            throw new IllegalStateException("zbior jest już całkowicie zapełniony.");
        }

        Para istniejacaPara = szukaj(p.klucz);
        if (istniejacaPara != null) {
            // Para o podanym kluczu już istnieje, aktualizuj wartość
            istniejacaPara.setWartosc(p.getWartosc());
        } else {
            // Dodaj nową parę do zbioru na pierwsze wolne miejsce
            zbior[zapelnienie++] = p;
        }
    }

    @Override
    public void usun(String k) {
        for (int i = 0; i < zbior.length; i++) {
            if (zbior[i] != null && zbior[i].klucz.equals(k)) {
                zbior[i] = null;
                zapelnienie--;
                break; // Znaleziono i usunięto, więc przerwij pętlę
            }
        }
    }

    @Override
    public void czysc() {
        Arrays.fill(zbior, null);
        zapelnienie = 0;
    }

    @Override
    public int ile() {
        return zapelnienie;
    }

    @Override
    public ZbiorTablicowy clone() {
        try {
            ZbiorTablicowy klon = (ZbiorTablicowy) super.clone();
            klon.zbior = Arrays.copyOf(this.zbior, this.zbior.length);
            return klon;
        } catch (CloneNotSupportedException e) {
            // Obsługa błędu klonowania
            e.printStackTrace();
            return null;
        }
    }
}

package plansza;

import narzedzia.WersjaGry;
import narzedzia.RodzajRuchu;
import plansza.Samotnik;

public class Board {
    private WersjaGry wersja;
    private boolean[][] wolne;
    private boolean[][] oznaczone;
    private int numberOfCounters;
    private RodzajRuchu turn;
    private int X;
    private int Y;

    public Board(WersjaGry version) {
        setup(version);
    }

    public void setup(WersjaGry wersja) {
        this.wersja = wersja;
        oznaczone = wersja.getBoard();
        wolne = wersja.getBoard();
        numberOfCounters = wersja.getNumberOfCounter();

        oznaczone[wersja.getStartX()][wersja.getStartY()] = false;
        turn = RodzajRuchu.MOVEMENT;
        X = wersja.getStartX();
        Y = wersja.getStartY();
    }

    public void select() {
        if (turn == RodzajRuchu.SELECTION) {
            turn = RodzajRuchu.MOVEMENT;
        } else if (czyOznaczone(X, Y)) {
            turn = RodzajRuchu.SELECTION;
        } else {
            turn = RodzajRuchu.MOVEMENT;
        }
    }

    public void ruch(int x, int y, boolean keyboard) {
        switch (turn) {
            case MOVEMENT:
                if (czyDostepne(x, y)) {
                    Y = y;
                    X = x;
                }
                break;
            case SELECTION:
                if (keyboard) {
                    x = x + (x - X);
                    y = y + (y - Y);
                }
                if ((Math.abs(x - X) == 2 && y == Y || Math.abs(y - Y) == 2 && x == X) && czyWolne(x, y) && czyOznaczone((x + X) / 2, (y + Y) / 2) && czyOznaczone(X, Y)) {
                    oznaczone[(X + x) / 2][(Y + y) / 2] = false;
                    oznaczone[x][y] = true;
                    oznaczone[X][Y] = false;
                    numberOfCounters--;
                    Y = y;
                    X = x;
                }
                turn = RodzajRuchu.MOVEMENT;
                break;
        }
    }


    public boolean sprawdzRuch() {
        for (int i = 0; i < wersja.getRows(); i++)
            for (int j = 0; j < wersja.getStartY(); j++) {
                if (SprawdzRuchGora(i, j) || sprawdzRuchPrawo(i, j) || SprawdzRuchDol(i, j) ||  sprawdzRuchLewo(i, j))
                    return true;
            }
        return false;
    }

    private boolean sprawdzRuchLewo(int x, int y) {
        return czyWolne(x, y) && czyOznaczone(x, y + 1) && czyOznaczone(x, y + 2);
    }

    private boolean sprawdzRuchPrawo(int x, int y) {
        return czyOznaczone(x, y) && czyOznaczone(x, y + 1) && czyWolne(x, y + 2);
    }

    private boolean SprawdzRuchGora(int x, int y) {
        return czyWolne(x, y) && czyOznaczone(x + 1, y) && czyOznaczone(x + 2, y);
    }

    private boolean SprawdzRuchDol(int x, int y) {
        return czyOznaczone(x, y) && czyOznaczone(x + 1, y) && czyWolne(x + 2, y);
    }

    public int getNumberOfCounters() {
        return numberOfCounters;
    }

    public boolean czyDostepne(int x, int y) {
        return 0 <= x && x < wersja.getRows() && 0 <= y && y < wersja.getCols() && wolne[x][y];
    }

    public boolean czyOznaczone(int x, int y) {
        return czyDostepne(x, y) && oznaczone[x][y];
    }

    private boolean czyWolne(int x, int y) {
        return czyDostepne(x, y) && !oznaczone[x][y];
    }

    public int getY() {
        return Y;
    }

    public int getX() {
        return X;
    }

    public boolean isSelected() {
        return turn == RodzajRuchu.SELECTION;
    }
}
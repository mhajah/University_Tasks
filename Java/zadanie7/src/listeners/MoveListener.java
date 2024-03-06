package listeners;

import plansza.Board;
import plansza.Samotnik;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class MoveListener implements ActionListener {
    private final Board board;
    private int x, y;

    public MoveListener(Board board) {

        this.board = board;
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String source = e.getActionCommand();
        switch (source) {
            case "WYBIERZ": {
                board.select();
                break;
            }
            case "LEFT": {
                wykonajRuch("LEFT");
                board.ruch(x, y, true);
                break;
            }
            case "RIGHT": {
                wykonajRuch("RIGHT");
                board.ruch(x, y, true);
                break;
            }
            case "UP": {
                wykonajRuch("UP");
                board.ruch(x, y, true);
                break;
            }
            case "DOWN": {
                wykonajRuch("DOWN");
                board.ruch(x, y, true);
                break;
            }
        }
        Samotnik.rozpocznij().update();
    }

    private void wykonajRuch(String direction) {
        x = board.getX();
        y = board.getY();
        switch (direction) {
            case "UP": {
                for (int i = y; i >= 0; i--) {
                    for (int j = (y == i) ? x - 1 : 6; j >= 0; j--) {
                        if (board.czyOznaczone(j, i)) {
                            x = j;
                            y = i;
                            return;
                        }
                    }
                }
                break;
            }
            case "DOWN": {
                for (int i = y; i < 7; i++) {
                    for (int j = (y == i) ? x + 1 : 0; j < 7; j++) {
                        if (board.czyOznaczone(j, i)) {
                            x = j;
                            y = i;
                            return;
                        }
                    }
                }
                break;
            }
            case "LEFT": {
                for (int i = x; i >= 0; i--) {
                    for (int j = (x == i) ? y - 1 : 6; j >= 0; j--) {
                        if (board.czyOznaczone(i, j)) {
                            x = i;
                            y = j;
                            return;
                        }
                    }
                }
                break;
            }
            case "RIGHT": {
                for (int i = x; i < 7; i++) {
                    for (int j = (x == i) ? y + 1 : 0; j < 7; j++) {
                        if (board.czyOznaczone(i, j)) {
                            x = i;
                            y = j;
                            return;
                        }
                    }
                }
                break;
            }
        }

    }




}
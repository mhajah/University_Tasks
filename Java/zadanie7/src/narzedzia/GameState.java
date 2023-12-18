package narzedzia;
import java.io.*;
import plansza.Samotnik;
import plansza.Board;
import widok.MainWindow;

public class GameState implements Serializable {
    public MainWindow window;
    public Board board;

    public GameState(MainWindow window, Board board) {
        this.window = window;
        this.board = board;
    }
}


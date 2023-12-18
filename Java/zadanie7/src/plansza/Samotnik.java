package plansza;

import narzedzia.GameState;
import narzedzia.WersjaGry;
import widok.MainWindow;

import java.awt.*;
import java.io.*;

public class Samotnik {

    private static Samotnik INSTANCE;
    private Color counterColor;
    private final Color backgroundColor;
    private Color pointColor;
    private final Color selectionColor;
    public static MainWindow window;
    public static Board board;
    private WersjaGry version;
//    private static GameState gameState;

    private Samotnik() {
        counterColor = Color.BLACK;
        backgroundColor = Color.WHITE;
        pointColor = Color.GREEN;
        selectionColor = Color.RED;
        version = WersjaGry.BRITISH;
    }

    public static Samotnik rozpocznij() {
        if (INSTANCE == null) {
            INSTANCE = new Samotnik();
        }

        return INSTANCE;
    }

//    public void saveGame() {
//        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream("solitaire.ser"))) {
//            oos.writeObject(gameState);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

//    public static void loadGame() {
//        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream("solitaire.ser"))) {
//            gameState = (GameState) ois.readObject();
//            File file = new File("solitaire.ser");
//            if (file.exists()) {
//                file.delete();
//            }
//        } catch (IOException | ClassNotFoundException e) {
//            e.printStackTrace();
//        }
//
//        board = gameState.board;
//        window = gameState.window;
//    }

    public void init() {
        board = new Board(version);
        window = new MainWindow(board);
//        gameState = new GameState(window, board);
    }

    public void newGame() {
//        loadGame();
        board.setup(version);
    }

    public Color getBackgroundColor() {

        return backgroundColor;
    }


    public Color getKolorPoint() {

        return pointColor;
    }

    public void setPointColor(Color kolorWypelnienia) {

        this.pointColor = kolorWypelnienia;
    }

    public Color getCounterColor() {

        return counterColor;
    }

    public void setCounterColor(Color newColor) {

        this.counterColor = newColor;
    }

    public Color getSelectionColor() {

        return selectionColor;
    }

    public boolean isEnd() {
        return !board.sprawdzRuch();
    }

    public void setVersion(WersjaGry version) {

        this.version = version;
    }

    public void update() {

        window.update();
    }

    public void close() {
//        saveGame();
        window.dispose();
    }

}
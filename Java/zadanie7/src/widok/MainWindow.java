package widok;
import plansza.Board;
import plansza.Samotnik;
import narzedzia.config;

import javax.swing.*;
import java.awt.*;

public class MainWindow extends JFrame {
    private final MenuBar menu;
    private final Panel panel;
    private final JLabel label;
    private final Board board;

    public MainWindow(Board board) {
        super("Samotnik");
        this.board = board;
        panel = new Panel(board);
        menu = new MenuBar(board);
        label = new JLabel(config.getResourceBundle().getString("gra.stan"));
        add();
        settings();
    }

    private void settings() {
        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setLocation(100, 100);
        setSize(1000, 1000);
        setResizable(true);
        setVisible(true);
        getContentPane().setBackground(Samotnik.rozpocznij().getBackgroundColor());
    }

    private void add() {
        setLayout(new BorderLayout());
        setJMenuBar(menu);
        add(panel, BorderLayout.CENTER);
        add(label, BorderLayout.SOUTH);
    }

    public void update() {
        if (Samotnik.rozpocznij().isEnd()) {
            label.setText(config.getResourceBundle().getString("gra.stan.koniec") + board.getNumberOfCounters());
            panel.repaint();
        } else {
            label.setText(config.getResourceBundle().getString("gra.stan.trwa") + board.getNumberOfCounters());
            getContentPane().setBackground(Samotnik.rozpocznij().getBackgroundColor());
            panel.repaint();
        }
    }


}



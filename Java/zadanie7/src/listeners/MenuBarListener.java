package listeners;

import plansza.Samotnik;
import narzedzia.WersjaGry;
import narzedzia.config;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class MenuBarListener implements ActionListener {

    private final Samotnik samotnik;

    public MenuBarListener() {
        this.samotnik = Samotnik.rozpocznij();
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String source = e.getActionCommand();
        Color color;
        switch (source) {
            case "NOWA_GRA":
                samotnik.newGame();
                break;
            case "KONIEC_GRY":
                samotnik.close();
                break;
            case "INFO": {
                String text = config.getResourceBundle().getString("modal.about_game.text");
                String title = config.getResourceBundle().getString("modal.about_game.title");
                JOptionPane.showMessageDialog(null, text, title, JOptionPane.INFORMATION_MESSAGE);
                break;
            }
            case "PIONKI_KOLOR": {
                String title = config.getResourceBundle().getString("modal.counter_color.title");
                color = JColorChooser.showDialog(null, title, samotnik.getCounterColor());
                samotnik.setCounterColor(color);
                break;
            }
            case "WSKAZNIK_KOLOR": {
                String title = config.getResourceBundle().getString("modal.selection_color.title");
                String text = config.getResourceBundle().getString("modal.selection_color.text");
                String[] colors = {"NIEBIESKI", "ZOLTY", "ZIELONY"};
                String selection = (String) JOptionPane.showInputDialog(null, text, title, JOptionPane.WARNING_MESSAGE, null, colors, colors[0]);
                switch (selection) {
                    case "NIEBIESKI":
                        samotnik.setPointColor(Color.BLUE);
                        break;
                    case "ZOLTY":
                        samotnik.setPointColor(Color.YELLOW);
                        break;
                    case "ZIELONY":
                        samotnik.setPointColor(Color.GREEN);
                        break;
                }
                break;
            }
            case "BRITISH":
                samotnik.setVersion(WersjaGry.BRITISH);
                break;
            case "EUROPEAN":
                samotnik.setVersion(WersjaGry.EUROPEAN);
                break;
        }
        samotnik.update();
    }
}
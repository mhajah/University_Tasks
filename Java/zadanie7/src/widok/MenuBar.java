package widok;

import listeners.KeyListener;
import listeners.MenuBarListener;
import plansza.Board;
import narzedzia.config;

import javax.swing.*;
import java.awt.event.KeyEvent;


public class MenuBar extends JMenuBar {
    private final JMenu gameMenu, moveMenu, settingsMenu, helpMenu;
    private final JMenuItem mNewGame, mEnd, mSelect, mLeft, mRight, mUp, mDown, mIGame, mCounterColor;
    private final JRadioButtonMenuItem rBritish, rEuropean;
    private final ButtonGroup bgVersion;

    {
        gameMenu = new JMenu(config.getResourceBundle().getString("menu.gra"));
        mNewGame = new JMenuItem(config.getResourceBundle().getString("menu.nowa.gra"));
        mEnd = new JMenuItem(config.getResourceBundle().getString("menu.koniec.gry"));

        moveMenu = new JMenu(config.getResourceBundle().getString("menu.ruchy"));
        mSelect = new JMenuItem(config.getResourceBundle().getString("movement.select"));
        mLeft = new JMenuItem(config.getResourceBundle().getString("ruch.lewo"));
        mRight = new JMenuItem(config.getResourceBundle().getString("ruch.prawo"));
        mUp = new JMenuItem(config.getResourceBundle().getString("ruch.gora"));
        mDown = new JMenuItem(config.getResourceBundle().getString("ruch.dol"));

        settingsMenu = new JMenu(config.getResourceBundle().getString("menu.ustawienia"));

        rBritish = new JRadioButtonMenuItem(config.getResourceBundle().getString("menu.ustawienia.wersja.british"));
        rEuropean = new JRadioButtonMenuItem(config.getResourceBundle().getString("menu.ustawienia.wersja.european"));
        bgVersion = new ButtonGroup();

        mCounterColor = new JMenuItem(config.getResourceBundle().getString("menu.ustawienia.kolor.pionki"));

        helpMenu = new JMenu(config.getResourceBundle().getString("menu.pomoc"));
        mIGame = new JMenuItem(config.getResourceBundle().getString("menu.pomoc.about"));
    }


    public MenuBar(Board board) {
        add();
        setAccelerator();
        setMnemonic();
        setCommand();
        addListener(board);
    }

    private void add() {
        add(gameMenu);
        gameMenu.add(mNewGame);
        gameMenu.addSeparator();
        gameMenu.add(mEnd);

        add(moveMenu);
        moveMenu.add(mSelect);
        moveMenu.addSeparator();
        moveMenu.add(mLeft);
        moveMenu.add(mRight);
        moveMenu.add(mUp);
        moveMenu.add(mDown);

        add(settingsMenu);
        bgVersion.add(rBritish);
        bgVersion.add(rEuropean);
        settingsMenu.add(rBritish);
        settingsMenu.add(rEuropean);
        settingsMenu.add(mCounterColor);


        add(Box.createGlue());

        add(helpMenu);
        helpMenu.add(mIGame);
    }

    private void setAccelerator() {
        mSelect.setAccelerator(KeyStroke.getKeyStroke("SPACE"));
        mLeft.setAccelerator(KeyStroke.getKeyStroke("LEFT"));
        mRight.setAccelerator(KeyStroke.getKeyStroke("RIGHT"));
        mUp.setAccelerator(KeyStroke.getKeyStroke("UP"));
        mDown.setAccelerator(KeyStroke.getKeyStroke("DOWN"));
    }

    private void setMnemonic() {
        mNewGame.setMnemonic(KeyEvent.VK_N);
        mEnd.setMnemonic(KeyEvent.VK_C);
    }

    private void setCommand() {
        mNewGame.setActionCommand("NOWA_GRA");
        mEnd.setActionCommand("KONIEC_GRY");
        mSelect.setActionCommand("WYBIERZ");
        mLeft.setActionCommand("LEFT");
        mRight.setActionCommand("RIGHT");
        mUp.setActionCommand("UP");
        mDown.setActionCommand("DOWN");
        mIGame.setActionCommand("INFO");
        mCounterColor.setActionCommand("PIONKI_KOLOR");
        rBritish.setActionCommand("BRITISH");
        rEuropean.setActionCommand("EUROPEAN");
    }

    private void addListener(Board board) {
        mNewGame.addActionListener(new MenuBarListener());
        mEnd.addActionListener(new MenuBarListener());
        mSelect.addActionListener(new KeyListener(board));
        mLeft.addActionListener(new KeyListener(board));
        mRight.addActionListener(new KeyListener(board));
        mUp.addActionListener(new KeyListener(board));
        mDown.addActionListener(new KeyListener(board));
        mIGame.addActionListener(new MenuBarListener());
        mCounterColor.addActionListener(new MenuBarListener());
        rBritish.addActionListener(new MenuBarListener());
        rEuropean.addActionListener(new MenuBarListener());

    }



}

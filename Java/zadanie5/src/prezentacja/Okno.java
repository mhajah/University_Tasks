package prezentacja;
import rozgrywka.Gra;
import obliczenia.Wymierna;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
public class Okno extends Frame {
    private Gra gra;
    private TextField licznikGUI, mianownikGUI;
    private Scrollbar probyGUI, zakresGUI;
    private Button wyslijProbeButton, nowaGraButton, zakonczButton;
    private Label komunikatGUI;
    public Okno() {
        gra = new Gra();
        licznikGUI = new TextField();

        mianownikGUI = new TextField();
        mianownikGUI.setPreferredSize(new Dimension(50,20));
        probyGUI = new Scrollbar(Scrollbar.HORIZONTAL, 0, 1, 0, 10);
        zakresGUI = new Scrollbar(Scrollbar.HORIZONTAL, 5, 1, 1, 20);

        wyslijProbeButton = new Button("Sprawdz");
        nowaGraButton = new Button("Nowa gra");
        zakonczButton = new Button("Zakoncz");
        komunikatGUI = new Label("");

        wyslijProbeButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae) {
                wyslijPropozycje();
            }
        });

        nowaGraButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae) {
                nowaGra();
            }
        });

        zakonczButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent ae) {
                System.exit(0);
            }
        });
        Label l = new Label("Gra: Zgadnij liczbę wymierną");
        l.setBounds(10, 30, 300, 20);
        add(l);
        Label l1 = new Label("Licznik: ");
        l1.setBounds(10, 60, 50, 20);
        add(l1);
        licznikGUI.setBounds(60, 60, 50, 20);
        add(licznikGUI);
        Label l2 = new Label("Mianownik:");
        l2.setBounds(10, 90, 80, 20);
        add(l2);
        mianownikGUI.setBounds(90, 90, 50, 20);
        add(mianownikGUI);

        Label l3 = new Label("Liczba prób:");
        l3.setBounds(10, 120, 80, 20);
        add(l3);
        probyGUI.setBounds(90, 120, 80, 20);
        add(probyGUI);

        Label l4 = new Label("Zakres:");
        l4.setBounds(10, 150, 50, 20);
        add(l4);
        zakresGUI.setBounds(60, 150, 80, 20);
        add(zakresGUI);

        wyslijProbeButton.setBounds(10, 180, 80, 20);
        add(wyslijProbeButton);
        nowaGraButton.setBounds(90, 180, 80, 20);
        add(nowaGraButton);
        zakonczButton.setBounds(170, 180, 80, 20);
        add(zakonczButton);

        komunikatGUI.setBounds(10, 250, 300, 20);
        add(komunikatGUI);
        setSize(600, 600);
        setLayout(null);
        setVisible(true);

    }
    private void wyslijPropozycje() {

        int licznik = Integer.parseInt(licznikGUI.getText());
        int mianownik = Integer.parseInt(mianownikGUI.getText());
        probyGUI.setValue(gra.licznikProb);
        Wymierna propozycja = new Wymierna(licznik, mianownik);
        gra.sprawdzPropozycje(propozycja);
        komunikatGUI.setText(gra.komunikat);

    }

    private void nowaGra() {
        int zakres = zakresGUI.getValue();
        gra.start(zakres);
        komunikatGUI.setText(gra.komunikat);
        probyGUI.setMaximum(5);
        probyGUI.setValue(0);

        licznikGUI.setText("");
        mianownikGUI.setText("");
    }
}

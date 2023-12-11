import algorithms.BST;

import javax.swing.*;
import java.awt.*;
//import java.awt.event.ActionEvent;
//import java.awt.event.ActionListener;


public class ShowBST extends JFrame {

    private final BST<String> bst;
    private JTextArea outputTextArea;

    public ShowBST() {
        bst = new BST<>();
        initializeUI();
    }

    private void initializeUI() {
        setTitle("BST Application");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        outputTextArea = new JTextArea();
        outputTextArea.setEditable(false);
        JScrollPane scrollPane = new JScrollPane(outputTextArea);
        add(scrollPane, BorderLayout.CENTER);

        JPanel controlPanel = new JPanel();
        controlPanel.setLayout(new FlowLayout());

        JTextField valueTextField = new JTextField(15);
        controlPanel.add(valueTextField);

        JButton insertButton = new JButton("Insert");
        insertButton.addActionListener(e -> {
            String value = valueTextField.getText();
            bst.insert(value);
            updateOutput();
        });
        controlPanel.add(insertButton);

        JButton removeButton = new JButton("Remove");
        removeButton.addActionListener(e -> {
            String value = valueTextField.getText();
            bst.remove(value);
            updateOutput();
        });
        controlPanel.add(removeButton);

        JButton searchButton = new JButton("Search");
        searchButton.addActionListener(e -> {
            String value = valueTextField.getText();
            boolean found = bst.search(value);
            JOptionPane.showMessageDialog(ShowBST.this, "Value " + value + " found: " + found);
        });
        controlPanel.add(searchButton);

        JButton minButton = new JButton("Min");
        minButton.addActionListener(e -> {
            try {
                String minValue = bst.min();
                JOptionPane.showMessageDialog(ShowBST.this, "Minimum value: " + minValue);
            } catch (IllegalStateException ex) {
                JOptionPane.showMessageDialog(ShowBST.this, "Tree is empty");
            }
        });
        controlPanel.add(minButton);

        JButton maxButton = new JButton("Max");
        maxButton.addActionListener(e -> {
            try {
                String maxValue = bst.max();
                JOptionPane.showMessageDialog(ShowBST.this, "Maximum value: " + maxValue);
            } catch (IllegalStateException ex) {
                JOptionPane.showMessageDialog(ShowBST.this, "Tree is empty");
            }
        });
        controlPanel.add(maxButton);

        JButton clearButton = new JButton("Clear");
        clearButton.addActionListener(e -> {
            bst.clear();
            updateOutput();
        });
        controlPanel.add(clearButton);

        add(controlPanel, BorderLayout.SOUTH);

        pack();
        setLocationRelativeTo(null);
        setVisible(true);
    }

    private void updateOutput() {
        outputTextArea.setText(bst.toString());
    }


    public static void main(String[] args) {
        SwingUtilities.invokeLater(ShowBST::new);
    }
}


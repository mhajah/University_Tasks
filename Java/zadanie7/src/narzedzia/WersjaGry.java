package narzedzia;

public enum WersjaGry {
    EUROPEAN(37, 7, 7, 3, 3),
    BRITISH(32, 7, 7, 3, 3);

    private final int numberOfCounter;
    private final int rows;
    private final int cols;
    private final int startX;
    private final int startY;

    WersjaGry(int numberOfCounter, int maxRow, int maxColumn, int startX, int startY) {
        this.numberOfCounter = numberOfCounter;
        this.rows = maxRow;
        this.cols = maxColumn;
        this.startX = startX;
        this.startY = startY;
    }

    public boolean[][] getBoard() {
        if (this == BRITISH) {
            return BritishBoard();
        }

        return EuropeanBoard();
    }

    private boolean[][] EuropeanBoard() {
        boolean[][] board = BritishBoard();
        for (int i = 1; i < 6; i++) {
            for (int j = 1; j < 6; j++) {
                board[i][j] = true;
            }
        }
        return board;
    }

    private boolean[][] BritishBoard() {
        boolean[][] board = new boolean[rows][cols];
        for (int i = 2; i < 5; i++) {
            for (int j = 0; j < 7; j++) {
                board[i][j] = true;
                board[j][i] = true;
            }
        }
        return board;
    }

    public int getNumberOfCounter() {
        return numberOfCounter;
    }

    public int getRows() {
        return rows;
    }

    public int getCols() {
        return cols;
    }

    public int getStartX() {
        return startX;
    }

    public int getStartY() {
        return startY;
    }
}
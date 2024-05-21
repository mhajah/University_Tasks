import numpy as np

def can_place(square, board, i, j):
    size = square.shape[0]
    if i + size > board.shape[0] or j + size > board.shape[1]:
        return False
    if np.sum(board[i:i+size, j:j+size]) > 0:
        return False
    return True

def place(square, board, i, j, label):
    size = square.shape[0]
    board[i:i+size, j:j+size] = label
    return board

def print_solution(board):
    unoccupied = np.sum(board == 0)
    print(unoccupied)
    for i in range(board.shape[0]):
        for j in range(board.shape[1]):
            if board[i][j] == 0:
                print('.', end='')
            else:
                print(chr(ord('A') + board[i][j] - 1), end='')
        print()

def backtrack(squares, board, placed):
    if placed == len(squares):
        print_solution(board)
        return True

    free_positions = np.where(board == 0)
    if len(free_positions[0]) < squares[placed].size:
        return False

    for i, j in zip(free_positions[0], free_positions[1]):
        if can_place(squares[placed], board, i, j):
            board = place(squares[placed], board, i, j, placed + 1)
            if backtrack(squares, board, placed + 1):
                return True
            board[i:i+squares[placed].shape[0], j:j+squares[placed].shape[1]] = 0

    return False

def main():
    squares = [np.ones((i+1, i+1), dtype=int) for i in range(0, 24)]
    board = np.zeros((70, 70), dtype=int)
    placed = 0

    backtrack(squares, board, placed)

if __name__ == '__main__':
    main()

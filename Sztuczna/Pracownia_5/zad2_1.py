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
               # print(str(board[i][j]) + " ", end='')
                print(chr(ord('A') + board[i][j] - 1), end='')
        print()

def main():
    squares = [np.ones((i+1, i+1), dtype=int) for i in range(0, 24)]
    board = np.zeros((70, 70), dtype=int)

    for i in range(23, -1, -1):
        placed = False
        for j in range(70):
            for k in range(70):
                if can_place(squares[i], board, j, k):
                    board = place(squares[i], board, j, k, i + 1)
                    placed = True
                    break
            if placed:
                #print(i)
                break

    print_solution(board)

if __name__ == '__main__':
    main()
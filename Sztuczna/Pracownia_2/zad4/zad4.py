from contextlib import redirect_stdout
from collections import deque
import random
import itertools

board = []
allpos = set()

X = [-1,  0, 1, 0]
Y = [0, -1,  0, 1]
L = ["U", "L", "D", "R"]

def legal_move(x, y):
    return board[x][y] != "#"
    
def won(Fin, Kom):
    for k in Kom:
        if k not in Fin:
             return False
    return True

def bfs(K, F, M):
    q = deque()
    pos = [K, M]
    q.append(pos)
    K = sorted(K)
    allpos.add(tuple(K))
    
    while len(q) > 0:
        position = q.popleft()
        if won(F, position[0]):
            return position[1]

        for i in range(4):
            temp_pos = []
            for k in position[0]:
                temp = list(k)
                if board[temp[0] + X[i]][temp[1] + Y[i]] != "#":
                    temp[0] = temp[0] + X[i]
                    temp[1] = temp[1] + Y[i]
                temp_pos.append(tuple(temp))
            
            temp_pos = sorted(list(set(temp_pos)))  # (1,3) (2,4)  -> (2,4) (1,3)
            hasz = tuple(temp_pos)
            if hasz not in allpos:
                temppos2 = [temp_pos, [x for x in position[1]] + list(L[i])]
                allpos.add(hasz)
                q.append(temppos2)

#wczytaj planszę
with open('zad_input.txt') as f:
    for line in f:
        board.append(list(line.strip()))

n, m = len(board)-1, len(board[0])  

komando, finish = [], set()
#znajdz pozycje
for i in range(n):
    for j in range(m):
        if board[i][j] == 'G':
            finish.add((i,j))
        if board[i][j] == 'S':
            komando.append((i, j))
        if board[i][j] == 'B':
            finish.add((i,j))
            komando.append((i, j))
        if board[i][j] != '#':
            board[i][j] = '.'


# zmniejszanie niepewności
all_sequences = list(itertools.permutations(L))
best_seq = ''
minimal_moves = 1e9
best_positions = []

for seq in all_sequences:
    N = 19
    act_seq = seq[0] * N + seq[1] * N + seq[2] * N + seq[3] * N
    kom = komando.copy()
    for i in range(4):
        temp_pos = []
        if seq[i] == "U":
            s = 0
        elif seq[i] == "L":
            s = 1
        elif seq[i] == "D":
            s = 2
        elif seq[i] == "R":
            s = 3
        for k in kom:
            temp = list(k)
            for j in range(N):
                if legal_move(temp[0] + X[s], temp[1] + Y[s]):
                    temp[0] = temp[0] + X[s]
                    temp[1] = temp[1] + Y[s]
                else:
                    break
            temp_pos.append(tuple(temp))
        kom = temp_pos.copy()
        kom = list(set(kom))

    if len(kom) < minimal_moves:
        minimal_moves = len(kom)
        best_seq = act_seq
        best_positions = kom.copy()

## binsearch
test = N*"L" + 6*"U" + "RUUL" + "RR" + "U"*5
temp_pos = []
for k in best_positions:
    temp = list(k)
    for i in range(len(test)):
        if test[i] == "U":
            s = 0
        elif test[i] == "L":
            s = 1
        elif test[i] == "D":
            s = 2
        elif test[i] == "R":
            s = 3
        if legal_move(temp[0] + X[s], temp[1] + Y[s]):
                    temp[0] = temp[0] + X[s]
                    temp[1] = temp[1] + Y[s]
    temp_pos.append(tuple(temp))

temp_pos = list(set(temp_pos))
# print(len(temp_pos), temp_pos)
best_seq += test
M = bfs(temp_pos, finish, best_seq)
with open('zad_output.txt', 'w') as f:
        ans = ""
        with redirect_stdout(f):   
          for i in M:
              ans += i
          print(ans)

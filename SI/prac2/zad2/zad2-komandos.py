from collections import deque
import itertools

board = []
allpos = set()

X = [-1,  0, 1, 0]
Y = [0, -1,  0, 1]
L = ["U", "L", "D", "R"]

# czy pole nie jest sciana
def isLegalMove(x, y):
    return board[x][y] != "#"
    
# czy wszyscy komandosi znajduja sie na poz. docelowych
def isWin(Fin, Kom):
    for k in Kom:
        if k not in Fin:
             return False
    return True

# K - poczatkowa lista komandosow na planszy
# F - pozycje docelowe
# M - ruchy do tej pory
def bfs(K, F, M):
    q = deque() # stany przeszukiwania
    pos = [K, M]
    q.append(pos)
    K = sorted(K)
    # odwiedzone pozycje
    allpos.add(tuple(K))
    
    while len(q) != 0:
        # zdejmujemy pierwszy element z kolejki
        position = q.popleft()

        # czy git
        if isWin(F, position[0]):
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

# Wczytywanie planszy
with open('zad_input.txt') as f:
    for line in f:
        board.append(list(line.strip()))

bHeight, bWidth = len(board)-1, len(board[0]) 

punkty_startowe = []
punkty_docelowe = set()

# Rodzaje pol i ich pozycje
for i in range(bHeight):
    for j in range(bWidth):
        if board[i][j] == 'G':
            punkty_docelowe.add((i,j))
        if board[i][j] == 'S':
            punkty_startowe.append((i, j))
        if board[i][j] == 'B':
            # punkty docelowo-startowe
            punkty_docelowe.add((i,j))
            punkty_startowe.append((i, j))
        if board[i][j] != '#':
            # można poruszać się po tym polu
            board[i][j] = '.'


# Zmniejszanie niepewności
# tj. "optymalizacja" polegajaca na testowaniu roznych kombinacji
# poczatkowych sekwencji ruchow             

# możliwe kombinacje ruchów: 4*3*2*1=24
all_sequences = list(itertools.permutations(L))
best_seq = ''
minimal_moves = 1e9
best_positions = []
for seq in all_sequences:
    N = 20
    act_seq = seq[0] * N + seq[1] * N + seq[2] * N + seq[3] * N
    komandos = punkty_startowe.copy()
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
        for k in komandos:
            temp = list(k)
            for j in range(N):
                if isLegalMove(temp[0] + X[s], temp[1] + Y[s]):
                    temp[0] = temp[0] + X[s]
                    temp[1] = temp[1] + Y[s]
                else:
                    break
            temp_pos.append(tuple(temp))
        komandos = temp_pos.copy()
        komandos = list(set(komandos))
    if len(komandos) < minimal_moves:
        minimal_moves = len(komandos)
        best_seq = act_seq
        best_positions = komandos.copy()

test = N*"L" + 4*"U" + "RUUL" + "RR" + "U"*5
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
        if isLegalMove(temp[0] + X[s], temp[1] + Y[s]):
                    temp[0] = temp[0] + X[s]
                    temp[1] = temp[1] + Y[s]
    
    temp_pos.append(tuple(temp))

temp_pos = list(set(temp_pos))
best_seq += test
M = bfs(temp_pos, punkty_docelowe, best_seq)
ans = ""
for i in M:
    ans += i
output = open("zad_output.txt", "w")
output.write(ans)
output.close()

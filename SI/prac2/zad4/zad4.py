from collections import deque
import heapq
import time

board = []
dist = {}
allpos = set()

X = [-1,  0, 1, 0]
Y = [0, -1,  0, 1]
L = ["U", "L", "D", "R"]

def isWin(Fin, Kom):
    for k in Kom:
        if k not in Fin:
             return False
    return True

def shortest_paths(pos):
    q = deque()
    dist[pos] = 1e9
    vis = {}
    vis[pos] = True
    q.append((pos, 0))

    while len(q) > 0:
        position = q.popleft()
        P = position[0]
        D = position[1]

        if P in punkty_docelowe:
            dist[pos] = min(dist[pos], D)
        
        for i in range(4):
            if board[P[0] + X[i]][P[1] + Y[i]] != "#" and (P[0] + X[i], P[1] + Y[i]) not in vis:
                  vis[(P[0] + X[i], P[1] + Y[i])] = True
                  q.append(((P[0] + X[i], P[1] + Y[i]), D + 1))


def heurystyka(positions, moves):
    distances = (dist[pos] for pos in positions)
    return max(distances) * 1.3 + moves

def Astar(K, M):
    Q = []
    heapq.heappush(Q, (heurystyka(K, 0), K, M))
    allpos.add(tuple(K))

    while len(Q) > 0:
        pos = heapq.heappop(Q)
        K = pos[1]
        moves = pos[2]
        if isWin(punkty_docelowe, K):
            return moves

        for i in range(4):
            temp_pos = []
            for k in K:
                temp = list(k)
                if board[temp[0] + X[i]][temp[1] + Y[i]] != "#":
                    temp[0] = temp[0] + X[i]
                    temp[1] = temp[1] + Y[i]
                temp_pos.append(tuple(temp))
            
            temp_pos = sorted(list(set(temp_pos))) 
            hasz = tuple(temp_pos)
            if hasz not in allpos:
                allpos.add(hasz)
                heapq.heappush(Q, (heurystyka(temp_pos, len(moves) + 1), temp_pos, moves + L[i]))


# Wczytywanie planszy
with open('zad_input.txt') as f:
    for line in f:
        board.append(list(line.strip()))

bHeight, bWidth = len(board)-1, len(board[0])  

punkty_startowe, punkty_docelowe = [], set()
# Rodzaje pol i ich pozycje
for i in range(bHeight):
    for j in range(bWidth):
        if board[i][j] == 'G':
            punkty_docelowe.add((i,j))
        if board[i][j] == 'S':
            punkty_startowe.append((i, j))
        if board[i][j] == 'B':
            punkty_docelowe.add((i,j))
            punkty_startowe.append((i, j))
        if board[i][j] != '#':
            board[i][j] = '.'

# Znajdź najkrótsze ścieżki
for i in range(bHeight):
    for j in range(bWidth):
        if board[i][j] != "#":
            shortest_paths((i, j))


M = Astar(punkty_startowe, "")
ans = ""
for i in M:
    ans += i
output = open("zad_output.txt", "w")
output.write(ans)
output.close()
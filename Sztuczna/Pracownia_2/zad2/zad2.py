from contextlib import redirect_stdout
from collections import deque

board = []

#możiwe ruchy
X = [-1,  0, 1, 0]
Y = [0, -1,  0, 1]
L = ["U", "L", "D", "R"]

allpos = set()
n, m = 0, 0


# K - magazynier
# B - skrzynie
# * - skrzynia na docelowym
# G - docelowe

def bfs(Kpos, Bpos, Spos):
    q = deque()
    pos = [Kpos, Bpos, Spos, []]
    q.append(pos)
    allpos.add(hash_state(Kpos[0], Kpos[1], pos))
    
    while len(q) > 0:
        position = q.popleft()
        if won(position[2]):
            return position[3]
        Kpos = position[0]
        
        for i in range(4):
            Xk = Kpos[0] + X[i]
            Yk = Kpos[1] + Y[i] 
            Bpos = position[1].copy()
            Spos = position[2].copy()
            moves = position[3].copy()
            if legal_move(Xk, Yk, i, Bpos, position):
                if box_in_way(Xk, Yk, Bpos):
                    move_box(Xk, Yk, X[i], Y[i], Bpos, Spos)
                Bpos = sorted(Bpos)
                if not blocked(Xk, Yk, Bpos, Spos):
                    moves.append(L[i])
                    temppos2 = ((Xk,Yk), Bpos, Spos, moves)
                    q.append(temppos2)

# jakiś martwy stan to jak są dwie obok siebie i przy ścianie, ale nie stoją na docelowej (check)
# jeśli skrzynia jest w rogu (check)
def blocked(x, y, B, S):
    for i in range(len(B)):
        cx = B[i][0]
        cy = B[i][1]

        if deadlock[cx][cy] != ".":
            return True
        
        if board[cx + 1][cy] == "W" and board[cx][cy - 1] == "W": #lewy dolny róg
            if B[i] not in S:
                return True
        if board[cx + 1][cy] == "W" and board[cx][cy + 1] == "W": #prawy dolny róg
            if B[i] not in S:
                return True
        if board[cx - 1][cy] == "W" and board[cx][cy - 1] == "W": #lewy górny róg
            if B[i] not in S:
                return True
        if board[cx - 1][cy] == "W" and board[cx][cy + 1] == "W": #prawy górny róg
            if B[i] not in S:
                return True
        
        if board[cx + 1][cy] == "W" and ((cx, cy - 1) in B) and board[cx + 1][cy - 1] == "W": #jeśli w dół ściana i na lewo już inna skrzynia
            if B[i] not in S or (cx, cy - 1) not in S:
                return True
        if board[cx + 1][cy] == "W" and ((cx, cy + 1) in B) and board[cx + 1][cy + 1] == "W": #jeśli w dół ściana i na prawo już inna skrzynia
            if B[i] not in S or (cx, cy + 1) not in S:
                return True
        if board[cx - 1][cy] == "W" and ((cx, cy - 1) in B) and board[cx - 1][cy - 1] == "W": #jeśli w górę ściana i na lewo już inna skrzynia
            if B[i] not in S or (cx, cy - 1) not in S:
                return True
        if board[cx - 1][cy] == "W" and ((cx, cy + 1) in B) and board[cx - 1][cy + 1] == "W": #jeśli w górę ściana i na prawo już inna skrzynia
            if B[i] not in S or ((cx, cy + 1) not in S):
                return True
        if board[cx][cy + 1] == "W" and ((cx - 1, cy) in B) and board[cx - 1][cy + 1] == "W": #jeśli na prawo ściana i na górze już inna skrzynia
            if B[i] not in S or (cx - 1, cy) not in S:
                return True
        if board[cx][cy + 1] == "W" and ((cx + 1, cy) in B) and board[cx + 1][cy + 1] == "W": #jeśli w prawo ściana i na dole już inna skrzynia
            if B[i] not in S or (cx + 1, cy) not in S:
                return True
        if board[cx][cy - 1] == "W" and ((cx - 1, cy) in B) and board[cx - 1][cy - 1] == "W": #jeśli w lewo ściana i na górze już inna skrzynia
            if B[i] not in S or ((cx - 1, cy) not in S):
                return True
        if board[cx][cy - 1] == "W" and ((cx + 1, cy) in B) and board[cx + 1][cy - 1] == "W": #jeśli w lewo ściana i na dole już inna skrzynia
            if B[i] not in S or (cx + 1, cy) not in S:
                return True
          
        if board[cx + 1][cy] == "W" and deadlock[cx][cy - 1] != "." and deadlock[cx][cy + 1] != "." and (cx, cy) not in S: #jeśli ściana w dół i deadlock po obu
            return True
        if board[cx - 1][cy] == "W" and deadlock[cx][cy - 1] != "." and deadlock[cx][cy + 1] != "." and (cx, cy) not in S: #jeśli ściana w górę i deadlock po obu
            return True
        if board[cx][cy - 1] == "W" and deadlock[cx - 1][cy] != "." and deadlock[cx + 1][cy] != "." and (cx, cy) not in S: #jeśli ściana w lewo i deadlock po obu
            return True
        if board[cx][cy + 1] == "W" and deadlock[cx - 1][cy] != "." and deadlock[cx + 1][cy] != "." and (cx, cy) not in S: #jeśli ściana w prawo i deadlock po obu
            return True
    return False
                             
def hash_state(x, y, state):
    boxes = tuple(state[1])
    return ((x, y), boxes)

def hash_all(state):
    pos = state[0]
    Bo = tuple(state[1])
    Gbo = tuple(state[2].items())
    return (pos, Bo, Gbo)

def box_in_way(X, Y, B):
    for b in B:
        if b == (X, Y):
            return True
    return False

def legal_move(x, y, i, B, pos):
    if not(0 <= x <= n) or not(0 <= y <= m) or board[x][y] == 'W':
        return False
    hs = hash_state(x, y, pos)
    if box_in_way(x, y, B):
        if (box_in_way(x+X[i], y + Y[i], B) or board[x + X[i]][y + Y[i]] == 'W'):
            return False
    else:
        if hs in allpos:
            return False
    allpos.add(hs)
    return True

def move_box(x, y, LX, LY, B, S):
    for i in range(len(B)):
        c_x = B[i][0]
        c_y = B[i][1]
        if c_x == x and c_y == y:
            if B[i] in S:
                S[B[i]] = False
            B[i] = (c_x + LX, c_y + LY)
            if B[i] in S:
                S[B[i]] = True
            return

def won(Spos):
    for i in Spos.items():
        if not i[1]:
             return False
    return True


input = []
with open('zad_input.txt') as f:
    for line in f:
        board.append(list(line.strip()))

n, m = len(board)-1, len(board[0])  

sok = (0,0)
boxes, goodboxes = [], {} #pozycje skrzyń, gdzie są pola na które trzeba trafić, czy skrzynia zajmuje miejsce

for i in range(n):
    for j in range(m):
        if board[i][j] == 'K':
            temp = list(sok)
            temp[0] = i
            temp[1] = j 
            sok = tuple(temp)
        if board[i][j] == 'B':
            boxes.append((i, j))
        if board[i][j] == 'G':
            goodboxes[(i, j)] = False
        if board[i][j] == '*':
            goodboxes[(i, j)] = True
            boxes.append((i, j))
        if board[i][j] != 'W':
            board[i][j] = '.'

deadlock = [["#" for j in range(m)] for i in range(n)]

for i in goodboxes:
    cx = i[0]
    cy = i[1]
    deadlock[cx][cy] = "."
    tempX = cx - 1
    while tempX >= 0: #sprawdź w górę
        if board[tempX][cy] == "W" or board[tempX - 1][cy] == "W":
            break
        deadlock[tempX][cy] = "."
        tempX = tempX - 1
    tempX = cx + 1
    while tempX < n: #sprawdź w dół
        if board[tempX][cy] == "W" or board[tempX + 1][cy] == "W":
            break
        deadlock[tempX][cy] = "."
        tempX = tempX + 1
    tempY = cy - 1
    while tempY >= 1: #sprawdź w lewo
        if board[cx][tempY] == "W" or board[cx][tempY - 1] == "W":
            break
        deadlock[cx][tempY] = "."
        tempY = tempY - 1
    tempY = cy + 1
    while tempY < m: #sprawdź w dół
        if board[cx][tempY] == "W" or board[cx][tempY + 1] == "W":
            break
        deadlock[cx][tempY] = "."
        tempY = tempY + 1


for k in range(13):
    for i in range(1,n-1):
        for j in range(1, m - 1):
            if board[i][j] != "W":
                if j - 1 >= 0 and j + 1 < m and deadlock[i][j - 1] == "." and board[i][j + 1] != "W": #czy na lewo jest .
                    deadlock[i][j] = "."
                if j - 1 >= 0 and j + 1 < m and deadlock[i][j + 1] == "." and board[i][j - 1] != "W": #czy na prawo jest .
                    deadlock[i][j] = "."
                if i - 1 >= 0 and i + 1 < n and deadlock[i - 1][j] == "." and board[i + 1][j] != "W": #czy na górę jest .
                    deadlock[i][j] = "."
                if i - 1 >= 0 and i + 1 < n and deadlock[i + 1][j] == "." and board[i - 1][j] != "W": #czy na dół jest .
                    deadlock[i][j] = "."

M = bfs(sok, boxes, goodboxes)
with open('zad_output.txt', 'w') as f:
        ans = ""
        with redirect_stdout(f):   
          for i in M:
              ans += i
          print(ans)
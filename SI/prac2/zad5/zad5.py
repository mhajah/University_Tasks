from collections import deque
import heapq

# Define global movement and direction variables
X = [-1, 0, 1, 0]
Y = [0, -1, 0, 1]
L = ["U", "L", "D", "R"]

# Helper function to check if all targets are covered
def is_win(fin, kom):
    for k in kom:
        if k not in fin:
            return False
    return True

# Pre-compute the shortest distance from every point to the nearest goal
def shortest_paths(board, punkty_docelowe):
    dist = {}
    for goal in punkty_docelowe:
        q = deque([(goal, 0)])
        visited = {goal}
        
        while q:
            current, distance = q.popleft()
            dist[current] = min(dist.get(current, float('inf')), distance)
            for dx, dy in zip(X, Y):
                next_pos = (current[0] + dx, current[1] + dy)
                if 0 <= next_pos[0] < len(board) and 0 <= next_pos[1] < len(board[0]) and board[next_pos[0]][next_pos[1]] != '#' and next_pos not in visited:
                    visited.add(next_pos)
                    q.append((next_pos, distance + 1))
    return dist

# Heuristic function for the A* search
def heuristic(dist, positions, moves):
    return max(dist[pos] for pos in positions if pos in dist) * 1.05 + moves

# A* search algorithm
def astar(board, start_points, dist, punkty_docelowe):
    Q = []
    heapq.heappush(Q, (heuristic(dist, start_points, 0), start_points, ""))
    allpos = set([tuple(start_points)])

    while Q:
        _, K, moves = heapq.heappop(Q)
        if is_win(punkty_docelowe, K):
            return moves

        for i in range(4):
            temp_pos = []
            for k in K:
                if board[k[0] + X[i]][k[1] + Y[i]] != "#":
                    temp_pos.append((k[0] + X[i], k[1] + Y[i]))
                else:
                    temp_pos.append(k)

            temp_pos = sorted(set(temp_pos)) 
            hasz = tuple(temp_pos)
            if hasz not in allpos:
                allpos.add(hasz)
                heapq.heappush(Q, (heuristic(dist, temp_pos, len(moves) + 1), temp_pos, moves + L[i]))
    return ""

# Load and preprocess the board
def load_board(filepath):
    board = []
    punkty_startowe, punkty_docelowe = [], set()
    with open(filepath) as f:
        for line in f:
            board.append(list(line.strip()))

    for i, row in enumerate(board):
        for j, cell in enumerate(row):
            if cell in 'GB':
                punkty_docelowe.add((i, j))
            if cell in 'SB':
                punkty_startowe.append((i, j))
            if cell != '#':
                board[i][j] = '.'
    return board, punkty_startowe, punkty_docelowe

# Main execution function
def solve(filepath):
    board, punkty_startowe, punkty_docelowe = load_board(filepath)
    dist = shortest_paths(board, punkty_docelowe)
    solution = astar(board, punkty_startowe, dist, punkty_docelowe)
    
    with open("zad_output.txt", "w") as output:
        output.write(solution)

# Run the solver with the input file
solve('zad_input.txt')

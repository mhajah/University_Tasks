from queue import Queue

def solve(labirynt):
    x = len(labirynt) # liczba wierszy
    y = len(labirynt[0]) - 1 # liczba kolumn
    print(x)
    print(y)

def maze2graph(maze):
    height = len(maze)
    width = len(maze[0]) - 1
    graph = {(i, j): [] for j in range(width) for i in range(height) if maze[i][j] != '#'}
    goals = []
    starts = []
    for row, col in graph.keys():
        if row < height - 1 and maze[row + 1][col] != '#':
            graph[(row, col)].append(("D", (row + 1, col)))
            graph[(row + 1, col)].append(("U", (row, col)))
        if col < width - 1 and  maze[row][col + 1]!= '#':
            graph[(row, col)].append(("R", (row, col + 1)))
            graph[(row, col + 1)].append(("L", (row, col)))
        if maze[row][col] == 'B':
            goals.append((row,col))
        if maze[row][col] == 'S':
            starts.append((row,col))
    return graph, goals, starts

def moveD(maze):
    result = [""] * len(maze)
    for i in range(len(maze[0]) - 1):
        result[0] += "#"
    result[0] += "\n"
    for i in range(len(maze[0])):
        for j in range(len(maze) - 1):
            if maze[j+1][i] == "S" and maze[j][i] == "S":
                result[j+1] += "."
            else:
                result[j+1] += maze[j][i]
    return result

def moveR(maze):
    result = [""] * len(maze)
    # for i in range(len(maze[0]) - 1):
    #     result[0] += "#"
    # result[0] += "\n"
    for i in range(len(maze)):
        for j in range(len(maze[0]) - 1):
            if maze[i][j+1] == "S" and maze[i][j] == "S":
                result[i] += "."
            else:
                result[i] += maze[i][j]
    return result


def find_path_bfs(maze):
    graph, goals, start = maze2graph(maze)
   #  print(start)
    queue = Queue()
    queue.put(("", start[0]))
    visited = set()
    while not queue.empty():
        path, current = queue.get()
        for i in goals:
            if current == i:
                return path
        if current in visited:
            continue
        visited.add(current)
        for direction, neighbour in graph[current]:
            queue.put((path + direction, neighbour))
    return "NO WAY!"


with open('zad_input.txt', encoding='utf-8') as IN, open('zad_output.txt', 'w', encoding='utf-8') as OUT:
    mapa = []
    result = ""
    for line in IN:
        mapa.append(line)
    print(moveR(moveD(mapa)))
    print(moveR(mapa))
    for i in range (len(mapa)):
        result += "D"
    for i in range (len(mapa[0]) - 1):
         result+= "R"   
    for i in range (len(mapa)):
        result += "U"
    OUT.write(result + find_path_bfs(mapa))

# solve(mapa)
# print(mapa)
# print(maze2graph(mapa))
# print(result + find_path_bfs(mapa))

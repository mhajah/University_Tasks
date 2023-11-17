import sys
print(sys.getrecursionlimit())
sys.setrecursionlimit(10000)
print(sys.getrecursionlimit())
# functools.cache

def sudan(n, x, y):
    if n == 0:
        return x+y
    if y == 0:
        return x
    return sudan(n-1, sudan(n, x, y-1), sudan(n, x, y-1) + y)

sDict = {(0, 0, 0): 0}
def sudanMem(n, x, y, sudanDict):
    if (n, x, y) in sudanDict:
        return sudanDict[(n, x, y)]
    else:
        if n == 0:
            sudanDict[(n, x, y)] = x+y
        elif y == 0:
            sudanDict[(n, x, y)] = x
        else:
            #sudanDict[(n, x, y)] = (sudanDict[(n-1), sudanDict[(n, x, y-1), sudanDict[(n, x, y-1)]+y]])
            sudanDict[(n, x, y)] = sudanMem(n-1, sudanMem(n, x, y-1, sudanDict), sudanMem(n, x, y-1, sudanDict) + y, sudanDict)
        return sudanDict[(n, x, y)]

print(sudanMem(2, 3, 4, sDict))
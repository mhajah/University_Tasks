import numpy as np
import random


def startPos(N,M):
    return np.full((N,M), -1, dtype=int)

def genHelp(curr, id, tmpAns, line, N, allMoves):
    if id == len(line):
        allMoves.append(tmpAns)
        return

    for pos in range(curr,N):
        if pos + int(line[id]) - 1 >= N:
            continue

        for i in range(pos,pos + int(line[id])):
            tmpAns[i] = 1

        genHelp(pos + int(line[id]) + 1, id + 1, tmpAns.copy(), line, N, allMoves)

        for i in range(pos, pos + int(line[id])):
            tmpAns[i] = 0

def generatePossibleMoves(N, line):
    ans = [0]*N
    allMoves = []
    genHelp(0,0,ans.copy(), line, N, allMoves)
    return allMoves

def updateRow(i, j, setValue, rowPossible):
    rowPossible = list(rowPossible)

    pMoves = rowPossible.copy()
    
    rowPossible.clear()

    newMoves = []
    for x in pMoves:
        if x[j] == setValue:
            newMoves.append(x)

    rowPossible = tuple(rowPossible)

    if len(newMoves) != 0:
        rowPossible += (tuple(newMoves))
    
    return rowPossible

def updateCol(i, j, setValue, colPossible):
    colPossible = list(colPossible)

    pMoves = colPossible.copy()
    
    colPossible.clear()

    newMoves = []
    for x in pMoves:
        if x[i] == setValue:
            newMoves.append(x)

    colPossible = tuple(colPossible)
    if len(newMoves) != 0:
        colPossible += (tuple(newMoves))

    return colPossible


def paint(N,M,rows,cols):
    matrix = startPos(N,M) #ustaw planszę na -1

    possibleColoring = []

    idRow = 0
    for row in rows:
        pMoves = generatePossibleMoves(M, row)
        pMoves = tuple(tuple(sub) for sub in pMoves)
        possibleColoring.append(('r', idRow, pMoves))
        idRow += 1

    idCol = 0
    for col in cols:
        pMoves = generatePossibleMoves(N, col)
        pMoves = tuple(tuple(sub) for sub in pMoves)
        possibleColoring.append(('c', idCol, pMoves))
        idCol += 1



    while len(possibleColoring) != 0:
        
        firstItem = possibleColoring[0]
        possibleColoring.pop(0)

        possibleMoves = firstItem[2]

        if len(possibleMoves) == 0:
            continue

        if firstItem[0] == 'c':
            maxIter = N
            for pos in range(maxIter):
                if matrix[pos][firstItem[1]] != -1:
                    possibleMoves = updateCol(pos, firstItem[1], matrix[pos][firstItem[1]], possibleMoves)
                    if len(possibleMoves) == 0:
                        break
        else:
            maxIter = M
            for pos in range(maxIter):
                if matrix[firstItem[1]][pos] != -1:
                    possibleMoves = updateRow(firstItem[1], pos, matrix[firstItem[1]][pos], possibleMoves)
                    if len(possibleMoves) == 0:
                        break

        if len(possibleMoves) == 0:
            continue


        allTimeGood = 0
        for pos in range(maxIter):
            setValue = possibleMoves[0][pos]

            allSame = True

            for move in possibleMoves:
                if move[pos] != setValue:
                    allSame = False
            
            if allSame:
                if firstItem[0] == 'c':
                    matrix[pos][firstItem[1]] = setValue
                else:
                    matrix[firstItem[1]][pos] = setValue
                allTimeGood += 1

        if allTimeGood != maxIter:
            possibleColoring.append(firstItem)
    
    return matrix

with open("zad_output.txt",'w') as fo:
    with open("zad_input.txt", 'r') as my_file:
        parameters = my_file.readline().rstrip()
        parameters = parameters.split(' ')
        N = int(parameters[0])
        M = int(parameters[1])
        rows = []
        cols = []
        while (line := my_file.readline().rstrip()):
            if len(rows) < N:
                rows.append(line.split(" "))
            else:
                cols.append(line.split(" "))

            
        painted = paint(N,M,rows,cols)
        
        for i in range(0,N):
            for j in range(0,M):
                toPaint = '.'
                if painted[i][j] == 1: toPaint = '#'
                if painted[i][j] == -1: toPaint = "0"
                fo.write(toPaint)
            fo.write("\n")


import numpy as np
import random

# dokladnie to samo co w zadaniu było polecone

def opt_dist(inpt , D):
    N = len(inpt)
    k = len(D)
    dp = [[1e9 for row in range(0,N)] for col in range(0,k)]
    prefix_sum = [0]*N
    prefix_sum[0] = (int(inpt[0]) == 1)
    for i in range(1, len(inpt)):
        prefix_sum[i] = prefix_sum[i-1] + (int(inpt[i]) == 1)


    start = 0
    dp_id = 0
    prev_block_L = -1
    for block_L in D:
        block_L = int(block_L)

        cost = 0
        for i in range(start,start + block_L):
            cost += (int(inpt[i]) == 0)
        first = start
        last = start + block_L
        if dp_id == 0:
            dp[dp_id][start] = cost + (prefix_sum[len(inpt)-1] - prefix_sum[last-1])
        else:
            if dp[dp_id-1][start - prev_block_L - 1] != 1e9:
                dp[dp_id][start] = dp[dp_id-1][start - prev_block_L - 1] - (prefix_sum[last-1] - prefix_sum[first-1]) + cost
        id = start + 1
        for i in range(start + block_L, len(inpt)):
            if(inpt[first] == 0 and inpt[last] == 1):
                cost -= 1
            if(inpt[first] == 1 and inpt[last] == 0):
                cost += 1

            first += 1
            last += 1
            ones_to_flick_B = prefix_sum[first-1]
            ones_to_flick_A = prefix_sum[len(inpt)-1] - prefix_sum[last-1]


           

            all_cost = cost + ones_to_flick_B + ones_to_flick_A

            if(dp_id == 0): 
                dp[dp_id][id] = min(dp[dp_id][id-1], all_cost)
            else:
                if(dp[dp_id-1][id - prev_block_L - 1] != 1e9):
                    dp[dp_id][id] = min(dp[dp_id][id-1], dp[dp_id-1][id - prev_block_L - 1] - (prefix_sum[last-1] - prefix_sum[first-1]) + cost)
            id += 1
        dp_id += 1
        start += block_L + 1
        prev_block_L = block_L
    ans = dp[k-1][0]
    for i in range(0,N):
        ans = min(ans, dp[k-1][i])

    return ans


def checkFinished(mat, rows, cols):
    N,M = mat.shape

    finished = True
    for i in range(0,N):
        if opt_dist(mat[i, :], rows[i]) > 0:
            finished = False

    for i in range(0,M):
        if opt_dist(mat[:, i], cols[i]) > 0:
            finished = False

    return finished

def startPos(N,M):
    return np.random.randint(2, size=(N,M))

def getRandomRowOrCol(mat, rows, cols):
    N,M = mat.shape

    toFix = []
    for i in range(0,N):
        if opt_dist(mat[i, :], rows[i]) > 0:
            toFix.append(str(i) + ':' + 'R')

    for i in range(0,M):
        if opt_dist(mat[:, i], cols[i]) > 0:
            toFix.append(str(i) + ':' + 'C')
    
    fix = (random.choice(toFix).split(':'))
    return (int(fix[0]), fix[1])



def fixLine(mat, rows, cols, toFix):
    N,M = mat.shape
    cpmat = mat.copy()
    maks = -1e9
    fixID = 0
    j = toFix[0]
    id_to_fix = []
    if(toFix[1] == 'C'):

        for i in range(0, N):
            sum = opt_dist(cpmat[i,:], rows[i])  
            sum += opt_dist(cpmat[:,j], cols[j])
            cpmat[i][j] = not cpmat[i][j]
            sum -= opt_dist(cpmat[i,:], rows[i])  
            sum -= opt_dist(cpmat[:,j], cols[j])
            if(sum == maks):
                id_to_fix.append(i)
            if(sum > maks):
                id_to_fix.clear()
                id_to_fix.append(i)
                maks = sum
            cpmat[i][j] = not cpmat[i][j]
        fixID = random.choice(id_to_fix)
        mat[fixID][j] = not mat[fixID][j]
    if(toFix[1] == 'R'):
        for i in range(0, M):
            sum = opt_dist(cpmat[j,:], rows[j])  
            sum += opt_dist(cpmat[:,i], cols[i])
            cpmat[j][i] = not cpmat[j][i]
            sum -= opt_dist(cpmat[j,:], rows[j])  
            sum -= opt_dist(cpmat[:,i], cols[i])
            if(sum == maks):
                id_to_fix.append(i)
            if(sum > maks):
                id_to_fix.clear()
                id_to_fix.append(i)
                maks = sum
            cpmat[j][i] = not cpmat[j][i]
        fixID = random.choice(id_to_fix)
        mat[j][fixID] = not mat[j][fixID]
        
        
def paint(N,M,rows,cols):
    matrix = startPos(N,M)
    test = 0
    while checkFinished(matrix,rows,cols) == False:   
        tofix = getRandomRowOrCol(matrix,rows,cols)
        fixLine(matrix,rows,cols,tofix)
        test += 1
        if test == 6*N*M:
            matrix = startPos(N,M)
            test = 0
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
                fo.write(toPaint)
            fo.write("\n")
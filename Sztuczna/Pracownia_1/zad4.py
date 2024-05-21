"""
1. sprawdzenie ile jest jedynek i jakie sa odleglosci miedzy nimi
2. 
"""

def opt_dist(NumberList, D):
    DistanceList = []
    i = 0
    for x in NumberList:
        if x == 0:
            i += 1
        else:
            DistanceList.append(i)
            i = 0

    ones = len(DistanceList)
    # jesli same zera
    if ones == 0:
        return D
    elif D == 1:
         return ones - 1
    elif D == 0:
        return ones

    changeCount = 0
    for index, value in enumerate(DistanceList[1:], start=1):
        changeCount += value
        if (index + changeCount + 1) == D:
            changeCount += (ones - index -1)
            return changeCount
        elif (index + changeCount + 1) > D:
            changeCount += (D - changeCount ) + (ones > 2) * (ones  - index - changeCount)
            return changeCount


with open("zad4_output.txt", 'w') as g:
    with open("zad4_input.txt", 'r') as f:
        for line in f:
            line = line.strip()
            line = line.split(" ")
            res = opt_dist([int(x) for x in list(line[0])], int(line[1]))
            g.write(str(res) + '\n')

        


"""
def poprawne(NumberList, D):
    min = 0
    count = 0
    a = NumberList[0]

    for i in range (D):
        if NumberList[i] == 0:
            count += 1
    min = count
    for i in range (D, len(NumberList)):
        b = NumberList[i]
        print(f"min = {min}, a = {a}, b = {b}, i = {i}")
        if b == 1 and a == 0:
            count -= 1
        if a == 1 and b == 0:
            count += 1
        # elif a == 0:
        #     count -= 1
        a = NumberList[i-D]
        if count < min:
            min = count
    return min
        

        
        

A = [0,0,1,0,0,0,1,0,0,0]

print(str(poprawne(A, 4)))

# print(str(poprawne(A, 5)))
# print(str(poprawne(A, 3)))
# print(str(poprawne(A, 2)))
# print(str(poprawne(A, 1)))
# print(str(poprawne(A, 0)))


# dla 010001
#     for index, value in enumerate(DistanceList[1:], start=1):
#         changeCount += value
#         #print(f"index = {index}, value = {value}, changeCount = {changeCount}")

#         if (index + changeCount + 1) == D:
#             changeCount += (ones - index -1)
#             return changeCount
#         elif (index + changeCount + 1) > D:
#             changeCount += (D - value)
#             return changeCount
    
# dziala dla 010101
    # for index, value in enumerate(DistanceList[1:], start=1):
    #     changeCount += value
    #     #print(f"index = {index}, value = {value}, changeCount = {changeCount}")

    #     if (index + changeCount + 1) == D:
    #         changeCount += (ones - index -1)
    #         return changeCount
    #     elif (index + changeCount + 1) > D:
    #         # jedynka zalezna od czegos
    #         print(f"D = {D}, changeCount = {changeCount}, index = {index}")
    #         changeCount += (D - changeCount + (ones  - index - changeCount))
    #         #               4  -    2       +   1     - 1   
    #         return changeCount
    #             #changeCount += (ones - index)
    
    # print("koniec")
"""
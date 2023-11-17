import random
import math

def pi_est(numOfThrows, sideOfSquare):
    r = sideOfSquare/2.0
    ltwo = 0
    cltwt = 0
    while numOfThrows >= 0:
        x = random.uniform(0.0, sideOfSquare)
        y = random.uniform(0.0, sideOfSquare)
        distance = d(x, r, y, r)

        if distance <= r:
            ltwo += 1

        cltwt += 1
        numOfThrows -= 1
        estimated_pi = (4*ltwo)/cltwt
        print(cltwt, estimated_pi)
        if (abs(estimated_pi - math.pi) <= 0.0001):
            break

def d(x1, x2, y1, y2):
    return abs(math.sqrt((x1-x2)**2 + (y1-y2)**2))

pi_est(1000000.0, 1.0)
import random as rand

# C - Clubs     ♧
# D - Diamonds  ♢  
# H - Hearts    ♥
# S - Spades    ♤

def countValues(hand):
    valCntr = {}
    for val in [card[0] for card in hand]:
        if val in valCntr:
            valCntr[val] += 1
        else:
            valCntr[val] = 1
    return valCntr.values()

def isInOrder(hand):
    order = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 
         '0': 10,'J' : 11, 'Q' : 12, 'K' : 13, 'A' : 14}
    
    vals = sorted([order[card[0]] for card in hand if card[0] != 'A'])
    inOdred = True
    for i in range(1, len(vals)):
        if vals[i - 1] + 1 != vals[i]:
            inOdred = False
    return inOdred

def colors(hand):
    return len(set([card[1] for card in hand]))

def highCard(hand):
    return max([card[0] for card in hand])

def pair(hand):
    return 2 in countValues(hand)

def twoPairs(hand):
    v = list(countValues(hand))
    v.sort()
    return len(v) == 3 and v[0] == 1 and v[1] == 2 and v[2] == 2

def three(hand):
    return 3 in countValues(hand)

def straight(hand):   
    return isInOrder(hand) and colors(hand) > 1

def flush(hand):
    return isInOrder(hand) == False and colors == 1

def full(hand):
    return pair(hand) and three(hand)

def four(hand):
    return 4 in countValues(hand)

def poker(hand):
    return isInOrder(hand) and colors(hand) == 1

def whatDoIHave(hand):
    if poker(hand): return 9
    if four(hand): return 8
    if full(hand): return 7
    if flush(hand): return 6
    if straight(hand): return 5
    if three(hand): return 4
    if twoPairs(hand): return 3
    if pair(hand): return 2
    return 1    

def randColor():
    return rand.choice(['C', 'D', 'H', 'S'])

def randHandBlotkarz():
    return [rand.choice(['2', '3', '4', '5', '6', '7', '8', '9', '0']) 
            + randColor() for _ in range(5)]

def randHandFigurant():
    return [rand.choice(['A', 'K', 'Q', 'J']) + randColor() for _ in range(5)]


def play(blotHand, figuHand):
    blot = whatDoIHave(blotHand)
    figu = whatDoIHave(figuHand)
    if blot > figu: 
        return 1
    
    if blot == figu and highCard(blotHand) > highCard(figuHand):
        return 1
    
    return 0 #figurant wygrywa


    

iters = 100000
blotWins = 0
for _ in range(iters):
    blotWins += play(randHandBlotkarz(), randHandFigurant())

print("# interations = {}".format(iters))
print("Blot won {} times".format(blotWins))
print("Succees ratio: {}".format(blotWins/iters))
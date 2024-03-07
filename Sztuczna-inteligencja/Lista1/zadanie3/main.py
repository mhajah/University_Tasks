import random as rand

def checkOrder(hand):
    order = {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 
         '0': 10,'J' : 11, 'Q' : 12, 'K' : 13, 'A' : 14}
    
    vals = sorted([order[card[0]] for card in hand if card[0] != 'A'])
    isOrder = True
    for i in range(1, len(vals)):
        if vals[i - 1] + 1 != vals[i]:
            isOrder = False
    return isOrder

def colorCounter(hand):
    valCntr = {}
    for val in [card[0] for card in hand]:
        if val in valCntr:
            valCntr[val] += 1
        else:
            valCntr[val] = 1
    return valCntr.values()

# ile kolorów w ręcę
def colors(hand):
    return len(set([card[1] for card in hand]))

def highCard(hand):
    return max([card[0] for card in hand])

def pair(colorSet):
    return 2 in colorSet

def twoPairs(colorSet):
    v = list(colorSet)
    v.sort()
    return len(v) == 3 and v[0] == 1 and v[1] == 2 and v[2] == 2

def three(colorSet):
    return 3 in colorSet

def straight(hand, isOrder):   
    return isOrder and colors(hand) > 1

def flush(hand, isOrder):
    return isOrder == False and colors(hand) == 1

def full(colorSet):
    return pair(colorSet) and three(colorSet)

def four(colorSet):
    return 4 in colorSet

def poker(hand, isOrder):
    return isOrder and colors(hand) == 1

def handValue(hand, colorSet, isOrder):
    if poker(hand, isOrder): return 9
    if four(colorSet): return 8
    if full(colorSet): return 7
    if flush(hand, isOrder): return 6
    if straight(hand, isOrder): return 5
    if three(colorSet): return 4
    if twoPairs(colorSet): return 3
    if pair(colorSet): return 2
    return 1    

def randColor():
    return rand.choice(['C', 'D', 'H', 'S'])

def randHand(size):
    return set([rand.choice(['2', '3', '4', '5', '6', '7', '8', '9', '0']) 
            + randColor() for _ in range(size)])

def randHandBlotkarz():
    return [rand.choice(['2', '3', '4', '5', '6', '7', '8', '9', '0']) 
            + randColor() for _ in range(5)]

def randHandFigurant():
    return [rand.choice(['A', 'K', 'Q', 'J']) + randColor() for _ in range(5)]

def start(blotkarzHand, figurantHand):
    blotkarzColors = colorCounter(blotkarzHand)
    figurantColors = colorCounter(figurantHand)
    blotkarzIsOrder = checkOrder(blotkarzHand)
    figurantIsOrder = checkOrder(figurantHand)
    blot = handValue(blotkarzHand, blotkarzColors, blotkarzIsOrder)
    figu = handValue(figurantHand, figurantColors, figurantIsOrder)
    if blot > figu: 
        return 1
    
    if blot == figu and highCard(blotkarzHand) > highCard(figurantHand):
        return 1
    
    return 0 #figurant wygrywa


hand_size = 12
iters = 1000

while True:
    wins = 0
    blotkarz_hand = randHand(hand_size)
    for _ in range(iters):
        dobrane_karty_blot = rand.sample(sorted(blotkarz_hand), 5)
        wins += start(dobrane_karty_blot, randHandFigurant())
    current_win_rate = wins / iters
    #print("{} / {}".format( wins, iters))
    if current_win_rate > 0.5:
        break

print(blotkarz_hand)

print("Win rate: {}%".format(current_win_rate * 100))
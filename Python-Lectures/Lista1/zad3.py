import numpy as np

def tabliczka(x1, x2, y1, y2, d):
    # Listy tworzace!!
    vecX = list(np.arange(x1, x2+1.0, d))
    vecY = list(np.arange(y1, y2+1.0, d))
    
    frow = " ".join([str(x) for x in vecX])
    print(f"{frow :>10}")
    for y in vecY:
        iloczyny = [str(x * y) for x in vecX]
        row = ' '.join(iloczyny)
        print("{:<5} {}".format(y, row))


tabliczka(3.0, 9.0, 2.0, 6.0, 1.0)
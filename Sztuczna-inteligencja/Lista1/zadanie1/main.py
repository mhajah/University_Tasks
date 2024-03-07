import os
import queue

from debug import debug_print

class chess():
    def __init__(self, color, wking, rook, bking):
        self.color = color
        self.wking = wking
        self.rook = rook
        self.bking = bking
        self.board = set([chr(col + ord('a')) + chr(row + ord('1')) 
                            for col in range(0, 8) for row in range(0,8)])
        self.visited = {}
    
    # Prints the board
    def board_print(self):
        debug_print(self.wking, self.rook, self.bking)
    
    # Zamiana z szachowej notacji (np. "a1") na koordynaty na planszy (np. (0,0))
    def coords(self, s):
        column = ord(s[0]) - ord('a')
        row = ord(s[1]) - ord('1')
        return column, row

    # Zamiana z koordynatów na planszy na notację szachową (np. (0,0) -> "a1")
    def chessNotation(self, col, row):
        return str(chr(col + ord('a'))) + str(chr(row + ord('1'))) 

    # Pola osiągalne przez wieze
    def generateRookMoves(self, obstacles):
        attacks = [self.rook]
        col, row = self.coords(self.rook)

        # Góra
        r = row - 1
        while r >= 0:
            attacks.append(self.chessNotation(col, r))
            if (col, r) in obstacles: break #czy stoi na przeszkodzie?
            r -= 1  
        # Dół
        r = row + 1
        while r < 8:
            attacks.append(self.chessNotation(col, r))
            if (col, r) in obstacles: break
            r += 1  
        # Lewo
        c = col - 1
        while c >= 0:
            attacks.append(self.chessNotation(c, row))
            if (c, row) in obstacles: break
            c -= 1 
        # Prawo
        c = col + 1
        while c < 8:
            attacks.append(self.chessNotation(c, row))
            if (c, row) in obstacles: break
            c += 1 

        return set(attacks)

    # Pozycje atakowane przez króla
    def kingAttacks(self, king):
        attacks = []
        col, row = self.coords(king)

        # Definiujemy kierunki, w których król może się poruszać
        directions = [(dx, dy) for dx in range(-1, 2) for dy in range(-1, 2) if (dx, dy) != (0, 0)]

        # Iterujemy przez wszystkie możliwe kierunki
        for dx, dy in directions:
            new_col, new_row = col + dx, row + dy
            position = self.chessNotation(new_col, new_row)

            # Dodajemy pozycję do ataków, jeśli znajduje się na planszy
            if position in self.board:
                attacks.append(position)

        return set(attacks)

    # Możliwe ataki białej wieży (jedyną przeszkodą jest biały król)
    def rookPossibleAttacks(self):
        return self.generateRookMoves([self.wking]) - set([self.rook])

    # Możliwe ruchy białej wieży (przeszkodą jest zarówno biały, jak i czarny król)
    def rookPossibleMoves(self):
        white_rook_moves = self.generateRookMoves([self.coords(self.wking), self.coords(self.bking)])
        black_king_attacks = self.kingAttacks(self.bking)
        valid_moves = white_rook_moves - black_king_attacks
        return valid_moves - set([self.wking, self.bking])
    
    def whiteKingPossibleMoves(self):
        return self.kingAttacks(self.wking) - self.kingAttacks(self.bking) - set([self.rook])

    def blackKingPossibleMoves(self):
        return self.kingAttacks(self.bking) - self.kingAttacks(self.wking) - self.rookPossibleAttacks() 

    def isCheckmate(self):
        return (self.bking in self.whiteKingPossibleMoves() \
             or self.bking in self.rookPossibleAttacks()) \
             and self.blackKingPossibleMoves() == set()
    
    def isStalemate(self):
        if self.color == "black":
            return self.blackKingPossibleMoves() == set() and not self.isCheckmate()

    # Wszystkie możliwe ruchy
    def generateAllPossibleMoves(self):
        if self.color == "black":
            return [("white", self.wking, self.rook, bking) for bking in self.blackKingPossibleMoves()]

        elif self.color == "white":
            return [("black", wking, self.rook, self.bking) for wking in self.whiteKingPossibleMoves()] \
                    + [("black", self.wking, rook, self.bking) for rook in self.rookPossibleMoves()]

    def start(self):
      
        initial = (self.color, self.wking, self.rook, self.bking)
        
        q = queue.Queue()
        q.put( initial )

        self.visited = { initial: (0, initial) }
        
        while q.empty() == False and self.isCheckmate() == False:
            # if(self.isStalemate()):
            #     return "INF"
            
            current = q.get() 
            self.color, self.wking, self.rook, self.bking = current
            depth, _ = self.visited[current]

            for move in self.generateAllPossibleMoves():
                if move not in self.visited:
                    self.visited[move] = (depth + 1,  current)
                    q.put(move)
        return depth


    def debug(self):
        current = (self.color, self.wking, self.rook, self.bking)
        hist = []
        
        while True:
                          # para: (depth, current)
            depth, prev = self.visited[current]
            if depth == 0:
                break
            hist.insert(0, (prev, depth))
            current = prev            

        for h in hist:
            (color, wking, rook, bking), depth = h            
            debug_print(wking, rook, bking)
            input()

        self.board_print()

if __name__ == '__main__':
    
    finput  = 'zad1_input.txt'
    foutput = 'zad1_output.txt'

    fout = open(foutput,"w") 

    with open(finput) as f:
        for line in f:
            color, wking, rook, bking = line.strip().split(" ")
            chessBoard = chess(color, wking, rook, bking)
            print(chessBoard.start(), file=fout)
            
            #chessBoard.debug()
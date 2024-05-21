#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import random
import sys
import math
import copy
from collections import defaultdict

class WrongMove(Exception):
    pass

class Jungle:
    PIECE_VALUES = {
        0: 4,
        1: 1,
        2: 2,
        3: 3,
        4: 5,
        5: 7,
        6: 8,
        7: 10
    }
    MAXIMAL_PASSIVE = 30
    DENS_DIST = 0.1
    MX = 7
    MY = 9
    traps = {(2, 0), (4, 0), (3, 1), (2, 8), (4, 8), (3, 7)}
    ponds = {(x, y) for x in [1, 2, 4, 5] for y in [3, 4, 5]}
    dens = [(3, 8), (3, 0)]
    dirs = [(0, 1), (1, 0), (-1, 0), (0, -1)]

    rat, cat, dog, wolf, jaguar, tiger, lion, elephant = range(8)

    def __init__(self):
        self.board = self.initial_board()
        self.pieces = {0: {}, 1: {}}

        for y in range(Jungle.MY):
            for x in range(Jungle.MX):
                C = self.board[y][x]
                if C:
                    pl, pc = C
                    self.pieces[pl][pc] = (x, y)
        self.curplayer = 0
        self.peace_counter = 0
        self.winner = None

    def initial_board(self):
        pieces = """
        L.....T
        .D...C.
        R.J.W.E
        .......
        .......
        .......
        e.w.j.r
        .c...d.
        t.....l
        """

        B = [x.strip() for x in pieces.split() if len(x) > 0]
        T = dict(zip('rcdwjtle', range(8)))

        res = []
        for y in range(9):
            raw = 7 * [None]
            for x in range(7):
                c = B[y][x]
                if c != '.':
                    if 'A' <= c <= 'Z':
                        player = 1
                    else:
                        player = 0
                    raw[x] = (player, T[c.lower()])
            res.append(raw)
        return res

    def random_move(self, player):
        ms = self.moves(player)
        if ms:
            return random.choice(ms)
        return None

    def can_beat(self, p1, p2, pos1, pos2):
        if pos1 in Jungle.ponds and pos2 in Jungle.ponds:
            return True  # rat vs rat
        if pos1 in Jungle.ponds:
            return False  # rat in pond cannot beat any piece on land
        if p1 == Jungle.rat and p2 == Jungle.elephant:
            return True
        if p1 == Jungle.elephant and p2 == Jungle.rat:
            return False
        if p1 >= p2:
            return True
        if pos2 in Jungle.traps:
            return True
        return False

    def pieces_comparison(self):
        for i in range(7,-1,-1):
            ps = []
            for p in [0,1]:
                if i in self.pieces[p]:
                    ps.append(p)
            if len(ps) == 1:
                return ps[0]
        return None
                
    def rat_is_blocking(self, player_unused, pos, dx, dy):        
        x, y = pos
        nx = x + dx
        for player in [0,1]:
            if Jungle.rat not in self.pieces[1-player]:
                continue
            rx, ry = self.pieces[1-player][Jungle.rat]
            if (rx, ry) not in self.ponds:
                continue
            if dy != 0:
                if x == rx:
                    return True
            if dx != 0:
                if y == ry and abs(x-rx) <= 2 and abs(nx-rx) <= 2:
                    return True
        return False

    def draw(self):
        TT = {0: 'rcdwjtle', 1: 'RCDWJTLE'}
        for y in range(Jungle.MY):

            L = []
            for x in range(Jungle.MX):
                b = self.board[y][x]
                if b:
                    pl, pc = b
                    L.append(TT[pl][pc])
                else:
                    L.append('.')
            print(''.join(L))
        print('')

    def moves(self, player):
        res = []
        for p, pos in self.pieces[player].items():
            x, y = pos
            for (dx, dy) in Jungle.dirs:
                pos2 = (nx, ny) = (x+dx, y+dy)
                if 0 <= nx < Jungle.MX and 0 <= ny < Jungle.MY:
                    if Jungle.dens[player] == pos2:
                        continue
                    if pos2 in self.ponds:
                        if p not in (Jungle.rat, Jungle.tiger, Jungle.lion):
                            continue
                        #if self.board[ny][nx] is not None:
                        #    continue  # WHY??
                        if p == Jungle.tiger or p == Jungle.lion:
                            if dx != 0:
                                dx *= 3
                            if dy != 0:
                                dy *= 4
                            if self.rat_is_blocking(player, pos, dx, dy):
                                continue
                            pos2 = (nx, ny) = (x+dx, y+dy)
                    if self.board[ny][nx] is not None:
                        pl2, piece2 = self.board[ny][nx]
                        if pl2 == player:
                            continue
                        if not self.can_beat(p, piece2, pos, pos2):
                            continue
                    res.append((pos, pos2))
        return res

    def victory(self, player):
        oponent = 1-player        
        if len(self.pieces[oponent]) == 0:
            self.winner = player
            return True

        x, y = self.dens[oponent]
        if self.board[y][x]:
            self.winner = player
            return True
        
        # mozna usunac
        if self.peace_counter >= Jungle.MAXIMAL_PASSIVE:
            r = self.pieces_comparison()
            if r is None:
                self.winner = 1 # draw is second player's victory 
            else:
                self.winner = r
            return True
        return False

    def do_move(self, m):
        self.curplayer = 1 - self.curplayer
        if m is None:
            return
        pos1, pos2 = m
        x, y = pos1
       # if self.board[y][x]:
        pl, pc = self.board[y][x]

        x2, y2 = pos2
        if self.board[y2][x2]:  # piece taken!
            pl2, pc2 = self.board[y2][x2]
            del self.pieces[pl2][pc2]
            self.peace_counter = 0
        else:
            self.peace_counter += 1    

        self.pieces[pl][pc] = (x2, y2)
        self.board[y2][x2] = (pl, pc)
        self.board[y][x] = None

    def update(self, player, move_string):
        assert player == self.curplayer
        move = tuple(int(m) for m in move_string.split())
        if len(move) != 4:
            raise WrongMove
        possible_moves = self.moves(player)
        if not possible_moves:
            if move != (-1, -1, -1, -1):
                raise WrongMove
            move = None
        else:
            move = ((move[0], move[1]), (move[2], move[3]))
            if move not in possible_moves:
                raise WrongMove
        self.do_move(move)
        
        if self.victory(player):
            assert self.winner is not None
            return 2 * self.winner - 1
        else:
            return None
    
    def simulation(self, player):
        move_count = 0
        curr_player = player

        while self.winner == None:
            move = self.random_move(curr_player)
            self.do_move(move)
            move_count += 1
            curr_player = 1 - curr_player
            self.victory(curr_player)

        if self.winner == player:
            return 1, move_count
        else:
            return -1, move_count


    def choose_move(self, player):
        moves = self.moves(player)
        if not moves:
            return None

        game_copy = copy.deepcopy(self)

        set_cnt = {move: 0 for move in moves}
        total_moves = 0 
        while total_moves < 20000:
            for move in moves: 
                self = copy.deepcopy(game_copy)
                self.do_move(move)
                (won, moves_cnt) = self.simulation(player)
                total_moves += moves_cnt
                if won == player:
                    set_cnt[move] += 1
                if total_moves > 20000:
                    break

        max_value = max(set_cnt.values())
        self = copy.deepcopy(game_copy)
        max_value_keys = [key for key, value in set_cnt.items() if value == max_value]

        return random.choice(max_value_keys)

class Player(object):
    def __init__(self):
        self.reset()

    def reset(self):
        self.game = Jungle()
        self.my_player = 1
        self.say('RDY')

    def say(self, what):
        sys.stdout.write(what)
        sys.stdout.write('\n')
        sys.stdout.flush()

    def hear(self):
        line = sys.stdin.readline().split()
        return line[0], line[1:]


    def is_end(self, player):
        if self.game.dens[0] != None:
            return 1
        elif self.game.dens[1] != None:
            return -1
        return None 

    def loop(self):
        while True:
            cmd, args = self.hear()
            if cmd == 'HEDID':
                unused_move_timeout, unused_game_timeout = args[:2]
                move = tuple((int(m) for m in args[2:]))
                if move == (-1, -1, -1, -1):
                    move = None
                else:
                    xs, ys, xd, yd = move
                    move = ( (xs, ys), (xd, yd))
                        
                self.game.do_move(move)
            elif cmd == 'ONEMORE':
                self.reset()
                continue
            elif cmd == 'BYE':
                break
            else:
                assert cmd == 'UGO'
                #assert not self.game.move_list
                self.my_player = 0

            move = self.game.choose_move(self.my_player)
            self.game.do_move(move)
            if move ==None: 
                move = (-1, -1, -1, -1)
            else:
                move = (move[0][0], move[0][1], move[1][0], move[1][1])
            self.say('IDO %d %d %d %d' % move)

if __name__ == '__main__':
    player = Player()
    player.loop()


# def simulate_games(N,draw_board=False):
#     play = Player()
#     player0_wins = 0
#     player1_wins = 0
#     draw_cnt=0
#     print("Gracz 0: simulation, Gracz 1: random_choice")
#     for _ in range(N):
#         game = Jungle()
#         player=0 
#         player_0=random.choice([0,1])#kto zaczyna
#         moves_cnt = 0
#         while play.game.terminal() ==-1: 
#             if draw_board: 
#                 print("move number",moves_cnt)
#                 game.draw()
#             moves_cnt+=1
#             if player==player_0:
#                 move = play.game.choose_move(player)
#             else:
#                 move = play.game.choose_move(player)
#             play.game.do_move(move)

#             player = 1 - player  # Zmiana gracza
#         result = play.game.terminal()
#         if result ==player_0:
#             player0_wins += 1
#             print("P0 WON")
#         elif result == 1-player_0:
#             player1_wins += 1
#             print("P1 WON")
#         else: 
#             print("DRAW")
#             draw_cnt+=1

#     print("P0:"+str(player0_wins)+" P1:"+str(player1_wins)+" D:"+str(draw_cnt))

# simulate_games(10,False)
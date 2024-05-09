import random
from copy import deepcopy
import numpy as np
import math

class Reversi:
    M = 8
    DIRS = [(0, 1), (1, 0), (-1, 0), (0, -1), (1, 1), (-1, -1), (1, -1), (-1, 1)]
    def __init__(self):
        self.board = self.initial_board()
        self.fields = set()
        self.move_list = []
        self.history = []
        for i in range(self.M):
            for j in range(self.M):
                if self.board[i][j] is None:
                    self.fields.add((j, i))

    def initial_board(self):
        B = [[None] * self.M for _ in range(self.M)]
        B[3][3] = 1
        B[4][4] = 1
        B[3][4] = 0
        B[4][3] = 0
        return B

    def moves(self, player):
        res = []
        for (x, y) in self.fields:
            if any(self.can_beat(x, y, direction, player)
                   for direction in self.DIRS):
                res.append((x, y))
        return res

    def can_beat(self, x, y, d, player):
        dx, dy = d
        x += dx
        y += dy
        cnt = 0
        while self.get(x, y) == 1 - player:
            x += dx
            y += dy
            cnt += 1
        return cnt > 0 and self.get(x, y) == player

    def get(self, x, y):
        if 0 <= x < self.M and 0 <= y < self.M:
            return self.board[y][x]
        return None

    def do_move(self, move, player):
        self.history.append([x[:] for x in self.board])
        self.move_list.append(move)

        if move is None:
            return
        x, y = move
        x0, y0 = move
        self.board[y][x] = player
        self.fields -= set([move])
        for dx, dy in self.DIRS:
            x, y = x0, y0

            to_beat = []
            x += dx
            y += dy
            #print(x)
            #print(y)
            #print("\n")
            while self.get(x, y) == 1 - player:
                to_beat.append((x, y))
                x += dx
                y += dy
            if self.get(x, y) == player:
                for (nx, ny) in to_beat:
                    self.board[ny][nx] = player

    def result(self):
        res = 0
        for y in range(self.M):
            for x in range(self.M):
                b = self.board[y][x]
                if b == 0:
                    res -= 1
                elif b == 1:
                    res += 1
        return res

    def random_move(self, player):
        ms = self.moves(player) 
        if ms: 
            return random.choice(ms) 
        return None

    def is_game_over(self):
        if not self.fields: 
            return True
        if len(self.move_list) < 2: 
            return False
        return self.move_list[-1] == self.move_list[-2] == None 


    def reverse_move(self):
        h = self.history.pop(-1)
        self.board = h
        s = set([self.move_list.pop(-1)])
        self.fields = self.fields | s


class Game:
    M = 8
    def __init__(self):
        self.our_position = random.choice([0, 1])
        self.player = 1
        self.reversi = Reversi()

    def heuristic(self, board): 

        player = 1

        board_arr = board.board 
        player_moves = len(board.moves(player))  
        opponent_moves = len(board.moves(1 - player)) 

        opponent_counter, player_counter = 0, 0 
        for a in [0, self.M - 1]:
            for b in [0, self.M - 1]:
                if board_arr[a][b] == 1:
                    player_counter += 1
                elif board_arr[a][b] == 0:
                    opponent_counter += 1

       
        disks_diff = player_counter - opponent_counter

        
        p_corner_points, o_corner_points = 0, 0

        if board_arr[0][0] is None:
            corner1 = [board_arr[0][1], board_arr[1][0], board_arr[1][1]]
            p_corner_points += corner1.count(player)
            o_corner_points += corner1.count(1 - player)
        if board_arr[self.M - 1][self.M - 1] is None:
            corner2 = [board_arr[self.M - 1][self.M - 2], board_arr[self.M - 2][self.M - 1], board_arr[self.M - 2][self.M - 2]]
            p_corner_points += corner2.count(player)
            o_corner_points += corner2.count(1 - player)
        if board_arr[0][self.M - 1] is None:
            corner3 = [board_arr[1][self.M - 1], board_arr[0][self.M - 2], board_arr[1][self.M - 2]]
            p_corner_points += corner3.count(player)
            o_corner_points += corner3.count(1 - player)
        if board_arr[self.M - 1][0] is None:
            corner4 = [board_arr[self.M - 1][1], board_arr[self.M - 2][0], board_arr[self.M - 2][1]]
            p_corner_points += corner4.count(player)
            o_corner_points += corner4.count(1 - player)

        corner_diff =  p_corner_points - o_corner_points

        if player_moves > opponent_moves:
            m = (100 * player_moves) / (player_moves + opponent_moves)
            #print("Player wiecej = " + str(player_moves - opponent_moves))
        elif player_moves < opponent_moves:
            m = -(100 * opponent_moves) / (player_moves + opponent_moves)
            #print("Oponent wiecej = " + str(player_moves - opponent_moves))
        else:
            m = 0

        v = 200 * disks_diff - 10 * corner_diff +  m
        return v

    def minimax_move(self, player, depth, board):
        best_move = None
        if depth == 0 or board.is_game_over():
            v = self.heuristic(board)
            return v, best_move
        moves = board.moves(player)
        if len(moves) == 0:
            v = self.heuristic(board)
            return v, best_move
        if player:
            value = -math.inf
            for move in moves:
                board.do_move(move, player)
                new_value, _ = self.minimax_move(1 - player, depth - 1, board)
                board.reverse_move()
                if new_value > value:
                    value = new_value
                    best_move = move
            return value, best_move
        else:
            value = math.inf
            for move in moves:
                board.do_move(move, player)
                new_value, _ = self.minimax_move(1 - player, depth - 1, board)
                board.reverse_move()
                if new_value < value:
                    value = new_value
                    best_move = move
            return value, best_move

    def play(self):
        depth = 2
        while not self.reversi.is_game_over():
            if self.player == self.our_position:
                val, move = self.minimax_move(self.player, depth, self.reversi)
            else:
                move = self.reversi.random_move(self.player)
            self.reversi.do_move(move, self.player)
            self.player = 1 - self.player

        if self.our_position:
            return self.reversi.result() > 0
        else:
            return self.reversi.result() < 0



board = Reversi()
print(board.moves(1))

board.do_move((4, 2), 1)
wins = 0
for i in range(1000):
    g = Game()
    if g.play():
        #print(str(i) + ". wygrana")
        wins += 1
    #else:
        #print(str(i) + ". przegrana")
print("wygrano: " + str(wins))

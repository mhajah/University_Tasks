import random
import math
import sys

class Reversi:
    BOARD_SIZE = 8
    DIRECTIONS = [(0, 1), (1, 0), (-1, 0), (0, -1), (1, 1), (-1, -1), (1, -1), (-1, 1)]
    
    def __init__(self):
        self.board = self.initialize_board()
        self.empty_fields = set()
        self.moves_history = []
        self.board_history = []
        for row in range(self.BOARD_SIZE):
            for col in range(self.BOARD_SIZE):
                if self.board[row][col] is None:
                    self.empty_fields.add((col, row))

    def initialize_board(self):
        initial_board = [[None] * self.BOARD_SIZE for _ in range(self.BOARD_SIZE)]
        initial_board[3][3] = 1
        initial_board[4][4] = 1
        initial_board[3][4] = 0
        initial_board[4][3] = 0
        return initial_board

    def available_moves(self, player):
        valid_moves = []
        for (x, y) in self.empty_fields:
            if any(self.can_capture(x, y, direction, player) for direction in self.DIRECTIONS):
                valid_moves.append((x, y))
        return valid_moves

    def can_capture(self, x, y, direction, player):
        dx, dy = direction
        x += dx
        y += dy
        captured_count = 0
        while self.get_field(x, y) == 1 - player:
            x += dx
            y += dy
            captured_count += 1
        return captured_count > 0 and self.get_field(x, y) == player

    def get_field(self, x, y):
        if 0 <= x < self.BOARD_SIZE and 0 <= y < self.BOARD_SIZE:
            return self.board[y][x]
        return None

    def make_move(self, move, player):
        self.board_history.append([row[:] for row in self.board])
        self.moves_history.append(move)

        if move is None:
            return
        x, y = move
        x0, y0 = move
        self.board[y][x] = player
        self.empty_fields -= {move}
        for dx, dy in self.DIRECTIONS:
            x, y = x0, y0

            captured_disks = []
            x += dx
            y += dy
            while self.get_field(x, y) == 1 - player:
                captured_disks.append((x, y))
                x += dx
                y += dy
            if self.get_field(x, y) == player:
                for (nx, ny) in captured_disks:
                    self.board[ny][nx] = player

    def evaluate_result(self):
        score = 0
        for row in range(self.BOARD_SIZE):
            for col in range(self.BOARD_SIZE):
                disk = self.board[row][col]
                if disk == 0:
                    score -= 1
                elif disk == 1:
                    score += 1
        return score

    def random_move(self, player):
        moves = self.available_moves(player) 
        if moves: 
            return random.choice(moves) 
        return None

    def is_game_over(self):
        if not self.empty_fields: 
            return True
        if len(self.moves_history) < 2: 
            return False
        return self.moves_history[-1] == self.moves_history[-2] == None 

    def undo_move(self):
        previous_board = self.board_history.pop(-1)
        self.board = previous_board
        last_move = self.moves_history.pop(-1)
        self.empty_fields = self.empty_fields | {last_move}

    def print_board(self):
        for row in self.board:
            print(' '.join(['-' if x is None else str(x) for x in row]))
        print()


class Game:
    BOARD_SIZE = 8
    
    def __init__(self, verbose=False):
        self.player_color = random.choice([0, 1])
        self.current_player = 1
        self.reversi = Reversi()
        self.verbose = verbose

    def heuristic(self, board): 
        player = 1
        board_state = board.board 
        player_moves_count = len(board.available_moves(player))  
        opponent_moves_count = len(board.available_moves(1 - player)) 

        opponent_disks, player_disks = 0, 0 
        for a in [0, self.BOARD_SIZE - 1]:
            for b in [0, self.BOARD_SIZE - 1]:
                if board_state[a][b] == 1:
                    player_disks += 1
                elif board_state[a][b] == 0:
                    opponent_disks += 1

        disks_difference = player_disks - opponent_disks

        player_corner_points, opponent_corner_points = 0, 0

        if board_state[0][0] is None:
            corner1 = [board_state[0][1], board_state[1][0], board_state[1][1]]
            player_corner_points += corner1.count(player)
            opponent_corner_points += corner1.count(1 - player)
        if board_state[self.BOARD_SIZE - 1][self.BOARD_SIZE - 1] is None:
            corner2 = [board_state[self.BOARD_SIZE - 1][self.BOARD_SIZE - 2], board_state[self.BOARD_SIZE - 2][self.BOARD_SIZE - 1], board_state[self.BOARD_SIZE - 2][self.BOARD_SIZE - 2]]
            player_corner_points += corner2.count(player)
            opponent_corner_points += corner2.count(1 - player)
        if board_state[0][self.BOARD_SIZE - 1] is None:
            corner3 = [board_state[1][self.BOARD_SIZE - 1], board_state[0][self.BOARD_SIZE - 2], board_state[1][self.BOARD_SIZE - 2]]
            player_corner_points += corner3.count(player)
            opponent_corner_points += corner3.count(1 - player)
        if board_state[self.BOARD_SIZE - 1][0] is None:
            corner4 = [board_state[self.BOARD_SIZE - 1][1], board_state[self.BOARD_SIZE - 2][0], board_state[self.BOARD_SIZE - 2][1]]
            player_corner_points += corner4.count(player)
            opponent_corner_points += corner4.count(1 - player)

        corner_difference =  player_corner_points - opponent_corner_points

        if player_moves_count > opponent_moves_count:
            mobility = (100 * player_moves_count) / (player_moves_count + opponent_moves_count)
        elif player_moves_count < opponent_moves_count:
            mobility = -(100 * opponent_moves_count) / (player_moves_count + opponent_moves_count)
        else:
            mobility = 0

        board_value = 200 * disks_difference - 10 * corner_difference +  mobility
        return board_value

    def minimax_decision(self, player, depth, board):
        best_move = None
        if depth == 0 or board.is_game_over():
            board_value = self.heuristic(board)
            return board_value, best_move
        available_moves = board.available_moves(player)
        if not available_moves:
            board_value = self.heuristic(board)
            return board_value, best_move
        if player:
            max_value = -math.inf
            for move in available_moves:
                board.make_move(move, player)
                new_value, _ = self.minimax_decision(1 - player, depth - 1, board)
                board.undo_move()
                if new_value > max_value:
                    max_value = new_value
                    best_move = move
            return max_value, best_move
        else:
            min_value = math.inf
            for move in available_moves:
                board.make_move(move, player)
                new_value, _ = self.minimax_decision(1 - player, depth - 1, board)
                board.undo_move()
                if new_value < min_value:
                    min_value = new_value
                    best_move = move
            return min_value, best_move

    def play_game(self):
        search_depth = 2
        while not self.reversi.is_game_over():
            if self.verbose:
                print("Current board:")
                self.reversi.print_board()
            if self.current_player == self.player_color:
                val, move = self.minimax_decision(self.current_player, search_depth, self.reversi)
                if self.verbose:
                    print(f"AI moves: {move}")
            else:
                move = self.reversi.random_move(self.current_player)
                if self.verbose:
                    print(f"Random moves: {move}")
            self.reversi.make_move(move, self.current_player)
            self.current_player = 1 - self.current_player

        if self.verbose:
            print("Final board:")
            self.reversi.print_board()
        if self.player_color:
            return self.reversi.evaluate_result() > 0
        else:
            return self.reversi.evaluate_result() < 0


verbose = False 
if len(sys.argv) > 1 and sys.argv[1] == '--verbose':
        verbose = True

game_board = Reversi()
print(game_board.available_moves(1))

game_board.make_move((4, 2), 1)
win_count = 0
for _ in range(1000):
    game_instance = Game(verbose=verbose)
    if game_instance.play_game():
        win_count += 1
print("Wins: " + str(win_count))

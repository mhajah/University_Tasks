import random
import chess
from queue import PriorityQueue
from itertools import count
from stockfish import Stockfish

stockfish = Stockfish()


class Weights:
    def __init__(self):
        self.PAWN = 1
        self.KNIGHT = random.randint(0, 10)
        self.BISHOP = random.randint(0, 10)
        self.ROOK = random.randint(0, 10)
        self.QUEEN = random.randint(0, 10)

    def print_weights(self):
        output_string = "Weights: "
        output_string += str(self.PAWN) + " " 
        output_string += str(self.KNIGHT) + " "
        output_string += str(self.BISHOP) + " " 
        output_string += str(self.ROOK) + " "
        output_string += str(self.QUEEN)
        return output_string


class Agent:
    def __init__(self, id):
        self.weights = Weights()
        self.alpha = random.random()
        self.score = 0
        self.id = id
        self.wins = 0

    def heur(self, board, legal_moves):
        if board.is_checkmate():
            return 9999

        wp = len(board.pieces(chess.PAWN, not board.turn)) 
        bp = len(board.pieces(chess.PAWN, board.turn))
        wk = len(board.pieces(chess.KNIGHT, not board.turn))
        bk = len(board.pieces(chess.KNIGHT, board.turn))
        wb = len(board.pieces(chess.BISHOP, not board.turn))
        bb = len(board.pieces(chess.BISHOP, board.turn))
        wr = len(board.pieces(chess.ROOK, not board.turn))
        br = len(board.pieces(chess.ROOK, board.turn))
        wq = len(board.pieces(chess.QUEEN, not board.turn))
        bq = len(board.pieces(chess.QUEEN, board.turn))

        weightofallfigures = self.weights.PAWN * (wp - bp) 
        weightofallfigures += self.weights.KNIGHT * (wk - bk)
        weightofallfigures += self.weights.BISHOP * (wb - bb)  
        weightofallfigures += self.weights.ROOK *(wr - br) 
        weightofallfigures += self.weights.QUEEN * (wq - bq)

        enemy_legal_moves = len(list(board.legal_moves))

        heuristic = weightofallfigures + self.alpha * (legal_moves - enemy_legal_moves)
        return heuristic


    def best_move(self, board):
        moves = board.legal_moves

        if random.random() < 0.05:
            return random.choice(list(moves))

        queue = PriorityQueue()
        unique = count()

        for move in moves:
            legal_moves = len(list(board.legal_moves))
            board.push(move)
            t = (-self.heur(board, legal_moves), next(unique), move) 
            board.pop()
            queue.put(t)

        best_move = queue.get()
        return best_move[2] 

    def update_score(self, score):
        if score == 1:
            self.wins += 1
        self.score += score

    def print(self):
        with open('zad02.txt', 'a') as out:
            out.write("Agent " + str(self.id) + "\n")
            out.write("Score: " + str(self.score)+ "\n")
            out.write("Wins: " + str(self.wins)+ "\n")
            out.write(self.weights.print_weights()+ "\n")
            out.write("Alpha: " + str(self.alpha)+"\n" +"\n")


class Game:
    def __init__(self, white, black):
        self.board = chess.Board()
        self.moves_cnt = 0
        self.white = white
        self.black = black

    def do_move(self, move):
        self.board.push(move)

    def result(self):
        stockfish.set_fen_position(self.board.fen()) 
        result = stockfish.get_evaluation() 
        if result["value"] > 0:
            return (1, 0)
        elif result["value"] == 0:
            return (0.5, 0.5)
        return (0, 1)

    def terminal(self):
        return self.moves_cnt >= 100 or bool(self.board.outcome()) 

    def play(self):
        while True:
            if self.board.turn: 
                self.do_move(self.white.best_move(self.board))
                self.moves_cnt += 1 
            else: 
                self.do_move(self.black.best_move(self.board))

            if self.terminal():
                break

        return self.result() 


class Simulation:
    def __init__(self, agents_num):
        self.agents = [] 
        self.agents_num = agents_num 
        for id in range(self.agents_num): 
            self.agents.append(Agent(id))
        self.run() 
        self.print_results() 

    def run(self):
        cnt = 0
        for i in range(self.agents_num): 
            for j in range(self.agents_num):
                print(cnt)
                cnt += 1
                if i != j: 
                    G = Game(self.agents[i], self.agents[j])
                    result = G.play() 
                    self.agents[i].update_score(result[0]) 
                    self.agents[j].update_score(result[1])

    def print_results(self):
        self.agents.sort(key=lambda x: x.score, reverse=True)
        for i in range(self.agents_num):
            self.agents[i].print()


Simulation(100)
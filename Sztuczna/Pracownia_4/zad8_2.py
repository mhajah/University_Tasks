import random
import sys
import chess
import math
import chess.polyglot

class WrongMove(Exception):
    pass

class Chess:
    def __init__(self):
        self.board = chess.Board()
        
    def update(self, uci_move):
        try:
            move = chess.Move.from_uci(uci_move)
        except ValueError:
            raise WrongMove

        if move not in self.board.legal_moves:
            raise WrongMove
            
        self.board.push(move)
        out = self.board.outcome()
        if out is None:
            return None
        if out.winner is None:
            return 0
        if out.winner:
            return -1
        else:
            return +1    
    
    def moves(self):
        return [str(m) for m in self.board.legal_moves]
        
    def draw(self):
        print (self.board)    


class Player(object):
    def __init__(self):
        self.reset()

    def reset(self):
        self.game = Chess()
        self.my_player = 1
        self.say('RDY')

    def say(self, what):
        sys.stdout.write(what)
        sys.stdout.write('\n')
        sys.stdout.flush()

    def hear(self):
        line = sys.stdin.readline().split()
        return line[0], line[1:]

    def capture(self, board, move):
        result = 0
        piece_values = {
            chess.PAWN: 1,
            chess.KNIGHT: 3,
            chess.BISHOP: 3,
            chess.ROOK: 5,
            chess.QUEEN: 9
        }

        target_square = move.to_square
        target_piece = board.piece_at(target_square)

        start_square = move.from_square
        start_piece = board.piece_at(start_square)

        if (start_piece != None and target_piece != None):
            start_piece_value = piece_values.get(start_piece.piece_type, 1)
            target_piece_value = piece_values.get(target_piece.piece_type, 1)

            capture_ratio =  target_piece_value / start_piece_value
            if capture_ratio > 3:
                result += capture_ratio
        
        return result


    def heuristic(self, board):
        if board.outcome():
            if board.outcome().winner: 
                return math.inf
            else: 
                return -math.inf
        val = 0

        wP = len(board.pieces(chess.PAWN, chess.WHITE))
        wK = len(board.pieces(chess.KNIGHT, chess.WHITE))
        wB = len(board.pieces(chess.BISHOP, chess.WHITE))
        wR = len(board.pieces(chess.ROOK, chess.WHITE))
        wQ = len(board.pieces(chess.QUEEN, chess.WHITE))

        bP = len(board.pieces(chess.PAWN, chess.BLACK))
        bK = len(board.pieces(chess.KNIGHT, chess.BLACK))
        bB = len(board.pieces(chess.BISHOP, chess.BLACK))
        bR = len(board.pieces(chess.ROOK, chess.BLACK))
        bQ = len(board.pieces(chess.QUEEN, chess.BLACK))
        
        turn = board.turn
        board.turn = chess.WHITE
        white_moves = board.legal_moves
        wM = len(list(board.legal_moves))

        board.turn = chess.BLACK
        black_moves = board.legal_moves
        bM = len(list(board.legal_moves))
        board.turn = turn
    
        white_checks = 0
        white_capture = 0

        black_checks = 0
        black_capture = 0

        for move in white_moves:
            if board.gives_check(move):
                white_checks +=1

            if board.is_capture(move):
                white_capture = self.capture(board, move)

        for move in black_moves:
            if board.gives_check(move):
                black_checks +=1

            if board.is_capture(move):
                black_capture = self.capture(board, move)


        white_castling = board.has_kingside_castling_rights(chess.WHITE) + board.has_queenside_castling_rights(chess.WHITE)
        black_castling = board.has_kingside_castling_rights(chess.BLACK) + board.has_queenside_castling_rights(chess.BLACK)

        # 1. moc figur na planszy
        # 2. check
        # 3. stosunek bicia bierek
        # 4. roszady

        val = (
            10 * (wP - bP) 
            + 30 * (wK - bK)
            + 30 * (wB - bB)
            + 50 * (wR - bR)
            + 90 * (wQ - bQ)
            + 10 * (wM - bM)
            + 100 * (white_checks - black_checks)
            + 50 * (white_capture - black_capture)
            + 200 * (white_castling - black_castling)
        )


        return val

    def minimax_move(self, depth, game, alpha, beta):
        best_move = None
        if depth == 0 or game.board.outcome():
            v = self.heuristic(game.board)
            return v, best_move
        moves = game.board.legal_moves

        if not game.board.legal_moves.count():
            v = self.heuristic(game.board)
            return v, best_move

        if game.board.turn == chess.WHITE:
            value = -math.inf 
            for move in moves:
                game.board.push(move)
                new_value, _ = self.minimax_move(depth - 1, game, alpha, beta)
                game.board.pop()

                if new_value > value:
                    value = new_value
                    best_move = move
                if value >= beta:
                    return value, best_move
                alpha = max(alpha, value)
            return value, best_move
        else: 
            value = math.inf
            for move in moves:
                game.board.push(move)
                new_value, _ = self.minimax_move(depth - 1, game, alpha, beta)
                game.board.pop()

                if new_value < value:
                    value = new_value
                    best_move = move
                if value <= alpha:
                    return value, best_move
                beta = min(beta, value)
            return value, best_move

    def terminal(game):
        if game.outcome(): 
            return True
        if game.fullmove_number >= 100:
            return True
        return False

    def loop(self):
        while True:
            cmd, args = self.hear()
            if cmd == 'HEDID':
                unused_move_timeout, unused_game_timeout = args[:2]
                move = args[2]
                
                self.game.update(move)
            elif cmd == 'ONEMORE':
                self.reset()
                continue
            elif cmd == 'BYE':
                break
            else:
                assert cmd == 'UGO'
                #assert not self.game.move_list
                self.my_player = 0

            entries = []
            with chess.polyglot.open_reader("./Chess/performance.bin") as reader:
                for entry in reader.find_all(self.game.board):
                    entries.append(entry)

            if entries:
                entry = entries[random.randint(0, len(entries) - 1)]
                move = entry.move
            else:
                _, move = player.minimax_move(2, self.game, -math.inf, math.inf)
            
            str_move = str(move)
            if move != None:
                self.game.update(str_move)


            self.say('IDO ' + str_move)


if __name__ == '__main__':
    player = Player()
    player.loop()

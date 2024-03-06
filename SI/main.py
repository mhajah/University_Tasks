
rows = "abcdefgh"
cols = "12345678"

# Generowanie możliwych ruchów dla króla
def king_moves(position):
    moves = []
    row, col = rows.index(position[0]), cols.index(position[1])

    for r in range(max(0, row-1), min(7, row+1)+1):
        for c in range(max(0, col-1), min(7, col+1) + 1):
            if r != row or c != col:
                moves.append(rows[r]+cols[c])
    return moves

def rook_moves(position, blocked_moves):
    moves = []
    row, col = rows.index(position[0]), cols.index(position[1])

    for r in range(row+1, 8):
        move = rows[r] + cols[col]
        if move in blocked_moves: break
        moves.append(move)

    for r in range(row-1, -1, -1):
        move = rows[r] + cols[col]
        if move in blocked_moves: break
        moves.append(move)


    for c in range(col+1, 8):
        move = rows[row] + cols[c]
        if move in blocked_moves: break
        moves.append(move)

    for c in range(col-1, -1, -1):
        move = rows[row] + cols[c]
        if move in blocked_moves: break
        moves.append(move)

    return moves

print(king_moves("d4")) # expected output: c5,d5,e5,c4,e4,c3,d3,e3
print(king_moves("h8"))
print(rook_moves("a8", ["e8"]))

                #bialy krol  wieza   czarny krol
def is_checkmate(wking_pos, rook_ps, bking_pos):
    return 0

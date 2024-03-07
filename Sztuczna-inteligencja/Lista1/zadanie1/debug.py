from pprint import pprint

figures = ('W', 'R', 'B')

def coords(s):
    column = ord(s[0]) - ord('a')
    row = ord(s[1]) - ord('1')
    return column, row

def debug_print( wk, wt, bk, debug = False ):
	board = [ [' ' for i in range(8)] for j in range(8) ] 
	c,r = coords(wk)
	board[r][c] = figures[0]
	c,r = coords(wt)
	board[r][c] = figures[1]
	c,r = coords(bk)
	board[r][c] = figures[2]

	colLabels = [[' '] +  [chr(j+97) for j in range(8)] ]
	board =  colLabels + \
	         [ ([chr(j+49)] + board[j] + [chr(j+49)]) for j in range(8) ] + \
			 colLabels

	if debug:
		board = [ [' '] +  [chr(j+ord('0')) for j in range(8)] ] + board

	for row in reversed(board):
		for col in row:
			print(col, end = ' ')
		print()


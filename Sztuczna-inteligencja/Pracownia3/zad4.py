# zmienna reprezentujaca komorke na pozycji (i,j)
def B(i,j):
    return 'B%d_%d' % (i,j)

# wszystkie domeny komorek na {0,1}; burza/brak-burzy
def domains(bs):
    return [cell + ' in 0..1' for cell in bs]

# zwraca liste komorek w wierszu i
def get_row(i, C):
    return [B(i, j) for j in range(C)]

# zwraca liste komorek w kolumnie j
def get_col(j, R):
    return [B(i, j) for i in range(R)]

# zwraca string w formacie 'bs_0 + bs_1 + ... + bs_n #= val'
def varsum(bs, val):
    args = '['
    for cell in bs[:-1]:
        args = args + '%s,' % cell 
    args = args + '%s]' % bs[-1]
    return 'sum(%s, #=, %d)' % (args, val)

# zwraca liste wiezow mowiaca, ze liczba pokolorowanych komorek
# musi byc zgodna ze specyfikacja dla kazdego wiersza
def horizontal(config, R, C):
    return [varsum(get_row(i, C), config[i]) for i in range(R)]

def vertical(config, R, C):
    return [varsum(get_col(j, R), config[j]) for j in range(C)]

# zwraca wiez reprezentujacy komorki, ktorych wartosci sa poczatkowo podane
def setup(triples):
    return ['%s #= %d' % (B(i, j), val) for i, j, val in triples]

# zwraca liste wszystkich trojek A, B, C reprezentujacych
# wszystkie 1x3 i 3x1 bloki komorek na planszy
def get_rectangles(R, C):
    result = []
    for i in range(R):
        row = get_row(i, C)
        # A B C
        result = result + [[row[j], row[j+1], row[j+2]] for j in range(C-2)]
    for j in range(C):
        col = get_col(j, R)
        # A
        # B
        # C
        result = result + [[col[i], col[i+1], col[i+2]] for i in range(R-2)]
    return result 

# zwraca liste wszystkich czworokatow A, B, C, D reprezentujacych
# wszystkie kwadraty 2x2 komorek na planszy
def get_squares(R, C):
    result = []
    for i in range(R-1):
        for j in range(C-1):
            # A B
            # C D
            square = (B(i, j), B(i, j+1), B(i+1, j), B(i+1, j+1))
            result.append(square)
    return result 

# zwraca liste wiezow zwiazanych z prostokatami 3x1 (1x3)
def rectangles(R, C):
    xs = get_rectangles(R, C)
    args = '['
    for [A, B, C] in xs[:-1]:
        args = args + '[%s, %s, %s],' % (A, B, C)
    [A, B, C] = xs[-1]
    args = args + '[%s, %s, %s]]' % (A, B, C)
    legal = '[[1,0,1], [1,1,0], [0,1,1], [1,0,0], [0,0,1], [1,1,1], [0,0,0]]'
    return ['tuples_in(%s, %s)' % (args, legal)]

# zwraca liste wiezow zwiazanych z kwadratami 2x2
def squares(R, C):
    xs = get_squares(R, C)
    args = '['
    for [A, B, C, D] in xs[:-1]:
        args = args + '[%s, %s, %s, %s],' % (A, B, C, D)
    [A, B, C, D] = xs[-1]
    args = args + '[%s, %s, %s, %s]]' % (A, B, C, D)
    empty = '[0,0,0,0]'
    corners = '[1,0,0,0], [0,1,0,0], [0,0,1,0], [0,0,0,1]'
    twos = '[1,1,0,0], [1,0,1,0], [0,1,0,1], [0,0,1,1]'
    full = '[1,1,1,1]'
    legal = f'[{empty}, {twos}, {full}, {corners}]'
    return ['tuples_in(%s, %s)' % (args, legal)]

# sudoku.py
def print_constraints(Cs, indent, d):
    position = indent
    writeln (indent * ' ', end='')
    for c in Cs:
        writeln (c + ',', end=' ')
        position += len(c)
        if position > d:
            position = indent
            writeln ('')
            writeln (indent * ' ', end='')
 
def storms(rows, cols, triples):
    writeln(':- use_module(library(clpfd)).')
    
    R = len(rows)
    C = len(cols)
    
    bs = [ B(i,j) for i in range(R) for j in range(C)]
    
    writeln('solve([' + ', '.join(bs) + ']) :- ')
    
    cs = domains(bs) + setup(triples) + horizontal(rows, R, C) + vertical(cols, R, C) + squares(R, C) + rectangles(R, C)
    
    print_constraints(cs, 4, 70)
    writeln('')
    writeln('    labeling([ff], [' +  ', '.join(bs) + ']).' )
    writeln('')
    writeln(":- solve(X), write(X), nl.")

def writeln(s, end='\n'):
    output.write(s + end)

txt = open('zad_input.txt').readlines()
output = open('zad_output.txt', 'w')

rows = list(map(int, txt[0].split()))
cols = list(map(int, txt[1].split()))
triples = []

for i in range(2, len(txt)):
    if txt[i].strip():
        triples.append(map(int, txt[i].split()))

storms(rows, cols, triples)            
        

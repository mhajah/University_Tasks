def B(i,j):
    return 'B_%d_%d' % (i,j)

def domains(Vs):
    return [ q + ' in 0..1' for q in Vs ]

def tuples_in(tuple, Qs):
    return 'tuples_in([[' + ', '.join(tuple) + ']], [' + ', '.join(Qs) + '])'

def get_column(j, C):
    return [B(i,j) for i in range(C)] 
            
def get_row(i, R):
    return [B(i,j) for j in range(R)] 

def print_constraints(Cs, indent, d):
    position = indent
    output.write(indent * ' ')
    for c in Cs:
        output.write(c + ', ')
        position += len(c)
        if position > d:
            position = indent
            writeln ("")
            output.write(indent * ' ')
    
def line_h_tuple(i, j):
    return (B(i,j), B(i,j+1), B(i,j+2))
def line_v_tuple(i, j):
    return (B(i,j), B(i+1,j), B(i+2,j))
def square_tuple(i, j):
    return (B(i,j),B(i,j+1),B(i+1,j),B(i+1,j+1))

twoTwo = ['[0,0,0,0]','[0,0,0,1]','[0,0,1,0]','[0,0,1,1]','[0,1,0,0]','[0,1,0,1]','[1,0,0,0]','[1,0,1,0]','[1,1,0,0]','[1,1,1,1]']
oneThree = ['[0,0,0]', '[1,1,0]', '[1,0,0]', '[0,1,1]', '[0,0,1]', '[1,1,1]', '[1,0,1]']

def storms(rows, cols, triples):
    writeln(':- use_module(library(clpfd)).')
    
    rows = list(rows)
    cols = list(cols)
    R = len(rows)
    C = len(cols)

    
    bs = [ B(i,j) for i in range(R) for j in range(C)]
    
    writeln('solve([' + ', '.join(bs) + ']) :- ')

    cs = domains(bs)

    for i,j,val in triples:
        cs.append( '%s #= %d' % (B(i,j), val) )

    for i in range(R):
        cs.append( '%d #= %s' % (rows[i], ' + '.join(get_row(i,R))) )

    for i in range(C):
        cs.append( '%d #= %s' % (cols[i], ' + '.join(get_column(i,C))) )

    for i in range(R-1):
        for j in range(C-1):
            cs.append( tuples_in(square_tuple(i,j), twoTwo) )

    for i in range(R):
        for j in range(C-2):
            cs.append( tuples_in(line_h_tuple(i,j), oneThree) )

    for i in range(R-2):
        for j in range(C):
            cs.append( tuples_in(line_v_tuple(i,j), oneThree) )


    print_constraints(cs, 4, 70)
    
    #TODO: add some constraints
    
    #writeln('    [%s] = [1,1,0,1,1,0,1,1,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0],' % (', '.join(bs),)) #only for test 1

    writeln('    labeling([ff], [' +  ', '.join(bs) + ']).' )
    writeln('')
    writeln(":- solve(X), write(X), nl, told.")

def writeln(s):
    output.write(s + '\n')

txt = open('zad_input.txt', 'r').readlines()
output = open('zad_output.txt', 'w')

rows = map(int, txt[0].split())
cols = map(int, txt[1].split())

triples = []

for i in range(2, len(txt)):
    if txt[i].strip():
        triples.append(map(int, txt[i].split()))

storms(rows, cols, triples)            
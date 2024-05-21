import sys

def V(i,j):
    return 'V%d_%d' % (i,j)
    
def domains(Vs):
    return [ q + ' in 1..9' for q in Vs ]
    
def all_different(Qs):
    return 'all_distinct([' + ', '.join(Qs) + '])'
    
def get_column(j):
    return [V(i,j) for i in range(9)] 
            
def get_raw(i):
    return [V(i,j) for j in range(9)] 
                        
def horizontal():   
    return [all_different(get_raw(i)) for i in range(9)]

def vertical():
    return [all_different(get_column(j)) for j in range(9)]


def square(x,y):
    ans = []
    for i in range(x, x+3):
        for j in range(y, y+3):
            ans.append(V(i,j))
    return ans
def squares():
    ans = []
    for i in {0,3,6}:
        for j in {0,3,6}:
            ans.append(all_different(square(i,j)))
    
    # print(ans)
    return ans
                


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

      
def sudoku(assigments):
    variables = [ V(i,j) for i in range(9) for j in range(9)]
    
    writeln (':- use_module(library(clpfd)).')
    writeln ('solve([' + ', '.join(variables) + ']) :- ')
    
    
    cs = domains(variables) + vertical() + horizontal() + squares() #TODO: too weak contraints, add something!
    for i,j,val in assigments:
        cs.append( '%s #= %d' % (V(i,j), val) )
    
    print_constraints(cs, 4, 70),
    writeln ("")
    writeln ('    labeling([ff], [' +  ', '.join(variables) + ']).' )
    writeln ("")
    writeln (':- solve(X), write(X), nl.')       


def writeln(s):
    output.write(s + '\n')
    
if __name__ == "__main__":
    raw = 0
    triples = []
    output = open('zad_output.txt', 'w')
    with open("zad_input.txt", 'r') as my_file:
        while (line := my_file.readline().rstrip()):
            if len(line) == 9:
                for i in range(9):
                    if line[i] != '.':
                        triples.append( (raw,i,int(line[i])) ) 
                raw += 1          
        sudoku(triples)
     
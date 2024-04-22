
# wszystkie możliwości dla podanej konfiguracji i rozmiaru
def generate_pattern(config, size):
    pattern = []
    if sum(config) + len(config) - 1 > size:
        return None
    if len(config) == 0:
        pattern.append('.' * size) 
        return pattern
    d = config[0]
    for i in range(size-d+1):
        pref = '.' * i + '#' * d
        if len(config) == 1:
            pattern.append(pref + '.' * (size - len(pref)))
        else:
            xs = generate_pattern(config[1:], size-len(pref)-1)
            if xs is None:
                if len(pattern) == 0:
                    return None 
                else:
                    return pattern
            for suf in xs:
                if suf == '':
                    pattern.append(pref)
                else:
                    pattern.append(pref + '.' + suf)
    return pattern

# rozwiązanie korzystające z backtrackingu
def solve_nonogram(horizontal, vertical):
    height = len(horizontal)
    width = len(vertical)
    row_patterns = []
    col_patterns = []
    for row_config in horizontal:
        pattern = generate_pattern(row_config, width)
        #print(str(pattern) + "\n\n")
        row_patterns.append(pattern)
    for col_config in vertical:
        pattern = generate_pattern(col_config, height)
        col_patterns.append(pattern)

    # iterujemy sie po wierszach probujac dopasowac wzory do kolumn
    # jesli w ktoryms momencie nie mozna znalezc pasujacego wzoru,
    # to alg. cofa sie do poprzedniego wiersza
    
    # ...do momentu az znajdziemy pasujacy wzor dla kazdego wiersza

    idy = 0 # obecnie rozważany wiersz
    backtrack = [(-1, []) for _ in range(height + 1)]
    solution = ''
    while idy < height:
        i = backtrack[idy][0] + 1
        
        if idy == 0:
            current_col_patterns = col_patterns
        else:
            current_col_patterns = backtrack[idy - 1][1]
        minimum = len(min(current_col_patterns, key=len))

        if i >= len(row_patterns[idy]): # sprawdzamy, czy wykorzystaliśmy już możliwości wiersza
            backtrack[idy] = (-1, []) # powrót do poprzedniego stanu
            idy -= 1
            continue
        row = row_patterns[idy][i]
        new_col_patterns = []

        # dla każdego wzoru kolumny sprawdzamy, czy pasuje on do wzoru sprawdzanego wiersza
        for idx, col_pattern in enumerate(current_col_patterns):
            new_col_pattern = list(filter(lambda col: col[idy] == row[idx], col_pattern)) # filtrowanie niepasujących kolumn
            if len(new_col_pattern) < minimum:
                minimum = len(new_col_pattern)
            new_col_patterns.append(new_col_pattern)
        if minimum == 0: # jeśli minimum = 0, to wiersz nie pasuje do zadnej kolumny
            backtrack[idy] = (i, [])
        else:
            backtrack[idy] = (i, new_col_patterns)
            idy += 1 
    
    for idy, data in enumerate(backtrack[:-1]):
        (idx, _) = data
        solution += ''.join(row_patterns[idy][idx]) + '\n'
    return solution


with open('zad_input.txt', 'r') as inp, open('zad_output.txt', 'w') as out:
    size = inp.readline()
    height, _ = size.split(' ')
    height = int(height)
    horizontal, vertical = [], []
    for idy, line in enumerate(inp):
        params = list(map(int, line.split(' ')))
        if idy < height:
            horizontal.append(params)
        else:
            vertical.append(params)
    out.write(solve_nonogram(horizontal, vertical))

def opt_dist(board, D):
    # Liczba jedynek w liście
    ones = board.count(1)

    # To, ile jedynek w aktualnie rozpatrywanej sekcji
    current_zone = board[0: D].count(1)
    
    # To, ile jedynek muszę zgasić przed sekcją
    before_zone = 0

    # To ile jedynek muszę zgasić po sekcji
    after_zone = ones - current_zone

    # Indeks, w którym zaczyna się nasza sekcja
    first_idx = 0
    # Indeks, w którym kończy się nasza sekcja+1
    last_idx = D
    # Wyniki
    results = []

    if D == 0:
        return ones
    
    for i in range(len(board) - D +1 ):
        results.append(D - current_zone + before_zone + after_zone)      

        # Kiedy na początku strefy jest 1, to w następnej iteracji wypada
        if board[first_idx] == 1:
            current_zone = max(current_zone - 1, 0)
            before_zone += 1
        
        # Jeśli przed strefą jest jedynką, to w następnej iteracji zostaje dodana 
        if last_idx < len(board) and board[last_idx] == 1:          
            current_zone += 1
            after_zone = max(after_zone - 1, 0)

        # Idziemy na przód
        first_idx += 1
        last_idx += 1

    
    return min(results)

finput  = 'zad4_input.txt'
foutput = 'zad4_output.txt'

f2 = open(foutput,"w") 

with open(finput) as f:
    for line in f:
        board, D = line.strip().split(" ")
        board = [int(s) for s in board]
        D = int(D)
        print(opt_dist(board, D), file = f2)
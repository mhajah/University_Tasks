# Wczytywanie słów z pliku i zwrócenie zbioru tych słów
def read_words(file_name : str = "words_for_ai1.txt"):
    lexicon = set()

    with open(file_name) as f:
        for line in f:
            arr = line.lower().split()
            for _x in arr:
                lexicon.add(_x)

    return lexicon

def count_dp(text, lexicon=read_words()):
   
    text = "#" + text # indeksowanie od 1
    origins = [0] * (len(text) + 1)
    dp    = [0] * (len(text) + 1)

    for i in range(1, len(text) + 1):
        for j in range(1, i+1):
            if text[j:i+1] in lexicon and (dp[j-1] or j == 1):
                # Przechowujemy maksymalną dł. kwadratów długości słów
                # oraz indeks początkowy słowa
                temp_dp = dp[j-1] + (i+1-j)**2
                if temp_dp > dp[i]:
                    dp[i] = temp_dp
                    origins[i] = j-1

    temp = len(text)-1
    res = []

    while temp>0:
        res.insert(0, text[ origins[temp]+1:temp+1 ])
        temp = origins[temp]
    return " ".join(res)

lexicon = read_words()
with open("zad2_input.txt") as input_f, open("zad2_output.txt", "w") as out:
    for line in input_f:
        out.write( count_dp(line.strip(), lexicon) + "\n" )
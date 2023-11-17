def word_to_number(word):
    # Pomysł: wszystkim możliwym wystąpieniom liczebnika (nie jest ich dużo), przypisać odpowiednią liczbę 
    liczby = {
        'jeden': 1, 'dwa': 2, 'trzy': 3, 'cztery': 4, 'pięć': 5,
        'sześć': 6, 'siedem': 7, 'osiem': 8, 'dziewięć': 9,
        'dziesięć': 10, 'jedenaście': 11, 'dwanaście': 12, 'trzynaście': 13, "czternaście": 14, "pietnaście": 15,
        "szesnaście": 16, 'siedemnaście': 17, 'osiemanście': 18, 'dziewietnaście:': 19,
        'dwadzieścia': 20, 'trzydzieści': 30, 'czterdzieści': 40, 'pięćdziesiąt': 50,
        'sześćdziesiąt': 60, 'siedemdziesiąt': 70, 'osiemdziesiąt': 80, 'dziewięćdziesiąt': 90,
        'sto': 100, 'dwieście': 200, 'trzysta': 300, 'czterysta': 400,
        'pięćset': 500, 'sześćset': 600, 'siedemset': 700, 'osiemset': 800, 'dziewięćset': 900,
        'tysiąc': 1000, 'tysiące': 1000, 'tysięcy': 1000, 'milion': 1000000, 'miliony': 1000000, 'milionów': 1000000
    }
    
    words = word.split()
    current_number = 0
    previous_number = 0
    
    for w in words:
        if w in liczby:
            if w == 'tysięcy' or w== 'tysiące' or w == 'milionów' or w == 'miliony':
                current_number += liczby[w] * previous_number - previous_number
                previous_number = 0
            else:
                current_number += liczby[w]
                previous_number += liczby[w]

    #print(current_number)
    
    return current_number

def sort_words_numerically(word_list):
    return sorted(word_list, key=word_to_number)

word_list = ['sto dwadzieścia trzy', 'osiemset pietnaście', 'trzydzieści tysięcy dwieście', 'dwanaście', 
             'trzydzieści osiem', 'dwa tysiące pięćset czterdzieści jeden', 'sto dwadzieścia pięć tysięcy', 
             'dwa miliony czterysta trzydzieści jeden tysięcy sto dwadzieścia siedem']
sorted_list = sort_words_numerically(word_list)
print(sorted_list)

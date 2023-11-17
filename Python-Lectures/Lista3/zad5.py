# rozwiazanie inspirowane:
# https://en.wikipedia.org/wiki/Maximum_subarray_problem 
# (algorytm Kadane'a)

def max_sublist_sum(lista):
    max_sum = current_sum = lista[0]
    start = end = 0
    temp_start = 0

    for i in range(1, len(lista)):
        if lista[i] > current_sum + lista[i]:
            current_sum = lista[i]
            temp_start = i
        else:
            current_sum += lista[i]

        if current_sum > max_sum:
            max_sum = current_sum
            start = temp_start
            end = i

    return start, end

lista = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
result = max_sublist_sum(lista)
print("Najwieksza suma:", sum(lista[result[0]:result[1] + 1]))
print("Indeksy:", result)
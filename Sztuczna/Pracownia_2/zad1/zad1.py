import math

osX = 5
osY = 5

def kolorowanie_Wiersza(wiersz, rozmiar):
    for i in range(rozmiar):
        if wiersz[i] > 1:
            wiersz[i] = 32312312
        else:
            wiersz[i] = 0

# chyba niepotrzebne 
# wywolanie jestli 2 * wartosc > rozmiar
# def przeciecie_Z_Jednym_Argumentem_Wiersz(wiersz, wartosc, rozmiar):
#     for i in range(wartosc):
#         wiersz[i] += 1
#         wiersz[rozmiar - i - 1] += 1
#     kolorowanie_Wiersza(wiersz, rozmiar)


def przeciecie_Z_Wieloma_Argumentami_Wiersz(wiersz, wartosc, rozmiar):
    k = 0
    odwrocona = wartosc[::-1]
    for i in wartosc:
        for j in range(i):
            wiersz[k] += 1
            k += 1
        k+=1
    k = rozmiar - 1

    for i in odwrocona:
        for j in range(i):
            wiersz[k] += 1
            k -= 1
        k -= 1

    kolorowanie_Wiersza(wiersz, rozmiar)
    


def przeciecie_Z_Wieloma_Argumentami_Kolumna(tablica, wartosc, rozmiar, indexKolumny):
    k = 0
    odwrocona = wartosc[::-1]
    for i in wartosc:
        for j in range(i):
            
            tablica[k][indexKolumny] += 1
            k += 1
        k+=1
    k = rozmiar - 1
    print(k)
    for i in odwrocona:
        for j in range(i):
            tablica[k][indexKolumny] += 1
            k -= 1
        k -= 1
    

# warunek jesli liczba kolorowan + wolne pola = rozmiar

def z_Przerwami_Rownymi_Wierszowi(wiersz, wartosci, rozmiar):
    k = 0
    for i in wartosci:
        for j in range (i):
            wiersz[k] = 12312312
            k += 1
        if k < rozmiar:
            wiersz[k] = -1 * math.inf
        k += 1

def z_Przerwami_Rownymi_Kolumnie(tablica, wartosci, rozmiar, indexKolumny):
    k = 0
    for i in wartosci:
        for j in range (i):
            tablica[k][indexKolumny] = 12312312
            k += 1
        if k < rozmiar:
            tablica[k][indexKolumny] = -1 * math.inf
        
        
        k += 1


# cala tablica, wszystkie wartosci X i Y
# chyba trzeba rozdzielic na dwa osobne
def czyszczenie(tablica, wartX, wartY, osX, osY):
    # dla kolumn
    for i in range(osY):
        tab = []
        licznik = 0
        for j in range (osX):
            if tablica[j][i] > 10:
                licznik += 1
            if tablica[j][i] < 10 and licznik != 0:
                tab.append(licznik);
                licznik = 0
        if tab == wartY[i]:
            for j in range (osX):
                if tablica[j][i] < 1:
                    tablica[j][i] = -1 * math.inf
    # dla wierszy
    for i in range(osX):
        tab = []
        licznik = 0
        for j in range (osY):
            if tablica[i][j] > 10:
                licznik += 1
            if tablica[i][j] < 10 and licznik != 0:
                tab.append(licznik);
                licznik = 0
        if tab == wartX[i]:
            for j in range (osY):
                if tablica[i][j] < 1:
                    tablica[i][j] = -1 * math.inf
            
            


        


def output(tab, rozmiar):
    for i in range(rozmiar):
        res = ""
        for j in range(rozmiar):
            if(tab[i][j] > 1):
                res += "#"
            else:
                res += "."
        print(res)

wartosciX = [[1], [1,1,1], [3], [2,2], [5]]
wartosciY = [[5], [1,3], [3,1], [1,3], [2,2]]

n = 5
result = []
for i in range(n):
    temp = []
    for j in range(n):
        temp.append(0)
    result.append(temp)

solvedX = []
solvedY = []
for i in range(n):
    solvedX.append(0)
    solvedY.append(0)

przeciecie_Z_Wieloma_Argumentami_Wiersz(result[0],wartosciX[0],n)
z_Przerwami_Rownymi_Wierszowi(result[1], wartosciX[1], n)
#z_Przerwami_Rownymi_Wierszowi(result[3], wartosciX[3], n)

# for i in range(n):
    # z_Przerwami_Rownymi_Kolumnie(result, wartosciY[i], 5, i)

wierszTest = [0,0,0,0,0,0]

#przeciecie_Z_Wieloma_Argumentami_Wiersz(result[0] ,[5] , n)

czyszczenie(result, wartosciX, wartosciY, 5,5)

print(result)
output(result, n)


# 'inp': '5 5\n'
# '5\n'
# '1 1 1\n'
# '3\n'
# '2 2\n'
# '5\n'
# '2 2\n'
# '1 3\n'
# '3 1\n'
# '1 3\n'
# '2 2\n',



# with open("zad1_output.txt", 'w') as g:
#     with open("zad1_input.txt", 'r') as f:
#         for line in f:
#             line = line.strip()
#             line = line.split(" ")
#             res = opt_dist([int(x) for x in list(line[0])], int(line[1]))
#             g.write(str(res) + '\n')
import random
import re

def uprosc_zdanie(tekst, dl_slowa, liczba_slow):
    aktualna_dlugosc_slowa = 0
    start = 0
    #Usuwanie wszystkich słow, które są dłuższe niż dł_slowa
    for c in tekst:
        aktualna_dlugosc_slowa += 1
        start += 1

        if c == ' ' or c == '.':
            if aktualna_dlugosc_slowa-1 > dl_slowa:
                tekst = tekst.replace(tekst[start-aktualna_dlugosc_slowa:start], "")
                start -= aktualna_dlugosc_slowa
            aktualna_dlugosc_slowa = 0

    #Usuwanie nadmiarowych slow w zdaniu
    tekst = tekst.split('. ')
    nowyTekst = []
    for x in tekst:
        zdanie = x.split()
        while len(zdanie) > liczba_slow:
            randomNumber = random.randint(0, len(zdanie)-1)
            del zdanie[randomNumber]
        nowyTekst += zdanie
        nowyTekst += "."

    nowyTekst = " ".join(nowyTekst)
    nowyTekst = re.sub(r'\s([?.!"](?:\s|$))', r'\1', nowyTekst)

    return nowyTekst


tekst = "Podzial peryklinalny inicjalow wrzecionowatych kambium charakteryzuje sie sciana podzialowa inicjowana w plaszczyznie as. Test fd qwertyuiopasad."
print(uprosc_zdanie(tekst, 10, 5))
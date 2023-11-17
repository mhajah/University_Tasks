def lettersFrequency(text):
    frequency = { }
    while True:
        char = text.read(1).lower()
        if char.isalpha() and char in frequency:
            frequency[char] += 1
        elif char.isalpha():
            frequency[char] = 0
        if not char:
            break
    return frequency

def detectLang(text, stats):
    textLettersFreq = lettersFrequency(text)
    minDistance = float('inf')
    bestMatch = ""
    
    print(stats.keys())
    for key in stats.keys():
        distance = 0
        tStats = stats[key]
        print(tStats)

    

polskaKsiazka = open("polska.txt", "r", encoding="utf-8")
polski = lettersFrequency(polskaKsiazka)
angielskaKsiazka = open("engg.txt", "r", encoding="utf-8")
angielski = lettersFrequency(angielskaKsiazka)
francuskaKsiazka = open("fr1.txt", "r", encoding="utf-8")
francuski = lettersFrequency(francuskaKsiazka)

stats = {
    "Polish": polski,
    "English": angielski,
    "French": francuski
}

detectLang(polskaKsiazka, stats)



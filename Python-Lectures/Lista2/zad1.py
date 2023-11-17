# metoda d'Hondta
# https://sejmsenat2019.pkw.gov.pl/sejmsenat2019/pl/wyniki/sejm/pow/26400
# https://icon.cat/util/elections#
results = {
    'KO': (129339, 1),
    'PiS': (126432, 1),
    'Lewica': (31631, 1),
    'Konfederacja': (27119, 1),
    'PSL': (63007, 1),
}

res2 = {
    'A': (720, 1),
    'B': (100, 1),
    'C': (680, 1)
}

res3 = {
    'A': (1970, 1),
    'B': (477, 1),
    'C': (388, 1),
    'D': (221, 1),
    'E': (190, 1),
    'F': (172, 1)
}

def dHondt(results, mandates):
    finalResults = []
    keyList = list(results.keys())
    while mandates > 0:
        valuesList = [x[0]/x[1] for x in results.values()]
        bestResVal = max(valuesList)
        bestResKey = keyList[valuesList.index(bestResVal)]
        results[bestResKey] = (results[bestResKey][0], results[bestResKey][1]+1)
        finalResults.append(bestResKey)
        mandates -= 1
    return [(keyList[list(results.values()).index((x, y))], y-1) for x, y in results.values()]


print(dHondt(results, 10))
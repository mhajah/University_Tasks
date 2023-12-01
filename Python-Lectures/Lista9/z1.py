import requests
import matplotlib.pyplot as plt
#Wskaźnik USD-PLN
def sredniaWartDolara(rok):
    r = requests.get(f"https://api.nbp.pl/api/exchangerates/rates/a/usd/{rok}-01-01/{rok}-12-30?format=json")
    rq_content = r.json()

    months = {
        "01": [], "02": [], "03": [],
        "04": [], "05": [], "06": [],
        "07": [], "08": [], "09": [],
        "10": [], "11": [], "12": []
    }

    for day in rq_content["rates"]:
        month = day["effectiveDate"][5:7]
        months[month].append(day["mid"])

    months = {i:[float(sum(float(x) for x in months[i]))/len(months[i])] for i in months}
    return months

def przewidywaniaNaNastepnyRok(rok1, rok2):
    months = {
        "01": [], "02": [], "03": [],
        "04": [], "05": [], "06": [],
        "07": [], "08": [], "09": [],
        "10": [], "11": [], "12": []
    }

    for key in rok1:
        procDiff = abs(rok1[key][0] - rok2[key][0])/rok1[key][0]
        months[key].append(rok2[key][0] + rok2[key][0]*procDiff)

    return months


def wskaznikInflacji(rok):
    r = requests.get(f"https://api.dane.gov.pl/1.4/resources/51761,miesieczne-wskazniki-cen-towarow-i-usug-konsumpcyjnych-od-1982-roku/data?page=1&per_page=50&q=col3:%22Analogiczny%20miesi%C4%85c%20poprzedniego%20roku%20%3D%20100%22%20AND%20col4:{rok}&sort=")
    rq_content = r.json()
    
    months = {
        1: 0, 2: 0, 3: 0,
        4: 0, 5: 0, 6: 0,
        7: 0, 8: 0, 9: 0,
        10: 0, 11: 0, 12: 0
    }

    for month in rq_content["data"]:
        months[int(month["attributes"]["col5"]["val"])] = round(float(month["attributes"]["col6"]["val"].replace(",", "."))-100.0, 2)

    return months


months2021 = sredniaWartDolara(2021)
months_list = list(months2021.keys())
data2021 = [months2021[key][0] for key in months2021]

months2022 = sredniaWartDolara(2022)
data2022 = [months2022[key][0] for key in months2022]

expected2023 = przewidywaniaNaNastepnyRok(months2021, months2022)
data2023 = [expected2023[key][0] for key in expected2023]

plot1 = plt.subplot2grid((3,3), (0,0), colspan=3)
plot1.plot(months_list, data2021, label="2021")
plot1.plot(months_list, data2022, label="2022")
plot1.plot(months_list, data2023, label="2023 (przewidywana)")
plot1.set_xlabel('Miesiące')
plot1.set_ylabel('Średnia wartość [zł]')
plot1.set_title('Średnia dolara wartość dla każdego miesiąca')
plot1.legend()

monthsCPI = list(range(1, 13))
cpi2021 = wskaznikInflacji(2021)
dataCPI2021 = [cpi2021[key] for key in cpi2021]

cpi2022 = wskaznikInflacji(2022)
dataCPI2022 = [cpi2022[key] for key in cpi2022]

plot2 = plt.subplot2grid((3,3), (2,0), colspan=3)
plot2.plot(monthsCPI, dataCPI2021, label="2021")
plot2.plot(monthsCPI, dataCPI2022, label="2022")
plot2.set_xlabel('Miesiące')
plot2.set_ylabel('Średnia wartość [%]')
plot2.set_title('Średni wsk. inflacji dla każdego miesiąca')
plot2.legend()


plt.show() 
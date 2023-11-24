import requests

r = requests.get("http://api.citybik.es/v2/networks?fields=name,location")
print("Citybik API, status code:", r.status_code)
response_content = r.json()
location_dicts = response_content["networks"]


print("Sprawdz, czy w Twoim miescie dostepny jest rower miejski. Wpisz miasto: ")
miasto = input()

res2 = [key['name'] for key in location_dicts if key['location']['city'] == miasto]

if res2 == []:
    print("Brak rowerków w Twoim mieście:(")
else:
    print(f"Usługi rowerowe w mieście {miasto} świadczy {res2[0]}")
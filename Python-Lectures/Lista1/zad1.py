import decimal
from decimal import Decimal

listaDecimal = [Decimal("5.00"), Decimal("23.21"), Decimal("9.04"), Decimal("45.21"), Decimal("99.00"), Decimal("1.23")]
listaFloat = [5.00, 23.21, 9.04, 45.21, 99.00, 1.23]
VATDecimal = Decimal("0.23")
VATFloat = 0.23

def vat_faktura(lista):
    if isinstance(lista[0], decimal.Decimal):
        return sum(lista)*VATDecimal
    return sum(lista)*VATFloat 

def vat_paragon(lista):
    if isinstance(lista[0], decimal.Decimal):
        listaInn = [p*VATDecimal for p in lista]
    else:
        listaInn = [p*VATFloat for p in lista]
    return sum(listaInn)

print(vat_faktura(listaDecimal) == vat_paragon(listaDecimal))
print(vat_faktura(listaFloat) == vat_paragon(listaFloat))
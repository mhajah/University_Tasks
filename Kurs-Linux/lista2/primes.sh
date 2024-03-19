#!/bin/bash

MAX=200  # maksymalna liczba do sprawdzenia
PRIMES=(2)  # tablica przechowująca liczby pierwsze, zaczynamy od 2
i=1
n=3
flag=0

while [ $n -le $MAX ]
do
    j=0
    while [ $(( ${PRIMES[j]} * ${PRIMES[j]} )) -le $n ]
    do
        if [ $(( $n % ${PRIMES[j]} )) -eq 0 ]
        then
            flag=1
            break
        fi
        j=$(( $j + 1 ))
    done
    if [ $flag -eq 0 ] 
    then
        PRIMES[i]=$n
        i=$(( $i + 1 ))
    fi

    n=$(( $n + 1 ))
    flag=0
done

for (( k=0; k<i; k++ ))
do
    echo ${PRIMES[k]}
done

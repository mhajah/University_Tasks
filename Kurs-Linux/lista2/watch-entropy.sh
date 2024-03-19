#!/bin/bash

# Funkcja do wyświetlania aktualnych danych o entropii
display_entropy() {
    local poolsize=$(cat /proc/sys/kernel/random/poolsize)
    local entropy_avail=$(cat /proc/sys/kernel/random/entropy_avail)
    echo -ne "Available entropy: $entropy_avail / $poolsize\r"
}

while true; do
    display_entropy
    read -t 1 -n 1 && break  
done
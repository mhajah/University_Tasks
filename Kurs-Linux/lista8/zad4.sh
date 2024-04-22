#!/bin/bash

trap '' SIGHUP
trap 'logger "Otrzymano SIGUSR1, kończę działanie."; exit 0' SIGUSR1

while true
do
    logger "Komunikat: Bieżąca godzina to $(date)"
    sleep 60
done

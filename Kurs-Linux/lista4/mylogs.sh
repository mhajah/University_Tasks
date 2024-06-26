#!/bin/bash
pipe="/tmp/mylog.fifo"
mkfifo $pipe

while :; do
    while read -r log; do
        if [ "$log" ]; then
            date=$(date '+%Y-%m-%d %H:%M:%S')
            echo "[$date]: $log"
        fi
    done < "$pipe"
done
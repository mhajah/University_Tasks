#!/bin/bash

set_title_and_artist() {
    album=$(mp3info -p "%l" "$1")
    title=$(mp3info -p "%t" "$1")
    artist=$(mp3info -p "%a" "$1")
    echo "$album ($artist): $title"
}

mp3_files=()

while IFS= read -r -d '' file; do
    mp3_files+=("$file")
done < <(find  -type f -name "*.mp3" -print0)

i=0
songs=()
for mp3_file in "${mp3_files[@]}"; do
    songs+=("$i" "$(set_title_and_artist "$mp3_file")")
    ((i++))
done

case $1 in 
    "whiptail")
        selected_song=$(whiptail --title "Select a song" --menu "Choose a song:" 20 60 10 "${songs[@]}" 3>&1 1>&2 2>&3)
        ;;
    "dialog")
        selected_song=$(dialog --title "Select a song" --menu "Choose a song:" 20 60 10 "${songs[@]}" 3>&1 1>&2 2>&3)
        ;;
    "zenity")
        selected_song=$(zenity --list --title="Select a song" --text="Choose a song:" --column "Number" --column "Song" "${songs[@]}")
        ;;
    "kdialog")
        selected_song=$(kdialog --title "Select a song" --menu "Choose a song:" "${songs[@]}")
        ;;

esac


if [[ -n $selected_song ]]; then
    index=0
    for song in "${songs[@]}"; do
        if [[ "$song" == "$selected_song" ]]; then
            selected_file="${mp3_files[index]}"
            mpg123 "$selected_file"
            break
        fi
        ((index++))
    done
else
    echo "No song selected."
fi

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

songs=()
for mp3_file in "${mp3_files[@]}"; do
    songs+=("$(set_title_and_artist "$mp3_file")")
done

PS3="Choose a number to play> "
select song in "${songs[@]}"; do
    if [[ -n $song ]]; then
        index=$((REPLY - 1))
        selected_file="${mp3_files[index]}"
        mpg123 "$selected_file"
        break
    else
        echo "Wrong answer"
    fi
done
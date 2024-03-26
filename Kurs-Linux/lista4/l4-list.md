## Lista 4

### Zadanie 2

#### ls

`ls` służy do wylistowania zawartości katalogu. Najpopularniejsze opcje:

* `l` wypisuje wszystkie dane w kolumnach
* `a` wypisuje wszystkie pliki i katalogi, w tym te zaczynając się od `.` lub `..`
* `s` wypisuje rozmiar wylistowanych plików (w tym łączny rozmiar wszystkich)
* `R` wypisuje rekurencyjnie zawartość wylistowanych katalogów
* `h` używane w połączeniu z `s` lub `l` pokazuje rozmiary plików w formacie `human-readable`
* `b` wypisanie ze znakiem ucieczki, np. zamiast `'Kurs Linuxa'` -> `Kurs\ Linuxa`

Sporo opcji dotyczy kolejności wyświetlania plików:

* `v` sortuje po wersji pliku
* `c` sortuje po czasie ostatniej modyfikacji
* `S` sortowanie po rozmiarze pliku (malejąco)
* `X` sortowanie po rozszerzeniu plików

#### stat

`stat` służy do wyświetlania informacji o pliku lub systemie plików. Bez żadnych opcji program wypisuje nazwę, rozmiar pliku, numer inode'a, liczbę dowiązań, czy czasy dostępu.

#### realpath

`realpath` wyświetla ścieżkę bezwzględną do danego pliku. Przydane opcję, to:

* `--relative-to=DIR` wypisuje ścieżkę bezwględną, ale w stosunku do `DIR`, a nie `/`
* `P` rozpatruje dowiązania symboliczne

#### readlink

`readlink` rozwiązuje dowiązania symboliczne. Program z opcją `-f` działa praktycznie tak samo jak `realpath`.

#### dirname

`dirname` dla podanej scieżki wypisuje nazwę katalogu (ostatni element bez slasha (`/`))

#### basename

`basename` ucina całą scieżke do pliku i wypisuje tylko nazwę docelowego pliku. Trochę przeciwieństwo `dirname`.

### Zadanie 3

`hostname` zawiera nazwę urządzenia. Dzięki temu możemy łączyć się przez `ssh` z komputerem w obrębie sieci.

`machine-id` unikalne ID systemu, tworzone w momencie pierwszego bootowania.

`os-release` (!) zawiera podstawowe informacje o systemie operacyjnym (np. dystrybucja, wersja).

---

`hostnamectl` wyświetla wszystkie najważniejsze informację odnośnie maszyny i systemu operacyjnego..

`dbus-uuidgen` generowanie UUID.

`uname` przede wszystkim wyświetla najważniejsze informację na temat jądra systemu operacyjnego, ale też np. architekturę procesora.

`lsb_release` wyświetla informację o dystrybucji systemu (podobne z pliku `os-release`).

`neofetch` - fajne.

### Zadanie 4

#### lsof

Polecenie `lsof` wypisuje wszystkie pliki otwarte w systemie operacyjnym. Jednak w praktyce jest to on bardzo rozbudowany dzięki swoim opcjom, kilka najważniejszych to:

* `U` wypisuje gniazda UNIX plików
* `u NAME` wypisuje pliki, których właścicielem jest `NAME`
* `a` robi "koniunkcje" innych podanych opcji

`fuser` wyświetla PID procesu powiązane z danym plikiem lub systemem plików.

### Zadanie 5

`strace` pozwala prześledzić wywołania systemowe i sygnały wywoływane przez zadany program. Opcje:

* `-f` śledzi forki.
* `-e trace=[wywołania sys.]` wypisuje tylko wybrane wywołania systemowe

### Zadanie 7


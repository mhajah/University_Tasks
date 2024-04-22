#include <stdlib.h>
#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>

int main() {
    pid_t child_pid = fork();  // Tworzymy nowy proces potomny

    // Sprawdzamy, czy jesteśmy w procesie potomnym
    if (child_pid == 0) {
        printf("Jestem procesem potomnym. Moje PID = %d.\n", getpid());
        exit(0);  // Proces potomny kończy działanie
    } else {
        // Jesteśmy w procesie rodzicielskim
        printf("Jestem procesem rodzicielskim, moje PID = %d, PID potomka = %d.\n", getpid(), child_pid);
        printf("Proces potomny zakończył się, ale nie obsługujemy jego zakończenia.\n");

        // Proces rodzicielski wykonuje dłuższą pracę, aby proces potomny pozostał jako zombie
        sleep(60);  // Czekamy 60 sekund

        printf("Proces rodzicielski kończy pracę.\n");
    }

    return 0;
}

import os
import sys
import random
import multiprocessing

def compute_waste():
    while True:
        _ = (random.random() * random.random()) ** random.random()

def main(n_processes, initial_nice):
    os.nice(initial_nice)

    # Tworzenie procesów
    processes = []
    for _ in range(n_processes):
        p = multiprocessing.Process(target=compute_waste)
        processes.append(p)
        p.start()

    os.nice(initial_nice)

    # Czekanie na procesy (w tym przypadku nigdy się nie zakończą)
    for p in processes:
        p.join()

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Użycie: python script.py <liczba_procesów> <początkowa_wartość_nice>")
        sys.exit(1)

    n_processes = int(sys.argv[1])
    initial_nice = int(sys.argv[2])
    main(n_processes, initial_nice)

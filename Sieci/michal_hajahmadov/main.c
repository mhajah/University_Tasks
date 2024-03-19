#include "main.h"
#include "icmp_sender.h"
#include "icmp_receiver.h"

#define MAX_HOPS 30
#define MAX_REPONSES 3

void print_traceroute(int reponse_counter, struct in_addr response_adresses[], int times[]) {

    // diffrent responses*
    bool is_two_responses = reponse_counter >= 2 && response_adresses[0].s_addr != response_adresses[1].s_addr;
    bool is_three_responses = reponse_counter >= 3 && response_adresses[0].s_addr != response_adresses[2].s_addr && response_adresses[2].s_addr != response_adresses[1].s_addr;

    /* 
    * Konwersja z 32-bitowej liczby na postać kropkowo-dziesiętną
    * ntoa -> network to ascii
    */
    printf("%s ", inet_ntoa(response_adresses[0]));

    /* W przypadku odpowiedzi od więcej niż jednego routera należy wyświetlić wszystkie odpowiadające */
    if ( is_two_responses ) {
        printf("%s ", inet_ntoa(response_adresses[1]));
    }

    if ( is_three_responses ) {
        printf("%s ", inet_ntoa(response_adresses[2]));
    }

    if ( reponse_counter == MAX_REPONSES ) {
        int avg_responsetime = (times[0] + times[1] + times[2])/3;
        printf("%d ms\n", avg_responsetime);
    } else {
        printf("???\n");
    }
}


int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Nieprawidlowa liczba argumentow (oczekiwany 1)\n");
        exit(EXIT_FAILURE); 
    }

    int response_times[MAX_REPONSES];
    struct in_addr response_adresses[MAX_REPONSES];

    struct sockaddr_in addr_ip;
    int socket_descriptor;
    addr_ip.sin_family = AF_INET;
    addr_ip.sin_addr.s_addr = inet_addr(argv[1]);

    if (addr_ip.sin_addr.s_addr == (in_addr_t)-1) {
        fprintf(stderr, "Nieprawidlowy format adresu IP\n");
    }

    socket_descriptor = socket(AF_INET, SOCK_RAW, IPPROTO_ICMP);
    if (socket_descriptor < 0) {
        fprintf(stderr, "Nie udalo sie utworzyc gniazda, socket error: %s\n", strerror(errno));
        exit(EXIT_FAILURE);
    }

    struct timespec start, stop;
    int reponse_counter;

    for (int i=1; i <= MAX_HOPS; i++) {
        clock_gettime(CLOCK_MONOTONIC, &start);
        reponse_counter = 0;

        struct pollfd fds[1];
        fds[0].fd = socket_descriptor;
        fds[0].events = POLLIN;

        for (int j=1; j <= MAX_REPONSES; j++) {
            icmp_send(socket_descriptor, addr_ip, i, j);
        }

        while (reponse_counter < MAX_REPONSES) {

            int pollResponses = poll(fds, 1, 1000);
            if (pollResponses < 0) {
                fprintf(stderr, "Blad podczas oczekiwania na odpowiedz: %s\n", strerror(errno));
                exit(EXIT_FAILURE);
            } 

            else if (pollResponses == 0) break;

            else {
                in_addr_t destination_ip = icmp_receive(socket_descriptor, i);

                if (destination_ip != (in_addr_t)-1) {

                    response_adresses[reponse_counter].s_addr = destination_ip;
                    
                    clock_gettime(CLOCK_MONOTONIC, &stop);
                    response_times[reponse_counter] = (stop.tv_sec - start.tv_sec)*1000 + (stop.tv_nsec - start.tv_nsec)/1000000;
                    reponse_counter++;
                }
            }
        }


        /* Wypisywanie */
        printf("%d. ", i);
        if (reponse_counter == 0) {
            printf("* \n");
            continue;
        }
        print_traceroute(reponse_counter, response_adresses, response_times);

        if (response_adresses[0].s_addr == addr_ip.sin_addr.s_addr) break;
    }

    return 0;
}
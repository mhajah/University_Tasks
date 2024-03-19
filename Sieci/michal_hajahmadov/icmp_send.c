
#include "icmp_sender.h"
#include "main.h"

/*
* Funkcja wysyłająca pakiet.
* socket_descriptor: deskryptor gniazda
* addr_ip: adres, do którego wysyłamy
* ttl: time to live
* seq: numer sekwencyjny pakietu
*/

void icmp_send(int socket_descriptor, struct sockaddr_in addr_ip, int ttl, int seq) {
    struct icmp icmp_header;
    memset(&icmp_header, 0, sizeof(struct icmp));
    icmp_header.icmp_type = ICMP_ECHO;
    icmp_header.icmp_id = getpid();
    icmp_header.icmp_code = 0;
    icmp_header.icmp_seq = ttl*3 + seq-1;
    icmp_header.icmp_cksum = compute_icmp_checksum((u_int16_t *)&icmp_header, sizeof(struct icmp));

    /* 
    * Do manipulacji opcjami gniazda o podanym deskryptorze uzywa sie setsockopt(),
    * ktora zwraca 0 w przypadku sukcesu i -1 w przypadku bledu
    */
    
    int is_socketset_ok = setsockopt(socket_descriptor, IPPROTO_IP, IP_TTL, &ttl, sizeof(int));

    if (is_socketset_ok == -1) {
        fprintf(stderr, "Wystapil blad podczas konfiguracji gniazda %s ...\n", strerror(errno));
        exit(-1);
    }

    /*
    * sendto() transmituje wiadomosc do innego socketu.
    * Zwraca liczbe wyslanych znakow w przypadku powodzenia i -1 w przypadku bledu
    */

    int is_sent_ok = sendto(socket_descriptor, &icmp_header, sizeof(struct icmp), 0, (struct sockaddr *)&addr_ip, sizeof(struct sockaddr_in));

    if (is_sent_ok == -1) {
        fprintf(stderr, "!Wystapil blad podczas konfiguracji gniazda: %s ...\n", strerror(errno));
        exit(-1);
    }
}
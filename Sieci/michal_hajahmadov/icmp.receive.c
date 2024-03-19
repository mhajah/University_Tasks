#include "main.h"

in_addr_t icmp_receive(int socket_descriptor, int ttl) {
    /* Część skopiowana z wykładu */

    struct sockaddr_in sender;
    u_int8_t buffer[IP_MAXPACKET];
    socklen_t sender_len = sizeof(sender);
    int packet_len = recvfrom(socket_descriptor, &buffer, IP_MAXPACKET, 0, (struct sockaddr *)&sender, &sender_len);
    if (packet_len < 0) {
        fprintf(stderr, "Odbior danych zakonczyl sie bledem: %s\n", strerror(errno));
        exit(EXIT_FAILURE);
    }

    struct ip *ip_header = (struct ip *)buffer;

    /* Koniec części skopiowanej z wykładu */
    struct icmp *icmp_header = (struct icmp *)((u_int8_t *)ip_header + 4 * ip_header->ip_hl);


    /* odpowiedzi ICMP echo reply zawieraja te same pole id i seq */
    if (icmp_header->icmp_type == ICMP_ECHOREPLY) {
        if(!(icmp_header->icmp_seq / 3 == ttl && icmp_header->icmp_id==getpid())) {
            return -1;
        }
    }

    /* 
    * Komunikaty ICMP time exceeded zawieraja oryginalny naglowek IP 
    * i 8 bajtow oryginalnego pakietu IP
    */
	if(icmp_header->icmp_type == ICMP_TIME_EXCEEDED){
		struct ip *inn_ip = (struct ip *)((uint8_t *)icmp_header + 8);
		struct icmp *inn_icmp = (struct icmp *)((uint8_t *)inn_ip + inn_ip->ip_hl * 4);
		if(!(inn_icmp->icmp_seq / 3 == ttl && inn_icmp->icmp_id==getpid())){
			return -1;
		}
	}

    return sender.sin_addr.s_addr;
    
}

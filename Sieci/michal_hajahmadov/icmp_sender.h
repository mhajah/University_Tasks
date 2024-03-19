#include "main.h"

u_int16_t compute_icmp_checksum (const void *buff, int length);
void icmp_send(int internet_socket, struct sockaddr_in ip, int i, int j);
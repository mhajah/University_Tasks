#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <getopt.h>
#include <time.h>
#include <sys/stat.h>

#define DEFAULT_PERIOD 1
#define DEFAULT_INTERVAL 60
#define DEFAULT_LOGFILE "/var/log/mystat.log"

void read_cpu_load(double *load);
void write_to_log(const char *logfile, double min, double max, double avg);

int main(int argc, char *argv[]) {
    int period = DEFAULT_PERIOD;
    int interval = DEFAULT_INTERVAL;
    char logfile[256];
    strncpy(logfile, DEFAULT_LOGFILE, sizeof(logfile));

    struct option long_options[] = {
        {"period", required_argument, 0, 'p'},
        {"interval", required_argument, 0, 'i'},
        {"logfile", required_argument, 0, 'f'},
        {0, 0, 0, 0}
    };

    int option_index = 0;
    int c;
    while ((c = getopt_long(argc, argv, "p:i:f:", long_options, &option_index)) != -1) {
        switch (c) {
            case 'p':
                period = atoi(optarg);
                break;
            case 'i':
                interval = atoi(optarg);
                break;
            case 'f':
                strncpy(logfile, optarg, sizeof(logfile) - 1);
                logfile[sizeof(logfile) - 1] = '\0';
                break;
            default:
                fprintf(stderr, "Usage: %s [-p period] [-i interval] [-f logfile]\n", argv[0]);
                exit(EXIT_FAILURE);
        }
    }

    int counts = interval / period;
    double min_load = 100.0, max_load = 0.0, avg_load = 0.0, sum_load = 0.0;
    int count = 0;

    while (1) {
        double current_load;
        read_cpu_load(&current_load);

        if (current_load < min_load) min_load = current_load;
        if (current_load > max_load) max_load = current_load;
        sum_load += current_load;
        count++;

        if (count >= counts) {
            avg_load = sum_load / count;
            write_to_log(logfile, min_load, max_load, avg_load);
            min_load = 100.0;
            max_load = 0.0;
            sum_load = 0.0;
            count = 0;
        }

        sleep(period);
    }

    return 0;
}

void read_cpu_load(double *load) {
    FILE *fp = fopen("/proc/stat", "r");
    if (!fp) {
        perror("Failed to open /proc/stat");
        return;
    }

    char buffer[256];
    if (fgets(buffer, sizeof(buffer), fp) != NULL) {
        long user, nice, system, idle;
        sscanf(buffer, "cpu %ld %ld %ld %ld", &user, &nice, &system, &idle);
        long total = user + nice + system + idle;
        static long prev_total = 0, prev_idle = 0;

        if (prev_total != 0) {
            long delta_total = total - prev_total;
            long delta_idle = idle - prev_idle;
            *load = 100.0 * (1.0 - ((double)delta_idle / delta_total));
        } else {
            *load = 0.0;
        }

        prev_total = total;
        prev_idle = idle;
    }

    fclose(fp);
}

void write_to_log(const char *logfile, double min, double max, double avg) {
    FILE *fp = fopen(logfile, "a");
    if (!fp) {
        perror("Failed to open log file");
        return;
    }

    time_t now = time(NULL);
    struct tm *tm_now = localtime(&now);
    char formatted_time[20]; 
    
    strftime(formatted_time, sizeof(formatted_time), "%Y-%m-%d %H:%M:%S", tm_now);

    fprintf(fp, "%s - Min Load: %.2f%%, Max Load: %.2f%%, Avg Load: %.2f%%\n", formatted_time, min, max, avg);
    fclose(fp);
}

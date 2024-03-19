SRC = $(shell find . -name "*.c")
OBJ = $(patsubst %.c, %.o, $(SRC))

traceroute : $(OBJ)
	gcc -std=c17 -Wall -Wextra -o traceroute $(OBJ)

%.o : %.c
	gcc -Wall -Wextra -MMD -c $< -o $@

debug: traceroute
debug: -Wall -Wextra -fsanitize=address,undefined -O0 -g -DDEBUG

clean:
	$(RM) *.o
	$(RM) *.d

distclean:
	$(RM) *.o
	$(RM) *.d
	$(RM) traceroute
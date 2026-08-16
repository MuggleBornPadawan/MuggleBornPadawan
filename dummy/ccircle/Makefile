CC = gcc
CFLAGS = -Wall -std=c99 -I./raylib/include
LDFLAGS = -L./raylib/lib -l:libraylib.a -lGL -lm -lpthread -ldl -lrt -lX11

TARGET = circle_example
SRC = main.c

all: $(TARGET)

$(TARGET): $(SRC)
	$(CC) $(SRC) -o $(TARGET) $(CFLAGS) $(LDFLAGS)

clean:
	rm -f $(TARGET)

run: all
	./$(TARGET)

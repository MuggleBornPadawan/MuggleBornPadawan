# Use Alpine Linux as the base image
FROM alpine:latest

# Install Python
RUN apk update
RUN apk add python3 

# Copy files into the container
COPY /Python /app
COPY /CLISP /app
COPY /Clojure /app
COPY /Elisp /app
COPY /Java /app
COPY /R /app
COPY start.sh /app
RUN chmod +x /app/start.sh

# Set the working directory for next set of commands
WORKDIR /app

# Run the tests
CMD ["./start.sh"]
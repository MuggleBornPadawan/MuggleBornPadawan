# Use Alpine Linux as the base image
FROM alpine:latest

# Install Python
RUN apk update
RUN apk add python3 

# Copy files into the container
COPY /300_python /app
COPY /100_clisp /app
COPY /110_clojure /app
COPY /120_elisp /app
COPY /200_java /app
COPY /400_r /app
COPY start.sh /app
RUN chmod +x /app/start.sh

# Set the working directory for next set of commands
WORKDIR /app

# Run the tests
CMD ["./start.sh"]
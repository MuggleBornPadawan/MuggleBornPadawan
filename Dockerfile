# Use Alpine Linux as the base image
FROM alpine:latest

# Install Python
RUN apk update
RUN apk add python3

# Copy the Python files into the container
COPY /Python /app

# Set the working directory for next set of commands
WORKDIR /app

# Run the tests
# CMD ["python3", "-m", "unittest", "test_date_sum.py"]
CMD ["python3", "hello_world.py"]

#Create shell script to run multiple commands

# COPY start.sh /start.sh
# RUN chmod +x /start.sh
# CMD ["/start.sh"]

#!/bin/sh
# command1 &
# command2 &
# wait
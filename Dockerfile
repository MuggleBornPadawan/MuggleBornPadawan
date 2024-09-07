# Use Fedora as the base image
FROM fedora:latest

# Install Python
RUN dnf install -y python3

# Copy the Python files into the container
COPY python/date_sum.py /app/date_sum.py
COPY python/test_date_sum.py /app/test_date_sum.py

# Set the working directory for next set of commands
WORKDIR /app/python

# Run the tests
CMD ["python3", "-m", "unittest", "test_date_sum.py"]
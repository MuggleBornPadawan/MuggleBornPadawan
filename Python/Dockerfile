# Use Fedora as the base image
FROM fedora:latest

# Install Python
RUN dnf install -y python3

# Copy the Python files into the container
COPY date_sum.py /app/date_sum.py
COPY test_date_sum.py /app/test_date_sum.py

# Set the working directory
WORKDIR /app

# Run the tests
CMD ["python3", "-m", "unittest", "test_date_sum.py"]
import datetime

def log_message(message):
    # Get the current date and time
    current_date_time = datetime.datetime.now()
    # Format the date and time
    formatted_date_time = current_date_time.strftime("%Y-%m-%d %H:%M:%S")
    # Create the log entry
    log_entry = f"{formatted_date_time} - {message}\n"
    
    # Write the log entry to a file
    with open("hello_world.log", "a") as log_file:
        log_file.write(log_entry)

def main():
    # The message to be logged and printed
    message = "Hello, Python World!"
    print(message)
    log_message(message)
    print("Log written to hello_world.log")

if __name__ == "__main__":
    main()
# test

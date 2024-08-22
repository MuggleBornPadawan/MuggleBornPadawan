from datetime import datetime

def sum_date_parts(date_str):
    # Parse the date string into a date object
    date = datetime.strptime(date_str, "%Y-%m-%d")
    
    # Extract day, month, and year
    day = date.day
    month = date.month
    year = date.year
    
    # Calculate the sum
    return day + month + year

if __name__ == "__main__":
    # Example usage:
    date_input = "2023-08-22"  # Modify this date as needed
    result = sum_date_parts(date_input)
    print(f"Sum of the day, month, and year for {date_input}: {result}")

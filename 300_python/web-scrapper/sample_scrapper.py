from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Step 1: Set up the WebDriver
# driver = webdriver.Chrome('./chromedriver')  # Ensure chromedriver is in your PATH
driver = webdriver.Chrome()

# Step 2: Open the Quotes website
driver.get("http://quotes.toscrape.com")  # Target URL

# Step 3: Wait for the page to load
time.sleep(2)  # You can adjust this time as needed

# Step 4: Extract quotes and authors
quotes = driver.find_elements(By.CLASS_NAME, "quote")  # Find all quote elements

for quote in quotes:
    text = quote.find_element(By.CLASS_NAME, "text").text  # Extract the quote text
    author = quote.find_element(By.CLASS_NAME, "author").text  # Extract the author name
    print(f"Quote: {text}\nAuthor: {author}\n")

# Step 5: Close the browser
driver.quit()

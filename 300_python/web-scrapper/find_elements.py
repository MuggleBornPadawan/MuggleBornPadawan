from selenium import webdriver
from selenium.webdriver.common.by import By

# Initialize the WebDriver
driver = webdriver.Chrome()

# Open the desired URL
driver.get("http://quotes.toscrape.com")  # Replace with your target URL

# Find all elements on the page
elements = driver.find_elements(By.XPATH, "//*")  # Select all elements

# Use a set to store unique class names
class_names = set()

# Extract and print class names
print("\n... class extraction begins:")
for element in elements:
    class_name = element.get_attribute('class')
    if class_name:  # Check if the element has a class attribute
        print(class_name)
        class_names.update(class_name.split())

# Sort the unique class names
sorted_class_names = sorted(class_names)

# Print sorted unique class names
print("\n... sorted and unique classes:")

for name in sorted_class_names:
    print(name)

# Close the driver
driver.quit()

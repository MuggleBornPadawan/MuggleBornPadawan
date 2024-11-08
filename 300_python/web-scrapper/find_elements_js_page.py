from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize the WebDriver (Chrome in this example)
driver = webdriver.Chrome()

try:
    # Open the desired URL
    driver.get("https://www.wikipedia.org")  # Replace with your target URL

    # Wait for the page to fully load (adjust the condition as needed)
    WebDriverWait(driver, 10000).until(EC.presence_of_all_elements_located((By.XPATH, "//*")))

    # Find all elements on the page
    elements = driver.find_elements(By.XPATH, "//*")  # Select all elements

    # Use a set to store unique class names
    class_names = set()

    # Extract class names from each element
    print("\n... extraction of class names")
    for element in elements:
        class_name = element.get_attribute('class')
        if class_name:  # Check if the element has a class attribute
            # Split multiple class names and add them to the set
            print(class_name)
            class_names.update(class_name.split())

    # Sort the unique class names
    sorted_class_names = sorted(class_names)

    # Print sorted unique class names
    print("\n... sorted and unique names")
    for name in sorted_class_names:
        print(name)

finally:
    # Close the driver
    driver.quit()

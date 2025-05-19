// Author: MuggleBornPadawan
// License: Public Domain (for learning purposes)
// Version: 1.2
// Description: A C++ program to print "Hello, World!" followed by the current local date and time.

#include <iostream>  // Required for std::cout (console output) and std::endl (new line)
#include <chrono>    // Required for std::chrono::system_clock (used to get current time)
#include <iomanip>   // Required for std::put_time (used to format time for output)
#include <ctime>     // Required for std::time_t, std::tm, and std::localtime (C-style time manipulation)

int main() {
    // --- Get Current Time ---

    // 1. Get the current time point from the system's clock.
    //    `auto` deduces the type, which is std::chrono::time_point<std::chrono::system_clock>.
    auto currentTimePoint = std::chrono::system_clock::now();

    // 2. Convert the modern C++ time_point to a C-style std::time_t object.
    //    std::time_t is a type suitable for representing time in many C-style functions.
    std::time_t cStyleTime = std::chrono::system_clock::to_time_t(currentTimePoint);

    // 3. Convert std::time_t to a `struct tm` in the local timezone.
    //    `std::localtime` takes a pointer to a time_t object and returns a pointer
    //    to a statically allocated `struct tm` containing the time broken down into its components
    //    (year, month, day, hour, minute, second, etc.) for the local timezone.
    //    The asterisk (*) dereferences the pointer to copy the struct tm object.
    //    Note: `std::localtime` is not thread-safe because it often uses a shared static buffer.
    //    For multithreaded applications, `localtime_s` (on Windows/C++11) or `localtime_r` (POSIX)
    //    are safer alternatives.
    std::tm localTimeComponents = *std::localtime(&cStyleTime);

    // --- Print Output ---

    // Print the "Hello, World!" message.
    std::cout << "Hello, C++ World! Current date and time is: ";

    // Format and print the date and time from the `localTimeComponents` structure.
    // `std::put_time` formats the time according to the provided format string.
    // Format string details:
    //   %Y: Year with century (e.g., 2025)
    //   %m: Month as a decimal number (01-12)
    //   %d: Day of the month as a decimal number (01-31)
    //   %H: Hour in 24-hour format (00-23)
    //   %M: Minute as a decimal number (00-59)
    //   %S: Second as a decimal number (00-59)
    std::cout << std::put_time(&localTimeComponents, "%Y-%m-%d %H:%M:%S") << std::endl;

    // Indicate that the program executed successfully.
    // A return value of 0 from main() typically signifies success.
    return 0;
}

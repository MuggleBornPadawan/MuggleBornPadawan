# Get the current date and time
current_datetime <- Sys.time()

# Format the date and time
formatted_datetime <- format(current_datetime, "%Y-%m-%d %H:%M:%S")

# Print the formatted date and time
cat("Hello, R World! Current date and time:", formatted_datetime, "\n")

# Specify the log file name
log_file <- "hello_world.txt"

# Write the formatted date and time to the log file
write(formatted_datetime, file = log_file, append = TRUE)

# Add a newline after each entry
write("\n", file = log_file, append = TRUE)

# Terminal - Rscript hello_world.R
# Emacs REPL - Install Emacs Speaks Statistics (EWW) package
# M-x R (run REPL)
# source("hello_world.R")

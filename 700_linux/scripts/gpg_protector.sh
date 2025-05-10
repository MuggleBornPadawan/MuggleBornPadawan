#!/usr/bin/env bash

# Script to encrypt and decrypt files using GPG with a combined passphrase
# (one part from 'pass', one part from user input).
# Inspired by principles of simplicity and robustness from Rich Hickey.
# Security considerations informed by experts like Bruce Schneier and Kevin Mitnick.

# Exit immediately if a command exits with a non-zero status.
set -e
# Treat unset variables as an error when substituting.
set -u
# Pipestatus: Causes a pipeline to return the exit status of the last command in the pipeline
# that returned a non-zero exit status, or zero if all commands in the pipeline returned zero.
set -o pipefail

# --- Configuration ---
# Path to the secret stored in 'pass' (the standard Unix password manager).
# User specified 'protector_key' as the name of the secret.
readonly PASS_SECRET_NAME="protector_key"

# GPG symmetric cipher algorithm to use. AES256 is a strong choice.
readonly GPG_CIPHER_ALGO="AES256"

# --- Utility Functions ---

# Function to display usage instructions
usage() {
  echo "Usage: $0 <encrypt|decrypt> <filename> <user_secret_part>"
  echo "  encrypt: Encrypts <filename> to <filename>.enc"
  echo "  decrypt: Decrypts <filename> and displays content to the terminal via 'less'"
  echo ""
  echo "Arguments:"
  echo "  <encrypt|decrypt>  : Operation to perform."
  echo "  <filename>         : Path to the file to operate on."
  echo "  <user_secret_part> : The user's portion of the secret passphrase."
  exit 1
}

# Function to check if required commands are available
check_dependencies() {
  local missing_deps=0
  for cmd in gpg pass less; do
    if ! command -v "$cmd" &> /dev/null; then
      echo "Error: Required command '$cmd' is not installed. Please install it." >&2
      missing_deps=1
    fi
  done
  if [[ $missing_deps -eq 1 ]]; then
    exit 1
  fi
}

# --- Encryption Function ---
encrypt_file() {
  local input_file="$1"
  local output_file="$2"
  local user_secret_part_arg="$3" # Renamed to avoid conflict with unset command on argument
  local inbuilt_secret
  local combined_passphrase

  # Fetch the inbuilt secret. Handle potential errors.
  if ! inbuilt_secret=$(pass show "$PASS_SECRET_NAME" 2>/dev/null); then
    echo "Error: Failed to retrieve secret '$PASS_SECRET_NAME' from 'pass'." >&2
    echo "Please ensure 'pass' is initialized and the secret exists." >&2
    return 1 # Indicate failure
  fi

  # Combine the secrets
  combined_passphrase="${inbuilt_secret}${user_secret_part_arg}"
  # Clear the individual secrets from memory as soon as they are combined
  unset inbuilt_secret # user_secret_part_arg is a local copy of an argument.
  
  echo "Encrypting '$input_file' to '$output_file' using $GPG_CIPHER_ALGO..."

  # Perform encryption using GPG
  if echo "$combined_passphrase" | gpg --symmetric --cipher-algo "$GPG_CIPHER_ALGO" \
                                     --batch --yes \
                                     --pinentry-mode loopback \
                                     --passphrase-fd 0 \
                                     -o "$output_file" "$input_file"; then
    echo "Encryption successful: '$output_file'"
  else
    echo "Error: GPG encryption failed for '$input_file'." >&2
    unset combined_passphrase # Ensure cleanup on failure path too
    return 1 # Indicate failure
  fi

  # Unset the combined passphrase explicitly
  unset combined_passphrase
  # echo "Sensitive data (combined passphrase) cleared from this function's memory."
}

# --- Decryption Function ---
decrypt_and_display_file() {
  local input_file="$1"
  local user_secret_part_arg="$2" # Renamed
  local inbuilt_secret
  local combined_passphrase

  # Fetch the inbuilt secret.
  if ! inbuilt_secret=$(pass show "$PASS_SECRET_NAME" 2>/dev/null); then
    echo "Error: Failed to retrieve secret '$PASS_SECRET_NAME' from 'pass'." >&2
    return 1
  fi

  combined_passphrase="${inbuilt_secret}${user_secret_part_arg}"
  unset inbuilt_secret

  echo "Decrypting '$input_file' for display (content will appear in 'less')..."
  echo "Press 'q' in 'less' to exit the display."
  echo "If prompted for a PIN/TTY, ensure 'gpg-agent' is configured or not interfering."

  # Perform decryption, piping output to 'less'
  if echo "$combined_passphrase" | gpg --decrypt --quiet --batch \
                                     --pinentry-mode loopback \
                                     --passphrase-fd 0 "$input_file" | less; then
    # If GPG fails, 'set -o pipefail' should make the pipeline fail.
    # GPG errors go to stderr and will be visible. Successful decryption means 'less' gets content.
    echo # Newline after less finishes for cleaner terminal
    echo "Decryption display finished."
  else
    # This 'else' might be hit if 'less' itself fails, or if pipefail propagates a GPG failure.
    echo "Error: GPG decryption or display pipeline failed for '$input_file'." >&2
    unset combined_passphrase # Ensure cleanup
    return 1
  fi

  unset combined_passphrase
  # echo "Sensitive data (combined passphrase) cleared from this function's memory."
}


# --- Main Script Logic ---

# First, check dependencies
check_dependencies

# Check for correct number of arguments
if [[ $# -ne 3 ]]; then
  usage
fi

# Assign arguments to variables for clarity
readonly OPERATION="$1"
readonly INPUT_FILE="$2"
# The user_secret_part is passed directly to functions to manage its scope.
# It's sensitive, so we avoid keeping it in a top-level script variable longer than necessary,
# though $3 itself will persist until script exit. Functions use copies.
declare -r user_secret_argument="$3"


# Validate input file
if [[ ! -f "$INPUT_FILE" ]]; then
  echo "Error: Input file '$INPUT_FILE' not found or is not a regular file." >&2
  exit 1
fi
if [[ ! -r "$INPUT_FILE" ]]; then
  echo "Error: Input file '$INPUT_FILE' is not readable." >&2
  exit 1
fi

# Perform the chosen operation
case "$OPERATION" in
  encrypt)
    # Construct output filename for encryption
    readonly OUTPUT_FILE="${INPUT_FILE}.enc"
    if [[ -e "$OUTPUT_FILE" ]]; then
      # Prompt user before overwriting an existing encrypted file
      read -r -p "Output file '$OUTPUT_FILE' already exists. Overwrite? (y/N): " confirmation
      if [[ "$confirmation" != "y" && "$confirmation" != "Y" ]]; then
        echo "Encryption aborted by user."
        exit 0
      fi
    fi
    encrypt_file "$INPUT_FILE" "$OUTPUT_FILE" "$user_secret_argument"
    ;;
  decrypt)
    # Check if the file seems to be an encrypted file (ends with .enc)
    if [[ "$INPUT_FILE" != *.enc ]]; then
        echo "Warning: Input file '$INPUT_FILE' does not appear to be an '.enc' file." >&2
        read -r -p "Proceed with decryption attempt anyway? (y/N): " confirmation
        if [[ "$confirmation" != "y" && "$confirmation" != "Y" ]]; then
            echo "Decryption aborted by user."
            exit 0
        fi
    fi
    decrypt_and_display_file "$INPUT_FILE" "$user_secret_argument"
    ;;
  *)
    echo "Error: Invalid operation '$OPERATION'. Use 'encrypt' or 'decrypt'." >&2
    usage
    ;;
esac

# $user_secret_argument (from $3) will go out of scope when script exits.
# All other sensitive intermediate variables were local to functions or explicitly unset.
echo "Operation completed."
exit 0

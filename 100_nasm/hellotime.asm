; =============================================================================
; License: GNU GPL v3
;
; This program is free software: you can redistribute it and/or modify
; it under the terms of the GNU General Public License as published by
; the Free Software Foundation, either version 3 of the License, or
; (at your option) any later version.
;
; This program is distributed in the hope that it will be useful,
; but WITHOUT ANY WARRANTY; without even the implied warranty of
; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
; GNU General Public License for more details.
;
; You should have received a copy of the GNU General Public License
; along with this program. If not, see <https://www.gnu.org/licenses/>.
;
; Author: MuggleBornPadawan
; Date: 2025-09-15
; Description: A simple x86-64 Assembly program for Linux that prints
;              "Hello, world! Current epoch time: " followed by the
;              current Unix epoch time.
;
; To Assemble and Link:
; nasm -f elf64 -o hellotime.o hellotime.asm
; ld -o hellotime hellotime.o
;
; To Run:
; ./hellotime
; =============================================================================

; System call numbers for x86-64 Linux
SYS_WRITE       equ 1
SYS_EXIT        equ 60
SYS_GETTIMEOFDAY equ 96

; File descriptors
STDOUT          equ 1

; =============================================================================
; Data Section: Initialized data (constants, strings)
; =============================================================================
section .data
    ; The message to be printed.
    helloMsg    db  "Hello, Netwide Assembler world! Current epoch time: "
    helloMsgLen equ $ - helloMsg  ; Calculate length at assembly time.

    ; Newline character for clean output.
    newline     db  10
    newlineLen  equ $ - newline

; =============================================================================
; BSS Section: Uninitialized data (buffers, variables)
; =============================================================================
section .bss
    ; A buffer to store the timeval struct from the gettimeofday syscall.
    ; struct timeval {
    ;   long tv_sec;  /* seconds - 8 bytes on x86-64 */
    ;   long tv_usec; /* microseconds - 8 bytes on x86-64 */
    ; };
    timeval     resq 2  ; Reserve 2 quadwords (16 bytes).

    ; A buffer to hold the ASCII string representation of the epoch time.
    ; A 64-bit number has max 20 digits, plus one for null terminator.
    timeStr     resb 21

; =============================================================================
; Text Section: The actual code
; =============================================================================
section .text
    global _start       ; Make _start entry point visible to the linker.

; -----------------------------------------------------------------------------
; _start: The main entry point of the program.
; -----------------------------------------------------------------------------
_start:
    ; --- 1. Print the "Hello, world!" message ---
    mov rax, SYS_WRITE      ; syscall number for write
    mov rdi, STDOUT         ; file descriptor (stdout)
    mov rsi, helloMsg       ; pointer to the message
    mov rdx, helloMsgLen    ; length of the message
    syscall                 ; Make the system call

    ; --- 2. Get the current time ---
    mov rax, SYS_GETTIMEOFDAY ; syscall number for gettimeofday
    mov rdi, timeval          ; pointer to the timeval struct
    mov rsi, 0                ; timezone struct (not used, set to null)
    syscall                   ; Make the system call
    ; The number of seconds since epoch is now in the first 8 bytes of timeval

    ; --- 3. Convert the epoch time (integer) to a string ---
    mov rdi, [timeval]      ; Move the 64-bit integer (seconds) into rdi
    mov rsi, timeStr        ; Move the pointer to our buffer into rsi
    call intToString        ; Call the conversion function
    ; rax will now contain the length of the resulting string

    ; --- 4. Print the time string ---
    mov rdx, rax            ; Move the length from rax to rdx (3rd arg for write)
    mov rax, SYS_WRITE      ; syscall number for write
    mov rdi, STDOUT         ; file descriptor (stdout)
    mov rsi, timeStr        ; pointer to the time string
    syscall                 ; Make the system call

    ; --- 5. Print a newline character ---
    mov rax, SYS_WRITE      ; syscall number for write
    mov rdi, STDOUT         ; file descriptor (stdout)
    mov rsi, newline        ; pointer to the newline character
    mov rdx, newlineLen     ; length of the newline
    syscall                 ; Make the system call

    ; --- 6. Exit the program gracefully ---
    mov rax, SYS_EXIT       ; syscall number for exit
    mov rdi, 0              ; Exit code 0 (success)
    syscall                 ; Make the system call


; -----------------------------------------------------------------------------
; intToString: Converts a 64-bit unsigned integer to a decimal ASCII string.
; Input:
;   rdi: The 64-bit integer to convert.
;   rsi: A pointer to a buffer to store the resulting string.
; Output:
;   rax: The length of the string.
;   The buffer at [rsi] is filled with the string (not null-terminated).
; Clobbers: rax, rbx, rcx, rdx, r8
; -----------------------------------------------------------------------------
intToString:
    mov rbx, 10             ; Divisor is 10 for decimal conversion
    mov rcx, rsi            ; Save the starting address of the buffer
    mov rax, rdi            ; Move the number to convert into rax
    mov r8, 0               ; Use r8 to count the number of digits pushed

    ; Handle the case where the number is 0
    test rax, rax
    jnz .conversion_loop
    mov byte [rcx], '0'     ; If number is 0, place '0' in buffer
    inc rcx                 ; Move to the next byte
    jmp .done

.conversion_loop:
    xor rdx, rdx            ; Clear rdx for the division (rdx:rax / rbx)
    div rbx                 ; Divide rax by 10. Quotient in rax, Remainder in rdx.
    add rdx, '0'            ; Convert remainder (0-9) to ASCII digit ('0'-'9')
    push rdx                ; Push the digit onto the stack
    inc r8                  ; Increment our digit counter
    test rax, rax           ; Check if the quotient is zero
    jnz .conversion_loop    ; If not zero, continue loop

.pop_digits:
    cmp r8, 0               ; Check if we have popped all digits
    je .done                ; If counter is 0, we are done.
    pop rax                 ; Pop the digit from the stack
    mov [rcx], al           ; Move the ASCII digit into our buffer
    inc rcx                 ; Increment buffer pointer
    dec r8                  ; Decrement digit counter
    jmp .pop_digits

.done:
    mov rax, rcx            ; rax now holds the end address of the string
    sub rax, rsi            ; Subtract start address to get the length
    ret                     ; Return

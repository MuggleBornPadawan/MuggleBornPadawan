; hello.asm for x86

; License: GNU GPL v3
; Author: MuggleBornPadawan
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
	
	;; use this terminal command to human readable assembly code into a machine code "object file": nasm -f elf64 hello.asm -o hello.o
	;; use this command to turn the object file into a program your system can actually run: ld hello.o -o hello
	;; reference
	;; RAX: The "Accumulator," often used for calculations and storing the results of functions.
	;; RBX: The "Base" register.
	;; RCX: The "Counter," often used for counting in loops.
	;; RDX: The "Data" register, often used with RAX for multiplication and division.
	;; RSP: The "Stack Pointer," which keeps track of a special memory area called the stack.
	;; RDI, RSI: Used to hold the first and second arguments when you call a function.
	
section .data
    msg db 'Hello, NetWide Assembler World!', 0x0a  
    len equ $ - msg             

section .text
    global _start

_start:
    ; Write our message to the screen
    mov rax, 1      ; The syscall number for 'write'
    mov rdi, 1      ; File descriptor 1 is stdout (the terminal)
    mov rsi, msg    ; The address of our message in memory
    mov rdx, len    ; The length of our message
    syscall         ; Tell the operating system to do it

    ; Exit the program
    mov rax, 60     ; The syscall number for 'exit'
    mov rdi, 0      ; Exit code 0 (success)
    syscall         ; Tell the operating system to do it

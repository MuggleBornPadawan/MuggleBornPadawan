"""
Race Conditions in Concurrent Python Code
===========================================

This module demonstrates race conditions in multithreaded Python programs
and provides solutions using proper locking mechanisms.

WHAT IS A RACE CONDITION?
-------------------------
A race condition occurs when multiple threads access and modify shared data
concurrently, and the final outcome depends on the timing of thread execution.
The term comes from the idea that threads "race" to access/modify the data.

WHY DO RACE CONDITIONS HAPPEN?
------------------------------
Python's GIL (Global Interpreter Lock) ensures only one thread executes Python
code at a time, but it does NOT prevent race conditions when:
1. Multiple statements read-modify-write the same variable
2. Thread switching happens between those statements
3. The operations are not atomic (not single CPU instructions)

COMMON RACE CONDITION PATTERNS:
-------------------------------
- Read-modify-write: temp = x; x = temp + 1
- Check-then-act: if balance >= amount; balance -= amount
- Multiple shared variables: account transfers

HOW TO FIX RACE CONDITIONS:
---------------------------
1. Use threading.Lock() - mutual exclusion lock
2. Always acquire lock BEFORE accessing shared state
3. Use context manager (with lock:) for automatic release
4. Keep critical sections as small as possible
5. Avoid holding locks while performing blocking I/O

GUIDELINES:
-----------
- Use threading.Lock() or multiprocessing.Lock() for shared resource access
- Prefer threading.Thread over multiprocessing.Process for I/O-bound tasks
- Always acquire locks before modifying shared state
- Use context managers (with lock:) for automatic lock release
- Avoid global mutable state where possible

Content Structure:
1. Demonstrate thread safety problems (broken implementation)
2. Show resolution methods (correct implementation with locks)

Functions to implement:
- broken_increment(): Demonstrates race condition without locks (WILL HAVE BUGS)
- safe_increment(): Thread-safe counter increment with proper locking
- broken_bank_transfer(): Demonstrates race condition in banking scenario
- safe_bank_transfer(): Thread-safe bank transfer with locking
- demonstrate_problem(): Shows how race conditions cause incorrect results
- demonstrate_solution(): Shows how locks fix the issues

Example Usage:
--------------
    $ python race_conditions.py
    
    ========================================
    RACE CONDITIONS DEMONSTRATION
    ========================================
    
    PART 1: The Counter Problem
    ---------------------------
    We will create 10 threads, each incrementing a counter 10,000 times.
    Expected final value: 100,000
    
    Running broken version (NO locks)...
    Broken result: 42341 (expected: 100000)
    
    Explanation: Due to race conditions, many increments were lost!
    Multiple threads read the same value before either could write back.
    
    Running safe version (WITH locks)...
    Safe result: 100000 (expected: 100000)
    
    Explanation: With proper locking, every increment is preserved!
    
    ========================================
    
    The broken result will be different each time due to race conditions
"""

import threading
import time

counter = 0
lock = threading.Lock()


def broken_increment():
    """
    Demonstrates a classic race condition: multiple threads incrementing a shared counter.
    
    RACE CONDITION EXPLANATION:
    --------------------------
    This function has a classic read-modify-write race condition:
    
        temp = counter    # Step 1: READ the current value
        time.sleep(0.00001)  # Simulates work - thread may be preempted here!
        counter = temp + 1   # Step 2: WRITE the new value back
    
    The Problem:
    When 10 threads each run this 10000 times, they interleave unpredictably:
    
        Thread A reads counter=0
        Thread B reads counter=0    # Both threads got the same starting value!
        Thread A writes counter=1
        Thread B writes counter=1    # Lost update! Should be 2
    
    This results in lost updates. Instead of 10000, we typically get ~4000-6000
    because many increments are lost due to the interleaving.
    
    WHY SLEEP() CAUSES MORE RACES:
    -----------------------------
    The sleep() call increases the likelihood of thread preemption, making
    the race condition more visible. In real code, any operation that can
    be interrupted (I/O, context switches, etc.) creates the same vulnerability.
    
    Returns:
        int: The final counter value (will be less than expected due to race)
    
    Note:
        This function is BROKEN by design. DO NOT use in production.
        Run demonstrate_problem() to see the race condition in action.
    """
    global counter
    for _ in range(10000):
        temp = counter
        time.sleep(0.00001)
        counter = temp + 1
    return counter


def safe_increment():
    """
    Thread-safe counter increment using proper locking.
    
    SOLUTION EXPLANATION:
    --------------------
    This function fixes the race condition by wrapping the read-modify-write
    operation in a lock:
    
        with lock:           # Acquire exclusive access
            temp = counter  # Safe to read
            time.sleep(0.00001)  # Lock still held!
            counter = temp + 1   # Safe to write
        # Lock automatically released when exiting the block
    
    WHY THIS WORKS:
    ---------------
    1. The lock ensures ONLY ONE THREAD can execute the code inside the 'with' block
    2. Other threads must wait until the lock is released
    3. The read-modify-write becomes atomic (appears as a single operation)
    4. No other thread can interleave and cause lost updates
    
    CONTEXT MANAGER BENEFITS:
    -------------------------
    Using 'with lock:' (context manager) ensures the lock is ALWAYS released,
    even if an exception occurs. This prevents deadlocks that would happen
    with manual lock()/unlock() calls.
    
    Returns:
        int: The final counter value (will always be 10000 * number of threads)
    
    Example:
        >>> counter = 0
        >>> threads = [threading.Thread(target=safe_increment) for _ in range(10)]
        >>> for t in threads: t.start(); t.join()
        >>> print(counter)
        100000
    """
    global counter
    with lock:
        for _ in range(10000):
            temp = counter
            time.sleep(0.00001)
            counter = temp + 1
    return counter


def broken_bank_transfer(from_account, to_account, amount):
    """
    Demonstrates a race condition in a banking scenario with two-phase account updates.
    
    RACE CONDITION EXPLANATION:
    --------------------------
    This simulates a bank transfer where the balance check and update happen
    in separate steps with delays in between:
    
        if from_account["balance"] >= amount:    # CHECK phase
            time.sleep(0.001)                        # Delay 1
            from_account["balance"] -= amount    # WRITE phase (debit)
            time.sleep(0.001)                        # Delay 2  
            to_account["balance"] += amount      # WRITE phase (credit)
            return True
    
    THE PROBLEM - DEADLOCK/FORGED ITEMS SCENARIO:
    ----------------------------------------------
    Consider two concurrent transfers: $500 from Account A to B, and $500 from B to A
    
    Timeline:
        Transfer 1: Check A has $500 (YES) -> Preempted
        Transfer 2: Check B has $500 (YES) -> Preempted  
        Transfer 1: Debit A ($500), Credit B ($500)
        Transfer 2: Debit B ($500), Credit A ($500)
        
    Result: Both accounts show $0, but $1000 disappeared!
    
    Another scenario - Negative balance:
        Transfer 1: Check A has $500 (YES) -> Preempted
        Transfer 2: Check A has $500 (YES) -> Preempted
        Transfer 1: Debit A ($500), Balance = $0
        Transfer 2: Debit A ($500), Balance = -$500  # OVERDRAWN!
    
    Args:
        from_account (dict): Account to debit, must have 'balance' key
        to_account (dict): Account to credit, must have 'balance' key
        amount (float): Amount to transfer
    
    Returns:
        bool: True if transfer succeeded, False if insufficient funds
    
    Warning:
        This function is BROKEN by design. DO NOT use in production.
    """
    if from_account["balance"] >= amount:
        time.sleep(0.001)
        from_account["balance"] -= amount
        time.sleep(0.001)
        to_account["balance"] += amount
        return True
    return False


def safe_bank_transfer(from_account, to_account, amount, lock):
    """
    Thread-safe bank transfer using locks to prevent race conditions.
    
    SOLUTION EXPLANATION:
    --------------------
    This function wraps the entire transfer operation in a lock, ensuring
    atomicity of the check-then-act pattern:
    
        with lock:
            if from_account["balance"] >= amount:    # Atomic check
                from_account["balance"] -= amount    # Atomic debit
                to_account["balance"] += amount      # Atomic credit
    
    WHY THIS PREVENTS RACE CONDITIONS:
    ----------------------------------
    1. The balance check and both updates happen atomically (as one unit)
    2. No other thread can modify either account during the transfer
    3. The balance check is guaranteed accurate at the moment of transfer
    4. Cannot overdraft - other transfers must wait
    
    CRITICAL SECTION DESIGN:
    ------------------------
    The code inside the lock is the "critical section" - the only place
    where shared state is modified. Best practices:
    - Keep it as short as possible (no unnecessary operations)
    - Never perform blocking I/O (file, network) while holding a lock
    - Avoid calling unknown code that might also acquire locks (deadlock risk)
    
    Args:
        from_account (dict): Account to debit, must have 'balance' key
        to_account (dict): Account to credit, must have 'balance' key
        amount (float): Amount to transfer
        lock (threading.Lock): Lock object to use for synchronization
    
    Returns:
        bool: True if transfer succeeded, False if insufficient funds
    
    Example:
        >>> account_a = {"balance": 1000}
        >>> account_b = {"balance": 500}
        >>> transfer_lock = threading.Lock()
        >>> safe_bank_transfer(account_a, account_b, 250, transfer_lock)
        True
        >>> print(account_a["balance"], account_b["balance"])
        750 750
    """
    with lock:
        if from_account["balance"] >= amount:
            from_account["balance"] -= amount
            to_account["balance"] += amount
            return True
    return False


def demonstrate_problem():
    """Demonstrates the race condition by running broken_increment with multiple threads."""
    global counter
    counter = 0
    
    print("\n" + "=" * 50)
    print("PART 1: THE COUNTER PROBLEM")
    print("=" * 50)
    print("We will create 10 threads, each incrementing")
    print("a counter 10,000 times.")
    print("Expected final value: 100,000")
    print()
    print("Running BROKEN version (NO locks)...")
    
    threads = [threading.Thread(target=broken_increment) for _ in range(10)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    
    result = counter
    print(f"Broken result: {result} (expected: 100000)")
    print()
    print("EXPLANATION: Due to race conditions, many increments were lost!")
    print("Multiple threads read the same value before either could write back.")
    print()
    print("Here's what happens:")
    print("  Thread A reads counter = 0")
    print("  Thread B reads counter = 0  <- Same value! Race!")
    print("  Thread A writes counter = 1")
    print("  Thread B writes counter = 1  <- Lost update! Should be 2")
    
    return counter


def demonstrate_solution():
    """Demonstrates the fix by running safe_increment with proper locking."""
    global counter
    counter = 0
    
    print("\nRunning SAFE version (WITH locks)...")
    
    threads = [threading.Thread(target=safe_increment) for _ in range(10)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    
    result = counter
    print(f"Safe result: {result} (expected: 100000)")
    print()
    print("SUCCESS! With proper locking, every increment is preserved!")
    print()
    print("How the lock works:")
    print("  1. Thread A acquires the lock")
    print("  2. Thread B tries to acquire - must wait!")
    print("  3. Thread A reads, increments, writes")
    print("  4. Thread A releases the lock")
    print("  5. Thread B can now proceed (reads the updated value)")
    
    print("\n" + "=" * 50)
    print("KEY TAKEAWAY")
    print("=" * 50)
    print("Always use locks (threading.Lock) when multiple threads")
    print("access shared data. The lock ensures only one thread can")
    print("modify the data at a time, preventing race conditions.")
    
    return counter


def demonstrate_bank_problem():
    """Demonstrates race condition in bank transfers."""
    print("\n" + "=" * 50)
    print("PART 2: THE BANKING PROBLEM")
    print("=" * 50)
    print("We'll run 1000 rounds where 2 threads simultaneously")
    print("try to withdraw $400 from an account with $500.")
    print("Only ONE withdrawal should succeed!")
    print()
    print("Running BROKEN version (NO locks)...")
    
    multiple_succeeded = 0
    
    for i in range(1000):
        account = {"balance": 500}
        success_count = [0]
        
        def withdraw_400():
            if account["balance"] >= 400:
                time.sleep(0.001)
                account["balance"] -= 400
                success_count[0] += 1
        
        t1 = threading.Thread(target=withdraw_400)
        t2 = threading.Thread(target=withdraw_400)
        
        t1.start()
        t2.start()
        t1.join()
        t2.join()
        
        if success_count[0] > 1:
            multiple_succeeded += 1
    
    print(f"Multiple withdrawals succeeded: {multiple_succeeded} times out of 1000")
    
    if multiple_succeeded > 0:
        print(f"\nRACE CONDITION! {multiple_succeeded} times, BOTH withdrawals")
        print("proceeded when only ONE should have succeeded!")
        print("This is the 'check-then-act' race condition.")
    else:
        print("\nThe race condition didn't manifest this run.")
        print("Note: Race conditions are non-deterministic.")
    
    return multiple_succeeded


def demonstrate_bank_solution():
    """Demonstrates thread-safe bank transfers."""
    print("\n" + "=" * 50)
    print("PART 2: THE BANKING SOLUTION")
    print("=" * 50)
    print("Same test, but using SAFE withdrawal with locks...")
    
    multiple_succeeded = 0
    
    for i in range(1000):
        account = {"balance": 500}
        account_lock = threading.Lock()
        success_count = [0]
        counter_lock = threading.Lock()
        
        def withdraw_400():
            with account_lock:
                if account["balance"] >= 400:
                    account["balance"] -= 400
                    result = True
                else:
                    result = False
            with counter_lock:
                success_count[0] += 1 if result else 0
        
        t1 = threading.Thread(target=withdraw_400)
        t2 = threading.Thread(target=withdraw_400)
        
        t1.start()
        t2.start()
        t1.join()
        t2.join()
        
        if success_count[0] > 1:
            multiple_succeeded += 1
    
    print(f"Multiple withdrawals succeeded: {multiple_succeeded} times out of 1000")
    
    if multiple_succeeded == 0:
        print("\nWith proper locking, exactly ONE withdrawal can succeed!")
    else:
        print("\nWARNING: This should never happen with proper locking!")
    print("The lock ensures the check-then-act is atomic.")
    
    return multiple_succeeded


if __name__ == "__main__":
    print("=" * 50)
    print("RACE CONDITIONS DEMONSTRATION")
    print("=" * 50)
    print()
    print("This program demonstrates what happens when multiple")
    print("threads access shared data without proper synchronization.")
    
    demonstrate_problem()
    demonstrate_solution()
    demonstrate_bank_problem()
    demonstrate_bank_solution()
    
    print("\n" + "=" * 50)
    print("CONCLUSION")
    print("=" * 50)
    print("Race conditions can cause silent data corruption.")
    print("- Lost updates in counters")
    print("- Disappeared money in banking")
    print("- Always protect shared state with locks!")
    print("=" * 50)

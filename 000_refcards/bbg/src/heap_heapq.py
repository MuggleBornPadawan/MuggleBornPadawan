import heapq


# Start with an unsorted dynamic list
streaming_data = [12, 3, 5, 1, 19, 8]

# 1. Transform the list into a min-heap in-place
heapq.heapify(streaming_data)
print("Heapified List structure:", streaming_data) 
# Note: It won't look perfectly sorted; index 0 is guaranteed to be the minimum.

# 2. Peek at the smallest item
print("Smallest element (Peek):", streaming_data[0]) # Output: 1

# 3. Add a new element dynamically
heapq.heappush(streaming_data, 2)
print("After pushing 2:", streaming_data)

# 4. Progressively extract elements in sorted order
print("Extracting elements one by one:")
while streaming_data:
    smallest = heapq.heappop(streaming_data)
    print(smallest, end=" ")
# Output will be: 1 2 3 5 8 12 19

# 5. By design, heapq only implements a min-heap. If your algorithm requires a Max-Heap, invert sign when you push and pop
max_heap = []
print("\nMax-Heap by inverting sign")
heapq.heappush(max_heap, -10) # To push the number 10 into a max-heap, multiply by -1
heapq.heappush(max_heap, -50)  # Pushed as -50
heapq.heappush(max_heap, -20)  # Pushed as -20

# To extract the largest element, invert it back
largest = -heapq.heappop(max_heap)
print(largest) # Output: 50

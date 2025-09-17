# Project Overview

This project is a C++ application that simulates a 3D random walk. It generates a series of 3D coordinates representing the path of a random walker and then uses `gnuplot` to visualize the walk as an animated GIF.

The project consists of three main parts:
1.  A C++ program (`randomWalker.cpp`) that generates the random walk data.
2.  A `gnuplot` script (`plotter.gp`) that creates an animation from the generated data.
3.  A shell script (`run.sh`) that automates the compilation and execution of the C++ program and the `gnuplot` script.

## Building and Running

To build and run the project, execute the `run.sh` script:

```bash
bash run.sh
```

This script will:
1.  Compile `randomWalker.cpp` into an executable file named `randomWalker`.
2.  Run the `randomWalker` executable, which will generate a file named `path.dat` containing the 3D coordinates of the random walk.
3.  Run `gnuplot` with the `plotter.gp` script, which will read `path.dat` and create an animated GIF named `random_walk.gif`.

## Development Conventions

The C++ code in `randomWalker.cpp` is well-commented and follows good practices, such as:
*   Using a `struct` to represent a 3D point.
*   Using modern C++ random number generation facilities.
*   Including error handling for file operations.
*   Providing the compilation command in a comment.

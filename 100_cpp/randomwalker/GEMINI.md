# GEMINI Project Analysis

## Project Overview

This project is a C++ application that simulates a 3D random walk. The core logic is implemented in `randomWalker.cpp`, which generates a series of 3D coordinates representing the path of a random walker. This path data is stored in the `path.dat` file.

The project also includes a visualization component using `gnuplot`. The `plotter.gp` script reads the coordinate data from `path.dat` and generates an animated GIF named `random_walk.gif` that visualizes the random walk in 3D space.

The main technologies used are:
*   **C++:** For the core simulation logic.
*   **gnuplot:** For data visualization and animation.
*   **Shell scripting:** For automating the build and run process.

## Building and Running

The project includes a `run.sh` script that automates the entire process of building and running the simulation and generating the animation.

To build and run the project, execute the following command in your terminal:

```bash
bash run.sh
```

This script will perform the following steps:

1.  **Compile the C++ code:** It compiles `randomWalker.cpp` into an executable file named `randomWalker` using `g++`.
2.  **Generate the path data:** It runs the compiled `randomWalker` executable, which generates the `path.dat` file containing the 3D coordinates of the random walk.
3.  **Create the animation:** It executes the `plotter.gp` script with `gnuplot` to generate the `random_walk.gif` animation from the `path.dat` data.

## Development Conventions

Based on the existing files, the following development conventions can be inferred:

*   **C++ Style:** The C++ code in `randomWalker.cpp` follows a clean and well-documented style. It uses modern C++ features like `<random>` for random number generation and `struct` for data organization. The code is also well-commented, explaining the purpose of different parts of the code.
*   **File Naming:** File names are descriptive and use camelCase for the C++ executable (`randomWalker`) and the source file (`randomWalker.cpp`).
*   **Automation:** The use of a `run.sh` script indicates a preference for automating the build and run process, ensuring a consistent workflow.
*   **Data-driven Visualization:** The project separates the data generation (C++) from the visualization (`gnuplot`), which is a good practice. The `path.dat` file acts as an interface between the two components.

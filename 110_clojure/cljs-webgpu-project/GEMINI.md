# GEMINI.md

## Project Overview

This is a ClojureScript project that uses WebGPU to render a simple triangle. The project is set up using `shadow-cljs` to compile the ClojureScript code into JavaScript. The main application logic is in `src/my/app.cljs`, which initializes the WebGPU device, creates a shader, and draws a triangle on a canvas element in the `public/index.html` file.

## Building and Running

### Prerequisites

*   [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
*   [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/)

### Installation

1.  Install the npm dependencies:
    ```bash
    npm install
    ```

### Development

1.  Start the `shadow-cljs` development server:
    ```bash
    npx shadow-cljs watch app
    ```
2.  Open a web browser and navigate to `http://localhost:8080`.

### Production Build

To create a production build of the application, run the following command:

```bash
npx shadow-cljs release app
```

This will compile the ClojureScript code and output the optimized JavaScript files in the `public/js` directory.

## Development Conventions

The project follows standard ClojureScript conventions. The main application namespace is `my.app`, and the entry point is the `init` function. The code is organized into functions that handle specific tasks, such as creating the WebGPU pipeline, configuring the canvas, and drawing the scene.

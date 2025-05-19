#include "raylib.h" // Include the raylib header

int main()
{
    // Step 3: Define screen dimensions
    const int screenWidth = 800;
    const int screenHeight = 450;

    // Step 3: Initialize the window
    InitWindow(screenWidth, screenHeight, "Simple 3D Image with raylib");

    // Step 4: Define the camera to look into our 3D world
    Camera camera = { 0 }; // Initialize a Camera struct
    camera.position = (Vector3){ 10.0f, 10.0f, 10.0f }; // Camera position (x, y, z)
    camera.target = (Vector3){ 0.0f, 0.0f, 0.0f };     // Camera looking at (x, y, z)
    camera.up = (Vector3){ 0.0f, 1.0f, 0.0f };         // Camera up vector (upwards is positive y)
    camera.fovy = 45.0f;                               // Camera field-of-view Y
    camera.projection = CAMERA_PERSPECTIVE;            // Camera projection type

    // Step 5: Set the target FPS (Frames Per Second)
    SetTargetFPS(60); // Draw 60 frames per second

    // Step 5: Main game loop
    while (!WindowShouldClose()) // Loop until the user clicks the close button or presses ESC
    {
        // --- Step 6: Drawing ---
        BeginDrawing(); // Start drawing operations (prepares a new frame)

        ClearBackground(RAYWHITE); // Clear the background with a color

        BeginMode3D(camera); // Start 3D mode (sets up the camera and 3D perspective)

        // --- Draw our 3D objects ---
        // Draw a cube at origin (0,0,0) with size 2x2x2, color RED
        DrawCube((Vector3){ 0.0f, 0.0f, 0.0f }, 2.0f, 2.0f, 2.0f, RED);
        // Draw the wireframe of the same cube, color MAROON
        DrawCubeWires((Vector3){ 0.0f, 0.0f, 0.0f }, 2.0f, 2.0f, 2.0f, MAROON);

        // Draw a grid on the xz plane (visualize the ground) - 10x10 lines, 1 unit spacing
        DrawGrid(10, 1.0f);

        // --- End drawing 3D objects ---
        EndMode3D(); // End 3D mode

        // Optionally, draw some text in 2D (after 3D drawing)
        DrawText("Welcome to the 3D world!", 10, 10, 20, DARKGRAY);
        DrawText("Press ESC to close", 10, 40, 20, DARKGRAY);

        EndDrawing(); // End drawing operations (swaps the back buffer, shows the frame)
        // --- End Drawing ---
    }

    // Step 7: Close window and de-initialize raylib
    CloseWindow();

    // Step 2: Indicate successful completion
    return 0;
}

#include "raylib.h"

int main(void)
{
    // Define screen width and height
    const int screenWidth = 800;
    const int screenHeight = 600;

    // Initialize window
    InitWindow(screenWidth, screenHeight, "Raylib - Draw Circle Example");

    // Set target frames-per-second (FPS)
    SetTargetFPS(60);

    // Main game loop
    while (!WindowShouldClose())
    {
        // Update variables (if any)
        Vector2 mousePosition = GetMousePosition();

        // Start drawing
        BeginDrawing();

        // Clear background with a dark slate-gray color
        ClearBackground((Color){ 24, 28, 36, 255 });

        // Draw grid-like guide lines in the background
        DrawLine(screenWidth / 2, 0, screenWidth / 2, screenHeight, (Color){ 44, 48, 56, 255 });
        DrawLine(0, screenHeight / 2, screenWidth, screenHeight / 2, (Color){ 44, 48, 56, 255 });

        // Draw a filled circle in the center of the screen
        // Center: (screenWidth / 2, screenHeight / 2), Radius: 120
        DrawCircle(screenWidth / 2, screenHeight / 2, 120.0f, (Color){ 41, 128, 185, 255 });

        // Draw a outer ring/outline around the circle
        DrawCircleLines(screenWidth / 2, screenHeight / 2, 130.0f, (Color){ 52, 152, 219, 255 });

        // Draw a small circle following the mouse cursor to show interactivity
        DrawCircleV(mousePosition, 15.0f, (Color){ 231, 76, 60, 200 });

        // Draw instructional/status texts
        DrawText("Raylib Circle Drawing Example", 20, 20, 20, LIGHTGRAY);
        DrawText("Move the mouse around to see the interactive cursor circle!", 20, 50, 16, GRAY);
        
        int fps = GetFPS();
        DrawText(TextFormat("FPS: %d", fps), screenWidth - 100, 20, 20, GREEN);

        EndDrawing();
    }

    // Close window and OpenGL context
    CloseWindow();

    return 0;
}

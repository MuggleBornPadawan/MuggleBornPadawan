import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class HelloWorld {
    public static void main(String[] args) {
        // Get the current date and time
        LocalDateTime currentDateTime = LocalDateTime.now();
        // Format the date and time
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = currentDateTime.format(formatter);

        // Define the message to log
        String message = "Hello, Java World! Current Date and Time: " + formattedDateTime;

        // Print the message to the console
        System.out.println(message);

        // Write the message to a log file
        try (FileWriter logFile = new FileWriter("hello_world.log", true)) {
            logFile.write(message + "\n");
            System.out.println("Log written to hello_world.log");
        } catch (IOException e) {
            System.out.println("An error occurred while writing to the log file.");
            e.printStackTrace();
        }
    }
}

// compile - javac HelloWorld.java
// run to create class file - java HelloWorld
// include manifest.txt with this text "Main-Class: HelloWorld" to point to entry class
// create jar file from class file - jar cfm HelloWorld.jar manifest.txt HelloWorld.class
// run the jar file - java -jar HelloWorld.jar


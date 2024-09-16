// Jenkinsfile: A declarative pipeline example for a simple CI/CD workflow

// The 'pipeline' block is the entry point for Jenkins' declarative pipeline.
pipeline {
    // Define the agent where the pipeline should run. 'any' means it can run on any available agent.
    agent any

    // The 'environment' block defines environment variables that will be available throughout the pipeline.
    environment {
        // Define any necessary environment variables here.
        // Example: Set JAVA_HOME for Java builds
        JAVA_HOME = '/usr/lib/jvm/java-11-openjdk'
        // Another variable that can be used across steps
        BUILD_VERSION = '1.0.0'
    }

    // Stages are logical steps in your build process. 
    stages {

        // First stage: Checkout code from version control (like Git).
        stage('Checkout Code') {
            steps {
                // Checkout the source code from the Git repository.
                // You can replace the URL and branch with your project's specifics.
                git branch: 'main', url: 'https://github.com/your-repo/your-project.git'
            }
        }

        // Second stage: Compile/Build the project (typically for Java, Node.js, etc.).
        stage('Build') {
            steps {
                // Echo a message to the console output to signal the start of the build process.
                echo 'Building the application...'
                
                // Run the build command for the project.
                // Replace this with the actual build command (e.g., `mvn clean install` for a Maven project).
                sh './gradlew build'
            }
        }

        // Third stage: Run unit tests to validate code.
        stage('Test') {
            steps {
                // Run test commands, such as unit tests.
                // You can replace this with your testing framework's command (e.g., `npm test`, `pytest`, etc.).
                echo 'Running tests...'
                sh './gradlew test'
            }

            // 'post' conditions to determine what to do based on test outcomes.
            post {
                // If tests fail, mark the build as unstable or failed.
                always {
                    // Archive the test results (e.g., JUnit XML results) and display them in Jenkins.
                    junit 'build/test-results/**/*.xml'
                }
                failure {
                    // Perform actions on failure, like notifying the team.
                    echo 'Tests failed. Investigate the issue!'
                }
            }
        }

        // Fourth stage: Archive build artifacts for later retrieval.
        stage('Archive Artifacts') {
            steps {
                // Archive the build artifacts (e.g., .jar, .war files, etc.).
                // This will store the artifact files for future use.
                archiveArtifacts artifacts: 'build/libs/**/*.jar', allowEmptyArchive: true
            }
        }

        // Fifth stage: Deploy the application (optional, for CD pipelines).
        // This might include copying files to a server, deploying to cloud infrastructure, etc.
        stage('Deploy') {
            when {
                // Deploy only for main branch or a specific environment.
                branch 'main'
            }
            steps {
                echo 'Deploying to production server...'
                
                // Run deployment scripts or commands.
                // For example, you might run `scp` to copy files, or use a cloud CLI to trigger deployments.
                sh 'scp build/libs/myapp.jar user@production-server:/path/to/deploy/'
            }
        }
    }

    // Post section defines what to do after the pipeline completes.
    post {
        always {
            // Clean up the workspace, if necessary.
            cleanWs()
        }
        success {
            // Send notifications on successful builds, e.g., Slack, email, etc.
            echo 'Build and deployment successful!'
        }
        failure {
            // Notify team of failure.
            echo 'Build failed! Sending notifications...'
        }
    }
}
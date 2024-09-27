# Use an official Maven image to build the project
FROM maven:3.8.6-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and mvnw files
COPY pom.xml mvnw ./
COPY . .

# Make the mvnw executable
RUN chmod +x mvnw

# Package the application
RUN ./mvnw clean package

# Use a smaller image for the runtime
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Command to run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

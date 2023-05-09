FROM openjdk:11-jre
LABEL "Author"="gmkim"
LABEL "Project"="spring-boot"
COPY build/libs/websocket-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]

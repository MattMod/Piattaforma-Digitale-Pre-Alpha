FROM openjdk:8-jdk-alpine

ARG nome-app
ARG versione

#espongo l'app sulla porta 8080
EXPOSE 8080

ARG APP=target/${nome-app}-${versione}.jar

#that will be executed in the ENTRYPOINT
ENTRYPOINT ["java","-jar","/${APP}"]

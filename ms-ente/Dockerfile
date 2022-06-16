FROM openjdk:8-jdk-alpine

ENV urlDB={{_DDB_URL_}}
ENV passwordDB={{_DDB_PASSWORD_}}
ENV usernameDB={{_DDB_USERNAME_}}
ENV awsAppId={{_AWS_APP_ID_}}
ENV awsPinpointAccessKey={{_AWS_PINPOINT_ACCESS_KEY_}}
ENV awsPinpointSecretKey={{_AWS_PINPOINT_SECRET_KEY_}}

ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar

EXPOSE 8080

ENTRYPOINT java -jar /app.jar --DB_PASSWORD=${passwordDB} --DB_URL=${urlDB} --DB_USERNAME=${usernameDB} --AWS.APP-ID=${awsAppId} --AWS.PINPOINT.ACCESS-KEY=${awsPinpointAccessKey} --AWS.PINPOINT.SECRET-KEY=${awsPinpointSecretKey}

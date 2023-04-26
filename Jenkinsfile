pipeline {
    agent any
    stages {
        stage('CLONE')
        {
            steps{
                git branch : 'dev_test', credentialsId : 'crayon_token', url : 'https://lab.ssafy.com/s08-final/S08P31B203.git'
            }
        }

        stage('BUILD')
        {
            steps
            {
                sh '''
                chmod +x gradlew
                ./gradlew clean build
                '''
            }
        }
        stage('DOCKER BUILD')
        {
            steps
            {
                sh "docker build -t gmkim716/crayon-spring-container ."
            }
        }

        stage('DEPLOY')
        {
            steps
            {
            sh '''
            docker run -d -p 8080:8080 --name crayon-spring-container gmkim716/crayon-spring-container
            echo 'Success'
            '''
            }
        }
    }
}

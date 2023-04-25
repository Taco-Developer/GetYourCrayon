pipeline {
    agent any

    stages {
        stage('CLONE')
        {
            steps{
                git branch : 'dev_test', credentialsId : 'gitlab id / password', url : 'https://lab.ssafy.com/s08-final/S08P31B203.git'
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
                sh '''
                docker build -t cold_crayon/my-spring .
                '''
            }
        }

        stage('DEPLOY')
        {
            steps
            {
            sh '''
            docker run --name my-spring -d -p 8080:8080 cold_crayon/my-spring
            echo 'Success'
            '''
            }

        }
    }
}

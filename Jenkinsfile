pipeline {
    agent any

    stages {
        stage('CLONE')
        {
            steps{
                git branch : 'dev_test', credentialsId : 'starlight3775', url : 'https://lab.ssafy.com/s08-final/S08P31B203.git'
            }
        }

        stage('BUILD')
        {
            steps
            {
                sh '''
                cd back
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
                docker stop my-spring
                docker rm my-spring
                echo 'Remove if my-spring exist'
                cd /var/jenkins_home/workspace/cold_crayon_spring-back-end/back
                docker rmi cold_crayon/my-spring
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

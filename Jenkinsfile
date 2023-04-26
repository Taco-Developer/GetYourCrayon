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
    }
}

pipeline {
    agent any
    environment {
        AWS_CREDENTIALS = 'ECR_ID'
    }
    stages {
        stage('github-clone') {
            steps {
                git branch: 'main', credentialsId: 'github-token', url: 'https://github.com/cw-5jang6bu/Frontend.git'
            }
        }
    }
}
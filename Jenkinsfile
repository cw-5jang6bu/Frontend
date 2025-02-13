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
        stage('Docker Build & Push') {
            steps {
                script {
                    def app = docker.build("034362047320.dkr.ecr.ap-northeast-2.amazonaws.com/cwave01/front", ".")
                        docker.withRegistry("https://034362047320.dkr.ecr.ap-northeast-2.amazonaws.com", "ecr:ap-northeast-2:${AWS_CREDENTIALS}") {
                            app.push("dev-front")
                            app.push("latest")
                        }

                }
            }
        }
    }
}
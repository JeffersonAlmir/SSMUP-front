pipeline {
    agent any
    
    environment{
        DOCKER_HUB_USER = "jeffersonalmir"
        IMAGE_NAME = "sanimup-frontend"
        IMAGE_TAG = "latest"
    }

    stages{
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Image'){
            steps {
                echo 'Construindo imagem do React com Nginx'
                sh "docker build -f Dockerfile.prod -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials',
                                    passwordVariable: 'DOCKER_HUB_PASSWORD',
                                    usernameVariable: 'DOCKER_HUB_USERNAME')]) {
                        
                        echo 'Fazendo login no Docker Hub'
                        sh "echo ${DOCKER_HUB_PASSWORD} | docker login -u ${DOCKER_HUB_USERNAME} --password-stdin"

                        echo 'Enviando imagem...'
                        sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"

                        sh "docker logout"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executada com sucesso!'
        }
        failure {
            echo 'A pipeline falhou. Verifique os logs.'
        }
    }
}
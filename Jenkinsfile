pipeline {
    agent any
    
    environment{
        IMAGE_NAME = "sanimup/frontend"
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
                sh 'docker build -f Dockerfile.prod -t ${IMAGE_NAME}:${IMAGE_TAG} .'
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
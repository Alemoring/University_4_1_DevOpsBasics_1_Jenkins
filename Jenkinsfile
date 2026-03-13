pipeline {
    agent any

    environment {
        COMPOSE_PROD = "docker compose"
        COMPOSE_DEV = "docker compose -f docker-compose.dev.yml"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Detect branch') {
            steps {
                script {
                    env.GIT_BRANCH_NAME = sh(
                        script: "git branch -r --contains HEAD | grep origin | head -n1 | sed 's/origin\\///'",
                        returnStdout: true
                    ).trim()

                    echo "Detected branch: ${env.GIT_BRANCH_NAME}"
                }
            }
        }

        stage('Build images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy PROD') {
            when {
                expression { env.GIT_BRANCH_NAME == 'main' }
            }
            steps {
                sh '''
                docker compose down
                docker compose up -d --build
                '''
            }
        }

        stage('Deploy DEV') {
            when {
                expression {
                    env.GIT_BRANCH_NAME == 'dev' ||
                    env.GIT_BRANCH_NAME.startsWith('feauture')
                }
            }
            steps {
                sh '''
                docker compose -f docker-compose.dev.yml down
                docker compose -f docker-compose.dev.yml up -d --build
                '''
            }
        }

    }
}
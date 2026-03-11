pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Debug workspace') {
            steps {
                sh '''
                pwd
                ls -R
                '''
            }
        }

        stage('Install backend dependencies') {
            steps {
                sh '''
                cd backend
                python3 -m venv venv
                . venv/bin/activate
                pip install -r requirements.txt
                '''
            }
        }

        stage('Install frontend dependencies') {
            steps {
                sh '''
                cd client/my_app
                npm install
                '''
            }
        }

        stage('Build React') {
            steps {
                sh '''
                cd client/my_app
                npm run build
                '''
            }
        }

        stage('Backend tests') {
            steps {
                sh '''
                cd backend
                . venv/bin/activate
                pytest
                '''
            }
        }
    }
}
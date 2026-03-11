pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install backend dependencies') {
            steps {
                sh '''
                cd backend
                python3 -m venv venv
                venv/bin/pip install -r requirements.txt
                '''
            }
        }

        stage('Install frontend dependencies') {
            steps {
                sh '''
                cd client/my-app
                npm install
                '''
            }
        }

        stage('Build React') {
            steps {
                sh '''
                cd client/my-app
                npm run build
                '''
            }
        }

        stage('Run React build') {
            steps {
                sh '''
                npm install -g serve
                serve -s client/my-app/dist -l 3000
                '''
            }
        }

        stage('Build Fast API') {
            steps {
                sh '''
                cd backend
                . venv/bin/activate
                uvicorn main:app --reload
                '''
            }
        }

        stage('Backend tests') {
            when {
                branch 'dev'
            }
            steps {
                sh '''
                cd backend
                venv/bin/pytest
                '''
            }
        }

    }
}
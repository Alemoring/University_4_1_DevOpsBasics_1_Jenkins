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
                cd client/my-app
                setsid npm run preview -- --host --port 3000 > react.log 2>&1 < /dev/null &
                '''
            }
        }

        stage('Build Fast API') {
            steps {
                sh '''
                cd backend
                . venv/bin/activate
                setsid venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 > fastapi.log 2>&1 < /dev/null &
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
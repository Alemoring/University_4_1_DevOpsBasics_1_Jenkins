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

        stage('Deploy servers') {
            steps {
                sh '''
                set -e

                pkill -f uvicorn || true
                pkill -f vite || true

                cd backend

                chmod +x venv/bin/uvicorn

                nohup ./venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000 > ../fastapi.log 2>&1 &

                cd ../client/my-app

                nohup npm run preview -- --host --port 3000 > ../../react.log 2>&1 &
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
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

        stage('Deploy main') {
            when {
                branch 'main'
            }
            steps {
                sh '''
                sudo systemctl restart fastapi
                sudo systemctl restart react
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
                . venv/bin/activate
                pytest -v
                '''
            }
        }

        stage('Deploy dev servers') {
            when {
				expression { 
					return env.BRANCH_NAME == 'dev' || env.BRANCH_NAME.startsWith('feature/') 
				}
			}
            steps {
                sh '''
                sudo systemctl restart fastapi-debug
                sudo systemctl restart react-debug
                '''
            }
        }

    }
}
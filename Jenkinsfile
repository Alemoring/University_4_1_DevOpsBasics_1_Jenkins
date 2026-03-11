pipeline {
    agent any

    stages {

        stage('Detect branch') {
            steps {
                script {
                    env.GIT_BRANCH_NAME = sh(
                        script: "git rev-parse --abbrev-ref HEAD",
                        returnStdout: true
                    ).trim()
                }
            }
        }

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
                expression { env.GIT_BRANCH_NAME == 'main' }
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
                expression { env.GIT_BRANCH_NAME == 'dev' }
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
					return env.GIT_BRANCH_NAME == 'dev' || env.GIT_BRANCH_NAME == 'dev' 
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
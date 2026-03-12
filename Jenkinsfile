pipeline {
    agent any

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
                    env.GIT_BRANCH_NAME == 'dev' ||
                    env.GIT_BRANCH_NAME.startsWith('feauture')
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
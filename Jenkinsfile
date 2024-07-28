pipeline {
    agent any
     tools {
        nodejs "node"
        }
    stages {
        stage('Checkout') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/daomanhbk/PlayWrightSession5']])
            }
        }
        stage('Install') {
            steps {
                bat '''
                    npm i -D @playwright/test && npx playwright install
            '''
            }
        }
        stage('Testing') {
            steps {
                bat '''
                    export ENV = 'dev'; npx playwright test tests/session5Assignment.spec.ts --project=chrome
                '''
            }
        }
    }
}
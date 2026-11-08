# Timeweb Test Application

A Next.js application that provides a token-protected interface for college homework and an AI assistant.

## Features

- Access validation using a token supplied in the URL.
- Homework page with user-specific content.
- AI chat interface that sends prompts to the application's API.
- Schedule page.
- Docker-based build and Nginx configuration.

## Technology

- Next.js 15
- React 19
- Docker
- Nginx

## Requirements

- Node.js 22 recommended for the provided Docker build
- npm
- Access to the backend API used by the application

## Local development

```bash
git clone https://github.com/puskainrestpease/timewebtest.git
cd timewebtest
npm install
npm run dev
```

Open <http://localhost:3000>.

## Production build

```bash
npm run build
npm start
```

The repository also includes a Dockerfile and Nginx configuration for container-based deployment.

## Access model

The homework interface expects a `token` query parameter and validates it through the API. The AI page forwards the same token with chat requests. Do not expose access tokens in public links or logs.

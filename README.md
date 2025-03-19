# 🌟 Logs Management System

## Overview

A robust Node.js authentication and logging management system with advanced error tracking and logging capabilities.

## Features

- ✅ Secure user authentication
- ✅ Advanced logging with Winston
- ✅ Error tracking via Logtail
- ✅ Morgan middleware for request logging
- ✅ Daily log rotation

## Prerequisites

![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)
![npm](https://img.shields.io/badge/npm-latest-blue)

## Installation

```bash
# Clone the repository
git clone https://github.com/sahil030804/logs-management.git

# Navigate to project directory
cd logs-management

# Install dependencies
npm install

# Run server
npm run dev
```

## API Endpoints

### Authentication Endpoint

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| POST   | `/api/auth/login` | User Authentication |

### Login Request Example

```json
{
  "email": "test@getnada.com",
  "password": "Test@123"
}
```

### Login Success Response

```json
{
  "message": "Login successful",
  "user": {
    "email": "test@getnada.com"
  }
}
```

### Login Error Response

```json
{
  "code": "invalid",
  "message": "Invalid credentials"
}
```

## Log Examples

### Winston Logs

Winston is used to log application errors and system-level events.

**Success Log :**

```json
2025-03-20T08:19:50.934Z info: User test@getnada.com logged in successfully
```

**Error Logs :**

```json
2025-03-20T07:57:36.136Z error: Login failed: User test@getnada.com not found
2025-03-20T07:59:10.086Z error: Login failed: Invalid password for user test@getnada.com
```

### Morgan Logs

Morgan captures and logs detailed HTTP request and response metadata.

**Error Log:**

```json
{
  "dt": "2025-03-20T08:36:29.675Z",
  "level": "error",
  "context": {
    "runtime": {
      "file": "middleware/morgan.js",
      "type": null,
      "method": null,
      "function": null,
      "line": 28,
      "column": 13
    },
    "system": {
      "pid": 37673,
      "main_file": "/home/sphere-dev/Work/Demo/Logs-management/server.js"
    }
  },
  "method": "POST",
  "url": "/api/auth/login",
  "status": 401,
  "response_time": "7.381",
  "reqBody": {
    "email": "test@getnada.com",
    "password": "Test@12"
  },
  "error": {
    "message": "Invalid credentials",
    "stack": "Error: INVALID_CREDENTIALS\n    at Object.loginUser (/home/sphere-dev/Work/Demo/Logs-management/component/auth/auth.service.js:26:11)\n    at loginUser (/home/sphere-dev/Work/Demo/Logs-management/component/auth/auth.controller.js:5:38)\n    at Layer.handle [as handle_request] (/home/sphere-dev/Work/Demo/Logs-management/node_modules/express/lib/router/layer.js:95:5)\n    at next (/home/sphere-dev/Work/Demo/Logs-management/node_modules/express/lib/router/route.js:149:13)\n    at Route.dispatch (/home/sphere-dev/Work/Demo/Logs-management/node_modules/express/lib/router/route.js:119:3)\n    at Layer.handle [as handle_request] (/home/sphere-dev/Work/Demo/Logs-management/node_modules/express/lib/router/layer.js:95:5)\n    at /home/sphere-dev/Work/Demo/Logs-management/node_modules/express/lib/router/index.js:284:15\n    at Function.process_params (/home/sphere-dev/Work/Demo/Logs-management/node_modules/express/lib/router/index.js:346:12)\n    at next (/home/sphere-dev/Work/Demo/Logs-management/node_modules/express/lib/router/index.js:280:10)\n    at Function.handle (/home/sphere-dev/Work/Demo/Logs-management/node_modules/express/lib/router/index.js:175:3)"
  },
  "message": "Invalid credentials"
}
```

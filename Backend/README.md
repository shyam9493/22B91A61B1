# URL Shortener Backend

A robust Node.js backend service for URL shortening with comprehensive logging middleware, built for exam/educational purposes.

## 🚀 Features

- **URL Shortening**: Convert long URLs into short, manageable links
- **Custom Short Codes**: Allow users to specify custom short codes
- **Expiration Management**: Set validity periods for shortened URLs
- **Comprehensive Logging**: Advanced logging middleware with external API integration
- **MongoDB Integration**: Persistent storage for URLs and metadata
- **RESTful API**: Clean REST endpoints for all operations
- **Error Handling**: Robust error handling and validation

## 📋 Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Logging System](#logging-system)
- [Database Schema](#database-schema)
- [Usage Examples](#usage-examples)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## 🛠 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or remote instance)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/shyam9493/22B91A61B1.git
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

4. **Run the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:3001`

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/22b91a61b1
NODE_ENV=development
LOG_LEVEL=info
```

### Database Connection

The application connects to MongoDB using the connection string:
```javascript
mongoose.connect('mongodb://localhost:27017/22b91a61b1');
```

## 🔗 API Endpoints

### Base URL: `http://localhost:3001`

#### 1. Health Check
```http
GET /
```
**Response:**
```json
"Backend Working!"
```

#### 2. Create Short URL
```http
POST /shorturls
```

**Request Body:**
```json
{
  "url": "https://example.com/very-long-url",
  "validity": 60,
  "shortcode": "custom123"
}
```

**Parameters:**
- `url` (required): The original URL to shorten
- `validity` (required): Validity period in minutes
- `shortcode` (optional): Custom short code (auto-generated if not provided)

**Success Response (201):**
```json
{
  "shortLink": "http://localhost:3000/abc123",
  "expiry": "2025-06-27T15:30:00.000Z"
}
```

**Error Responses:**
- `400`: Missing required parameters or shortcode already exists
- `500`: Internal server error

#### 3. Get URL Statistics
```http
GET /shorturls/:shortLink
```

**Parameters:**
- `shortLink`: The short code to retrieve statistics for

**Success Response (200):**
```json
{
  "_id": "...",
  "url": "https://example.com/very-long-url",
  "shortLink": "abc123",
  "expiry": "2025-06-27T15:30:00.000Z",
  "createdAt": "2025-06-27T14:30:00.000Z"
}
```

**Error Responses:**
- `400`: Short link parameter missing
- `404`: Short link not found
- `500`: Internal server error

## 📊 Logging System

The application features a comprehensive logging system that integrates with an external logging service.

### Logging Features

- **Request/Response Logging**: Automatic logging of all HTTP requests and responses
- **Error Logging**: Detailed error tracking with stack traces
- **External Integration**: Logs are sent to external evaluation service
- **Multiple Log Levels**: INFO, WARN, ERROR, DEBUG
- **Structured Logging**: JSON-formatted logs with timestamps

### Log Function

```javascript
const { Log } = require('../Logging/index.js');

// Usage
Log(stack, level, package, message);
```

**Parameters:**
- `stack`: Log category/stack (e.g., 'REQUEST', 'ERROR', 'DATABASE')
- `level`: Log level ('INFO', 'WARN', 'ERROR')
- `package`: Package/service name ('exam-backend')
- `message`: Log message

### External Logging Service

Logs are automatically sent to the evaluation service:
- **Endpoint**: `http://20.244.56.144/evaluation/logs`
- **Authentication**: JWT token-based authentication
- **Format**: JSON payload with structured data

## 🗄️ Database Schema

### URL Model

```javascript
{
  url: {
    type: String,
    required: true,
    unique: true
  },
  shortLink: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  expiry: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## 💡 Usage Examples

### Creating a Short URL with Node.js/Fetch

```javascript
const response = await fetch('http://localhost:3001/shorturls', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://www.example.com/very-long-url',
    validity: 60, // 60 minutes
    shortcode: 'mylink' // optional
  })
});

const data = await response.json();
console.log(data.shortLink); // http://localhost:3000/mylink
```

### Getting URL Statistics

```javascript
const response = await fetch('http://localhost:3001/shorturls/mylink');
const stats = await response.json();
console.log(stats);
```

### Using cURL

```bash
# Create short URL
curl -X POST http://localhost:3001/shorturls \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.example.com/long-url",
    "validity": 120
  }'

# Get statistics
curl http://localhost:3001/shorturls/abc123
```

## 🚨 Error Handling

### Error Response Format

```json
{
  "error": "Error message description"
}
```

### Common Error Codes

- **400 Bad Request**: Missing required parameters, invalid data
- **404 Not Found**: Short link not found
- **500 Internal Server Error**: Database errors, server issues

### Error Logging

All errors are automatically logged with:
- Error message and stack trace
- Request details (method, URL, IP, user agent)
- Timestamp and context information

## 🏗️ Project Structure

```
Backend/
├── Controllers/
│   └── Controller.js          # Route handlers
├── Models/
│   └── Model.js              # MongoDB schemas
├── Routes/
│   └── urlRoutes.js          # Route definitions
├── middleware/
│   └── logging.js            # Logging middleware
├── package.json              # Dependencies
└── index.js                  # Application entry point
```

## 🔧 Dependencies

### Production Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **nanoid**: Unique ID generator
- **axios**: HTTP client for external API calls

### Development Dependencies
- **nodemon**: Development server with auto-restart

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker (Optional)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 📝 API Testing

### Using Thunder Client/Postman

1. **Create Collection**: Import the endpoints
2. **Set Base URL**: `http://localhost:3001`
3. **Test Endpoints**: Use the examples provided above

### Sample Test Cases

```javascript
// Test data
const testCases = [
  {
    url: "https://www.google.com",
    validity: 30
  },
  {
    url: "https://www.github.com",
    validity: 120,
    shortcode: "github"
  }
];
```

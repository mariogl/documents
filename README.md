# Documents Project

This repository contains two main applications:

- **webapp/**: The frontend application, built with Vite and TypeScript. ➡️ [README.md](./webapp/README.md)
- **server/**: A Go-based REST API server. ➡️ [README.md](./server/README.md)

## Getting Started

### Prerequisites

- Node.js >=18.18.0 (for the webapp)
- Go (for the server)

### Running the Applications

#### Webapp

1. Ensure environment variables are set in an `.env` file

2. Install dependencies:
   ```bash
   cd webapp
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

#### Server

1. Run the server:
   ```bash
   go run server.go
   ```

## Notes

- The webapp expects the API to be running and accessible.
- You can run both applications in separate terminals.
- Configuration details (such as API URLs) should be set in the respective application’s configuration files or environment variables.

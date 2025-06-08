# File Sharing Frontend

The web interface for the file sharing application. Built with Next.js, this frontend provides a clean UI for uploading and downloading files.

## 🌐 Live App

Visit the live application [here.](http://44.203.74.69:3006/home)

## Tech Stack

- **Next.js 15** - React framework
- **TailwindCSS** - Styling
- **Axios** - API requests
- **Lucide React** - Icons

## Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- Backend API running

## Setup

1. Clone the repository:
    > **Note:** Skip this step if you already cloned this project folder from the mono repo

    ```sh
    git clone https://github.com/christianvieux/file-sharing-frontend.git
    ```


2. Create a `.env` file in the root directory:
    ```sh
    NEXT_PUBLIC_API_BASE_URL=http://localhost:5138
    ```

3. Install dependencies:
    ```sh
    npm install
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

The app will be available at `http://localhost:3000`. If url not working, check console.

## Development

For hot-reload development:
```sh
npm run dev
```

For production build:
```sh
npm run build
npm start
```

## Features

- File upload with drag & drop
- Secure file downloading
- Temporary file links
- Modern, responsive UI
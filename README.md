# File Sharing Frontend
The web interface for the file sharing application. Built with Next.js, this frontend provides a clean UI for uploading and downloading files.
## 🌐 Live App
Visit the live application [here.](http://44.215.35.137:3006/home)
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
1. Clone the repository (skip if already cloned from monorepo):
    ```bash
    git clone https://github.com/christianvieux/file-sharing-frontend.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory:
    ```bash
    NEXT_PUBLIC_API_BASE_URL=http://localhost:5138
    ```
4. Run the application:
    
    **Development mode:**
    ```bash
    npm run dev
    # OR with custom IP and port:
    npm run dev -- -H 0.0.0.0 -p 3002
    ```
    
    **Production mode:**
    ```bash
    npm run build
    npm run start
    # OR with custom IP and port:
    npm run start -- -H 0.0.0.0 -p 3002
    ```

The app will be available at `http://localhost:3000` (or your specified port). If url not working, check console.
## Features
- File upload with drag & drop
- Secure file downloading
- Temporary file links
- Modern, responsive UI
## 📂 Related Repositories
- [Main Project (Monorepo)](https://github.com/christianvieux/GA_Project_Final_File-Sharing-App)
- [Backend API](https://github.com/christianvieux/file-sharing-api)

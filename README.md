# VideoHub

A modern web application for AI-powered video processing and management. Built with Next.js 14, React 19, and MongoDB, featuring user authentication, video uploads, and AI-powered video processing capabilities.

## ✨ Features

- 🔐 User Authentication (Register/Login)
- 🎥 Video Upload and Management
- 🤖 AI-Powered Video Processing
- 🎨 Modern UI with Dark/Light Mode
- 📱 Responsive Design
- ⚡ Fast and Optimized Performance

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hook Form, Zod
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **UI Components**: Radix UI, Lucide Icons
- **Form Handling**: React Hook Form with Zod validation

## 🛠️ Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB Atlas account or local MongoDB instance
- ImageKit account (for image/video storage)

## 🏗️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/videohub.git
   cd videohub
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory and add the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   ```

4. **Run the Development Server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 📂 Project Structure

```
videohub/
├── src/
│   ├── app/                 # App router
│   ├── components/          # Reusable components
│   │   └── ui/             # UI components
│   ├── lib/                 # Utility functions
│   ├── models/              # Database models
│   └── styles/              # Global styles
├── public/                  # Static files
└── types/                   # TypeScript type definitions
```

## 🧪 Running Tests

```bash
yarn test
# or
npm test
```

## 🚀 Deployment

Deploy your own instance to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fvideohub)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and TypeScript

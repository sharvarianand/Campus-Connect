# Campus-Connect

Campus-Connect is a modern social networking web application designed to connect campus communities. It allows users to create posts, follow other users, like and save posts, and manage their profiles. The app features authentication, real-time updates, and a clean, responsive UI built with React and Tailwind CSS.

## Features

- User authentication (sign up, sign in)
- Create, edit, and delete posts with file uploads
- Like, save, and share posts
- Follow and unfollow users
- Explore posts from the community
- View user profiles and update profile information
- Responsive design for desktop and mobile
- Real-time data fetching and caching with React Query
- Integration with Appwrite backend services

## Tech Stack

- React with TypeScript
- Vite as the build tool
- Tailwind CSS for styling
- Appwrite for backend services (authentication, database, storage)
- React Query for data fetching and state management
- ESLint and Prettier for code quality and formatting
- Vercel for deployment

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager
- An Appwrite backend instance configured (see `src/lib/appwrite/config.ts` for setup)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd Campus-Connect
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure environment variables:

Create a `.env` file in the root directory and add your Appwrite project credentials and any other required environment variables.

### Running the Development Server

Start the development server with:

```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to see the app in action.

### Building for Production

To build the app for production, run:

```bash
npm run build
# or
yarn build
```

The production-ready files will be in the `dist` folder.

### Deployment

This project is configured for deployment on Vercel. You can deploy by connecting your GitHub repository to Vercel and using the provided `vercel.json` configuration.

## Project Structure

```
Campus-Connect/
├── public/                  # Static assets like images and icons
├── src/
│   ├── _auth/              # Authentication layouts and forms
│   ├── _root/              # Main pages and layouts
│   ├── components/         # Reusable UI components
│   ├── constants/          # Application constants
│   ├── context/            # React context providers
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility libraries and API clients
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Root React component
│   ├── main.tsx            # Entry point
│   └── globals.css         # Global styles
├── .eslintrc.json          # ESLint configuration
├── .prettierrc             # Prettier configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── package.json            # Project metadata and scripts
└── README.md               # This file
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

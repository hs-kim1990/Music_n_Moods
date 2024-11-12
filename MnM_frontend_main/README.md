
# MnM (Music and Mood) - Frontend Interface Prototype

This project is a prototype for the frontend interface of MnM (Music and Mood), an application focused on improving mental well-being. MnM is designed to help people in high-paced societies use music as a tool to manage mood. This webpage demo surveys the user's mood and then generates a music playlist tailored to their emotional state.

## Table of Contents

- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Build](#build)
- [Project Structure](#project-structure)

## Installation

To run this project locally, you'll need Node.js and npm installed.

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

## Running the Project

Once the dependencies are installed, start the development server:

```bash
npm run dev
```

The project will be running on [http://localhost:5173](http://localhost:5173). Changes made to files will automatically reload the page.

## Build

To build the project for production, run:

```bash
npm run build
```

The output will be in the `dist` folder, optimized and ready to be deployed.

## Project Structure

Below is a brief overview of the project structure:

```plaintext
├── public             # Static assets
├── src
│   ├── assets         # Images, fonts, etc.
│   ├── components     # Reusable components
│   ├── App.jsx        # Main app component
│   ├── index.css      # Tailwind and custom CSS
│   └── main.jsx       # Entry file
├── index.html         # Main HTML file
├── tailwind.config.js # Tailwind configuration
└── vite.config.js     # Vite configuration
```

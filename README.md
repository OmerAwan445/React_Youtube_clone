# React YouTube Clone

## Overview

The **React YouTube Clone** is a responsive web application that replicates some of the core functionalities of YouTube. Built with **React** and **TypeScript**, this project offers a robust and scalable codebase, ensuring maintainability and ease of development. The user interface is styled using **Tailwind CSS**, providing a clean and responsive experience across all devices.

## Features

- **Search Functionality:** Perform keyword searches to find videos in real-time using the YouTube Data API.
- **Video Details Page:** View detailed information about videos, including title, description, view count, and likes.
- **Recommended Videos:** Access a list of related videos based on the currently viewed content.
- **Responsive Design:** Experience a consistent interface on both desktop and mobile devices.

## Technical Highlights

- **React & TypeScript:** Ensures a scalable, type-safe, and easy-to-maintain application.
- **State Management with Redux:** Keeps the application state predictable and centralized, enhancing debuggability.
- **Routing with React Router:** Facilitates smooth and seamless navigation between different pages.
- **YouTube Data API Integration:** Fetches real-time video details, search results, and related videos.
- **Modular Component Architecture:** Allows easy expansion and customization of the application.

## Installation and Setup

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/OmerAwan445/React_Youtube_clone.git
    cd react-youtube-clone
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set Up Environment Variables:**

    Create a `.env` file in the root directory and add the following environment variables:

    ```plaintext
    REACT_APP_YOUTUBE_API_KEY=your_youtube_data_api_key
    ```

4. **Start the Application:**

    ```bash
    npm start
    # or
    yarn start
    ```

5. **Access the Application:**

    Open your browser and navigate to `http://localhost:3000`.

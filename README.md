
Blood Donation Application - Technical Documentation

1. Introduction

This document provides technical details about the Next.js client-side code for the Blood Donation Application. It utilizes Material-UI for a visually appealing interface and interacts with a separate server-side API.

2. Features

User authentication: Registration, login, and logout functionalities.
User management: Create, view, and update user profiles (donors and recipients).
Blood request management: Create, view, and manage blood requests (including search functionality).
Blood donor search: Search for blood donors based on various criteria.

You can view the live application at: https://blood-donation-client-one.vercel.app/

3. Prerequisites

Node.js and npm (or yarn) installed on your system (download from https://nodejs.org/).
A basic understanding of JavaScript, React, and Next.js is recommended.
4. Installation

Clone the repository:

Bash
git clone https://github.com/sakibmohammad79/blood-donation-client.git
Use code with caution.
content_copy
Navigate to the project directory:

Bash
cd blood-donation-client
Use code with caution.
content_copy
Install dependencies:

Bash
npm install
Use code with caution.
content_copy
(or)

Bash
yarn install
Use code with caution.
content_copy
5. Local Development

Start the development server:

Bash
npm run dev
Use code with caution.
content_copy
(or)

Bash
yarn dev
Use code with caution.
content_copy
This will launch the development server on http://localhost:3000 by default. Access the application in your web browser.

6. Production Deployment

Option 1: Vercel

Create a Vercel account (https://vercel.com/).
Add a new project and link it to this Git repository.
Vercel will automatically build and deploy your application, providing a production URL.
Option 2: Other Platforms

Follow the deployment instructions specific to your chosen platform (typically building the application and uploading it to their servers).
7. Building for Production

To create a production-ready build:

Bash
npm run build
Use code with caution.
content_copy
(or)

Bash
yarn build
Use code with caution.
content_copy
This will generate a dist folder containing the optimized application files.

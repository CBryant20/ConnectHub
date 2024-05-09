# Connect Hub App

![alt text](src/client/layout/Phone.png)

Connect Hub is a web-based application designed for communication between users and admin. It serves as a platform where users can create accounts, log in, and send text messages. The app combines design with secure communication, providing users with a way to interact with designated personnel.

### Key Features

- User Authentication
- Messaging System
- User-Friendly Interface
- Message History
- Admin Controls
- Responsive Design

### Technical Features

- Backend

  - Built with the focus on scalability, security and reliability
  - Uses Prisma to interact with the database
  - Prisma Schema, defines data models for users, messages, and likes
  - Implement RESTful API routes that facilitate CRUD (Create, Read, Update, Delete) operations
  - Utilize JSON Web Token (JWT) for secure user authentication and session management

- Frontend Framework
  - Uses React-Redux, for state management and user interactions
  - RouterProvider provides user navigation and routing
  - Redux store is setup with 'configureStore', providing the store with reducers, middleware and other configurations
  - SCSS styling
  - The combination of React-Redux, RouterProvider, configureStore, middlewares, and SCSS creates a frontend that is both highly functional and visually appealing, ensuring a great user experience.

# How to Use the Connect Hub Project

Welcome to the Connect Hub project! This guide will help you set up, run, and contribute to the project. It includes detailed instructions, examples, and screenshots to make your experience smooth and hassle-free. Whether you're a user trying to understand how to navigate the app or a developer looking to contribute, this guide has you covered.

Setting Up the Project
To get started, you need to clone the project repository and install the necessary dependencies. Ensure you have Node.js and npm installed on your machine.

## Clone the project repository

git clone git@github.com:CBryant20/ConnectHub.git

## Change to the project directory

cd ConnectHub

## Install the required dependencies

npm install

Once dependencies are installed, you can run the project in development mode to check if everything is working as expected.

## Start the development server

npm run dev

After starting the server, open your browser and navigate to http://localhost:3000 to see the running application.

Navigating the App
Connect Hub is designed to be user-friendly. After launching the app, you'll see a homepage to log in or register. Once logged in, you can start sending messages to an admin. The app has a simple messaging interface, allowing you to type and send messages.

Sending a Message:
After logging in, navigate to the message page.
Start a chat by typing a message and click "Send Message."
Once a message has been sent, click "Open Chat."
Inside the chat, received messages are "Green" and sent messages are "Blue."
To reply to a message, at the bottom of the chat, type your message and click "Reply."

Deleting a message:
In the chat, click "Delete", inside sent the message.

Viewing Message Threads:
You can view message threads to see past conversations.

Check and Update Your Info:
Click "My Info" in the NavBar or Drop down menu
If you would like to update your Name, Email or Password, click "Change Info"

Logging Out:
Click the "Log Out" button to log out of the app.

Authentication
Connect Hub requires user authentication. During registration, you'll need to provide your full name, email and password. Email and password credentials are used to log in and access the messaging functionality.

Logging In: Use your registered email and password to log in. If you forget your password, click "Forgot Password" and you will be asked for your full name and be able to enter a new password.

#### If you're interested in contributing to the project, you can do the following:

Fork the Repository:
Fork the Connect Hub repository to your GitHub account.

Create a Feature Branch:
When working on a new feature or bug fix, create a separate branch to make your changes.

Submit a Pull Request:
After making changes, submit a pull request with a clear description of what you've done.

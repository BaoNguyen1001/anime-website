# Miyou clone anime website

This project is a web application that consists of three main components: a React client, a Node.js server, and a Flask Python recommendation server.

## Prerequisites

Before getting started, ensure you have the following installed on your machine:

- Node.js (https://nodejs.org)
- Python (https://www.python.org)

## Getting Started

Follow the steps below to start the project:

### 1. Clone the Repository

Clone this repository to your local machine using the following command:
git clone [<repository_url>](https://github.com/BaoNguyen1001/anime-website.git)

### 2. Set Up the Client

1. Navigate to the `client` folder:
   cd client
2. Install the dependencies by running the following command:
   npm install
3. Once the installation is complete, start the React client by running:
   npm run start
The client will be accessible at `http://localhost:3000`.

### 3. Set Up the Server

1. Navigate to the `server` folder:
   cd server
2. Install the dependencies by running the following command:
   npm install
3. Start the Node.js server by running:
   npm run start
The server will be accessible at `http://localhost:5000`.

### 4. Set Up the Recommendation Server

1. Navigate to the `recommend-server` folder:
   cd recommend-server
2. Create a virtual environment and activate it:
   python -m venv env
  source env/bin/activate
3. Install the required Python packages:
   pip install -r requirements.txt
4. Start the Flask Python server:
   python -m flask run
The recommendation server will be accessible at `http://localhost:4000`

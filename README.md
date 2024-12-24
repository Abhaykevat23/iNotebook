# iNotebook

A cloud-based notebook application built using the MERN stack, providing users with the ability to create, update, and manage their notes securely from anywhere.

## Features

- **User Authentication**: Secure login and registration using JWT.
- **CRUD Operations**: Create, read, update, and delete notes seamlessly.
- **Responsive Design**: Optimized for devices of all screen sizes.
- **Secure Storage**: Notes are stored securely in the cloud using MongoDB.
- **Search Functionality**: Easily search for specific notes.

## Technologies Used

- **Frontend**: React.js, Bootstrap, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Installation

Follow these steps to set up the project locally:

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Steps

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/Abhaykevat23/iNotebook.git
    cd iNotebook
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Set Up Environment Variables**:
    Create a `.env` file in the root directory with the following keys:
    ```env
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_secret_key>
    ```

4. **Run the Backend**:
    ```bash
    npm start
    ```

5. **Run the Frontend**:
    Navigate to the `client` folder and start the React app:
    ```bash
    cd client
    npm start
    ```

6. **Access the Application**:
    Open your browser and navigate to `http://localhost:3000`.

## Folder Structure

```
iNotebook/
├── client/                # Frontend code (React.js)
├── server/                # Backend code (Node.js, Express)
├── models/                # Database models
├── routes/                # API routes
├── middleware/            # Middleware for authentication
├── public/                # Static assets
├── .env                   # Environment variables
├── package.json           # Node.js dependencies
└── README.md              # Project documentation
```

## Future Improvements

- Add note sharing functionality.
- Implement real-time collaboration.
- Integrate additional features like tags and categories.
- Enhance the UI for a better user experience.

## Contributions

Contributions are welcome! Feel free to fork the repository and submit a pull request with your enhancements.

## License

This project is licensed under the [MIT License](LICENSE).

---

### Author

**Abhay Kevat**  
[GitHub Profile](https://github.com/Abhaykevat23)

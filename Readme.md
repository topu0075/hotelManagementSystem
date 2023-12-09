# Hotel Management System for Hostel Meals

Welcome to the Hotel Management System for Hostel Meals repository! This project is designed to streamline the process of managing meals for hostel students. Whether you are a hostel administrator or a student, this system aims to provide a convenient and efficient way to handle meal-related tasks.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - JavaScript
  - Bootstrap
  
- **Backend:**
  - Node.js
  - Express.js
  
- **Database:**
  - MongoDB
  
- **Authentication:**
  - Passport.js
  
- **Other Dependencies:**
  - Mongoose (ODM for MongoDB)
  - EJS (Embedded JavaScript templates)
  
## Features

1. **User Authentication:**
   - Secure user authentication using Passport.js.
   - Separate roles for administrators and students.

2. **Meal Management:**
   - Easy meal creation, modification, and deletion.
   - Meal scheduling and assignment to specific hostel students.

3. **User Dashboard:**
   - Personalized dashboards for both administrators and students.
   - Overview of upcoming meals, past meals, and account information.

4. **Responsive Design:**
   - The user interface is designed to be responsive and accessible on various devices.

## Getting Started

To run the Hotel Management System on your local machine, follow these steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/topu0075/hotelManagementSystem.git
2. **Install Dependencies::**
   ```bash
   cd hotelManagementSystem
   npm install
3. **Set Environment Variables:::**
   - Create a .env file and set the following variables:
   ```bash
   PORT=3000
    MONGODB_URI=your_mongodb_uri
    SESSION_SECRET=your_session_secret
4. **Run the Application:::**
   ```bash
   npm start

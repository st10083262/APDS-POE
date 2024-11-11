# APDS-POE

# Customer Portal - Financial Transactions App

**Created by**: Kaitlyn

## Overview

The Customer Portal enables secure, user-to-user financial transactions with advanced features for tracking and managing funds. Built for scalability and flexibility, the app allows users to send money in different currencies with automated currency conversion and provides an intuitive, real-time view of money inflows and outflows through data visualization.

Designed to meet the highest security standards, the app utilizes encryption, hashed credentials, input validation, and HTTPS for data protection. Admins have additional control over the system, with capabilities to manage transactions and onboard new admins, while regular users are limited to sending and receiving money.

## Key Features

- **User-to-User Money Transfers**: Users can seamlessly transfer funds to each other across multiple currencies, with real-time currency conversion.
- **Real-Time Financial Insights**: A responsive chart displays users' financial activity, showing total money sent and received, making it easy for users to track their spending and income.
- **Role-Based Access**: Regular users have access only to transaction functionalities, while admins can approve transactions, add other admins, and manage the system.
- **Multi-Currency Support**: Automated currency conversion allows users to select their preferred currency when sending or receiving funds, making it ideal for international transactions.
- **Data Security**: MongoDB is used for secure, scalable data storage. The app implements JWT for token-based authentication, uses salted and hashed passwords for credential security, and leverages RegEx for input validation to protect against common security threats.

## Technologies Used

### Backend

- **Node.js** and **Express.js**: Core technologies for backend development, handling routing, authentication, and transaction processing.
- **MongoDB**: NoSQL database for efficient and secure storage of user and transaction data.
- **JSON Web Tokens (JWT)**: Provides secure, token-based user authentication, ensuring user data remains confidential and session management is reliable.
- **BCrypt**: Used for hashing and salting passwords, enhancing security by protecting user credentials against potential breaches.
- **RegEx Validation**: Input sanitization is enforced to prevent SQL injection, cross-site scripting, and other input-based attacks.

### Frontend

- **React**: Enables a dynamic, responsive UI, with components tailored to deliver a seamless user experience.
- **Chart.js**: Used for the Financial Insights feature, providing a graphical representation of financial transactions, showing both money received and money spent.
- **RESTful API**: Connects the frontend and backend, handling requests and responses effectively across the system.

### DevOps

- **CircleCI**: Implements continuous integration and continuous deployment (CI/CD), automatically running tests and deployments on each commit, ensuring stable builds and deployment.
- **SonarCloud**: Monitors and enforces code quality standards, performing static code analysis to detect vulnerabilities, code smells, and bugs before deployment.

## Environment Setup

The project requires a set of environment variables to function correctly. Below is a list of essential configurations:

1. **MongoDB URI**: Configures the connection to the MongoDB database.
2. **JWT Secret**: Manages secure user authentication through token-based access.
3. **SSL Certificates**: Enables HTTPS locally with mkcert for secure API requests.
4. **Environment Variables for CI/CD**:
   - **SONAR_TOKEN**: Token for SonarCloud integration.
   - **SONAR_PROJECT_KEY**: Key to identify your SonarCloud project.
   - **CIRCLECI_TOKEN**: Optional, to interact with private repositories.

### Example `.env` File

```plaintext
MONGO_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET="YourJWTSecretHere"
REACT_APP_API_URL="https://localhost:5000"
SSL_CRT_FILE="./keys/localhost.pem"
SSL_KEY_FILE="./keys/localhost-key.pem"
HTTPS=true
```

## Installation and Setup

### Local Environment

1. **Install MongoDB** and configure your `MONGO_URI` in `.env`.
2. **Generate SSL Certificates**: Use `mkcert` to generate `localhost.pem` and `localhost-key.pem` for local HTTPS.
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Run the App**:
   ```bash
   npm start
   ```

### CI/CD and Code Quality

1. **CircleCI Setup**:
   - Create a `.circleci/config.yml` file with configurations for CI/CD pipelines.
   - Add your project to CircleCI and configure necessary environment variables (`SONAR_TOKEN`, `CIRCLECI_TOKEN`) for secure pipeline operations.

2. **SonarCloud Integration**:
   - Create a SonarCloud project, and set up environment variables for `SONAR_TOKEN` and `SONAR_PROJECT_KEY`.
   - Integrate SonarCloud with CircleCI to automatically analyze code quality on each commit.

## Project Structure

- **Backend**: Handles authentication, transaction management, and user data with Node.js, Express, and MongoDB.
- **Frontend**: Built with React, featuring a responsive dashboard, transaction form, and financial insights.
- **DevOps**: CircleCI and SonarCloud are configured to maintain code quality, continuous integration, and deployment.

## Security Measures

- **Authentication and Session Management**: JWT ensures secure, stateless user sessions.
- **Password Security**: Passwords are salted and hashed using BCrypt, enhancing security against dictionary and brute-force attacks.
- **Data Validation**: RegEx sanitization is applied to user inputs to prevent common injection attacks.
- **HTTPS with SSL**: Local HTTPS setup with `mkcert` ensures secure communication, especially when developing features for production use.

## References

- CircleCI Documentation. (n.d.) *Getting Started with CircleCI*. Available at: <https://circleci.com/docs/getting-started/> [Accessed 11 Nov. 2024].
- SonarCloud Documentation. (n.d.) *Getting Started with SonarCloud*. Available at: <https://sonarcloud.io/documentation> [Accessed 11 Nov. 2024].
- Chart.js Documentation. (n.d.) *Creating Data Visualizations with Chart.js*. Available at: <https://www.chartjs.org/docs/latest/> [Accessed 11 Nov. 2024].

## License

This project is licensed under the MIT License. See the LICENSE file for more information.


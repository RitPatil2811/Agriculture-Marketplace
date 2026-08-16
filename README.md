# AgricultureMarketPlace

AgriMarketPlace is a **Smart Agriculture Marketplace** web application that connects farmers and buyers through a single online platform.
The application allows farmers to manage their agricultural products, buyers to purchase products, and administrators to manage users, products, and orders.
The project is developed using **Angular** for the frontend and **Spring Boot** for the backend, with **MySQL** as the database.

------------------------------------------------------------

## Project Overview
AgricultureMarketPlace provides three main roles:

### Farmer
Farmers can:

* Register and log in
* Access the farmer dashboard
* Add agricultural products
* Upload product images
* Set product price and quantity
* Edit products
* Delete products
* View their products
* Manage orders

### Buyer
Buyers can:

* Register and log in
* Access the buyer dashboard
* Browse available products
* View product details
* Add products to cart
* Place orders
* View their orders
* Track order status

### Admin
Administrators can:

* Access the admin dashboard
* View total farmers
* View total buyers
* View total products
* View total orders
* View total revenue
* View pending approvals
* Manage farmers
* Manage buyers
* View farmer/buyer details
* Approve or block users
* Manage products
* Manage orders
* View order details
* Update order status

------------------------------------------------------------

### Frontend
The frontend is developed using:

* Angular
* TypeScript
* HTML
* CSS
* Bootstrap / Bootstrap Icons

### Backend
The backend is developed using:

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* Maven
* MySQL

------------------------------------------------------------
# Main Features
## Authentication
* User registration
* User login
* Role-based access
* Farmer authentication
* Buyer authentication
* Admin authentication

## Product Management
* Add product
* Edit product
* Delete product
* Product image upload
* Product image preview
* Product price management
* Product quantity management
* Product category management

## Shopping
* Product browsing
* Product details
* Cart management
* Checkout
* Order creation

## Order Management
Orders contain information such as:
* Order ID
* Buyer ID
* Farmer ID
* Product ID
* Product
* Quantity
* Unit
* Price
* Total amount
* Order date
* Order status

Order statuses include:
```
Pending
Accepted
Shipped
Delivered
Cancelled
```

## Admin Dashboard
The admin dashboard displays:
* Total Farmers
* Total Buyers
* Total Products
* Total Orders
* Total Revenue
* Pending Approvals
* Recent Farmers

------------------------------------------------------------

# Requirements
Before running the project, install the following:

### 1. Java
Install a compatible Java Development Kit (JDK).
Check the installation:
```bash
java -version
```

### 2. Node.js and npm
Install Node.js.
Check the installation:
```bash
node -v
npm -v
```

### 3. Angular CLI
Install Angular CLI if it is not already installed:
```bash
npm install -g @angular/cli
```

Check:
```bash
ng version
```

### 4. MySQL
Install MySQL Server and MySQL Workbench.
Check that MySQL is running before starting the backend.

------------------------------------------------------------

# Database Setup
The backend uses MySQL.
Create the database:
```sql
CREATE DATABASE agrimarket;
```

The Spring Boot application is configured to connect to:
```text
Database: agrimarket
Host: localhost
Port: 3306
Username: YOUR_DATABASE_USERNAME
```

The database tables are created/updated automatically by Hibernate because the project uses:
```properties
spring.jpa.hibernate.ddl-auto=update
```
------------------------------------------------------------

# Backend Setup
## Step 1: Open the backend folder
Navigate to:
```text
backend/
```

## Step 2: Configure the database
Open:
```text
backend/src/main/resources/application.properties
```

Configure your local MySQL credentials.
Example:
```properties
spring.application.name=AgriMarketPlace
spring.datasource.url=jdbc:mysql://localhost/agrimarket
spring.datasource.username=YOUR_DATABASE_USERNAME
spring.datasource.password=YOUR_DATABASE_PASSWORD
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
spring.servlet.multipart.max-file-size=10MB
spring.servlet.multipart.max-request-size=10MB
```

Replace:
```text
YOUR_DATABASE_PASSWORD
YOUR_DATABASE_USERNAME
```
with your local MySQL password and username.

## Step 3: Start the backend
Using Maven Wrapper on Windows:

```bash
mvnw.cmd spring-boot:run
```
Or if Maven is installed:
```bash
mvn spring-boot:run
```
The backend runs on:

```text
http://localhost:8080
```

------------------------------------------------------------
#  Frontend Setup
## Step 1: Open the frontend folder

Navigate to:

```text
frontend/
```

## Step 2: Install dependencies
Run:

```bash
npm install
```

This installs all dependencies defined in:
```text
package.json
```

## Step 3: Start Angular
Run:

```bash
ng serve --open
```

if the `start` script is configured in `package.json`.

The frontend normally runs on:

```text
http://localhost:4200
```

Open the application in your browser:
```text
http://localhost:4200
```
------------------------------------------------------------

# Running the Complete Application
You need to run **MySQL, the Spring Boot backend, and the Angular frontend**.

### Terminal 1 — MySQL
Make sure MySQL Server is running.

### Terminal 2 — Backend
```bash
cd backend
mvnw.cmd spring-boot:run
```

Backend:
```text
http://localhost:8080
```

### Terminal 3 — Frontend
```bash
cd frontend
npm install
ng serve
```

Frontend:

```text
http://localhost:4200
```

Then open:

```text
http://localhost:4200
```
------------------------------------------------------------

#  Backend Structure

The backend follows a layered Spring Boot architecture:

```text
backend/
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/rit/
│       │       ├── controller/
│       │       ├── service/
│       │       ├── repository/
│       │       ├── entity/
│       │       ├── component/
│       │       └── util/
│       │
│       └── resources/
│           └── application.properties
│
├── .mvn/
├── mvnw
├── mvnw.cmd
└── pom.xml
```

### Controller
Handles HTTP requests and exposes REST APIs.

### Service
Contains application/business logic.

### Repository
Handles database operations using Spring Data JPA.

### Entity
Contains JPA entity classes representing database tables.

### Component
Contains request/response DTOs and other application components.

### Util
Contains reusable project utilities such as roles.

------------------------------------------------------------

# Frontend Structure
The Angular application is organized into modules/components for different roles and features.

```text
frontend/
│
├── public/
│
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── authentication/
│   │   ├── buyer/
│   │   ├── farmer/
│   │   ├── models/
│   │   ├── pages/
│   │   ├── services/
│   │   └── shared/
│   │
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── app.html
│   ├── app.css
│   ├── main.ts
│   └── styles.css
│
├── package.json
├── angular.json
└── tsconfig.json
```

------------------------------------------------------------

# Security Notes

Before publishing the project publicly:

* Do not upload database passwords.
* Do not upload API keys.
* Do not upload JWT secrets.
* Do not upload private credentials.
* Do not upload `node_modules/`.
* Do not upload Angular build output such as `dist/`.
* Do not upload the Spring Boot `target/` directory.
* Do not upload runtime-generated files unnecessarily.

Use environment variables or deployment-platform secrets for production credentials.

------------------------------------------------------------

# Future Improvements

Possible future improvements include:

* JWT-based authentication
* Route guards
* Production database configuration
* Cloud image storage
* Payment gateway integration
* Email notifications
* Advanced dashboard charts
* Search and filtering improvements
* Product reviews and ratings
* Deployment using cloud services
* Production environment configuration

------------------------------------------------------------

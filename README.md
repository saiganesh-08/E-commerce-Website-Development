# E-commerce Website Development

A full-stack e-commerce website built with AngularJS frontend and Python Flask backend with MySQL database.

## Features

### User Features
- User registration and authentication
- Product browsing and search
- Shopping cart functionality
- Order management
- User profile management
- Secure payment processing (mock implementation)
- Order history and tracking

### Admin Features
- Admin dashboard
- Product management (CRUD operations)
- Order management
- User management
- Sales analytics
- Inventory management

## Technology Stack

### Frontend
- **AngularJS** - Main frontend framework
- **Bootstrap** - Responsive UI components
- **JavaScript** - Client-side scripting
- **HTML5/CSS3** - Markup and styling

### Backend
- **Python Flask** - Web framework
- **MySQL** - Database
- **SQLAlchemy** - ORM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## Project Structure

```
E-commerce-Website-Development/
├── frontend/
│   ├── app/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── views/
│   │   └── app.js
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   └── index.html
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── __init__.py
│   ├── config.py
│   ├── requirements.txt
│   └── run.py
├── database/
│   └── schema.sql
├── docs/
│   └── api_documentation.md
└── README.md
```

## Prerequisites

- Python 3.8+
- Node.js 14+
- MySQL 8.0+
- Git

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/saiganesh-08/E-commerce-Website-Development.git
cd E-commerce-Website-Development
```

### 2. Database Setup
```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE ecommerce_db;

# Import database schema
mysql -u root -p ecommerce_db < database/schema.sql
```

### 3. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run the Flask application
python run.py
```

### 4. Frontend Setup
```bash
cd frontend

# Install dependencies (if using npm for package management)
npm install

# Serve the frontend (using a simple HTTP server)
python -m http.server 8080
# Or use any other static file server
```

### 5. Access the Application
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:8080/admin

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart & Orders
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove item from cart
- `POST /api/orders` - Place order
- `GET /api/orders` - Get user orders

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `GET /api/admin/orders` - Get all orders

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=ecommerce_db

# Flask
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here

# JWT
JWT_SECRET_KEY=your-jwt-secret-key

# Payment Gateway (Mock)
PAYMENT_GATEWAY_KEY=mock-key
```

## Security Features

- **Password Hashing**: Using bcrypt for secure password storage
- **JWT Authentication**: Stateless authentication system
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Prevention**: Using parameterized queries
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Rate Limiting**: API rate limiting to prevent abuse

## Testing

```bash
# Run backend tests
cd backend
python -m pytest tests/

# Run frontend tests (if implemented)
cd frontend
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Bootstrap for UI components
- Flask community for excellent documentation
- AngularJS team for the robust frontend framework

## Contact

For any queries or support, please contact: [Your Email]

---

**Note**: This is a educational project demonstrating e-commerce functionality with mock payment integration. For production use, implement actual payment gateways and additional security measures.

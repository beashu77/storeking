# StoreKing - Product Management Dashboard

StoreKing is a product management dashboard built using React. This application allows users to add, view, edit, and delete products through a user-friendly interface. The dashboard utilizes Bootstrap for styling and is powered by React Hook Form for form handling.

## Features

- Add new products with name, SKU code, price, and MRP.
- View the list of products in a responsive table.
- Edit existing products in a modal.
- Delete products directly from the table.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Bootstrap**: Frontend framework for styling.
- **React Hook Form**: For handling form submissions.
- **UUID**: For generating unique IDs for products.

## Demo

Check out the live demo of the project [here](https://storeking.vercel.app/).

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/beashu77/storeking
   cd storeking
   ```

2. **Install dependencies**:
   Ensure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Create React App**:
   If you haven't created a React app, you can do it using Create React App:
   ```bash
   npx create-react-app my-app
   cd my-app
   ```

4. **Install additional libraries**:
   Install the required packages for the project:
   ```bash
   npm install react-hook-form bootstrap uuid
   ```

5. **Run the application**:
   Start the development server:
   ```bash
   npm start
   ```

## Folder Structure

```
storeking/
├── public/
├── src/
│   ├── App.jsx
│   ├── Components/
│   │   ├── Modal.jsx
│   │   ├── Navbar.jsx
│   │   ├── Product.jsx
│   │   ├── ProductListDashboard.jsx
│   │   └── ProductTable.jsx
├── package.json
└── README.md
```

## Images

### Product Table
![Product Table](https://i.imgur.com/6vA7ZJE.png)

### Modal
![Modal](https://i.imgur.com/qTZTyx9.png)

### responsive 
![Mobile Screen](https://i.imgur.com/SBeln0R.png)
```

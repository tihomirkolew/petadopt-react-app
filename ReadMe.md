
# PetAdopt React.js Project

## Overview
A React.js application for pet adoption, helping users find and adopt pets.

## Features
- **Public Part (Guest Users):**
  - Home page with latest listings
  - Catalog of all pets
  - Pet details view
  - Login & Register forms

- **Private Part (Authenticated Users):**
  - Create new pet records
  - Edit / Delete own pets
  - Like pets created by others
  - Personal dashboard with owned pets

- **General Functionality:**
  - Client-side routing with 5+ routes
  - Route guards (guests vs logged-in users)
  - Responsive UI using CSS Modules / external CSS
  - Context API for authentication state
  - React Hooks with stateless & stateful components
  - Form handling with synthetic events

---

## Technologies Used
- **Frontend:** React.js (Vite), JavaScript (ES6+), Context API, React Hooks  
- **Styling:** CSS Modules / external CSS files  
- **Backend:** SoftUni Practice Server ([link](https://github.com/softuni-practice-server/softuni-practice-server))  
- **Other:** REST API communication, GitHub for source control  

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Client setup
cd client
npm install

# Server setup
cd ../server
npm install
```

### Running the App

```bash
# Start the client
cd client
npm run dev

# Start the server
cd ../server
node index.js
```

## Contributing
Contributions are welcome! Please fork and submit a pull request.

## License
MIT License

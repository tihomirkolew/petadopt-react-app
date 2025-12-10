
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
  - Responsive UI with external CSS styling
  - Context API for authentication state
  - React Hooks
  - Stateless & stateful components
  - Bound forms and synthetic events
  - Demonstrated lifecycle

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
cd client
npm install
cd server
npm install
```

### Starting the App
1. Start the Client
- cd client
- npm run dev

2. Start the Server
- cd server
- node .\index.js

## Contributing
Contributions are welcome! Please fork and submit a pull request.

## License
MIT License

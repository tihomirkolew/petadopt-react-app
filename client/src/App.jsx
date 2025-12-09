import { Route, Routes } from "react-router";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Catalog from "./components/catalog/Catalog";
import CreatePet from "./components/createPet/CreatePet";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";
import Details from "./components/details/Details";
import EditPet from "./components/editPet/EditPet";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";

function App() {

    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                {/* pet details */}
                <Route path="/pets/:petId/details" element={<Details />} />
                {/* pet edit */}
                <Route path="/pets/:petId/edit" element={<ProtectedRoute> <EditPet/> </ProtectedRoute>} />
                <Route path="/pets/create" element={<ProtectedRoute> <CreatePet /> </ProtectedRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App

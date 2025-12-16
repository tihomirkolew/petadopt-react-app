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
import UserPets from "./components/userPets/UserPets";
import GuestRoute from "./components/protectedRoutes/GuestRoute";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute";

function App() {

    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/:userId/user-pets" element={<ProtectedRoute> <UserPets /> </ProtectedRoute>} />
                {/* pet details */}
                <Route path="/pets/:petId/details" element={<Details />} />
                {/* pet edit */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/pets/:petId/edit" element={<EditPet />} />
                    <Route path="/pets/create" element={<CreatePet />} />
                </Route>
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="/logout" element={<Logout />} />

            </Routes >
            <Footer />
        </>
    )
}

export default App

import PetCard from "../petCard/PetCard";
import usePetRequest from "../../hooks/usePetRequest";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

export default function UserPets() {

    const { user } = useContext(UserContext);

    const params = new URLSearchParams({
        where: `_ownerId="${user._id}"`
    });

    const { fetchedData: pets } = usePetRequest(`http://localhost:3030/data/pets?${params}`);

    return (
        <>
            <div className="tm-container-content"
                style={{
                    minHeight: '75vh',
                    margin: '60px 60px 0px 60px',
                    marginTop: '40px',
                }}>
                {/* Page title */}
                <div className="row mb-4">
                    <h2 className="col-6 tm-text-primary">
                        All Listings
                        <p
                            style={{ fontSize: '9px', margin: '0', padding: '0' }}
                        >
                            Oldest listings first
                        </p>
                    </h2>
                </div>

                {/* Items */}
                <div className="row tm-mb-90 tm-gallery" style={{
                    display: "flex",
                    overflowY: "scroll",
                    maxHeight: "64vh",
                }}>
                    {pets.length > 0 ? (
                        pets.map(pet => <PetCard key={pet._id} {...pet} />)
                    ) : (
                        <p>No pets found.</p>
                    )}
                </div>
            </div>
        </>
    );
}

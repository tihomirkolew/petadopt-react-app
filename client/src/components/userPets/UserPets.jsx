import PetCard from "../petCard/PetCard";
import usePetRequest from "../../hooks/usePetRequest";
import { useUserContext } from "../../contexts/UserContext";
import styles from './UserPets.module.css';

export default function UserPets() {

    const { user } = useUserContext();

    const params = new URLSearchParams({
        where: `_ownerId="${user._id}"`
    });

    const { fetchedData: pets } = usePetRequest(`http://localhost:3030/data/pets?${params.toString()}`);

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
                        <p>
                            Oldest listings first
                        </p>
                    </h2>
                </div>

                {/* Items */}
                <div className={`row tm-mb-90 tm-gallery ${styles["tm-gallery"]}`}>
                    {pets.length > 0 ? (
                        pets.map(pet => <PetCard key={pet._id} {...pet} />)
                    ) : (
                        <h3>You currently don't have any listings posted.</h3>
                    )}
                </div>
            </div>
        </>
    );
}

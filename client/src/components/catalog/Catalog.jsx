import PetCard from "../petCard/PetCard";
import usePetRequest from "../../hooks/usePetRequest";
import styles from './Catalog.module.css';

export default function Catalog() {
    const searchParams = encodeURIComponent('_createdOn');

    const { fetchedData: pets } = usePetRequest(`http://localhost:3030/data/pets?sortBy=${searchParams}`);

    return (
        <>
            <div className={`${styles["tm-container-content"]}`}>
                {/* Page title */}
                <div className="row mb-4">
                    <h2 className="col-6 tm-text-primary">
                        All Listings
                        <p>Oldest listings first</p>
                    </h2>
                </div>

                {/* Items */}
                <div className={`row tm-mb-90 ${styles["tm-gallery"]}`}>
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

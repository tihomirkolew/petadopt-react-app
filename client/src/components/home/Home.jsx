import PetCard from "../petCard/PetCard";
import usePetRequest from "../../hooks/usePetRequest";
import styles from './Home.module.css'

export default function Home() {
    const searchParams = encodeURIComponent('_createdOn desc');
    
    const { fetchedData: latestPets } = usePetRequest(`http://localhost:3030/data/pets?sortBy=${searchParams}&pageSize=3`);

    return (
        <>
            <div className={`container-fluid tm-container-content tm-mt-60 ${styles.height}`}>
                {/* Page title */}
                <div className="row mb-4">
                    <h2 className="col-6 tm-text-primary">
                        Latest Listings
                    </h2>
                </div>

                {/* Items */}
                <div className={`row tm-mb-90 tm-gallery ${styles["pet-container"]}`}>
                    {latestPets.map(pet =>
                        <PetCard
                            key={pet._id}
                            {...pet}
                            zoomEffect={`${styles["zoom-effect"]}`}
                        />)}
                </div>
            </div>
        </>
    );
}

import PetCard from "../petCard/PetCard";
import usePetRequest from "../../hooks/usePetRequest";

export default function Home() {
    const searchParams = encodeURIComponent('_createdOn desc');
    
    const { fetchedData: latestPets } = usePetRequest(`http://localhost:3030/data/pets?sortBy=${searchParams}&pageSize=3`);

    return (
        <>
            <div className="container-fluid tm-container-content tm-mt-60"
                style={{ minHeight: '73vh' }}>
                {/* Page title */}
                <div className="row mb-4">
                    <h2 className="col-6 tm-text-primary">
                        Latest Listings
                    </h2>
                </div>

                {/* Items */}
                <div className="row tm-mb-90 tm-gallery" style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    overflowX: "auto",
                    gap: "1rem"
                }}>
                    {latestPets.map(pet =>
                        <PetCard
                            key={pet._id}
                            {...pet}
                            zoomEffect="zoom-effect"
                        />)}

                </div>
            </div>
        </>
    );
}

import { useEffect, useState } from "react";
import PetCard from "../petCard/PetCard";

export default function Home() {
    const [latestPets, setLatestPets] = useState([]);

    const searchParams = encodeURIComponent('_createdOn desc');

    useEffect(() => {
        fetch(`http://localhost:3030/data/pets?sortBy=${searchParams}&pageSize=3`)
        .then(res => res.json())
        .then(data => {
            setLatestPets(data);
        })
        .catch(err => {
            console.error('Error fetching latest pets:', err);
        });
            
    }, [searchParams]);

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
                    
                {latestPets.map(pet => <PetCard key={pet._id} {...pet} />)}

                </div>
            </div>
        </>
    );
}

import { useEffect, useState } from "react";
import PetCard from "../petCard/PetCard";

export default function Home() {
    const [latestPets, setLatestPets] = useState([]);

    // const searchParams = encodeURIComponent('_createdOn desc');

    // useEffect(() => {
    //     fetch(`http://localhost:3030/data/pets?sortBy=${searchParams}&pageSize=3`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setLatestPets(data);
    //         })
    //         .catch(err => {
    //             console.error('Error fetching latest pets:', err);
    //         });

    // }, [searchParams]);

    // use jsonstore until auth is implemented
    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/pets")
            .then(response => response.json())
            .then(data => {
                // jsonstore returns an object keyed by id, so convert to array
                const petsArray = Object.values(data);

                // sort manually by _createdOn descending
                const sortedPets = petsArray.sort((a, b) => b._createdOn - a._createdOn);
                console.log(sortedPets);

                // take the latest 3
                console.log(sortedPets.slice(0, 3));
                setLatestPets(sortedPets.slice(0, 3));                
            })
            .catch(err => {
                console.error("Error fetching latest pets:", err);
            });
    }, []);

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

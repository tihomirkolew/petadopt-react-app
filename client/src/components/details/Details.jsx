import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import UserContext from "../../contexts/UserContext";
import useRequest from "../../hooks/useRequest";
import usePetRequest from "../../hooks/usePetRequest";

export default function Details() {
    const { user } = useContext(UserContext);
    const { petId } = useParams();
    const [petLikes, setPetLikes] = useState([]);
    const { fetchData } = useRequest();
    const navigate = useNavigate();

    // fetch pet details
    const { fetchedData: pet, petRequest } = usePetRequest(`http://localhost:3030/data/pets/${petId}`);

    const hasLiked = petLikes.some(like => like._ownerId === user?._id);

    // get pet details
    useEffect(() => {
        const params = new URLSearchParams({
            where: `petId="${petId}"`
        });
        // Fetch pet details using petId

        // fetch(`http://localhost:3030/data/pets/${petId}`)
        //     .then(response => response.json())
        //     .then(result => setPet((result)))
        //     .catch(err => alert(err.message));

        // fetch pet likes 
        const petLikesData = fetchData(`/data/likes?${params.toString()}`);
        petLikesData.then(data => setPetLikes(data))
            .catch(err => alert(err.message));

        // fetch(`http://localhost:3030/data/likes?${params.toString()}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         setPetLikes(data);
        //     })
        //     .catch(err => alert(err.message));

    }, [petId, user]);

    const deletePetHandler = async () => {
        const isConfirmed = confirm(`Are you sure you want to delete "${pet.name}"`);
        if (!isConfirmed) return;

        try {
            await petRequest('DELETE');

            navigate('/catalog');
        } catch (error) {
            alert(error.message);
        }
    };

    const toggleLikeHandler = async () => {
        // likes is a collection associated with the pets which has petId and userId
        // when user clicks like button, we need to check if he has already liked the pet
        // if yes, we remove the like (dislike)
        // if userId is in the array, like becomes dislike button
        if (!user) {
            alert('You must be logged in to like a pet.');
            navigate('/login');
            return;
        }

        const userHasLikedPet = petLikes.filter(like => like._ownerId === user._id);
        if (userHasLikedPet.length > 0) {
            const likeId = userHasLikedPet[0]._id;

            try {
                // Remove like

                await fetchData(`/data/likes/${likeId}`, 'DELETE');

                // const response = await fetch(`http://localhost:3030/data/likes/${likeId}`, {
                //     method: 'DELETE',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         "X-Authorization": user?.accessToken,
                //     },
                // });

                // if (!response.ok) {
                //     const err = await response.json();
                //     throw new Error(err.message);
                // }

                setPetLikes(petLikes.filter(like => like._id !== likeId));

            } catch (error) {
                alert(error.message);
            }
        } else {

            try {
                // Add like

                const newLike = await fetchData(`/data/likes`, 'POST', { petId });

                // const response = await fetch(`http://localhost:3030/data/likes`, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         "X-Authorization": user?.accessToken,
                //     },
                //     body: JSON.stringify({ petId }),
                // });
                
                // if (!response.ok) {
                //     const err = await response.json();
                //     throw new Error(err.message);
                // }

                // const newLike = await response.json();

                setPetLikes([...petLikes, newLike]);

            } catch (error) {
                alert(error.message);
            }
        }


    }

    if (!pet) {
        return (
            <div className="container-fluid tm-container-content tm-mt-60">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div className="container-fluid tm-container-content tm-mt-40 tm-mb-60>" style={{ minHeight: '75vh', flexBasis: '1 0 0' }}>
                <div className="row justify-content-center" >
                    <div className="col-xl-8 col-lg-7 col-md-6 col-sm-12">
                        <img src={pet.imageUrl || "/images/image-placeholder.png"} alt="Image" className="img-fluid"
                            style={{ width: '93%', height: 'auto' }}
                        />
                    </div>

                    <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12">
                        <div className="tm-bg-gray tm-video-details d-flex flex-column justify-content-between">
                            <div className="mb-4" style={{ flexGrow: 1 }}>
                                <div className="row mb-4">
                                    <h1 className="col-12 tm-text-primary">{pet?.name}</h1>
                                </div>
                                <h3 className="tm-text-gray-dark mb-3">Age: <span className="tm-text-primary">{pet?.age}</span></h3>

                                <div>
                                    <h3 className="tm-text-gray-dark mb-3">Kind: <span className="tm-text-primary">{pet?.kind}</span></h3>
                                </div>
                                <p>{pet?.description}</p>
                                <div>
                                    <h3 className="tm-text-gray-dark mb-3">Contact: <span className="tm-text-primary">{pet?.contact}</span></h3>
                                </div>
                            </div>

                            {/* <div className="d-flex justify-content-start mt-4">
                                <button
                                    onClick={toggleLikeHandler}
                                    className={`btn ${hasLiked ? 'btn-primary-likes' : 'btn-outline-primary'}`}
                                    style={{ width: '139px' }}
                                >
                                    <i className={`fas fa-heart ${hasLiked ? 'text-light' : ''}`}></i> {petLikes.length}
                                </button>
                            </div> */}

                            {/* {user && */}
                            <div className="d-flex justify-content-between mt-4">
                                <div className="d-flex justify-content-start">
                                    <button
                                        onClick={toggleLikeHandler}
                                        className={`btn ${hasLiked ? 'btn-primary-likes' : 'btn-outline-primary'}`}
                                        style={{ width: '80px', padding: '10px 0' }}
                                    >
                                        <i className={`fas fa-heart ${hasLiked ? 'text-light' : ''}`}></i> {petLikes.length}
                                    </button>
                                </div>
                                {user &&
                                    <Link to={`/pets/${petId}/edit`} className="btn btn-primary" style={{ width: '139px' }}>Edit</Link>
                                }

                                {user &&
                                    <button onClick={deletePetHandler} className="btn btn-primary btn-primary-delete" style={{ width: '139px', textAlign: 'center' }}>Delete</button>
                                }
                            </div>
                            {/* } */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

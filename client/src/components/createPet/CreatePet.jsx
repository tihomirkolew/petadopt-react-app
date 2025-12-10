import { useNavigate } from "react-router";
import UserContext from "../../contexts/UserContext";
import usePetRequest from "../../hooks/usePetRequest";

export default function CreatePet() {
    const navigate = useNavigate();
    const { petRequest } = usePetRequest(`http://localhost:3030/data/pets`);

    const createPetHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const petData = Object.fromEntries(formData.entries());
        petData._createdOn = Date.now();

        await petRequest('POST', petData)

        alert(`Successfully created ${petData.name}'s listing!`);
        
        navigate('/catalog');
    }

    return (
            <>
                <div className="col-lg-6 col-12 mb-5 mx-auto" style={{ minHeight: '74vh' }}>
                    <h2 className="tm-text-primary pt-5 mb-5 text-center">Add Pet Listing</h2>
                    <form id="add-pet-form" action="" method="POST" className="tm-contact-form mx-auto" onSubmit={createPetHandler}>
                        <div className="form-group">
                            <input type="text" name="name" className="form-control rounded-0" placeholder="Pet Name" required />
                        </div>
                        <div className="form-group">
                            <input type="number" name="age" className="form-control rounded-0" placeholder="Age (in years)" required />
                        </div>
                        <div className="form-group">
                            <input name="kind" className="form-control rounded-0" placeholder="Kind" required />
                        </div>
                        <div className="form-group">
                            <textarea name="description" rows="5" className="form-control rounded-0" placeholder="Short Description" required></textarea>
                        </div>
                        <div className="form-group">
                            <input type="url" name="imageUrl" className="form-control rounded-0" placeholder="Image URL" required />
                        </div>
                        <div className="form-group">
                            <input type="text" name="contact" className="form-control rounded-0" placeholder="0888.../email" required />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary">Add Pet</button>
                        </div>
                    </form>
                </div>

            </>
        );
    }

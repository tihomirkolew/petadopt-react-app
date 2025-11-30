export default function CreatePet() {
    return (
        <>
            <div class="col-lg-6 col-12 mb-5" style={{minHeight: '79vh'}}>
                <h2 class="tm-text-primary mb-5">Add a Pet for Adoption</h2>
                <form id="add-pet-form" action="" method="POST" class="tm-contact-form mx-auto">
                    <div class="form-group">
                        <input type="text" name="name" class="form-control rounded-0" placeholder="Pet Name" required />
                    </div>
                    <div class="form-group">
                        <input type="number" name="age" class="form-control rounded-0" placeholder="Age (in years)" required />
                    </div>
                    <div class="form-group">
                        <select name="kind" class="form-control rounded-0" required>
                            <option value="">Select Kind</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="rabbit">Rabbit</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <textarea name="description" rows="5" class="form-control rounded-0" placeholder="Short Description" required></textarea>
                    </div>
                    <div class="form-group">
                        <input type="url" name="imageUrl" class="form-control rounded-0" placeholder="Image URL" required />
                    </div>
                    <div class="form-group tm-text-right">
                        <button type="submit" class="btn btn-primary">Add Pet</button>
                    </div>
                </form>
            </div>

        </>
    );
}

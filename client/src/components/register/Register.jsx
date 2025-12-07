export default function Register() {

    return (
        <>
            <div className="col-lg-4 col-12 mb-5 mx-auto" style={{minHeight: '74vh'}}>
                <h2 className="tm-text-primary pt-5 mb-5 text-center">Register</h2>
                <form id="register-form" action="" method="POST" className="tm-contact-form mx-auto">
                    <div className="form-group">
                        <input type="text" name="name" className="form-control rounded-0" placeholder="Full Name" required />
                    </div>
                    <div className="form-group">
                        <input type="email" name="email" className="form-control rounded-0" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control rounded-0" placeholder="Password" required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="confirm_password" className="form-control rounded-0" placeholder="Confirm Password" required />
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </form>
            </div>
        </>
    );
}

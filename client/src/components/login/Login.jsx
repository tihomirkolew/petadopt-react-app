export default function Login() {
    return (
        <>
            <div className="col-lg-4 col-12 mb-5">
                <h2 className="tm-text-primary mb-5">Login</h2>
                <form id="login-form" action="" method="POST" className="tm-contact-form mx-auto">
                    <div className="form-group">
                        <input type="email" name="email" className="form-control rounded-0" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control rounded-0" placeholder="Password" required />
                    </div>
                    <div className="form-group tm-text-right">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
}

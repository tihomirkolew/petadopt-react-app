export default function Login() {
    return (
        <>
            <div className="col-lg-4 col-12 mb-5 mx-auto" style={{minHeight: '74vh'}}>
                <h2 className="tm-text-primary pt-5 mb-5 text-center">Login</h2>
                <form id="login-form" action="" method="POST" className="tm-contact-form mx-auto">
                    <div className="form-group">
                        <input type="email" name="email" className="form-control rounded-0" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <input type="password" name="password" className="form-control rounded-0" placeholder="Password" required />
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        </>
    );
}

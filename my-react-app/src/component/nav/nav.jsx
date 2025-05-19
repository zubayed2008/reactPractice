import { Link } from 'react-router-dom';
function nav() {
    return ( 
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-secondary fixed-top">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Weather App</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link active" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/weather-setting">Weather Setting</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/city">City</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">AQS Parameter</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </>
     );
}

export default nav;
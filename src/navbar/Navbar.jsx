import './Navbar.css';


 export default function Navigation() {
    return (
    <nav className='nav'>
      <h1 id='title' className='bgc-h'><a href="/">My Recipe</a></h1>
      <ul>
        <li className='list-i bgc-h'><a href="/my-account">My Account</a></li>
        {localStorage.getItem('token') &&
          <li className='list-i bgc-h'><a href="/logout">Logout</a></li>
        }
      </ul>
    </nav>
    );
  }


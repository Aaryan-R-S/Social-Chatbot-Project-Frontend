import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; 
// import { MenuItems } from './NavbarItems';
import NavBarButtons from './NavBarButtons/NavBarButtons';
import brandIcon from './images/robot-hand.png';

const NavBar = () => {

    return (
        <Navbar collapseOnSelect expand="lg" className={styles['bg']}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Container className={styles['bg']}>
                <Navbar.Brand to="/Social-Chatbot-Project-Frontend" as={Link} className={styles['navbar-brand']}>
                    <img src={brandIcon} alt={"Brand Icon"} height="10%" width="10%" style={{marginRight : '5%'}}/>
                      Social Chatbot
                </Navbar.Brand>

                <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-center'>
                    {/* {MenuItems.map( (item, index) => {
                        return (
                            <Nav className={styles['navbar-item']} key={index}>
                                <Nav.Link as={Link} to={item['url']}>
                                    {item['title']}
                                </Nav.Link>
                            </Nav>
                        );
                    })} */}
                    <Nav className={styles['navbar-item']}>
                        <Nav.Link href={'/chatbot'} >
                            Chatbot
                        </Nav.Link>
                    </Nav>

                    <NavDropdown title={<span className={styles['navbar-item']}> Resources </span>}>
                        <Nav className={styles['dropdown-item']}>
                            <Nav.Link as={Link} to='/Social-Chatbot-Project-Frontend/videos'>
                                Videos
                            </Nav.Link>
                        </Nav>
                        <Nav className={styles['dropdown-item']}>
                            <Nav.Link as={Link} to='/Social-Chatbot-Project-Frontend/diet'>
                                Diet
                            </Nav.Link>
                        </Nav>
                        <Nav className={styles['dropdown-item']}>
                            <Nav.Link as={Link} to='/Social-Chatbot-Project-Frontend/exercise'>
                                Exercises
                            </Nav.Link>
                        </Nav>
                    </NavDropdown>

                    <Nav className={styles['navbar-item']}>
                        <Nav.Link as={Link} to={'/Social-Chatbot-Project-Frontend/dashboard'}>
                            Dashboard
                        </Nav.Link>
                    </Nav>

                    <NavBarButtons/>

                </Navbar.Collapse>

            </Container>
        </Navbar>
    );

};

export default NavBar;
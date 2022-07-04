import { React} from 'react';
import { Table } from 'react-bootstrap'

const Admin = () => {

    const users = [
        {
            'name' : 'Rahul Sethi'
        },
        {
            'name' : 'Parth Chabbra'
        },
        {
            'name' : 'Devansh Gupta'
        },
    ]

    const showUserData = (event) => {
        console.log(event);
        const user = event.target.getAttribute('data-name');
        console.log(user);
    };

    return (
        <div style={{
            margin : '5%'
        }}>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map( (user, index) => {
                        return (                
                            <tr key={index} data-name={user.name} onClick={showUserData}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                            </tr>                        
                    )})
                    }
                </tbody>
            </Table>
        </div>
    );
};

export default Admin;
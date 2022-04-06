import React, { useState, useContext, useEffect } from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { centralState } from "../App";

function Users() {
    const cState = useContext(centralState);
    const [users, setUsers] = useState([]);
    const history = useHistory();

    const getUsers = () => {
        const copy_users = [...cState.store.users];
        setUsers(copy_users);
    }

    useEffect(() => {
        getUsers();
    }, [cState.store]);

    const deleteUser = (id) => {
        const copy_store = { ...cState.store };
        copy_store.users.splice(copy_store.users.findIndex(x => x.id === id), 1);
        cState.setStore(copy_store);
    }

    const checkLogin = () => {
        if (cState.store.IsLoggedIn === true) {
            return (

                <Container fluid>
                    <Row>
                        <Col><h4>User Details</h4></Col>
                    </Row>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Id</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th><Button variant='primary' onClick={() => history.push('/user')}>Add User</Button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr key={index}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address}</td>
                                    <td><Button variant='primary' onClick={() => history.push({ pathname: '/user', state: { ...user } })}>Edit</Button><Button variant='danger' onClick={() => { deleteUser(user.id) }}>Delete</Button></td>
                                </tr>)
                            }
                        </tbody>
                    </Table>
                </Container>
            )
        }
        else {
            return (history.push('/'));
        }
    }

    return (
        <>
            {checkLogin()}
        </>
    );
}

export default Users;
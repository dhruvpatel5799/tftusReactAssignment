import React, { useState, useEffect, useContext } from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { centralState } from '../App';

function UserAddEdit(props) {
    const cState = useContext(centralState);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
    })
    const history = useHistory();
    const location = useLocation();

    const getInitialFormData = () => {
        if (location.state !== undefined) {
            const copy_formData = { ...formData };
            copy_formData.id = location.state.id;
            copy_formData.firstName = location.state.firstName;
            copy_formData.lastName = location.state.lastName;
            copy_formData.email = location.state.email;
            copy_formData.phone = location.state.phone;
            copy_formData.address = location.state.address;
            setFormData(copy_formData);
        }
    }

    useEffect(() => {
        getInitialFormData();
    }, []);

    const handleInputChange = (e) => {

        //make the copy
        const copy_formData = { ...formData };

        copy_formData[e.target.id] = e.target.value;
        //update the state
        setFormData(copy_formData);
    }

    const submitForm = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            if (/\d{10}/.test(formData.phone)) {
                if (location.state !== undefined) {
                    const copy_store = { ...cState.store };
                    copy_store.users.splice(copy_store.users.findIndex(x => x.id === formData.id), 1, formData);
                    cState.setStore(copy_store);
                    history.push('/usersList');

                }
                else {
                    const copy_store = { ...cState.store };
                    const copy_formData = { ...formData };
                    if (copy_store.users.length !== 0) {
                        copy_formData.id = copy_store.users[copy_store.users.length - 1].id + 1;
                    }
                    else {
                        copy_formData.id = 1;
                    }
                    copy_store.users.push(copy_formData);
                    cState.setStore(copy_store);
                    history.push('/usersList');
                }
            }
            else {
                alert("Invalid Phone Number")
            }
        }
        else {
            alert("Invalid Email");
        }
    }

    const checkLogin = () => {
        if (cState.store.IsLoggedIn === true) {
            return (
                <Row>
                    <Col md="4"></Col>
                    <Col md="4">
                        <h2>{location.state ? 'Modify User Details' : 'Add New User'}</h2>
                        <Form onSubmit={submitForm}>
                            <Form.Group className='mb-3' controlId='firstName'>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type='text'
                                    placeholder='First Name'
                                    value={formData.firstName}
                                    onChange={handleInputChange} required />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='lastName'>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type='text'
                                    placeholder='Last Name'
                                    value={formData.lastName}
                                    onChange={handleInputChange} required />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='email'>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type='email'
                                    placeholder='Email'
                                    value={formData.email}
                                    onChange={handleInputChange} required />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='phone'>
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type='text'
                                    minLength={10}
                                    maxLength={10}
                                    placeholder='Phone'
                                    value={formData.phone}
                                    onChange={handleInputChange} required />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='address'>
                                <Form.Label>Address</Form.Label>
                                <Form.Control type='text'
                                    maxLength={40}
                                    placeholder='Address'
                                    value={formData.address}
                                    onChange={handleInputChange} required />
                            </Form.Group>
                            <Button variant='primary' type='submit'>
                                {location.state ? 'Edit' : 'Add User'}
                            </Button>
                        </Form>
                    </Col>
                    <Col md="4"></Col>
                </Row>
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

export default UserAddEdit;
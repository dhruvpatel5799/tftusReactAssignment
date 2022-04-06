import { useContext, useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { centralState } from "../App";



function Login() {
    const cState = useContext(centralState);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const history = useHistory();

    const handleInputChange = (e) => {

        //make the copy
        const copy_formData = { ...formData };

        copy_formData[e.target.id] = e.target.value;
        //update the state
        setFormData(copy_formData);
    }

    const submitForm = (formSubmitEvent) => {
        formSubmitEvent.preventDefault();

        //validate the user
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
                const copy_store = { ...cState.store };
                copy_store.IsLoggedIn = true;
                cState.setStore(copy_store);
                if (copy_store.users.length === 0) {
                    history.push('/user');
                }
                else {
                    history.push('/usersList');
                }
            }
            else {
                alert("Password must contain atleast one special character, one uppercase letter, one lowercase letter and one number.")
            }
        }
        else {
            alert("Invalid Email!");
        }
    }

    const LoginLogout = () => {
        if (cState.store.IsLoggedIn === true) {
            const copy_store = { ...cState.store };
            copy_store.IsLoggedIn = false;
            cState.setStore(copy_store);
        }
        return (
            <div className="d-flex justify-content-center">
                <Card style={{ width: '22rem' }}>
                    <h2 className="d-flex justify-content-center">Login to Continue!</h2>
                    <div className="d-flex justify-content-center">
                        <Form style={{ maxWidth: '90%' }} onSubmit={submitForm}>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={formData.email} onChange={handleInputChange} required />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" minLength={8} maxLength={16} placeholder="Password" value={formData.password} onChange={handleInputChange} required />
                            </Form.Group>

                            <Button className='mb-3' variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <>
            {LoginLogout()}
        </>
    );
}

export default Login;
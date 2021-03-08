import React, { useState } from "react";
import JoblyApi from './api.js';
import {useHistory} from 'react-router-dom'
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

function Login({loginFunc}) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await loginFunc(formData);
    setFormData({
      username: "",
      password: ""
    });
    history.push('/');
  };
  return (
    <section className="profile">
      <Card>
        <CardBody>
          <Form>
            <FormGroup>
              <Label>Username:</Label>
              <Input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Password:</Label>
              <Input
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                required
              />
            </FormGroup>
            <Button onClick={handleSubmit}>Login</Button>
          </Form>
        </CardBody>
      </Card>
    </section>
  );
}

export default Login;

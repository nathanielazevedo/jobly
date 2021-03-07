import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

function Signup({ signupFunc }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
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
    await signupFunc(formData);
    setFormData({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
    });
    history.push("/");
  };
  return (
    <section className="col-md-4">
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
            <FormGroup>
              <Label>First Name:</Label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="firstname"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Last Name:</Label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="lastName"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Email:</Label>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email"
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

export default Signup;

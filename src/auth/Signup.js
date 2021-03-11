import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";


//Handles user signup. Passes form data to prop function. loginFunc(formData);
//If result is {success : false}, Alerts containing errors are shown.

function Signup({ signupFunc }) {
  const history = useHistory();
  const [formErrors, setFormErrors] = useState([]);
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
  //Submit form to prop func. Reroute to homepage or show errors.
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let res = await signupFunc(formData);
    if (res.suceess) {
      setFormData({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
      });
      history.push("/");
    } else {
      setFormErrors(res.errors);
    }
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
            {formErrors.length
              ? formErrors.map((e) => {
                  return <Alert color="danger"> {e} </Alert>;
                })
              : null}
            <Button onClick={handleSubmit}>Sign up</Button>
          </Form>
        </CardBody>
      </Card>
    </section>
  );
}

export default Signup;

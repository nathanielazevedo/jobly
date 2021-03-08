import "./App.css";
import UserContext from "./UserContext";
import React, { useState, useContext } from "react";
import JoblyApi from "./api.js";
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

function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    password: '',

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
    let res = await JoblyApi.editProfile(currentUser.username, formData);
    setCurrentUser(res);
    setFormData({
      firstName: res.firstName,
      lastName: res.lastName,
      email: res.email,
      password: "",
    });
    
  };
  return (
    <section className="profile">
      <h1>Edit Your Profile</h1>
      <Card>
        <CardBody>
          <Form>
            <FormGroup>
              <Label>First Name:</Label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label>Last Name:</Label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
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
            <FormGroup>
              <Label>Password:</Label>
              <Input
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                required
              />
            </FormGroup>

            <Button onClick={handleSubmit}>Edit Profile</Button>
          </Form>
        </CardBody>
      </Card>
    </section>
  );
  return (
    <h5>Profile Page</h5>
  );
}

export default Profile;

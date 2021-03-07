import React, { useState } from "react";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup
} from "reactstrap";

function SearchForm({ searchFor }) {

  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchFor(formData.name);
    setFormData({
      name: "",
    });
  };




  return (
    <InputGroup className="mt-5 mb-5">
        <Input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Company Name"
          required 
          className="mr-2"
        /> 
      <Button onClick={handleSubmit}>Search</Button>
    </InputGroup>
  );
}



export default SearchForm;

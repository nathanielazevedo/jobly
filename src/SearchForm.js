import React, { useState } from "react";
import {
  Input,
  Button,
  InputGroup
} from "reactstrap";


//Form allowing users to search for a particular company name

function SearchForm({ searchFor }) {

  //setup of a controlled component.
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

  //call function which was passed down as prop. formData is passed as argument.
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

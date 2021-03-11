import "./Companies.css";
import JoblyApi from "../api.js";
import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "../SearchForm";
import { Spinner, CardGroup } from "reactstrap";


//Gather companies using JoblyApi class. Loop through these companies and create individual components. 

//Also handles individual company searching.

//Spinner shown until "companies" state not null.

function Companies() {
  const [companies, setCompanies] = useState();

  //gather all companies. set companies state to result.
  useEffect(function () {
    async function getComps() {
      let comps = await JoblyApi.getCompanies();
      setCompanies(comps);
    }
    getComps();
  }, []);

  //search for a company, set companies state to result.
  async function search(name) {
    let comps = await JoblyApi.getCompanies(name);
    setCompanies(comps);
  }

  if (companies) {
    return (
      <div className="container">
        <SearchForm searchFor={search}/>
        <CardGroup className="companies">
          {companies.map((c) => {
            return <CompanyCard c={c} key={c.handle} />;
          })}
        </CardGroup>
      </div>
    );
  } else {
    return <Spinner color="dark" />;
  }
}

export default Companies;

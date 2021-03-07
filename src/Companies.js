import "./Companies.css";
import JoblyApi from "./api.js";
import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";
import { Spinner, CardGroup } from "reactstrap";

function Companies() {
  const [companies, setCompanies] = useState();

  useEffect(function () {
    async function getComps() {
      console.log('running effect')
      let comps = await JoblyApi.getCompanies();
      setCompanies(comps);
    }
    getComps();
  }, []);

  async function search(name) {
    let comps = await JoblyApi.getCompanies(name);
    console.log(comps)
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

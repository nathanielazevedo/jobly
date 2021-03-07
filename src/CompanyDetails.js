import "./App.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCard from './JobCard';
import JoblyApi from "./api.js";

function CompanyDetails() {
  const { handle } = useParams();
  const [company, setCompany] = useState();

  useEffect(function () {
    async function getComps() {
      let comp = await JoblyApi.getCompany(handle);
      console.log(comp)
      setCompany(comp);
    }
    getComps();
  }, []);


  if (company) {
    return (
      <>
        <h1>{company.handle}</h1>
        {company.jobs.map((j) => {
          return <JobCard job={j} key={ j.id }/>
        })}
      </>
    )
  } else {
    return <h3>Loading...</h3>
  }
}

export default CompanyDetails;

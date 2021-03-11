import "../App.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCard from '../jobs/JobCard';
import JoblyApi from "../api.js";
import { Spinner, CardGroup, Media } from "reactstrap";


//renders details page for an individual company. company handle passed down in route params. 

//company available jobs also rendered.

function CompanyDetails() {
  const { handle } = useParams();
  const [company, setCompany] = useState();

  //using param, gathers data on company.
  useEffect(function () {
    async function getComps() {
      let comp = await JoblyApi.getCompany(handle);
      console.log(comp)
      setCompany(comp);
    }
    getComps();
  }, [handle]);

  if (company) {
    return (
      <>
        <Media className="mediaBack">
          <Media body>
            <Media heading>
              {company.name}
            </Media>
            <Media description>
             Number of Employees: {company.numEmployees}
            </Media>
            {company.description}
          </Media>
        </Media>
        <h4 className="jobsTitle">Current Openings:</h4>
        <CardGroup className="jobs">
          {company.jobs.map((j) => {
            return <JobCard job={j} key={ j.id }/>
          })}
        </CardGroup>
      </>
    )
  } else {
    return <Spinner color="dark" />;
  }
}

export default CompanyDetails;

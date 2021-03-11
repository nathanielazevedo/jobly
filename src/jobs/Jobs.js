import "../companies/Companies.css";
import JoblyApi from "../api.js";
import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { Spinner } from "reactstrap";
import { CardGroup } from "reactstrap";


//renders all jobs. 
//gathers all jobs by calling JoblyApi class helper.

function Jobs() {
  const [jobs, setJobs] = useState();

  //upon mounting, gathers all jobs and sets these jobs to state.
  useEffect(function () {
    async function getJobs() {
      let jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    getJobs();
  }, []);
  
  if (jobs) {
    return (
      <>
        <h2 className="jobsTitle">All Jobs</h2>
        <CardGroup className="jobs">
          {jobs.map((j) => {
            return <JobCard job={j} key={j.id}/>;
          })}
          </CardGroup>
      </>
    );
  } else { 
    return <Spinner color="dark" />
  }
}

export default Jobs;

import "../App.css";
import UserContext from "../UserContext";
import React, { useContext, useState, useEffect } from "react";
import { Card, Button, CardTitle, CardSubtitle } from "reactstrap";


//renders an individual job. 
//uses state and context to change view for jobs which user has applied to.

function JobCard({ job }) {

  //gather applications functions from context.
  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

  
  //check if user has applied to job and set status to state.
  useEffect(
    function updateAppliedStatus() {
      setApplied(hasAppliedToJob(job.id));
    },
    [job.id, hasAppliedToJob]
  );

  //handles the applying for a job. Checks if user has applied to this jobs first.
  let handleApply = () => {
    if (hasAppliedToJob(job.id)) return;
    applyToJob(job.id);
    setApplied(true)
  }
  
  return (
    <div>
      <Card body className="m-1 myjobcard">
        <CardTitle tag="h5" className="apply">{ job.title }</CardTitle>
        <CardSubtitle>Salary: { job.salary }</CardSubtitle>
        {job.equity ? <CardSubtitle>Equity: {job.equity}</CardSubtitle> : ''}
        <CardSubtitle>Company Name: { job.companyName }</CardSubtitle>
        <Button color="primary" onClick={handleApply} disabled={applied}>
        {applied ? "Applied" : "Apply"}
      </Button>
      </Card>
    </div>
  );
}

export default JobCard;



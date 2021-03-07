import "./App.css";
import UserContext from "./UserContext";
import React, { useContext, useState, useEffect } from "react";

import { Card, Button, CardTitle, CardSubtitle } from "reactstrap";

function JobCard({ job }) {

  const { hasAppliedToJob, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState();

    useEffect(
      function updateAppliedStatus() {
        setApplied(hasAppliedToJob(job.id));
      },
      [job.id, hasAppliedToJob]
    );

  let handleApply = () => {
    if (hasAppliedToJob(job.id)) return;
    applyToJob(job.id);
    setApplied(true)
  }
  
  return (
    <div>
      <Card body className="m-1">
        <CardTitle tag="h5">{ job.title }</CardTitle>
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



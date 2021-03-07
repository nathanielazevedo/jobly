
import "./App.css";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";

function CompanyCard({ c }) {
  return (
    <div className="mycard">
      <Card>
        <CardHeader>{c.name}</CardHeader>
        <CardBody>
          <CardText>{c.description}</CardText>
          <Link to={`companies/${c.handle}`}>View Company</Link>
        </CardBody>
      </Card>
    </div>
  );
}




export default CompanyCard;




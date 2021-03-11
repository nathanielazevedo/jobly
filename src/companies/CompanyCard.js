import "../App.css";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardText,
} from "reactstrap";


//renders individual company card which is passed down in props.

function CompanyCard({ c }) {
  return (
    <div>
      <Card className="mycard">
        <CardHeader>{c.name}</CardHeader>
        <CardBody>
          <CardText>{c.description}</CardText>
          <Button color="primary">
            <Link to={`companies/${c.handle}`} className="linkText">View Company</Link>
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}




export default CompanyCard;




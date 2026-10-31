import { Container, Row, Col } from 'react-bootstrap';
import {
  PeopleFill,
  FileEarmarkTextFill,
  Calendar2CheckFill,
} from 'react-bootstrap-icons';

const Home = () => (
  <main className="d-flex flex-grow-1 align-items-center">
    <Container className="py-5">
      <Row className="text-center g-4">
        <Col md={4}>
          <PeopleFill size={100} />
          <h1 className="mt-3">Multiple Users</h1>
          <h5>
            This address book enables any number of users to register
            and save their business contacts. You can only see the
            contacts you have created.
          </h5>
        </Col>
        <Col md={4}>
          <FileEarmarkTextFill size={100} />
          <h1 className="mt-3">Contact Information</h1>
          <h5>
            For each contact, you can save their name, address,
            and phone number.
          </h5>
        </Col>
        <Col md={4}>
          <Calendar2CheckFill size={100} />
          <h1 className="mt-3">Contact Notes</h1>
          <h5>
            Each time you make contact with a contact, you can write
            a note that summarizes the conversation. This note is
            saved along with a timestamp with the contact.
          </h5>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;

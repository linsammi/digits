'use client';

import { Card, Image } from 'react-bootstrap';
import type { Contact } from '@prisma/client';

const ContactCardAdmin = ({ contact }: { contact: Contact }) => (
  <Card className="h-100">
    <Card.Body>
      <div className="d-flex align-items-center mb-3">
        <Image
          src={contact.image}
          width={75}
          height={75}
          roundedCircle
          className="me-3"
          style={{ objectFit: 'cover' }}
          alt={`${contact.firstName} ${contact.lastName}`}
        />
        <div>
          <Card.Title>
            {contact.firstName} {contact.lastName}
          </Card.Title>
          <Card.Subtitle className="text-muted">
            {contact.address}
          </Card.Subtitle>
        </div>
      </div>
      <Card.Text>{contact.description}</Card.Text>
      <p className="blockquote-footer">{contact.owner}</p>
    </Card.Body>
  </Card>
);

export default ContactCardAdmin;

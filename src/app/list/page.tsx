import { Col, Container, Row } from 'react-bootstrap';
import ContactCard from '@/components/ContactCard';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

const ListPage = async () => {
  const session = await auth();
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const contacts = await prisma.contact.findMany({
    where: { owner: session?.user?.email ?? '' },
  });

  const notes = await prisma.note.findMany({
    where: { owner: session?.user?.email ?? '' },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <h2 className="text-center">List Contacts</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {contacts.map((contact) => (
            <Col key={contact.id}>
              <ContactCard contact={contact} notes={notes.filter((note) => note.contactId === contact.id)} />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;

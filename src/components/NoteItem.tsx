import type { Note } from '@prisma/client';
import { ListGroup } from 'react-bootstrap';

interface NoteItemProps {
  note: Note;
}

const NoteItem = ({ note }: NoteItemProps) => (
  <ListGroup.Item>
    <small className="text-muted">
      {new Date(note.createdAt).toLocaleDateString()}
    </small>
    <p className="mb-0">{note.note}</p>
  </ListGroup.Item>
);

export default NoteItem;

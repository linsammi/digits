'use client';

import { useSession } from 'next-auth/react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { addNote } from '@/lib/dbActions';
import { AddNoteSchema } from '@/lib/validationSchemas';

interface NoteFormData {
  note: string;
  contactId: number;
}

const AddNoteForm = ({ contactId }: { contactId: number }) => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteFormData>({
    resolver: yupResolver(AddNoteSchema),
    defaultValues: {
      note: '',
      contactId,
    },
  });

  const onSubmit = async (data: NoteFormData) => {
    await addNote({
      note: data.note,
      contactId,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <Form.Group>
        <Form.Label>Add Note</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          {...register('note')}
          isInvalid={!!errors.note}
          placeholder="Write a note..."
        />
        <Form.Control.Feedback type="invalid">
          {errors.note?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <input type="hidden" {...register('contactId', { valueAsNumber: true })} value={contactId} />

      <Button type="submit" variant="primary" className="mt-2" disabled={isSubmitting || !currentUser}>
        {isSubmitting ? 'Saving...' : 'Add Note'}
      </Button>
    </Form>
  );
};

export default AddNoteForm;

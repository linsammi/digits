'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import { AddNoteSchema } from '@/lib/validationSchemas';
import { addNote } from '@/lib/dbActions';

type NoteFormData = {
  note: string;
  contactId: number;
};

const AddNoteForm = ({ contactId }: { contactId: number }) => {
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
    await addNote(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mt-3">
      <Form.Control type="hidden" {...register('contactId', { valueAsNumber: true })} />
      <Form.Group className="mb-2">
        <Form.Label>Add Note</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Write a note..."
          isInvalid={!!errors.note}
          {...register('note')}
        />
        <Form.Control.Feedback type="invalid">
          {errors.note?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" disabled={isSubmitting} size="sm">
        {isSubmitting ? 'Saving...' : 'Add Note'}
      </Button>
    </Form>
  );
};

export default AddNoteForm;

'use server';
import type { Contact as PrismaContact } from '@prisma/client';

import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';
import { auth } from './auth';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}


export async function addContact(contact: {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
}) {
  await prisma.contact.create({
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner,
    },
  });
  redirect('/list');
}

export async function editContact(contact: PrismaContact) {
  await prisma.contact.update({
    where: { id: contact.id },
    data: {
      firstName: contact.firstName,
      lastName: contact.lastName,
      address: contact.address,
      image: contact.image,
      description: contact.description,
      owner: contact.owner,
    },
  });
  redirect('/list');
}


export async function addNote(data: { note: string; contactId: number }) {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    throw new Error('You must be logged in to add a note.');
  }

  const contact = await prisma.contact.findFirst({
    where: {
      id: data.contactId,
      owner: email,
    },
  });

  if (!contact) {
    throw new Error('Contact not found or access denied.');
  }

  const note = data.note.trim();

  if (!note) {
    throw new Error('Note cannot be empty.');
  }

  await prisma.note.create({
    data: {
      note,
      contactId: data.contactId,
      owner: email,
    },
  });

  redirect('/list');
}

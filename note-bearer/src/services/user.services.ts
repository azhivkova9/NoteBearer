import { ref, set } from "firebase/database";
import { db } from "../config/firebase-config";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  uid: string;
  createdOn: string;
  profilePicture: string;
  bio: string;
  location: string;
}

export const createUser = async (
  email: string,
  firstName: string,
  lastName: string,
  username: string,
  uid: string
): Promise<void> => {
  const user: User = {
    email,
    firstName,
    lastName,
    username,
    uid,
    createdOn: new Date().toISOString(),
    profilePicture: '',
    bio: '',
    location: '',
  };

  try {
    await set(ref(db, 'users/' + username), user);
    console.log('User created successfully:', user);
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user in the database');
  }
};
import { equalTo, get, orderByChild, query, ref, set } from "firebase/database";
import { db } from "../config/firebase-config";
import type { AppUserData } from "../types/UserTypes";

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

export const getUserByEmail = async (
  userEmail: string,
) : Promise<User> => {

  const userRef = ref(db, 'users');
  const snapshot = await get(userRef);
  const users = snapshot.val();

  if (users) {
    for (const username in users) {
      if (users[username].email === userEmail) {
        return users[username] as User;
      }
    }
  }
  return Promise.reject(new Error('User not found'));
}

export const getUserData = async (
  userId: string
) : Promise<AppUserData> => {
  const snapshot = await get(query(ref(db, 'users'), orderByChild('uid'), equalTo(userId)));

  if(snapshot.exists()) {
    const users = snapshot.val();
    const userDataDetails = Object.values(users || {});
    return userDataDetails[0] as AppUserData;
  }
  return Promise.reject(new Error('User data not found'));
}
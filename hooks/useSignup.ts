import { auth, db } from '@/services/firebaseConfig';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export type SignupParams = {
  email: string;
  password: string;
};

export const useSignup = () => {
  return useMutation<User, FirebaseError, SignupParams>({
    mutationFn: async ({ email, password }: SignupParams) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const usersRef = collection(db, 'users');
      await addDoc(usersRef, {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        createdDate: serverTimestamp(),
      });
      return user;
    },
  });
};

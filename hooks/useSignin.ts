import { auth } from '@/services/firebaseConfig';
import { useMutation } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword, User } from 'firebase/auth';

export type SigninParams = {
  email: string;
  password: string;
};

export const useSignin = () => {
  // useMutation içindeki error gibi kısımları tiplendirmek için
  // <Sunucu Cevabı, Hata, Girdi parametreleri>
  return useMutation<User, FirebaseError, SigninParams>({
    mutationFn: async ({ email, password }: SigninParams) => {
      // 0. Firebase Authentication servisinde kullanıcı girişi çağrılır
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    },
  });
};

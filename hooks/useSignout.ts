import { auth } from '@/services/firebaseConfig';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FirebaseError } from 'firebase/app';
import { signOut } from 'firebase/auth';

export const useSignout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, FirebaseError>({
    mutationFn: async () => {
      await signOut(auth);
    },
    onSuccess: () => {
      // 1. yöntem kontrollü silme
      queryClient.invalidateQueries({ queryKey: ['computers', 'products'] });
      // 2. yöntem. tüm cache'i silme
      queryClient.clear();
    },
  });
};

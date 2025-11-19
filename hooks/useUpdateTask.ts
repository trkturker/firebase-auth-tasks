import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from "../services/firebaseConfig"
import { useAsyncStorage } from './useAsyncStorage';
import { User } from 'firebase/auth';

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    const { value: user } = useAsyncStorage<User>('user');

    return useMutation({
        mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
            if (!user?.uid) throw new Error("User not authenticated");

            const taskRef = doc(db, 'users', user.uid, 'tasks', id);
            await updateDoc(taskRef, { completed });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks", user?.uid] });
        },
        onError: (error) => {
            console.error("Error updating task:", error);
        }
    });
};

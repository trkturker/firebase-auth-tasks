import { db } from '@/services/firebaseConfig';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { useAsyncStorage } from './useAsyncStorage';


export type Task = {
    id: string,
    userId?: string ,
    title: string,
    createdAt?: string,
    completed: boolean,
};
export const useTasks = () => {
    const { value: user } = useAsyncStorage<User>('user');
    
    return useQuery<Task[]>({
        queryKey: ["tasks", user?.uid],
        queryFn: async () => {
            const tasksRef = collection(db, "users", user!.uid, "tasks");
            const snapshot = await getDocs(tasksRef);
            const tasks = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Task[];
            return tasks;
        }
    });
}


export const useDeleteTask = () => {
    const { value: user } = useAsyncStorage<User>('user');
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (taskId: string) => {
            if (!user?.uid) throw new Error("User not authenticated");
            const taskRef = doc(db, "users", user.uid, "tasks", taskId);
            await deleteDoc(taskRef);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks", user?.uid] });
        }
    });
}

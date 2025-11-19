import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Task } from "./useTasks"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../services/firebaseConfig"
import { User } from 'firebase/auth';
import { useAsyncStorage } from "./useAsyncStorage";


export const useAddTask = () => {
    const { value: user } = useAsyncStorage<User>('user');
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (task: Omit<Task, "id">) => {
            if (!user?.uid) throw new Error("User not authenticated");

            const tasksRef = collection(db, "users", user.uid, "tasks");
            await addDoc(tasksRef, {
                ...task,
                createdAt: serverTimestamp(), 
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks", user?.uid] });
        },
    });
}

import { useAsyncStorage } from '@/hooks/useAsyncStorage';
import { useSignout } from '@/hooks/useSignout';
import { useTasks, useDeleteTask, Task } from '@/hooks/useTasks';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAddTask } from '@/hooks/useAddTask';
import { useUpdateTask } from '@/hooks/useUpdateTask';
import { User } from 'firebase/auth';


const Tasks = () => {
  const { removeValue: removeUser } = useAsyncStorage('user');
  const { mutateAsync: signout } = useSignout();

  const [title, setTitle] = useState('');
  const { data: tasks } = useTasks();
  const { mutate: addTask } = useAddTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: updateTask } = useUpdateTask();

  

    const {
        value: user,
    } = useAsyncStorage<User>('user');


  const handleAdd = () => {
    addTask({
      title,
      completed: false,
      userId: user?.uid ,
    });
    setTitle('');
  };

  const handleToggleComplete = (task: Task) => {
    updateTask({
      id: task.id,
      completed: !task.completed,
    });
  };

  const handleSignout = async () => {
    await signout();
    await removeUser();
    router.replace('/');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 items-center px-6 py-8">

        <Text className="text-4xl font-bold mb-12">FireTasks</Text>

        <View className="w-full max-w-md max-h-[500px] bg-white rounded-2xl shadow-lg p-6 flex-1">

          <Text className="text-2xl font-semibold mb-4">Tasks</Text>

          <View className="flex-row gap-3 mb-6">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Enter task title..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              onPress={handleAdd}
              className="bg-blue-500 rounded-lg px-6 py-3 justify-center"
            >
              <Text className="text-white font-semibold">Add</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 16 }}
            ListEmptyComponent={
              <Text className="text-center text-gray-400 py-8">
                No tasks yet. Add one above!
              </Text>
            }
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between py-4 border-b border-gray-100">
                <TouchableOpacity
                  onPress={() => handleToggleComplete(item)}
                  className="flex-row items-center flex-1"
                  activeOpacity={0.7}
                >
                  <View className={`w-6 h-6 border-2 rounded-full items-center justify-center mr-3 ${item.completed ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                    }`}>
                    {item.completed && (
                      <View className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </View>
                  <Text className={`text-base flex-1 ${item.completed ? 'text-gray-400 line-through' : 'text-gray-800'
                    }`}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteTask(item.id)}
                  className="px-2 py-1"
                  activeOpacity={0.7}
                >
                  <Text className="text-gray-500 text-base">Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <TouchableOpacity
            onPress={handleSignout}
            className="bg-blue-500 rounded-lg py-4 w-full mt-4"
          >
            <Text className="text-white text-center font-semibold text-base">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Tasks;
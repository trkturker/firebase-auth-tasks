import { Button } from '@/components/Button';
import { useAsyncStorage } from '@/hooks/useAsyncStorage';
import { useSignin } from '@/hooks/useSignin';
import { useSignup } from '@/hooks/useSignup';
import { Link, router } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import { User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutateAsync: signup, isPending: isSignupPending } = useSignup();
  const { mutateAsync: signIn, isPending: isSigninPending } = useSignin();


  const {
    value: user,
    saveValue: saveUser,
    isLoading: isUserLoading,
  } = useAsyncStorage<User>('user');

  useEffect(() => {
    if (user) {
      router.replace('/tasks');
    }
  }, [user]);

  const handleSignup = async () => {
    signup({ email, password })
      .then(async (user) => {
        if (user) {
          await saveUser(user);
          router.replace('/tasks');
        }
      })
      .catch((error: FirebaseError) => {
        if (error) {
          alert(error.message);
        }
      });
  };

  const handleSignin = async () => {
    router.replace('/');
  };

  if (isUserLoading) {
    return (
      <Text className="text-3xl">Yükleniyor...</Text>
    )
      ;
  }



  if (user) {
    return null;
  }

  return (
    <SafeAreaView className="gap-4 ">

      <View className="gap-4 m-6 p-4">

        <Text className='text-5xl mx-auto m-4 mb-8'>FireTasks</Text>

        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          className="rounded-xl border border-slate-400  p-4 "
        />

        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          className="rounded-xl border border-slate-400   p-4 "
          secureTextEntry={true}
        />

        <View className='mt-6'>


          <Button
            title={isSignupPending ? 'Loading...' : 'Sign Up'}
            onPress={handleSignup}
            disabled={isSigninPending}
            className='text-blue-700'
          />


          <View className='flex mx-auto gap-4 p-4'>
            <Text className='text-xl'>Already have an account?</Text>
            <Text onPress={handleSignin} className='mx-auto text-xl text-[#237ed9]'>Go to Login</Text>

          </View>


        </View>


      </View>

    </SafeAreaView>
  );
};

export default Index;

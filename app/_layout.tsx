import { useState } from 'react';
import '../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

export default function Layout() {
  const [queryClient] = useState(new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Login', headerShown: false  }} />
        <Stack.Screen name="tasks" options={{ title: 'Tasks', headerShown: false  }} />
        <Stack.Screen name="signup" options={{ title: 'Signup', headerShown: false  }} />
      </Stack>
    </QueryClientProvider>
  );
}

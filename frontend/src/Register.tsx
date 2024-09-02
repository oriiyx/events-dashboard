import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { register as registerUser } from './lib/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Header from '@/components/header.tsx';
import { handleAxiosError } from '@/lib/error-handler.ts';

const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Register() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await registerUser(data.email, data.password);
      navigate('/login');
    } catch (err) {
      handleAxiosError(err, 'Failed to register');
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 p-4 font-mono">
      <Header />
      <div className="container mx-auto max-w-md">
        <div className="bg-green-500 w-full p-2 mb-5">
          <h1 className="text-xl font-bold text-left text-black">Register</h1>
        </div>
        <div className="border-4 border-green-400 p-8 shadow-lg shadow-green-400/50">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-green-900 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} className="bg-green-900 text-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {error && <div className="text-red-500">{error}</div>}
              <Button type="submit"
                      className="w-full bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-none">
                Register Player
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
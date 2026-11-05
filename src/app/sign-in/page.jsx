import SignInForm from '@/components/SignInForm';
import { Suspense } from 'react';

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
      <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
        <SignInForm />
      </Suspense>
    </main>
  );
}
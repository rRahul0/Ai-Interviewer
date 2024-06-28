import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default function Home() {
  
  return (
    <div className="flex items-start justify-center flex-col ">
      <h1 className="text-4xl font-bold text-center">Welcome to the Interview Feedback System</h1>
      <p className="text-lg text-center">This is a simple application to give feedback on your interview performance</p>
      <p className="text-lg text-center">Please login to continue</p>
      <Link href="/dashboard">
        <Button className="bg-blue-900">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
}

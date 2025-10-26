import { Mail } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <div className="bg-red-500 text-white p-2 rounded-md shadow-sm">
        <Mail className="w-6 h-6" />
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Sign in with Email OTP
        </h1>
        <p className="text-sm text-gray-500">Secure one-time passcode login</p>
      </div>
    </div>
  );
}

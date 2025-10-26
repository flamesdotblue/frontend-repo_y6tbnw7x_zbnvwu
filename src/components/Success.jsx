import { CheckCircle } from "lucide-react";

export default function Success({ email, onReset }) {
  return (
    <div className="text-center space-y-4">
      <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
      <h2 className="text-xl font-semibold text-gray-900">You're in!</h2>
      <p className="text-gray-600">Signed in as {email}</p>
      <button
        onClick={onReset}
        className="mt-2 inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Sign out
      </button>
    </div>
  );
}

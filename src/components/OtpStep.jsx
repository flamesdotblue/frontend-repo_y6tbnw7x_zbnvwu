import { useEffect, useRef, useState } from "react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function OtpStep({ email, onBack, onSuccess, demoOtp }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.detail || "Invalid code");
      onSuccess(data.token, data.email);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm text-gray-600">We sent a 6-digit code to</p>
      <div className="flex items-center justify-between">
        <span className="font-medium text-gray-900">{email}</span>
        <button type="button" onClick={onBack} className="text-sm text-blue-600 hover:underline">
          Change
        </button>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Enter code</label>
        <input
          ref={inputRef}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ""))}
          placeholder="••••••"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 tracking-widest text-center text-lg shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading || code.length !== 6}
        className="w-full inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
      >
        {loading ? "Verifying..." : "Verify & Sign in"}
      </button>
      {demoOtp && (
        <p className="text-xs text-gray-500">Demo code: <span className="font-mono">{demoOtp}</span></p>
      )}
    </form>
  );
}

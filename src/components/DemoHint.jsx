export default function DemoHint({ otp }) {
  if (!otp) return null;
  return (
    <div className="mt-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-3 text-sm text-gray-700">
      <span className="font-medium">Demo only:</span> Use this OTP to continue: 
      <span className="font-mono text-gray-900 ml-1">{otp}</span>
    </div>
  );
}

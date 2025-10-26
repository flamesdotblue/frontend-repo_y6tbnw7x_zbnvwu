import { useState } from "react";
import Header from "./components/Header";
import EmailStep from "./components/EmailStep";
import OtpStep from "./components/OtpStep";
import Success from "./components/Success";
import DemoHint from "./components/DemoHint";

function App() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [demoOtp, setDemoOtp] = useState("");

  const handleNextFromEmail = (nextEmail, otp) => {
    setEmail(nextEmail);
    setDemoOtp(otp || "");
    setStep("otp");
  };

  const handleSuccess = (tok, em) => {
    setToken(tok);
    setEmail(em);
    setStep("success");
  };

  const reset = () => {
    setStep("email");
    setEmail("");
    setToken("");
    setDemoOtp("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-rose-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
        <Header />
        {step === "email" && (
          <>
            <EmailStep onNext={handleNextFromEmail} setDemoOtp={setDemoOtp} />
            <DemoHint otp={demoOtp} />
          </>
        )}
        {step === "otp" && (
          <>
            <OtpStep email={email} onBack={() => setStep("email")} onSuccess={handleSuccess} demoOtp={demoOtp} />
            <DemoHint otp={demoOtp} />
          </>
        )}
        {step === "success" && <Success email={email} onReset={reset} />}
      </div>
    </div>
  );
}

export default App;

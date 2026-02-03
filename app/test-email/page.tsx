"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TestEmailPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [envCheck, setEnvCheck] = useState<any>(null);

  const checkEnvVars = () => {
    setEnvCheck({
      // Client-side variables (NEXT_PUBLIC_)
      NEXT_PUBLIC_RESEND_API_KEY: process.env.NEXT_PUBLIC_RESEND_API_KEY
        ? "✅ Set"
        : "❌ Missing",
      NEXT_PUBLIC_ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL
        ? `✅ ${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`
        : "❌ Missing",

      // Server-side variables (checked via API)
      checkingServer: "Will check via API...",
    });
  };

  const testSendEmail = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "danielagbeleshebioba@gmail.com",
          fullName: "Daniel Agbeleshe",
          orderId: "TEST123",
          amount: 150,
          serviceType: "Test Cleaning",
        }),
      });

      const data = await response.json();
      setResult({
        status: response.status,
        ok: response.ok,
        data,
      });
    } catch (error: any) {
      setResult({
        error: error.message,
        stack: error.stack,
      });
    } finally {
      setLoading(false);
    }
  };

  const testEnvAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/env-check");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: String(error) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Test Email API</h1>

      <div className="mb-8 space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="font-bold mb-2">Check Environment Variables:</h2>
          <Button onClick={checkEnvVars} className="mb-4">
            Check Client-Side ENV Vars
          </Button>

          {envCheck && (
            <div className="space-y-2">
              <p>
                <strong>NEXT_PUBLIC_RESEND_API_KEY:</strong>{" "}
                {envCheck.NEXT_PUBLIC_RESEND_API_KEY}
              </p>
              <p>
                <strong>NEXT_PUBLIC_ADMIN_EMAIL:</strong>{" "}
                {envCheck.NEXT_PUBLIC_ADMIN_EMAIL}
              </p>
            </div>
          )}
        </div>

        <div className="space-x-4">
          <Button onClick={testEnvAPI} disabled={loading}>
            Test Server ENV via API
          </Button>

          <Button
            onClick={testSendEmail}
            disabled={loading}
            variant="secondary"
          >
            {loading ? "Testing..." : "Send Test Email"}
          </Button>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <h3 className="font-bold mb-2">Result:</h3>
          <pre className="whitespace-pre-wrap text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-bold mb-2">Important Note:</h3>
        <p className="mb-2">
          Environment variables need to be prefixed with{" "}
          <code>NEXT_PUBLIC_</code>
          to be available on the client side.
        </p>
        <p>
          Server-side API routes can access <strong>all</strong> environment
          variables (with or without NEXT_PUBLIC_ prefix).
        </p>
      </div>
    </div>
  );
}

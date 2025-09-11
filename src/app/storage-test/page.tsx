"use client";

import { useEffect, useState } from "react";

export default function StorageTestPage() {
  const [storageData, setStorageData] = useState<string | null>(null);

  useEffect(() => {
    // Check localStorage after component mounts
    const authData = localStorage.getItem('auth-storage');
    setStorageData(authData);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Storage Test</h1>
      <div className="bg-muted p-4 rounded-lg">
        <p className="mb-2"><strong>Auth Storage Data:</strong></p>
        <pre className="bg-background p-4 rounded overflow-auto max-h-96">
          {storageData ? JSON.stringify(JSON.parse(storageData), null, 2) : "No data found"}
        </pre>
      </div>
    </div>
  );
}
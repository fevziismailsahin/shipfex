export default function TermsPage() {
  return (
    <div className="container py-12 md:py-24 max-w-4xl">
      <div className="prose dark:prose-invert">
        <h1>Terms of Service</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <h2>1. Introduction</h2>
        <p>
          Welcome to ShipFex ("Company", "we", "our", "us")! These Terms of
          Service ("Terms", "Terms of Service") govern your use of our web
          pages located at this domain and our mobile application (together or
          individually "Service") operated by ShipFex.
        </p>

        <h2>2. Communications</h2>
        <p>
          By using our Service, you agree to subscribe to newsletters,
          marketing or promotional materials and other information we may
          send. However, you may opt out of receiving any, or all, of these
          communications from us by following the unsubscribe link or by
          emailing us.
        </p>

        <h2>3. Accounts</h2>
        <p>
          When you create an account with us, you guarantee that you are above
          the age of 18, and that the information you provide us is accurate,
          complete, and current at all times. Inaccurate, incomplete, or
          obsolete information may result in the immediate termination of
          your account on the Service.
        </p>
        
        <h2>4. Prohibited Uses</h2>
        <p>You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:</p>
        <ul>
            <li>In any way that violates any applicable national or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter," "spam," or any other similar solicitation.</li>
        </ul>

        <h2>5. Intellectual Property</h2>
        <p>
          The Service and its original content (excluding Content provided by
          users), features and functionality are and will remain the
          exclusive property of ShipFex and its licensors.
        </p>

        <h2>6. Termination</h2>
        <p>
          We may terminate or suspend your account and bar access to the
          Service immediately, without prior notice or liability, under our
          sole discretion, for any reason whatsoever and without limitation,
          including but not limited to a breach of the Terms.
        </p>
        
        <h2>7. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the
          laws of the jurisdiction in which the company is established, without
          regard to its conflict of law provisions.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          Please send your feedback, comments, requests for technical support
          by email: support@shipfex.example.com.
        </p>
      </div>
    </div>
  );
}

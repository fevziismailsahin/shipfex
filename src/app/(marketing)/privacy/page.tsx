export default function PrivacyPage() {
  return (
    <div className="container py-12 md:py-24 max-w-4xl">
      <div className="prose dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <p>
          ShipFex ("us", "we", or "our") operates this website and the
          ShipFex mobile application (the "Service"). This page informs you
          of our policies regarding the collection, use, and disclosure of
          personal data when you use our Service and the choices you have
          associated with that data.
        </p>

        <h2>1. Information Collection and Use</h2>
        <p>
          We collect several different types of information for various
          purposes to provide and improve our Service to you.
        </p>
        <h3>Types of Data Collected</h3>
        <h4>Personal Data</h4>
        <p>
          While using our Service, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you ("Personal Data"). Personally, identifiable
          information may include, but is not limited to:
        </p>
        <ul>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Address, State, Province, ZIP/Postal code, City</li>
          <li>Cookies and Usage Data</li>
        </ul>

        <h2>2. Use of Data</h2>
        <p>ShipFex uses the collected data for various purposes:</p>
        <ul>
          <li>To provide and maintain our Service</li>
          <li>To notify you about changes to our Service</li>
          <li>
            To allow you to participate in interactive features of our Service
            when you choose to do so
          </li>
          <li>To provide customer support</li>
          <li>
            To gather analysis or valuable information so that we can improve
            our Service
          </li>
          <li>To monitor the usage of our Service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>

        <h2>3. Security of Data</h2>
        <p>
          The security of your data is important to us, but remember that no
          method of transmission over the Internet, or method of electronic
          storage is 100% secure. While we strive to use commercially
          acceptable means to protect your Personal Data, we cannot guarantee
          its absolute security.
        </p>
        
        <h2>4. Service Providers</h2>
        <p>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</p>

        <h2>5. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify
          you of any changes by posting the new Privacy Policy on this page.
          You are advised to review this Privacy Policy periodically for any
          changes. Changes to this Privacy Policy are effective when they are
          posted on this page.
        </p>

        <h2>6. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact
          us by email: privacy@shipfex.example.com.
        </p>
      </div>
    </div>
  );
}

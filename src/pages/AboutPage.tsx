
import Layout from "../components/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <h1 className="font-serif">About</h1>
      <div className="prose prose-stone dark:prose-invert max-w-none">
        <p>
          Welcome to my minimalist ENS-connected blog. This space is dedicated to exploring 
          Web3 technologies, digital identity, and the evolving landscape of decentralized systems.
        </p>
        
        <h2 className="text-2xl font-serif mt-8 mb-4">My ENS Profile</h2>
        <p>
          This blog is connected to my Ethereum Name Service (ENS) profile, which serves as 
          my digital identity in the Web3 ecosystem. ENS allows human-readable names to 
          connect to blockchain addresses, websites, and other digital resources.
        </p>
        
        <h2 className="text-2xl font-serif mt-8 mb-4">Philosophy</h2>
        <p>
          I believe in minimalism as both an aesthetic and philosophical approach. By reducing 
          unnecessary elements, we can focus on what truly matters: ideas, connections, and content.
        </p>
        <p>
          This extends to my views on technology: I advocate for systems that put user control 
          and privacy first, with interfaces that fade into the background rather than demanding attention.
        </p>
        
        <h2 className="text-2xl font-serif mt-8 mb-4">Contact</h2>
        <p>
          The best way to reach me is through my ENS domain, which serves as my unified 
          identity across the decentralized web.
        </p>
      </div>
    </Layout>
  );
};

export default AboutPage;

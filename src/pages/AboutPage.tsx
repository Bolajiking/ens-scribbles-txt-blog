
import Layout from "../components/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <h1 className="font-serif">About</h1>
      <div className="prose prose-stone dark:prose-invert max-w-none">
        <p>
          Welcome to my little corner of the internet. I'm one of those people who can't help but wonder about everything.
        </p>
        
        <p>
          I'm constantly falling down new rabbit holes, asking too many questions, and finding fascination in the most random places.
        </p>
        
        <p>
          I started this blog because my browser tabs were getting out of control. Honestly, I needed somewhere to put all these thoughts, observations, and half-baked theories that keep bouncing around in my head.
        </p>
        
        <h2 className="text-2xl font-serif mt-8 mb-4">What you'll find here:</h2>
        
        <ul className="list-disc pl-5 my-4">
          <li className="mb-2">
            <strong>Random Obsessions:</strong> Whatever I'm currently spiraling about. Could be anything.
          </li>
          <li className="mb-2">
            <strong>Things I'm Figuring Out:</strong> Life stuff. Work stuff. The messy in-between stuff.
          </li>
          <li className="mb-2">
            <strong>Recommendations:</strong> Books, podcasts, "weird" tech and gadgets—basically anything I can't shut up about at the moment.
          </li>
        </ul>
        
        <p>
          My only real goal? Keep this space real. No perfectly curated aesthetic (though I'll try to make it readable, I promise).
        </p>
        
        <p>
          Thanks for stopping by. Grab a coffee and poke around—who knows what you'll find.
        </p>
      </div>
    </Layout>
  );
};

export default AboutPage;

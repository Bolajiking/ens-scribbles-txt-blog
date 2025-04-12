
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import { posts } from "../data/posts";

const Index = () => {
  return (
    <Layout>
      <div className="mb-10">
        <h1 className="font-serif">ENS Blog</h1>
        <p className="text-muted-foreground max-w-2xl">
          A minimalist text-based blog connected to my ENS profile. 
          Exploring Web3, digital identity, and decentralized technology.
        </p>
      </div>
      <div className="space-y-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;

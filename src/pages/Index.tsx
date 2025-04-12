
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import { posts } from "../data/posts";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default Index;

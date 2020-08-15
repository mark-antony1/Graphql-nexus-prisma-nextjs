import Link from 'next/link'
import Layout from '../components/Layout'
import AllUsers from "../components/AllUsers";
import BlogGenerator from "../components/BlogGenerator";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <BlogGenerator/>
  </Layout>
)

export default IndexPage

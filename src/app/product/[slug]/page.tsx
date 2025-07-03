import { GetProductBySlug } from "@/services/shopActions";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const { data } = await GetProductBySlug(decodedSlug);
  const product = data;
  return <div>My Post: {decodedSlug}</div>;
}

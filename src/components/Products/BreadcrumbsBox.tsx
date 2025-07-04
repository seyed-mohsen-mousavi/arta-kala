import { CategoryNode } from "@/types/categories";
import Link from "next/link";

export function findCategoryPath(
  nodes: CategoryNode[],
  targetId: string | number,
  acc: CategoryNode[] = []
): CategoryNode[] | null {
  for (const node of nodes) {
    const currentPath = [...acc, node];
    if (node.id === Number(targetId)) {
      return currentPath;
    }
    if (node.children) {
      const childPath = findCategoryPath(node.children, targetId, currentPath);
      if (childPath) return childPath;
    }
  }
  return null;
}
type Props = {
  breadcrumb: CategoryNode[];
  name?: string;
};
function BreadcrumbsBox({ breadcrumb, name }: Props) {
  return (
    <div className="pb-16">
      <div className="py-5 w-full shadow absolute right-0 bg-white">
        <div className="container mx-auto flex items-center gap-3">
          <strong className="text-base">محصولات</strong>
          <div className="text-sm text-zinc-500 flex items-center gap-1 flex-wrap">
            <Link href="/">خانه</Link>
            <span>/</span>
            <Link href="/products">محصولات</Link>
            {breadcrumb.map((cat, index) => (
              <span key={cat.id} className="flex items-center gap-1">
                <span>/</span>
                <Link href={`/products?category_id=${cat.id}`}>{cat.name}</Link>
              </span>
            ))}
            {name && (
              <>
                <span>/</span>
                <Link href="/products">{name}</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BreadcrumbsBox;

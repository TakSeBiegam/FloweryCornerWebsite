export default function Category({ params }: { params: { category: string } }) {
  const { category } = params;
  return <div className="">{category}</div>;
}

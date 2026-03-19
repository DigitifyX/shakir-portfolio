export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="bg-dark text-white antialiased">{children}</main>;
}

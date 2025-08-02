export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="container customSm:max-w-[566px]">
      {children}
      {modal}
    </div>
  );
}

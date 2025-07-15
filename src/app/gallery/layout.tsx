export default function GalleryLayout({
  children,
  modal, // این slot به طور خودکار از پوشه @modal میاد
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children} {/* صفحه گالری اصلی */}
      {modal}    {/* مودال، اگه هست */}
    </>
  );
}

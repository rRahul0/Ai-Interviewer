const { default: Header } = require("./_components/Header");

function DashboardLayout({ children }) {
  return (
    <div>
      <Header/>
      <main className="mx-5 md:mx-20 lg:mx-36"
      >{children}</main>
    </div>
  );
}

export default DashboardLayout;
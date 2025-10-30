interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex justify-center items-center animate-fadeIn px-4min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-3xl">
        <div className="bg-gradient-to-tr from-green-200 via-emerald-300 to-green-400shadow-md rounded-lg mt-6 p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

export default function AuthLayout({ children }:{
    children: React.ReactNode
}) {
  return (
    <div>
      <div className="bg-white text-sky-950 mb-4 p-2"> auth header</div>
      {children}
      <div className="bg-white text-sky-950 mt-4 p-2"> auth footer</div>
    </div>
  );
}
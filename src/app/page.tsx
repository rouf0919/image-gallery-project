import Link from "next/link";
export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-5 max-w-7xl mx-auto text-center py-4 px-4 sm:px-6 lg:px-8 home-page justify-center">
      <h1>Welcome to the Homepage</h1>
      <Link
        href="/product"
        className="
        block bg-indigo-600 text-white text-center p-3 min-w-[200px] rounded-md
        hover:bg-indigo-700 transition-colors duration-200"
      >
        Go To Product Page
      </Link>
    </div>
  );
}

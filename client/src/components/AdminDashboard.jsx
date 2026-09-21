import React from "react";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
import { FaUsers, FaBook, FaBookReader, FaCheckCircle, FaPlus } from "react-icons/fa";

const AdminDashboard = ({ setSelectedComponent }) => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);

  const totalUsers = users.filter((u) => u.role === "User").length;
  const totalBooks = books.length;
  const totalBorrowedBooks = allBorrowedBooks.filter(
    (book) => book.returnDate === null
  ).length;
  const totalReturnedBooks = allBorrowedBooks.filter(
    (book) => book.returnDate !== null
  ).length;

  return (
    <main className="relative flex-1 p-6 md:p-10 pt-24 md:pt-28 bg-[#f4f7f6] overflow-y-auto h-screen">
      <Header />
      
      <div className="mt-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Command Center</h1>
          <p className="text-gray-500 mt-2 text-sm">Welcome back, {user?.name}. Manage your library operations efficiently.</p>
        </div>
        <button
          onClick={() => setSelectedComponent("Books")}
          className="hidden sm:flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition duration-300 shadow-lg"
        >
          <FaPlus /> Deploy New Book
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        <StatCard icon={<FaUsers />} title="Total Users" value={totalUsers} color="bg-blue-100 text-blue-600" />
        <StatCard icon={<FaBook />} title="Total Books" value={totalBooks} color="bg-purple-100 text-purple-600" />
        <StatCard icon={<FaBookReader />} title="Active Borrows" value={totalBorrowedBooks} color="bg-yellow-100 text-yellow-600" />
        <StatCard icon={<FaCheckCircle />} title="Books Returned" value={totalReturnedBooks} color="bg-green-100 text-green-600" />
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Books</h2>
            <button 
              onClick={() => setSelectedComponent("Catalog")}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition"
            >
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-4 text-sm font-medium text-gray-500">Book Title</th>
                  <th className="py-4 text-sm font-medium text-gray-500">Author</th>
                  <th className="py-4 text-sm font-medium text-gray-500">Category</th>
                </tr>
              </thead>
              <tbody>
                {books.slice().reverse().slice(0, 5).map((book, index) => (
                  <tr key={index} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
                    <td className="py-4 text-sm font-semibold text-gray-700">{book.title}</td>
                    <td className="py-4 text-sm text-gray-600">{book.author}</td>
                    <td className="py-4 text-sm text-gray-600">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium text-gray-600">
                        {book.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {books.length === 0 && (
              <p className="text-center text-gray-500 py-6">No books deployed yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
          <div className="flex flex-col gap-4">
            <ActionCard 
              title="Deploy Book" 
              description="Add a new book to the library catalog" 
              onClick={() => setSelectedComponent("Books")} 
              icon={<FaBook />}
            />
            <ActionCard 
              title="Manage Users" 
              description="View and manage registered users" 
              onClick={() => setSelectedComponent("Users")} 
              icon={<FaUsers />}
            />
            <ActionCard 
              title="View Catalog" 
              description="Browse the entire library collection" 
              onClick={() => setSelectedComponent("Catalog")} 
              icon={<FaBookReader />}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition duration-300">
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${color}`}>
      {icon}
    </div>
    <div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
  </div>
);

const ActionCard = ({ title, description, onClick, icon }) => (
  <button 
    onClick={onClick}
    className="flex items-center gap-4 w-full p-4 rounded-xl border border-gray-100 hover:border-black hover:bg-gray-50 transition duration-300 text-left group"
  >
    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 group-hover:bg-black group-hover:text-white transition duration-300">
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  </button>
);

export default AdminDashboard;

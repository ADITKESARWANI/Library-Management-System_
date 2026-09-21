import logoWithTitle from "../assets/black-logo.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { requestDeleteAccountOtp, deleteAccount, resetAuthSlice } from "../store/slices/authSlice";
import Header from "../layout/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
);

const UserDashboard = () => {
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const { loading, error, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOtp, setDeleteOtp] = useState("");
  
  const borrowedBooks = Array.isArray(userBorrowedBooks) ? userBorrowedBooks : [];

  useEffect(() => {
    if (message) {
      toast.success(message);
      if (message === "Verification Code sent successfully") {
        setShowDeleteModal(true);
      }
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [message, error, dispatch]);

  const handleDeleteRequest = () => {
    dispatch(requestDeleteAccountOtp());
  };

  const confirmDeleteAccount = (e) => {
    e.preventDefault();
    if (deleteOtp.length !== 5) {
      toast.error("Please enter a valid 5-digit OTP");
      return;
    }
    dispatch(deleteAccount(deleteOtp));
  };

  const totalBorrowedBooks = borrowedBooks.filter(
    (book) => book.returned === false,
  ).length;
  const totalReturnedBooks = borrowedBooks.filter(
    (book) => book.returned === true,
  ).length;

  const data = {
    labels: ["Total Borrowed Books", "Total Returned Books"],
    datasets: [
      {
        data: [totalBorrowedBooks, totalReturnedBooks],
        backgroundColor: ["#111827", "#6B7280"],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <main className="relative flex-1 bg-gray-100 p-6 pt-28">
      <Header />
      <div className="flex flex-col gap-6">
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">
                <img src={bookIcon} alt="book-icon" className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Currently borrowed
                </p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {totalBorrowedBooks}
                </h3>
              </div>
            </div>
          </article>

          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100">
                <img src={returnIcon} alt="return-icon" className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Already returned
                </p>
                <h3 className="text-3xl font-bold text-gray-900">
                  {totalReturnedBooks}
                </h3>
              </div>
            </div>
          </article>

          <article className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 p-5 text-white shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/15">
                <img src={browseIcon} alt="browse-icon" className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm text-gray-200">Next step</p>
                <h3 className="text-xl font-semibold">
                  Explore the catalog and pick your next read.
                </h3>
              </div>
            </div>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                  User Dashboard
                </p>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  Keep track of your reading journey in one place.
                </h2>
                <p className="mt-3 text-base leading-7 text-gray-600">
                  Review what you still have, what you have finished, and stay
                  on top of your library activity without jumping between pages.
                </p>
              </div>

              <div className="flex justify-center">
                <img
                  src={logoWithTitle}
                  alt="Digital Library"
                  className="h-auto w-full max-w-[280px] object-contain"
                />
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-gray-50 p-6">
              <h4 className="text-xl font-semibold text-gray-900">
                &quot;Embarking on the journey of reading fosters personal
                growth, nurturing a path towards excellence and refinement of
                character.&quot;
              </h4>
              <p className="mt-3 text-sm font-medium text-gray-500">
                Digital Library Team
              </p>
            </div>
          </article>

          <article className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Activity Split
                </p>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">
                  Borrowed vs returned
                </h3>
              </div>
              <div className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                {borrowedBooks.length} total
              </div>
            </div>

            <div className="mx-auto mt-6 flex max-w-[320px] justify-center">
              <Pie
                data={data}
                options={{
                  cutout: "58%",
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-[#111827]"></span>
                  <span className="font-medium text-gray-700">
                    Total Borrowed Books
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {totalBorrowedBooks}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-[#6B7280]"></span>
                  <span className="font-medium text-gray-700">
                    Total Returned Books
                  </span>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  {totalReturnedBooks}
                </span>
              </div>
            </div>
          </article>
        </section>

        {/* Danger Zone Section */}
        <section className="grid grid-cols-1 mt-2">
          <article className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-red-700">Danger Zone</h3>
                <p className="text-sm text-red-600 mt-1">Once you delete your account, there is no going back. Please be certain.</p>
              </div>
              <button
                onClick={handleDeleteRequest}
                disabled={loading}
                className="rounded-lg bg-red-600 px-6 py-2.5 font-semibold text-white shadow-sm hover:bg-red-700 transition disabled:opacity-50"
              >
                {loading ? "Requesting..." : "Delete Account"}
              </button>
            </div>
          </article>
        </section>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Account Deletion</h2>
            <p className="text-gray-600 mb-6">Enter the 5-digit OTP sent to your email to confirm account deletion.</p>
            
            <form onSubmit={confirmDeleteAccount}>
              <input
                type="number"
                required
                value={deleteOtp}
                onChange={(e) => setDeleteOtp(e.target.value)}
                placeholder="5-Digit OTP"
                className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 mb-6"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="rounded-lg bg-gray-100 px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-700 transition disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default UserDashboard;

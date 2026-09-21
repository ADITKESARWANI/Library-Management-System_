import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recordBorrowBook } from "../store/slices/borrowSlice";
import { toggleRecordBookPopup } from "../store/slices/popUpSlice";
import { fetchAllUsers } from "../store/slices/userSlice";

const RecordBookPopup = ({ bookId }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");

  React.useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleRecordBook = (e) => {
    e.preventDefault();
    dispatch(recordBorrowBook(email, bookId));
    dispatch(toggleRecordBookPopup());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 p-5 flex items-center justify-center z-50">
      <div className="w-full bg-white rounded-lg shadow-lg md:w-1/3 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-bold mb-4">Record Book</h3>

          <form onSubmit={handleRecordBook}>
            <div className="mb-4">
              <label className="block text-gray-900 font-medium mb-1">
                Select User
              </label>
              <select
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border-2 border-black rounded-md bg-white focus:outline-none"
              >
                <option value="" disabled>Select a Borrower</option>
                {users && users.filter((u) => u.role === "User").map((u) => (
                  <option key={u._id} value={u.email}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => dispatch(toggleRecordBookPopup())}
              >
                Close
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Record
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default RecordBookPopup;

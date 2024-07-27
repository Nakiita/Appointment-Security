import React, { useEffect, useState } from "react";
import { deleteUserApi, getPagination } from "../../apis/Api";
import Sidebar from "../../components/Sidebar";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.UserName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getPagination(currentPage).then((res) => {
      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    });
  }, [currentPage]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    deleteUserApi(id).then((res) => {
      if (res.data.success === false) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        window.location.reload();
      }
    });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex">
      <Sidebar className="w-1/4" />
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Users</h3>
          <p className="text-gray-600">Manage the list of users.</p>
          <div className="flex justify-center">
            <div className="flex items-center border rounded w-full max-w-md">
              <span className="px-3 text-gray-500">
                <FontAwesomeIcon icon={faSearch} />
              </span>
              <input
                type="text"
                placeholder="Search by Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 p-2 outline-none"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.N.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.UserName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"> {user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phoneNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <nav aria-label="Page navigation">
            <ul className="flex justify-center">
              <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
                <button
                  className="px-3 py-1 border rounded-l-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous"
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li
                  key={page}
                  className={`page-item ${currentPage === page ? "active" : ""}`}
                >
                  <button
                    className={`px-3 py-1 border ${currentPage === page ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${currentPage >= totalPages ? "disabled" : ""
                  }`}
              >
                <button
                  className="px-3 py-1 border rounded-r-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next"
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Users;

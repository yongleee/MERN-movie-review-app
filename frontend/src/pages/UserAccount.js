import { useState } from "react";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

export default function UserSettings() {
  const [showConfirmSignOut, setShowConfirmSignOut] = useState(false);
  const [showConfirmDeleteAcc, setShowConfirmDeleteAcc] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();
  const { auth, setAuth } = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = () => {
    setShowConfirmSignOut(true);
  };

  const confirmSignOut = async (result) => {
    setShowConfirmSignOut(false);

    if (result) {
      await logout();
      navigate("/");
    }
  };

  const handleDeleteAcc = () => {
    setShowConfirmDeleteAcc(true);
  };

  const confirmDeleteAcc = async (result) => {
    setShowConfirmDeleteAcc(false);

    if (result) {
      try {
        const userId = auth?.userId;
        await axiosPrivate.delete(`/api/users/edit-user-info/${userId}`);
        setAuth(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="mt-2.5">
      <div className="my-1.5">
        <button
          onClick={handleSignOut}
          className="text-neutral-200 hover:text-neutral-300"
        >
          Log out
        </button>
        {showConfirmSignOut && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 z-50">
            <div className="w-64 mx-auto mt-16 p-4 bg-white rounded-lg shadow-lg">
              <p className="text-lg">Are you sure you want to proceed?</p>
              <div className="mt-4 flex">
                <button
                  onClick={() => confirmSignOut(false)}
                  className="px-4 py-2 bg-red-500 text-white mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmSignOut(true)}
                  className="px-4 py-2 bg-green-500 text-white"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="my-1">
        <button
          onClick={handleDeleteAcc}
          className="text-red-500 hover:text-red-600"
        >
          Delete Account
        </button>
        {showConfirmDeleteAcc && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 z-50">
            <div className="w-64 mx-auto mt-16 p-4 bg-white rounded-lg shadow-lg">
              <p className="text-lg">Are you sure you want to proceed?</p>
              <div className="mt-4 flex">
                <button
                  onClick={() => confirmDeleteAcc(false)}
                  className="px-4 py-2 bg-red-500 text-white mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => confirmDeleteAcc(true)}
                  className="px-4 py-2 bg-green-500 text-white"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

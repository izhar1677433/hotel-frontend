import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, paid, failed
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [isEditingNotes, setIsEditingNotes] = useState(false);

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/admin/bookings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Filter bookings based on payment status and search term
  const filteredBookings = bookings.filter((booking) => {
    const matchesFilter = filter === "all" || booking.paymentStatus === filter;
    const matchesSearch = 
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.email && booking.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  // Update booking status
  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/bookings/${bookingId}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ paymentStatus: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setBookings(prev => 
          prev.map(booking => 
            booking._id === bookingId 
              ? { ...booking, paymentStatus: newStatus }
              : booking
          )
        );
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // Save admin notes
  const saveAdminNotes = async () => {
    if (!selectedBooking) return;
    
    try {
      const response = await fetch(`${BASE_URL}/api/admin/bookings/${selectedBooking._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ adminNotes }),
      });

      if (response.ok) {
        // Update local state
        setBookings(prev => 
          prev.map(booking => 
            booking._id === selectedBooking._id 
              ? { ...booking, adminNotes }
              : booking
          )
        );
        
        // Update selected booking
        setSelectedBooking(prev => ({ ...prev, adminNotes }));
        setIsEditingNotes(false);
      }
    } catch (error) {
      console.error("Error saving admin notes:", error);
    }
  };

  // Export bookings to CSV
  const exportBookings = () => {
    const headers = [
      "Guest Name",
      "Room Name",
      "Room Number", 
      "Check-in Date",
      "Check-out Date",
      "Price",
      "Payment Status",
      "Email",
      "Phone",
      "Guests",
      "Booking Date",
      "Admin Notes"
    ];

    const csvData = filteredBookings.map(booking => [
      booking.guestName,
      booking.roomName || `Room ${booking.roomNumber}`,
      booking.roomNumber,
      formatDate(booking.checkIn),
      formatDate(booking.checkOut),
      booking.price,
      booking.paymentStatus,
      booking.email || "",
      booking.phone || "",
      booking.guests || "",
      formatDate(booking.createdAt),
      booking.adminNotes || ""
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `bookings_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Delete booking
  const deleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    
    try {
      const response = await fetch(`${BASE_URL}/api/admin/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        setBookings(prev => prev.filter(booking => booking._id !== bookingId));
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      paid: "bg-green-100 text-green-800 border-green-200",
      failed: "bg-red-100 text-red-800 border-red-200",
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusStyles[status] || statusStyles.pending}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Get payment status icon
  const getStatusIcon = (status) => {
    const icons = {
      pending: FaIcons.FaClock,
      paid: FaIcons.FaCheckCircle,
      failed: FaIcons.FaTimesCircle,
    };
    const Icon = icons[status] || FaIcons.FaQuestion;
    return <Icon className="inline mr-1" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Booking Management</h2>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <div className="flex items-center">
              <FaIcons.FaCalendarAlt className="text-blue-500 text-2xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-800">{bookings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <div className="flex items-center">
              <FaIcons.FaClock className="text-yellow-500 text-2xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Pending Payment</p>
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.filter(b => b.paymentStatus === "pending").length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <div className="flex items-center">
              <FaIcons.FaCheckCircle className="text-green-500 text-2xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.filter(b => b.paymentStatus === "paid").length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
            <div className="flex items-center">
              <FaIcons.FaTimesCircle className="text-red-500 text-2xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Failed</p>
                <p className="text-2xl font-bold text-gray-800">
                  {bookings.filter(b => b.paymentStatus === "failed").length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
            <div className="flex items-center">
              <FaIcons.FaDollarSign className="text-purple-500 text-2xl mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-800">
                  ${bookings
                    .filter(b => b.paymentStatus === "paid")
                    .reduce((sum, b) => sum + b.price, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by guest name, room number, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Bookings</option>
              <option value="pending">Pending Payment</option>
              <option value="paid">Confirmed</option>
              <option value="failed">Failed</option>
            </select>
            
            <button
              onClick={fetchBookings}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaIcons.FaSyncAlt className="inline mr-2" />
              Refresh
            </button>
            
            <button
              onClick={exportBookings}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <FaIcons.FaDownload className="inline mr-2" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room & Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {booking.guestName}
                      </div>
                      {booking.email && (
                        <div className="text-sm text-gray-500">{booking.email}</div>
                      )}
                      {booking.phone && (
                        <div className="text-sm text-gray-500">{booking.phone}</div>
                      )}
                      {booking.guests && (
                        <div className="text-sm text-gray-500">
                          {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {booking.roomName || `Room ${booking.roomNumber}`}
                      </div>
                      <div className="text-sm text-gray-500">
                        Room {booking.roomNumber}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                      </div>
                      <div className="text-xs text-gray-400">
                        Booked: {formatDate(booking.createdAt)}
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(booking.paymentStatus)}
                      {getStatusBadge(booking.paymentStatus)}
                    </div>
                    {booking.stripeSessionId && (
                      <div className="text-xs text-gray-500 mt-1">
                        Stripe: {booking.stripeSessionId.slice(-8)}
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      ${booking.price}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedBooking(booking);
                          setShowDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        <FaIcons.FaEye className="inline mr-1" />
                        View
                      </button>
                      
                      {booking.paymentStatus === "pending" && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(booking._id, "paid")}
                            className="text-green-600 hover:text-green-900 text-sm font-medium"
                          >
                            <FaIcons.FaCheck className="inline mr-1" />
                            Confirm
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking._id, "failed")}
                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                          >
                            <FaIcons.FaTimes className="inline mr-1" />
                            Reject
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => deleteBooking(booking._id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        <FaIcons.FaTrash className="inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <FaIcons.FaInbox className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filter !== "all" 
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating a new booking."
              }
            </p>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showDetails && selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Booking Details</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaIcons.FaTimes className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Guest Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.guestName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Room Name</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.roomName || `Room ${selectedBooking.roomNumber}`}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Room Number</label>
                  <p className="mt-1 text-sm text-gray-900">Room {selectedBooking.roomNumber}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Check-in Date</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedBooking.checkIn)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Check-out Date</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedBooking.checkOut)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Price</label>
                  <p className="mt-1 text-sm text-gray-900">${selectedBooking.price}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                  <div className="mt-1">
                    {getStatusBadge(selectedBooking.paymentStatus)}
                  </div>
                </div>
              </div>
              
              {selectedBooking.email && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.email}</p>
                </div>
              )}
              
              {selectedBooking.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.phone}</p>
                </div>
              )}
              
              {selectedBooking.guests && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of Guests</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.guests}</p>
                </div>
              )}
              
              {selectedBooking.stripeSessionId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stripe Session ID</label>
                  <p className="mt-1 text-sm text-gray-900 font-mono">{selectedBooking.stripeSessionId}</p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Booking Created</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(selectedBooking.createdAt)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                <p className="mt-1 text-sm text-gray-900">{formatDate(selectedBooking.updatedAt)}</p>
              </div>
              
              {selectedBooking.notes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Notes</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.notes}</p>
                </div>
              )}
              
              {selectedBooking.adminNotes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Admin Notes</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedBooking.adminNotes}</p>
                </div>
              )}
              
              {/* Admin Notes Editor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Notes
                </label>
                {isEditingNotes ? (
                  <div className="space-y-2">
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                      placeholder="Add admin notes..."
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={saveAdminNotes}
                        className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                      >
                        Save Notes
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingNotes(false);
                          setAdminNotes(selectedBooking.adminNotes || "");
                        }}
                        className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-900">
                      {selectedBooking.adminNotes || "No admin notes added yet."}
                    </p>
                    <button
                      onClick={() => {
                        setIsEditingNotes(true);
                        setAdminNotes(selectedBooking.adminNotes || "");
                      }}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      {selectedBooking.adminNotes ? "Edit Notes" : "Add Notes"}
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
const BASE_URL = import.meta.env.VITE_BASE_URL;
export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch contacts and stats
  const fetchContacts = async () => {
    try {
              const [contactsRes, statsRes] = await Promise.all([
          fetch(`${BASE_URL}/api/admin/contacts`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          fetch(`${BASE_URL}/api/admin/contacts/stats`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

      const contactsData = await contactsRes.json();
      const statsData = await statsRes.json();

      if (contactsData.success) {
        setContacts(contactsData.data);
      }
      if (statsData.success) {
        setStats(statsData.data);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Update contact status
  const handleStatusUpdate = async (contactId, newStatus) => {
    try {
              const res = await fetch(`${BASE_URL}/api/admin/contacts/${contactId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        });

      if (res.ok) {
        setContacts(prev => 
          prev.map(contact => 
            contact._id === contactId 
              ? { ...contact, status: newStatus }
              : contact
          )
        );
        fetchContacts(); // Refresh stats
      }
    } catch (err) {
      console.error("Error updating contact status:", err);
    }
  };

  // Delete contact
  const handleDelete = async (contactId) => {
    if (!window.confirm("Are you sure you want to delete this contact submission?")) return;
    
    try {
              const res = await fetch(`${BASE_URL}/api/admin/contacts/${contactId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

      if (res.ok) {
        setContacts(prev => prev.filter(contact => contact._id !== contactId));
        fetchContacts(); // Refresh stats
      }
    } catch (err) {
      console.error("Error deleting contact:", err);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "read":
        return "bg-blue-100 text-blue-800";
      case "replied":
        return "bg-purple-100 text-purple-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading contacts...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Statistics Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center">
            <FaIcons.FaEnvelope className="mr-3 text-2xl text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center">
            <FaIcons.FaClock className="mr-3 text-2xl text-yellow-500" />
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center">
            <FaIcons.FaEye className="mr-3 text-2xl text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-600">Read</p>
              <p className="text-2xl font-bold text-gray-900">{stats.read || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center">
            <FaIcons.FaReply className="mr-3 text-2xl text-purple-500" />
            <div>
              <p className="text-sm font-medium text-gray-600">Replied</p>
              <p className="text-2xl font-bold text-gray-900">{stats.replied || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-lg bg-white p-4 shadow-md">
          <div className="flex items-center">
            <FaIcons.FaCheckCircle className="mr-3 text-2xl text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">{stats.resolved || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Subject</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-50">
                <td className="border p-3 text-sm">
                  {formatDate(contact.createdAt)}
                </td>
                <td className="border p-3 font-medium">{contact.name}</td>
                <td className="border p-3">{contact.email}</td>
                <td className="border p-3 max-w-xs truncate" title={contact.subject}>
                  {contact.subject}
                </td>
                <td className="border p-3">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeColor(contact.status)}`}>
                    {contact.status || "pending"}
                  </span>
                </td>
                <td className="border p-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowModal(true);
                      }}
                      className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600 text-sm"
                    >
                      View
                    </button>
                    <select
                      value={contact.status || "pending"}
                      onChange={(e) => handleStatusUpdate(contact._id, e.target.value)}
                      className="rounded border px-2 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="resolved">Resolved</option>
                    </select>
                    <button
                      onClick={() => handleDelete(contact._id)}
                      className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contact Detail Modal */}
      {showModal && selectedContact && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="w-full max-w-2xl rounded bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Contact Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaIcons.FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="mt-1 p-2 bg-gray-50 rounded">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 p-2 bg-gray-50 rounded">{selectedContact.email}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <p className="mt-1 p-2 bg-gray-50 rounded">{selectedContact.subject}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <p className="mt-1 p-3 bg-gray-50 rounded whitespace-pre-wrap min-h-[100px]">
                  {selectedContact.message}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date Submitted</label>
                  <p className="mt-1 p-2 bg-gray-50 rounded">
                    {formatDate(selectedContact.createdAt)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={selectedContact.status || "pending"}
                    onChange={(e) => {
                      handleStatusUpdate(selectedContact._id, e.target.value);
                      setSelectedContact({
                        ...selectedContact,
                        status: e.target.value
                      });
                    }}
                    className="mt-1 w-full p-2 border rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
              
              {selectedContact.adminNotes && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Admin Notes</label>
                  <p className="mt-1 p-2 bg-gray-50 rounded">{selectedContact.adminNotes}</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="rounded bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
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

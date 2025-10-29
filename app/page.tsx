"use client";

import { useState } from "react";
import { Phone, User, Calendar, Clock, MessageSquare, CheckCircle, XCircle, Pencil, Trash2 } from "lucide-react";

interface Call {
  id: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "missed";
  notes: string;
  duration?: string;
}

export default function Home() {
  const [calls, setCalls] = useState<Call[]>([
    {
      id: "1",
      customerName: "John Smith",
      phone: "+1 (555) 123-4567",
      date: "2025-10-29",
      time: "14:00",
      status: "scheduled",
      notes: "Discuss website redesign project",
    },
    {
      id: "2",
      customerName: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      date: "2025-10-29",
      time: "10:30",
      status: "completed",
      notes: "Logo design consultation",
      duration: "45 min",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      setCalls(calls.map(call =>
        call.id === editingId
          ? { ...call, ...formData }
          : call
      ));
      setEditingId(null);
    } else {
      const newCall: Call = {
        id: Date.now().toString(),
        ...formData,
        status: "scheduled",
      };
      setCalls([...calls, newCall]);
    }

    setFormData({
      customerName: "",
      phone: "",
      date: "",
      time: "",
      notes: "",
    });
    setShowForm(false);
  };

  const handleEdit = (call: Call) => {
    setFormData({
      customerName: call.customerName,
      phone: call.phone,
      date: call.date,
      time: call.time,
      notes: call.notes,
    });
    setEditingId(call.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setCalls(calls.filter(call => call.id !== id));
  };

  const updateStatus = (id: string, status: Call["status"]) => {
    setCalls(calls.map(call =>
      call.id === id ? { ...call, status } : call
    ));
  };

  const getStatusColor = (status: Call["status"]) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800 border-green-300";
      case "missed": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  const getStatusIcon = (status: Call["status"]) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "missed": return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-3 rounded-xl">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Freelance Call Agent</h1>
                <p className="text-gray-600">Manage your customer calls efficiently</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setFormData({
                  customerName: "",
                  phone: "",
                  date: "",
                  time: "",
                  notes: "",
                });
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
            >
              {showForm ? "Cancel" : "+ New Call"}
            </button>
          </div>

          {showForm && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6 border-2 border-indigo-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {editingId ? "Edit Call" : "Schedule New Call"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      required
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Meeting agenda, topics to discuss..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  {editingId ? "Update Call" : "Schedule Call"}
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="grid gap-4">
          {calls.map((call) => (
            <div
              key={call.id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-xl font-semibold text-gray-900">
                      {call.customerName}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center gap-1 ${getStatusColor(call.status)}`}>
                      {getStatusIcon(call.status)}
                      {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{call.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{new Date(call.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{call.time}</span>
                    </div>
                    {call.duration && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>Duration: {call.duration}</span>
                      </div>
                    )}
                  </div>

                  {call.notes && (
                    <div className="mt-3 flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 text-gray-500 mt-1" />
                      <p className="text-gray-600">{call.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex md:flex-col gap-2">
                  {call.status === "scheduled" && (
                    <>
                      <button
                        onClick={() => updateStatus(call.id, "completed")}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => updateStatus(call.id, "missed")}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Missed
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleEdit(call)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(call.id)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {calls.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Phone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No calls scheduled</h3>
            <p className="text-gray-500">Click the "New Call" button to schedule your first customer call</p>
          </div>
        )}
      </div>
    </main>
  );
}

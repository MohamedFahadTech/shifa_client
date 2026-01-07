import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  UserPlusIcon,
  PhoneIcon,
  ChatBubbleLeftEllipsisIcon,
  CalendarDaysIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  PencilSquareIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

/* ---------------- CUSTOMER CARD ---------------- */
const CustomerCard = ({ data, onEdit, onDelete }) => {
  const { name, phone, role } = data;

  return (
    <div className="bg-white p-5 rounded-3xl border border-gray-100 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center font-black text-sm">
            {name?.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h4 className="font-bold">{name}</h4>
            <p className="text-[10px] text-gray-400 uppercase font-bold">
              {role === 'admin' ? 'Premium' : 'Regular'} Member
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={() => onEdit(data)}>
            <PencilSquareIcon className="h-4 w-4 text-blue-500" />
          </button>
          <button onClick={() => onDelete(data._id)}>
            <TrashIcon className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <a href={`tel:${phone}`} className="btn-gray">
          <PhoneIcon className="h-3 w-3" /> Call
        </a>
        <a href={`https://wa.me/91${phone}`} target="_blank" className="btn-gray">
          <ChatBubbleLeftEllipsisIcon className="h-3 w-3" /> WhatsApp
        </a>
      </div>
    </div>
  );
};

/* ---------------- MAIN COMPONENT ---------------- */
function Customer() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: 'password123'
  });

  /* -------- FETCH -------- */
  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:5000/users");
    if (res.data.success) setCustomers(res.data.data);
  };

  useEffect(() => { fetchCustomers(); }, []);

  /* -------- ADD / UPDATE -------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/user/${selectedId}`, formData);
      } else {
        await axios.post("http://localhost:5000/user/signup", formData);
      }

      resetModal();
      fetchCustomers();
    } catch {
      alert("Operation failed");
    }
  };

  /* -------- DELETE -------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this customer?")) return;
    await axios.delete(`http://localhost:5000/user/${id}`);
    fetchCustomers();
  };

  /* -------- EDIT -------- */
  const handleEdit = (customer) => {
    setIsEdit(true);
    setSelectedId(customer._id);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.addresses || '',
      password: 'password123'
    });
    setShowModal(true);
  };

  const resetModal = () => {
    setShowModal(false);
    setIsEdit(false);
    setSelectedId(null);
    setFormData({ name: '', email: '', phone: '', address: '', password: 'password123' });
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-6 rounded-3xl">
        <h2 className="text-2xl font-black">
          Customer <span className="text-yellow-500">Directory</span>
        </h2>

        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-2xl">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-6 py-3 rounded-2xl flex gap-2 text-xs font-black"
        >
          <UserPlusIcon className="h-4 w-4" /> Add Client
        </button>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map(c => (
          <CustomerCard
            key={c._id}
            data={c}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md relative">
            <button onClick={resetModal} className="absolute top-4 right-4">
              <XMarkIcon className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-black mb-6">
              {isEdit ? "Update Client" : "Add Client"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input className="input" placeholder="Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })} />

              <input className="input" placeholder="Phone"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })} />

              <input className="input" placeholder="Email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })} />

              <textarea className="input min-h-[80px]" placeholder="Address"
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })} />

              <button className="w-full bg-black text-white py-3 rounded-xl font-black">
                {isEdit ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customer;

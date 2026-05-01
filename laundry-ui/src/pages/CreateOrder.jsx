import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Tag, Hash, User, Phone, Save, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GARMENT_TYPES = [
  { name: "Shirt", price: 5 },
  { name: "Pants", price: 7 },
  { name: "Saree", price: 15 },
  { name: "Suit", price: 20 },
  { name: "Dress", price: 12 },
];

export default function CreateOrder() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    garments: [{ type: "Shirt", quantity: 1, pricePerItem: 5 }],
  });

  const updateGarment = (index, field, value) => {
    const newGarments = [...formData.garments];
    if (field === "type") {
      const selectedType = GARMENT_TYPES.find(g => g.name === value);
      newGarments[index] = { 
        ...newGarments[index], 
        type: value, 
        pricePerItem: selectedType?.price || 0 
      };
    } else {
      newGarments[index][field] = value;
    }
    setFormData({ ...formData, garments: newGarments });
  };

  const addGarment = () => {
    setFormData({
      ...formData,
      garments: [...formData.garments, { type: "Shirt", quantity: 1, pricePerItem: 5 }]
    });
  };

  const removeGarment = (index) => {
    const newGarments = formData.garments.filter((_, i) => i !== index);
    setFormData({ ...formData, garments: newGarments });
  };

  const calculateTotal = () => {
    return formData.garments.reduce((total, g) => total + (g.pricePerItem * g.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:3001/api/orders', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/orders');
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-[60vh]"
      >
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-400" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Order Created!</h2>
        <p className="text-white">Redirecting to orders list...</p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold tracking-tight mb-2"
        >
          New Order
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white"
        >
          Enter customer details and garments.
        </motion.p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit} 
        className="space-y-8"
      >
        {/* Customer Details */}
        <div className="bg-[#2B7A78] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-white" />
            Customer Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
                <input
                  required
                  type="text"
                  placeholder="Aryan Singh"
                  value={formData.customerName}
                  onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-[#2B7A78] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
                <input
                  required
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phoneNumber}
                  onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full bg-[#2B7A78] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Garments */}
        <div className="bg-[#2B7A78] border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Tag className="w-5 h-5 mr-2 text-white" />
              Garments
            </h2>
          </div>
          
          <div className="space-y-3">
            {formData.garments.map((garment, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-3 items-end bg-[#2B7A78] p-4 rounded-xl border border-white/5">
                <div className="flex-1 w-full">
                  <label className="block text-xs text-white mb-1">Item Type</label>
                  <select
                    value={garment.type}
                    onChange={(e) => updateGarment(index, "type", e.target.value)}
                    className="w-full bg-[#2B7A78] border border-white/10 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-purple-500/50"
                  >
                    {GARMENT_TYPES.map(g => (
                      <option key={g.name} value={g.name} className="bg-[#120a1c]">{g.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="w-full sm:w-24">
                  <label className="block text-xs text-white mb-1">Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-sm">₹</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={garment.pricePerItem}
                      onChange={(e) => updateGarment(index, "pricePerItem", parseFloat(e.target.value) || 0)}
                      className="w-full bg-[#2B7A78] border border-white/10 rounded-lg py-2 pl-7 pr-3 text-sm focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                </div>

                <div className="w-full sm:w-24">
                  <label className="block text-xs text-white mb-1">Qty</label>
                  <div className="relative">
                    <Hash className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white" />
                    <input
                      type="number"
                      min="1"
                      value={garment.quantity}
                      onChange={(e) => updateGarment(index, "quantity", parseInt(e.target.value) || 1)}
                      className="w-full bg-[#2B7A78] border border-white/10 rounded-lg py-2 pl-7 pr-3 text-sm focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                </div>

                <div className="w-full sm:w-auto flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeGarment(index)}
                    disabled={formData.garments.length === 1}
                    className="p-2.5 text-white hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addGarment}
            className="mt-4 flex items-center text-sm font-medium text-white hover:text-purple-300 transition-colors"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add another item
          </button>
        </div>

        {/* Total & Submit */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#2B7A78] border border-white/20 rounded-2xl p-6 backdrop-blur-sm">
          <div className="mb-4 sm:mb-0 text-center sm:text-left">
            <p className="text-sm text-white mb-1">Estimated Total</p>
            <p className="text-3xl font-bold text-white">₹{calculateTotal().toFixed(2)}</p>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-purple-500/25 disabled:opacity-70"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
            ) : (
              <Save className="w-5 h-5 mr-2" />
            )}
            {loading ? "Processing..." : "Create Order"}
          </button>
        </div>
      </motion.form>
    </div>
  );
}

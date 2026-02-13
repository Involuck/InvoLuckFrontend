
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

// 1. Validation Schema (Rules)
const invoiceSchema = z.object({
  clientName: z.string().min(1, 'Client name is required'),
  clientEmail: z.string().email('Invalid email address'),
  invoiceNumber: z.string().min(1, 'Invoice number is required'),
  date: z.string().min(1, 'Date is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  items: z.array(
    z.object({
      description: z.string().min(1, 'Description is required'),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
      price: z.number().min(0, 'Price must be positive'),
    })
  ).min(1, 'At least one item is required'),
});

type InvoiceFormData = z.infer<typeof invoiceSchema>;

export const InvoiceForm = () => {
  // 2. Form Setup
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      items: [{ description: '', quantity: 1, price: 0 }],
      date: new Date().toISOString().split('T')[0],
      invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
    },
  });

  // 3. Dynamic Items Handler
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  // 4. Real-time Calculation Logic
  const items = watch('items');

  const calculateTotals = () => {
    const subtotal = items.reduce((acc, item) => acc + (item.quantity || 0) * (item.price || 0), 0);
    const tax = subtotal * 0.1; // 10% Tax example
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  const onSubmit = async (data: InvoiceFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds delay simulate kar raha hai
    console.log('Form Submitted:', data);
    // Backend API call will go here later
    router.push('/InvoiceStatusChart');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 shadow-lg max-w-4xl mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="border-b border-gray-100 dark:border-gray-700 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">New Invoice</h2>
          <p className="text-sm text-gray-500">Enter invoice details below</p>
        </div>

        {/* Client & Invoice Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Client Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Client Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Name</label>
              <input
                {...register('clientName')}
                className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 p-2 border focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="e.g. John Doe"
              />
              {errors.clientName && <p className="text-red-500 text-xs mt-1">{errors.clientName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client Email</label>
              <input
                {...register('clientEmail')}
                className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 p-2 border focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="client@example.com"
              />
              {errors.clientEmail && <p className="text-red-500 text-xs mt-1">{errors.clientEmail.message}</p>}
            </div>
          </div>

          {/* Right Column: Invoice Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Invoice Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Invoice No.</label>
              <input
                {...register('invoiceNumber')}
                className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 p-2 border focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                <input
                  type="date"
                  {...register('date')}
                  className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 p-2 border focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                <input
                  type="date"
                  {...register('dueDate')}
                  className="w-full rounded-xl border-gray-300 dark:border-gray-600 dark:bg-gray-700/50 p-2 border focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Line Items Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Items</h3>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <motion.div
                key={field.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4 items-start p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="flex-grow">
                  <label className="text-xs text-gray-500 mb-1 block">Description</label>
                  <input
                    {...register(`items.${index}.description`)}
                    placeholder="Item name"
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2 border focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                  {errors.items?.[index]?.description && (
                    <p className="text-red-500 text-xs mt-1">{errors.items[index]?.description?.message}</p>
                  )}
                </div>
                
                <div className="w-24">
                  <label className="text-xs text-gray-500 mb-1 block">Qty</label>
                  <input
                    type="number"
                    {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2 border focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div className="w-32">
                  <label className="text-xs text-gray-500 mb-1 block">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(`items.${index}.price`, { valueAsNumber: true })}
                    className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2 border focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>

                <div className="w-24 pt-8 text-right font-medium text-gray-900 dark:text-white">
                  ${((items[index]?.quantity || 0) * (items[index]?.price || 0)).toFixed(2)}
                </div>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-7 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => append({ description: '', quantity: 1, price: 0 })}
            className="mt-4 flex items-center text-sm text-purple-600 font-medium px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Line Item
          </button>
        </div>

        {/* Totals Section */}
        <div className="border-t border-gray-100 dark:border-gray-700 pt-6 flex justify-end">
          <div className="w-72 space-y-3">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white pt-4 border-t border-gray-100 dark:border-gray-700">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button type="button" className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-xl transition-colors">
            Save Draft
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl shadow-lg shadow-purple-500/20 transition-all ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02]'
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Create Invoice'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

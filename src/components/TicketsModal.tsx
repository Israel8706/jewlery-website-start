import React, { useState } from 'react';
import { CallbackTicket } from '../types';
import { X, Phone, MessageSquare, Mail, CheckCircle, Clock, Trash2 } from 'lucide-react';

interface TicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tickets: CallbackTicket[];
  onUpdateStatus: (id: string, status: 'New' | 'Contacted' | 'Resolved') => void;
  onDeleteTicket: (id: string) => void;
}

export const TicketsModal: React.FC<TicketsModalProps> = ({
  isOpen,
  onClose,
  tickets,
  onUpdateStatus,
  onDeleteTicket,
}) => {
  const [filter, setFilter] = useState<'All' | 'New' | 'Contacted' | 'Resolved'>('All');

  if (!isOpen) return null;

  const filteredTickets = tickets.filter((t) => (filter === 'All' ? true : t.status === filter));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#121214] text-white p-4 sm:p-5 border-b border-[#F5C542]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎫</span>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Owner Callback Tickets Inbox
              </h2>
              <p className="text-xs text-[#F5C542]">
                {tickets.length} total customer ticket{tickets.length === 1 ? '' : 's'} logged
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-1.5">
            {(['All', 'New', 'Contacted', 'Resolved'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  filter === status
                    ? 'bg-[#121214] text-[#F5C542]'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {status} ({status === 'All' ? tickets.length : tickets.filter((t) => t.status === status).length})
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        <div className="p-4 sm:p-5 space-y-3.5 max-h-[70vh] overflow-y-auto">
          {filteredTickets.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <span className="text-4xl block mb-2">🎫</span>
              <p className="text-sm font-bold text-slate-600">No tickets found</p>
              <p className="text-xs text-slate-400 mt-1">
                Customer callback requests submitted via the SSP PlugBot AI will automatically appear here.
              </p>
            </div>
          ) : (
            filteredTickets.map((ticket) => {
              const isPhone = /^[0-9+() -]+$/.test(ticket.contactInfo);
              const isEmail = ticket.contactInfo.includes('@');

              return (
                <div
                  key={ticket.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-black text-[#6A0DAD] bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                          {ticket.id}
                        </span>
                        <h4 className="font-bold text-sm text-[#121214]">{ticket.customerName}</h4>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{ticket.timestamp}</span>
                        {ticket.productOfInterest && (
                          <>
                            <span>·</span>
                            <span className="text-amber-700 font-semibold">{ticket.productOfInterest}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Status Pill & Selector */}
                    <div className="flex items-center gap-1.5">
                      <select
                        value={ticket.status}
                        onChange={(e) =>
                          onUpdateStatus(
                            ticket.id,
                            e.target.value as 'New' | 'Contacted' | 'Resolved'
                          )
                        }
                        className={`text-xs font-bold px-2 py-1 rounded border cursor-pointer ${
                          ticket.status === 'New'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : ticket.status === 'Contacted'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        <option value="New">🟡 New</option>
                        <option value="Contacted">🔵 Contacted</option>
                        <option value="Resolved">🟢 Resolved</option>
                      </select>

                      <button
                        onClick={() => onDeleteTicket(ticket.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete ticket"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Customer Question/Inquiry */}
                  <div className="p-3 rounded-lg bg-slate-50 text-xs text-slate-700 border border-slate-100">
                    <p className="font-semibold text-slate-900 mb-0.5">Inquiry / Request:</p>
                    <p className="whitespace-pre-line">{ticket.inquiry}</p>
                  </div>

                  {/* 1-Tap Call, Text, Email Buttons */}
                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 flex-wrap">
                    <div className="text-xs font-mono font-bold text-slate-700">
                      Contact: {ticket.contactInfo}
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isPhone && (
                        <>
                          <a
                            href={`tel:${ticket.contactInfo}`}
                            className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3" />
                            <span>1-Tap Call</span>
                          </a>
                          <a
                            href={`sms:${ticket.contactInfo}?body=${encodeURIComponent(
                              `Hey ${ticket.customerName}! Israel from South Side Plugged here regarding your ticket ${ticket.id}. How can I assist you with your piece?`
                            )}`}
                            className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 flex items-center gap-1"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>1-Tap Text</span>
                          </a>
                        </>
                      )}

                      {isEmail && (
                        <a
                          href={`mailto:${ticket.contactInfo}?subject=${encodeURIComponent(
                            `South Side Plugged - Response to Ticket ${ticket.id}`
                          )}&body=${encodeURIComponent(
                            `Hello ${ticket.customerName},\n\nIsrael here from South Side Plugged straight out of Texas regarding your inquiry: "${ticket.inquiry}".\n\nLet's get you set up with the right gold piece!`
                          )}`}
                          className="px-2.5 py-1 text-xs font-semibold rounded bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 flex items-center gap-1"
                        >
                          <Mail className="w-3 h-3" />
                          <span>1-Tap Email</span>
                        </a>
                      )}

                      <button
                        onClick={() => onUpdateStatus(ticket.id, 'Resolved')}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 flex items-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3" />
                        <span>Mark Done</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

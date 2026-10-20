import React, { useState, useEffect, useRef } from 'react';
import { CallbackTicket, OwnerSettings } from '../types';
import { X, Send, Bot, User, Sparkles, MessageSquare, Phone, Ticket as TicketIcon, Check, ExternalLink } from 'lucide-react';

interface PlugBotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTicketCreated: (ticket: CallbackTicket) => void;
  ownerSettings: OwnerSettings;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  isTicketAction?: boolean;
  ticketData?: CallbackTicket;
}

type TicketStep = 'none' | 'name' | 'contact' | 'inquiry' | 'complete';

export const PlugBotModal: React.FC<PlugBotModalProps> = ({
  isOpen,
  onClose,
  onTicketCreated,
  ownerSettings,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: "Yo! Welcome to South Side Plugged (★ EST. TEXAS ★). I'm the SSP PlugBot AI. We specialize in solid 10k & 14k gold rings, Cuban links, and rope chains based straight out of Texas (pure gold, no diamonds/stones). I can answer questions on gold purity, ring/chain sizing, Texas shipping times, and gold bundle deals — or create an official callback ticket for Israel & the SSP crew!",
      timestamp: 'Just now',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInlineTicketCard, setShowInlineTicketCard] = useState(false);

  // Conversational Ticket Flow State
  const [ticketStep, setTicketStep] = useState<TicketStep>('none');
  const [ticketFormDraft, setTicketFormDraft] = useState({
    name: '',
    contact: '',
    inquiry: '',
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showInlineTicketCard]);

  if (!isOpen) return null;

  const quickPrompts = [
    '🟡 10k vs 14k Gold Purity?',
    '🚚 Texas Shipping Times?',
    '🔥 Best Gold Bundle Deal?',
    '📏 How do I measure Cuban link size?',
    '🎫 Create Callback Ticket',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Check if in active conversational ticket flow
    if (ticketStep === 'name') {
      setTimeout(() => {
        setTicketFormDraft((prev) => ({ ...prev, name: query }));
        setTicketStep('contact');
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            sender: 'bot',
            text: `Got you, ${query}! What's the best Phone Number, Instagram handle, or Email for Israel & the SSP team to reach you?`,
            timestamp: 'Just now',
          },
        ]);
      }, 700);
      return;
    }

    if (ticketStep === 'contact') {
      setTimeout(() => {
        setTicketFormDraft((prev) => ({ ...prev, contact: query }));
        setTicketStep('inquiry');
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            sender: 'bot',
            text: `Perfect. What gold piece or sizing question are you interested in? (e.g. 14k Cuban bracelet sizing, Lone Star ring size, or gold bundle question)`,
            timestamp: 'Just now',
          },
        ]);
      }, 700);
      return;
    }

    if (ticketStep === 'inquiry') {
      setTimeout(() => {
        const ticketId = `#TKT-${Math.floor(1000 + Math.random() * 9000)}`;
        const newTicket: CallbackTicket = {
          id: ticketId,
          customerName: ticketFormDraft.name,
          contactInfo: ticketFormDraft.contact,
          inquiry: query,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'New',
        };

        onTicketCreated(newTicket);
        setTicketStep('none');
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            sender: 'bot',
            text: `🎉 Boom! Official callback ticket ${ticketId} has been generated and logged into the owner's VIP inbox. Israel & the South Side Plugged team have been notified via SMS. You can also forward it directly below:`,
            timestamp: 'Just now',
            isTicketAction: true,
            ticketData: newTicket,
          },
        ]);
      }, 900);
      return;
    }

    // Check if user wants to start ticket flow
    const lower = query.toLowerCase();
    if (
      lower.includes('ticket') ||
      lower.includes('call me') ||
      lower.includes('callback') ||
      lower.includes('reach me')
    ) {
      setTimeout(() => {
        setTicketStep('name');
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: String(Date.now() + 1),
            sender: 'bot',
            text: "Let's create your VIP Callback Ticket right now! Step 1 of 3: What is your full name?",
            timestamp: 'Just now',
          },
        ]);
      }, 600);
      return;
    }

    // Knowledge Base responses for Pure Gold & Texas
    setTimeout(() => {
      let botReply = '';

      if (lower.includes('diamond') || lower.includes('stone') || lower.includes('moissanite') || lower.includes('tester')) {
        botReply =
          '✨ 100% Pure Gold Focus (No Diamonds/Stones)! Right now, South Side Plugged sells exclusively gold rings, chains, and bracelets based straight out of Texas with NO diamonds or synthetic stones. All pieces feature heavy 10k or 14k gold with diamond-cut gold bevels, mirror polishes, and authentic hallmark stamps.';
      } else if (lower.includes('purity') || lower.includes('10k') || lower.includes('14k') || lower.includes('karat') || lower.includes('gold')) {
        botReply =
          '🟡 Gold Purity Guide:\n• 14K Gold: 58.3% pure gold alloyed for maximum rich warm luster and high scratch resistance — featured on our Miami Cuban links, rope chains, and sovereign rings.\n• 10K Solid Gold: 41.7% pure gold with supreme durability and toughness for heavy everyday street wear, featured on our Texas Raw Nugget sovereign pieces.';
      } else if (lower.includes('ship') || lower.includes('delivery') || lower.includes('track') || lower.includes('texas')) {
        botReply =
          '🚚 Fast Texas Priority Shipping! All orders dispatch within 24 hours based straight out of Texas via USPS Priority Insured Mail. Texas delivery takes 1–2 business days. Free tracking numbers are dispatched via SMS & Email immediately upon package pickup.';
      } else if (lower.includes('bundle') || lower.includes('deal') || lower.includes('discount')) {
        botReply =
          '🔥 Texas Gold Heat Bundle Deal: Pair any 14k Gold Ring (like the Lone Star Ring or 2 Face Ring) with a 14k Cuban Link Chain or 4mm Rope Chain to unlock an extra complimentary SSP Gold Polishing Microfiber Cloth + Free Priority Texas Shipping! Add both to your Online Bag to lock in the 60% OFF sale.';
      } else if (lower.includes('size') || lower.includes('chart') || lower.includes('fit') || lower.includes('measure') || lower.includes('cuban')) {
        botReply =
          '📏 Sizing Guide:\n• Cuban Bracelets: 7.0" fits slim wrists, 7.5" is the most popular standard men’s fit, 8.0" has relaxed drape.\n• Gold Rings: Sizes US 6–12 are available. Check the inline 📏 Show Size Chart button on any jewelry box for millimeter diameter and circumference.\n• Gold Chains: 18" rests near collarbone, 20" is standard upper-chest drape, 22" is mid-chest, and 24"–26" is low-chest drape.';
      } else if (lower.includes('ring') || lower.includes('two face') || lower.includes('lone star') || lower.includes('winged') || lower.includes('nugget')) {
        botReply =
          '💍 Our 4 Gold Rings: The 14k 2 Face Ring ($16.99) portrays Greek comedy & tragedy in solid gold relief; the 14k Winged Emblem Ring ($19.99) features sculpted eagle feathers; the 14k Texas Lone Star Ring ($34.99) features the raised sovereign star with diamond-cut gold rays; and the 10k Texas Raw Nugget Ring ($28.00) features natural 90s sovereign gold textures.';
      } else if (lower.includes('chain') || lower.includes('bracelet') || lower.includes('rope') || lower.includes('pendant')) {
        botReply =
          '⛓️ Our 4 Gold Chains & Bracelets: The 14k Miami Cuban Bracelet ($22.99, 8.5mm width); the 14k Diamond-Cut Rope Chain ($38.00, 4mm French rope); the 14k Heavy Cuban Link Chain ($44.00, 7mm flat links); and the 14k SSP Plug Pendant & Chain ($45.00 with complimentary rope chain).';
      } else {
        botReply =
          "Got your question! At South Side Plugged, every piece is solid 10k/14k gold straight out of Texas (no diamonds/stones). Would you like me to create an official Callback Ticket so Israel can text or call you directly with personalized sizing or order help? Type 'ticket' or click 'Create Callback Ticket' below!";
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'bot',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 700);
  };

  const handleInlineTicketSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const name = (target.elements.namedItem('ticketName') as HTMLInputElement).value;
    const contact = (target.elements.namedItem('ticketContact') as HTMLInputElement).value;
    const inquiry = (target.elements.namedItem('ticketInquiry') as HTMLTextAreaElement).value;

    if (!name || !contact) {
      alert('Please provide your name and contact info.');
      return;
    }

    const ticketId = `#TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: CallbackTicket = {
      id: ticketId,
      customerName: name,
      contactInfo: contact,
      inquiry: inquiry || 'General jewelry recommendation / sizing assistance',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'New',
    };

    onTicketCreated(newTicket);
    setShowInlineTicketCard(false);

    setMessages((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        sender: 'user',
        text: `Submitted Callback Ticket ${ticketId} for ${name}`,
        timestamp: 'Just now',
      },
      {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: `🎉 Ticket ${ticketId} created successfully! Israel and the South Side Plugged team have your details in their inbox and will text/call you shortly.`,
        timestamp: 'Just now',
        isTicketAction: true,
        ticketData: newTicket,
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md h-full bg-[#FFFFFF] shadow-2xl flex flex-col border-l border-slate-200">
        {/* Chat Header */}
        <div className="bg-[#121214] text-white p-4 border-b border-[#F5C542]/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#6A0DAD] to-[#F5C542] p-0.5 flex items-center justify-center">
              <div className="w-full h-full bg-[#121214] rounded-full flex items-center justify-center text-[#F5C542]">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-white tracking-wide">
                  SSP PlugBot AI
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-[#F5C542]">
                South Side Plugged · Straight Out of Texas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowInlineTicketCard(!showInlineTicketCard)}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-[#1E1E28] hover:bg-[#282836] text-[#F5C542] border border-[#F5C542]/50 flex items-center gap-1 cursor-pointer"
              title="Open ticket form"
            >
              <TicketIcon className="w-3.5 h-3.5" />
              <span>Ticket</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Inline Ticket Creator Card (Collapsible) */}
        {showInlineTicketCard && (
          <div className="p-4 bg-purple-50/90 border-b border-purple-200 text-xs animate-fadeIn">
            <div className="flex items-center justify-between mb-2">
              <div className="font-bold text-purple-950 flex items-center gap-1.5">
                <TicketIcon className="w-4 h-4 text-[#6A0DAD]" />
                <span>🎫 Create Callback Ticket (Direct)</span>
              </div>
              <button
                onClick={() => setShowInlineTicketCard(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <form onSubmit={handleInlineTicketSubmit} className="space-y-2">
              <input
                name="ticketName"
                required
                placeholder="Your Full Name *"
                className="w-full px-2.5 py-1.5 rounded border border-purple-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#6A0DAD]"
              />
              <input
                name="ticketContact"
                required
                placeholder="Phone Number / IG / Email *"
                className="w-full px-2.5 py-1.5 rounded border border-purple-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#6A0DAD]"
              />
              <textarea
                name="ticketInquiry"
                rows={2}
                placeholder="What piece or sizing help do you need?"
                className="w-full px-2.5 py-1.5 rounded border border-purple-200 bg-white focus:outline-none focus:ring-1 focus:ring-[#6A0DAD]"
              />
              <button
                type="submit"
                className="w-full py-1.5 rounded bg-[#6A0DAD] hover:bg-[#580B91] text-white font-bold cursor-pointer transition-colors shadow-sm"
              >
                Submit Callback Ticket to Owner
              </button>
            </form>
          </div>
        )}

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-7 h-7 rounded-full bg-[#121214] border border-[#F5C542]/40 text-[#F5C542] flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-[#121214] text-[#F5C542] rounded-tr-none font-medium'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none space-y-2'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{m.text}</p>

                {/* If bot generated a ticket card action */}
                {m.isTicketAction && m.ticketData && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 bg-slate-50 p-2.5 rounded-lg space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                      <span>Ticket: {m.ticketData.id}</span>
                      <span className="text-emerald-600 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Saved in Tickets Inbox
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600">
                      <div>Name: <span className="font-semibold">{m.ticketData.customerName}</span></div>
                      <div>Contact: <span className="font-mono">{m.ticketData.contactInfo}</span></div>
                      <div className="truncate">Note: {m.ticketData.inquiry}</div>
                    </div>

                    {/* Forward actions */}
                    <div className="flex gap-1.5 pt-1">
                      <a
                        href={`sms:${ownerSettings.phone}?body=${encodeURIComponent(
                          `Hey South Side Plugged! New Ticket ${m.ticketData.id} from ${m.ticketData.customerName} (${m.ticketData.contactInfo}): ${m.ticketData.inquiry}`
                        )}`}
                        className="flex-1 py-1.5 px-2 bg-emerald-600 text-white rounded text-[10px] font-bold flex items-center justify-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>SMS Owner</span>
                      </a>
                      <a
                        href={`mailto:${ownerSettings.email}?subject=${encodeURIComponent(
                          `New Ticket ${m.ticketData.id} - ${m.ticketData.customerName}`
                        )}&body=${encodeURIComponent(
                          `Ticket ID: ${m.ticketData.id}\nCustomer: ${m.ticketData.customerName}\nContact: ${m.ticketData.contactInfo}\nInquiry: ${m.ticketData.inquiry}`
                        )}`}
                        className="flex-1 py-1.5 px-2 bg-slate-800 text-white rounded text-[10px] font-bold flex items-center justify-center gap-1"
                      >
                        <span>Email Owner</span>
                      </a>
                    </div>
                  </div>
                )}

                <div
                  className={`text-[9px] text-right mt-1 ${
                    m.sender === 'user' ? 'text-amber-200/70' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-full bg-[#6A0DAD] text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5 items-center text-xs text-slate-400">
              <div className="w-7 h-7 rounded-full bg-[#121214] text-[#F5C542] flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 flex gap-1 items-center">
                <span className="w-1.5 h-1.5 bg-[#6A0DAD] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#F5C542] rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-[#6A0DAD] rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-3 py-2 bg-white border-t border-slate-100 overflow-x-auto flex gap-1.5 scrollbar-none">
          {quickPrompts.map((q) => (
            <button
              key={q}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#6A0DAD]/10 hover:text-[#6A0DAD] hover:border-[#6A0DAD]/40 text-slate-700 text-[11px] font-semibold whitespace-nowrap border border-slate-200 transition-colors cursor-pointer shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Message Input Box */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                ticketStep !== 'none'
                  ? 'Type your answer here...'
                  : 'Ask about Moissanites, sizing, or type "ticket"...'
              }
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] bg-slate-50 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-[#121214] text-[#F5C542] hover:bg-black disabled:opacity-40 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

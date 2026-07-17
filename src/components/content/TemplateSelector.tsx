import React from 'react';
import { useUIStore } from '../../store/uiStore';
import type { TemplateCategory } from '../../store/uiStore';
import { Globe, Image, CreditCard } from 'lucide-react';

export const TemplateSelector: React.FC = () => {
  const { activeTemplate, setActiveTemplate } = useUIStore();

  const templates: { id: TemplateCategory; label: string; icon: React.FC<any> }[] = [
    { id: 'website', label: 'Website Template', icon: Globe },
    { id: 'card', label: 'Interactive Cards', icon: CreditCard },
    { id: 'poster', label: 'Event Poster', icon: Image },
  ];

  return (
    <div className="flex items-center gap-1.5">
      {templates.map((tpl) => {
        const Icon = tpl.icon;
        const isActive = activeTemplate === tpl.id;
        return (
          <button
            key={tpl.id}
            onClick={() => setActiveTemplate(tpl.id)}
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-[9999px] text-xs font-medium transition-all cursor-pointer select-none border ${
              isActive
                ? 'bg-[#17191c] border-[#17191c] text-white'
                : 'bg-white border-[#f2f2f3] text-[#777b86] hover:bg-[#fafafb] hover:text-[#17191c]'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tpl.label}</span>
          </button>
        );
      })}
    </div>
  );
};
export default TemplateSelector;

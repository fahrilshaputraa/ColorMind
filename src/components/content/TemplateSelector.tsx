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
    <div className="flex items-center gap-1">
      {templates.map((tpl) => {
        const Icon = tpl.icon;
        const isActive = activeTemplate === tpl.id;
        return (
          <button
            key={tpl.id}
            onClick={() => setActiveTemplate(tpl.id)}
            type="button"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all select-none border ${
              isActive
                ? 'bg-violet-600 border-violet-600 text-white shadow-md'
                : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700'
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

import React from "react";

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  subcategories?: string[];
  onClick: () => void;
}

export default function CategoryCard({
  title,
  description,
  icon,
  color,
  subcategories,
  onClick,
}: CardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-between p-6 w-full max-w-sm min-h-[250px] bg-white rounded-2xl border-2 border-dashed text-left transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
      style={{ borderColor: color + "60" }}
    >
      <div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ backgroundColor: color + "18", color }}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 whitespace-pre-line mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
        {subcategories && subcategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {subcategories.slice(0, 4).map((sub, i) => (
              <span
                key={i}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: color + "12",
                  color,
                }}
              >
                {sub}
              </span>
            ))}
            {subcategories.length > 4 && (
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{
                  backgroundColor: color + "12",
                  color,
                }}
              >
                +{subcategories.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="w-full flex justify-end mt-4">
        <span className="text-xl font-bold" style={{ color }}>
          ➔
        </span>
      </div>
    </button>
  );
}
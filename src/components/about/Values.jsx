import { Users, Award, Shield, Heart } from 'lucide-react';

export default function ValuesComponent() {
  const values = [
    {
      icon: Users,
      title: "Highly trained & polite staff"
    },
    {
      icon: Award,
      title: "Best industry hygienic standards"
    },
    {
      icon: Shield,
      title: "Safe and secure environment"
    },
    {
      icon: Heart,
      title: "Personalized hospitality services"
    }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-5xl md:text-6xl font-serif font-bold text-center text-gray-900 mb-16">
          Values
        </h2>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                {/* Icon Container */}
                <div className="mb-6">
                  <Icon 
                    className="w-20 h-20 text-gray-800 stroke-[1.5]" 
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                  {value.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
import type { FC } from 'react';
import type { Experience } from '../types';

interface ExperiencesProps {
  data: Experience[];
}

export const Experiences: FC<ExperiencesProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-0 space-y-8 animate-fade-in">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-light tracking-tight text-ink-black-950">Experiences</h2>
        <p className="text-sm text-dusty-denim-700 font-light mt-1">
          A selected list of research, professional work, and client projects.
        </p>
      </div>

      {/* Experience Column Stack */}
      <div className="flex flex-col gap-6 w-full pt-4">
        {data.map((item, idx) => {
          const typeMarker = item.Platform ? item.Platform : 'Experience';

          return (
            <div
              key={idx}
              className="group p-6 md:p-8 border border-dusk-blue-200 rounded-2xl bg-white hover:border-ink-black-900 hover:shadow-sm transition-all duration-500 w-full"
            >
              {/* Top Row: Date & Type */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-normal text-dusty-denim-500">
                  {item.Date || '2026'}
                </span>
                <span className="text-xs font-normal text-dusty-denim-500 font-mono">
                  {typeMarker}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-semibold text-ink-black-950">
                {item.Title}
              </h3>

              {/* Description */}
              <p className="text-sm text-prussian-blue-800 leading-relaxed font-normal mt-2">
                {item.Description}
              </p>
            </div>
          );
        })}

        {data.length === 0 && (
          <div className="py-16 text-center border border-dashed border-dusk-blue-200 rounded-2xl bg-alabaster-grey-100/50">
            <p className="text-sm text-dusk-blue-600">Nothing here yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

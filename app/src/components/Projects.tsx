import type { FC } from 'react';
import type { Project } from '../types';

interface ProjectsProps {
  data: Project[];
}

export const Projects: FC<ProjectsProps> = ({ data }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-0 py-20 animate-fade-in">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-light tracking-tight text-ink-black-950">Projects</h2>
        <p className="text-sm text-dusty-denim-700 font-light mt-1">
          Open source repositories, personal experimentations, and products.
        </p>
      </div>

      {/* Projects Grid (Spacious 2-column matrix) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 w-full">
        {data.map((project, idx) => (
          <div
            key={idx}
            className="group flex flex-col justify-between border border-dusk-blue-200 p-5 rounded-2xl bg-white hover:border-ink-black-900 hover:shadow-sm transition-all duration-500 w-full"
          >
            {/* Typography */}
            <div>
              {/* Title */}
              <h3 className="text-base md:text-lg font-semibold text-ink-black-950">
                {project.Title}
              </h3>
              
              {/* Description */}
              <p className="mt-2 text-sm text-prussian-blue-800 leading-relaxed font-normal">
                {project.Description}
              </p>
            </div>

            {/* Inline Action Buttons (Conditional Rendering) */}
            {(project.Github || project.Live) && (
              <div className="flex gap-3 mt-4">
                {project.Github && (
                  <a
                    href={project.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-2.5 py-1 bg-dusty-denim-100 text-prussian-blue-800 text-[10px] font-mono lowercase rounded hover:bg-dusty-denim-200 transition-colors whitespace-nowrap w-fit tracking-tight"
                  >
                    code
                  </a>
                )}
                {project.Live && (
                  <a
                    href={project.Live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-2.5 py-1 bg-dusty-denim-100 text-prussian-blue-800 text-[10px] font-mono lowercase rounded hover:bg-dusty-denim-200 transition-colors whitespace-nowrap w-fit tracking-tight"
                  >
                    live preview
                  </a>
                )}
              </div>
            )}
          </div>
        ))}

        {data.length === 0 && (
          <div className="col-span-full py-16 text-center border border-dashed border-dusk-blue-200 rounded-2xl bg-alabaster-grey-100/50">
            <p className="text-sm text-dusk-blue-600">Nothing here yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

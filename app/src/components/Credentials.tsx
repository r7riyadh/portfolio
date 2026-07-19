import type { FC } from 'react';
import type { Education, Certificate } from '../types';
import { GraduationCap, Award } from 'lucide-react';

interface CredentialsProps {
  education: Education[];
  certificates: Certificate[];
}

export const Credentials: FC<CredentialsProps> = ({ education, certificates }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-0 space-y-12 animate-fade-in">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-light tracking-tight text-ink-black-950">Credentials</h2>
        <p className="text-sm text-dusty-denim-700 font-light mt-1">
          My academic records and professional certifications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column: Education */}
        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-widest text-dusty-denim-700 font-mono font-medium flex items-center gap-2">
            <GraduationCap size={16} />
            <span>Education</span>
          </h3>
          
          <div className="space-y-6 pl-4 border-l border-dusk-blue-200">
            {education.map((edu, idx) => (
              <div key={idx} className="space-y-1 group">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="text-xs font-mono text-dusk-blue-600 tracking-wider">
                    {edu.Date}
                  </span>
                  <span className="text-xs text-prussian-blue-800 font-light">
                    {edu.Description}
                  </span>
                </div>
                <h4 className="text-base font-medium text-ink-black-950">
                  {edu.Title}
                </h4>
                <div className="text-xs text-dusty-denim-500 font-normal mt-0.5">
                  {edu.Institution || 'University of the People'}
                </div>
              </div>
            ))}

            {education.length === 0 && (
              <p className="text-sm text-dusk-blue-600">Nothing here yet.</p>
            )}
          </div>
        </div>

        {/* Right Column: Certificates (Finite Manual Scroll) */}
        <div className="space-y-6">
          <h3 className="text-xs uppercase tracking-widest text-dusty-denim-700 font-mono font-medium flex items-center gap-2">
            <Award size={16} />
            <span>Certifications</span>
          </h3>

          {certificates.length > 0 ? (
            <div 
              className="relative h-[450px] overflow-y-auto rounded-2xl [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-dusty-denim-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-dusty-denim-300"
              style={{
                maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
              }}
            >
              <div className="space-y-4 py-6 px-1">
                {certificates.map((cert, idx) => (
                  <div 
                    key={idx} 
                    className="p-5 border border-dusk-blue-200 bg-white rounded-2xl hover:border-ink-black-900 transition-colors duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                      <div className="space-y-1">
                        <h4 className="text-base font-semibold text-ink-black-950 leading-snug">
                          {cert.Title}
                        </h4>
                        <p className="text-xs text-dusty-denim-500 font-normal mt-0.5">
                          issued by {cert.Issued_By}
                        </p>
                      </div>
                      {cert['Verify Link'] && (
                        <a
                          href={cert['Verify Link']}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-2.5 py-1 bg-dusty-denim-100 text-prussian-blue-800 text-[10px] font-mono lowercase rounded hover:bg-dusty-denim-200 transition-colors whitespace-nowrap w-fit tracking-tight shrink-0"
                        >
                          verify
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center border border-dashed border-dusk-blue-200 rounded-2xl bg-alabaster-grey-100/50">
              <p className="text-sm text-dusk-blue-600">Nothing here yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import { useState } from 'react';
import type { FC, MouseEvent } from 'react';
import { Mail, FileText, Link as LinkIcon, ArrowUpRight } from 'lucide-react';
import type { Social as SocialType } from '../types';

interface SocialProps {
  data: SocialType[];
}

export const Social: FC<SocialProps> = ({ data }) => {
  const [showEmailToast, setShowEmailToast] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  const handleEmailClick = (e: MouseEvent<HTMLAnchorElement>, link: string) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;

    const email = link.replace(/^mailto:/i, '');
    navigator.clipboard.writeText(email)
      .then(() => {
        setShowEmailToast(true);
        setTimeout(() => {
          setShowEmailToast(false);
        }, 2500);
      })
      .catch(() => {});
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-0 space-y-8 animate-fade-in flex flex-col justify-center">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-light tracking-tight text-ink-black-950">Social Connections</h2>
        <p className="text-sm text-dusty-denim-700 font-light mt-1">
          Channels where you can find my writings, code, and profile.
        </p>
      </div>

      {/* Enclosed Rectangle Box Structure */}
      <div className="w-full border border-dusty-denim-200 rounded-2xl bg-white p-6 md:p-8 shadow-sm">
        {/* Inner Links Layout (3 columns on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((soc, idx) => {
            const titleNormalized = soc.Title.toLowerCase().trim();
            const isEmail = titleNormalized === 'email me';
            const isResume = titleNormalized === 'view resume';
            const isMailto = soc.Link.toLowerCase().startsWith('mailto:');
            
            const renderIcon = () => {
              if (isEmail) {
                return <Mail size={18} strokeWidth={2} />;
              }
              if (isResume) {
                return <FileText size={18} strokeWidth={2} />;
              }
              if (failedImages[idx]) {
                return <LinkIcon size={18} strokeWidth={2} />;
              }
              
              const iconSlug = soc.Title.toLowerCase().replace(/\s+/g, '');
              return (
                <img
                  src={`https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${iconSlug}.svg`}
                  alt={soc.Title}
                  className="w-5 h-5 transition-all duration-300 brightness-0 opacity-70 group-hover:opacity-100"
                  onError={() => {
                    setFailedImages(prev => ({ ...prev, [idx]: true }));
                  }}
                />
              );
            };

            return (
              <a
                key={idx}
                href={soc.Link}
                target={isMailto ? undefined : "_blank"}
                rel={isMailto ? undefined : "noopener noreferrer"}
                onClick={isMailto ? (e) => handleEmailClick(e, soc.Link) : undefined}
                className="group relative p-4 border border-dusk-blue-200 bg-white rounded-2xl flex items-center justify-between hover:border-ink-black-900 transition-all duration-300 w-full"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-dusk-blue-50 text-dusty-denim-600 group-hover:text-ink-black-950 group-hover:bg-dusk-blue-100/70 transition-all duration-300 flex items-center justify-center w-11 h-11 shrink-0">
                    {renderIcon()}
                  </div>
                  <div className="space-y-0.5 text-left">
                    <h3 className="text-xs font-semibold text-dusk-blue-600 uppercase tracking-wider">
                      {soc.Title}
                    </h3>
                    <p className="text-sm text-ink-black-950 font-mono font-light">
                      {soc.Description}
                    </p>
                  </div>
                </div>
                
                <ArrowUpRight size={16} className="text-dusk-blue-600 group-hover:text-ink-black-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                
                {isMailto && showEmailToast && (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-mono lowercase px-2 py-1 rounded shadow-md transition-all duration-200 z-10">
                    copied to clipboard!
                  </div>
                )}
              </a>
            );
          })}

          {data.length === 0 && (
            <div className="col-span-full py-16 text-center border border-dashed border-dusk-blue-200 rounded-2xl bg-alabaster-grey-100/50">
              <p className="text-sm text-dusk-blue-600">Nothing here yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

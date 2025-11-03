"use client";

import { useEffect, useRef, useState } from 'react';
import { Bookmark, Share2, Clock, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuideContentProps {
  guide: {
    title: string;
    category: string;
    readTime: string;
    content: string;
  };
}

const TableOfContents = ({ content }: { content: string }) => {
  const [headings, setHeadings] = useState<{id: string; text: string; level: number}[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(`<div>${content}</div>`, 'text/html');
    const h2s = Array.from(doc.querySelectorAll('h2'));
    
    // Extract headings for TOC
    const extractedHeadings = h2s.map((h2, index) => {
      const id = `section-${index}`;
      h2.id = id;
      return {
        id,
        text: h2.textContent || '',
        level: parseInt(h2.tagName.substring(1))
      };
    });
    
    setHeadings(extractedHeadings);

    // Set up intersection observer for active section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px', threshold: 0.1 }
    );

    // Observe all headings
    h2s.forEach((h2) => {
      const element = document.getElementById(h2.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [content]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 hidden lg:block">
      <div className="border-l-2 border-slate-200 pl-4 space-y-2">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Table of Contents
        </h3>
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              'block text-sm py-1.5 px-2 -ml-1 rounded transition-colors',
              activeId === heading.id
                ? 'text-primary font-medium bg-primary/5 border-l-2 border-primary -ml-3 pl-3'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            )}
          >
            {heading.text}
          </a>
        ))}
        <button
          onClick={scrollToTop}
          className="mt-4 flex items-center text-sm text-slate-500 hover:text-primary transition-colors"
        >
          <ChevronUp className="w-4 h-4 mr-1" />
          Back to top
        </button>
      </div>
    </div>
  );
};

export default function GuideContent({ guide }: GuideContentProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Sticky header */}
      <header className={cn(
        'sticky top-0 bg-white/80 backdrop-blur-sm border-b border-slate-100 z-10 transition-all duration-300',
        isScrolled ? 'py-2' : 'py-4'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="/guides" className="flex items-center gap-2 text-slate-700 hover:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              <span className="font-medium">Back to Guides</span>
            </a>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                <Bookmark size={18} />
              </button>
              <button className="p-2 text-slate-500 hover:text-primary transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <article className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="mb-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                  {guide.category}
                </span>
                <h1 className="mt-4 text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                  {guide.title}
                </h1>
                <div className="mt-4 flex items-center text-slate-500 text-sm">
                  <Clock size={16} className="mr-1.5" />
                  {guide.readTime} read • Updated recently
                </div>
              </div>

              <div 
                id="guide-content"
                className="prose prose-slate max-w-none prose-headings:font-semibold prose-h2:text-2xl prose-h2:mt-12 prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-6 prose-li:my-2"
                dangerouslySetInnerHTML={{ 
                  __html: guide.content
                    .replace(/<h2/g, '<h2 class="group scroll-mt-24 text-2xl font-bold text-slate-900 mt-12 mb-6 pb-2 border-b border-slate-100"')
                    .replace(/<p/g, '<p class="mb-6 leading-relaxed text-slate-700"')
                }}
              />

              <div className="mt-16 pt-8 border-t border-slate-100">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Was this guide helpful?</h3>
                <div className="flex space-x-4">
                  <button className="px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
                    Yes, thanks!
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors">
                    Not really
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <TableOfContents content={guide.content} />
          </aside>
        </div>
      </div>
    </main>
  );
}

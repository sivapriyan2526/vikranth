import React from 'react';

export const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs animate-pulse space-y-3">
    <div className="flex items-center justify-between">
      <div className="w-10 h-10 bg-slate-200 rounded-xl"></div>
      <div className="w-16 h-5 bg-slate-200 rounded-full"></div>
    </div>
    <div className="space-y-1.5">
      <div className="h-4 bg-slate-200 rounded-md w-3/4"></div>
      <div className="h-3 bg-slate-200 rounded-md w-full"></div>
      <div className="h-3 bg-slate-200 rounded-md w-2/3"></div>
    </div>
    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
      <div className="h-3 bg-slate-200 rounded w-1/4"></div>
      <div className="h-8 bg-slate-200 rounded-lg w-1/3"></div>
    </div>
  </div>
);

export const SkeletonTimeline: React.FC = () => (
  <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs animate-pulse space-y-4">
    <div className="h-5 bg-slate-200 rounded w-1/2"></div>
    <div className="h-3 bg-slate-200 rounded w-1/3"></div>
    <div className="space-y-6 pt-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <div className="w-6 h-6 rounded-full bg-slate-200 shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

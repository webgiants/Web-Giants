import React from 'react';

export enum ProjectComplexity {
  LOW = 'Simple',
  MEDIUM = 'Moderate',
  HIGH = 'Complex'
}

export interface ProjectBlueprint {
  title: string;
  stack: string[];
  estimatedWeeks: number;
  complexity: ProjectComplexity;
  marketingBlurb: string;
  keyFeatures: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

export enum CardVariant {
  DEFAULT = 'default',
  GLASS = 'glass',
  OUTLINE = 'outline',
  NEON = 'neon'
}
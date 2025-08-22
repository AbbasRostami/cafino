export interface WorkingHour {
  day: string;
  time: string;
}

export interface QuickLink {
  href: string;
  text: string;
  icon: string;
}

export interface ContactInfo {
  icon: string;
  text: string;
}

export interface SocialMedia {
  icon: string;
  color: string;
  hover: string;
  href: string;
}

export interface FooterData {
  workingHours: WorkingHour[];
  quickLinks: QuickLink[];
  contactInfo: ContactInfo[];
  socialMedia: SocialMedia[];
}

export interface FooterMetadata {
  title: string;
  description: string;
  keywords: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    locale: string;
  };
}

export interface FooterProps {
  data?: FooterData;
  metadata?: FooterMetadata;
}

// Props

export interface WorkingHoursProps {
  workingHours: WorkingHour[];
}

export interface QuickLinksProps {
  quickLinks: QuickLink[];
}

export interface ContactInfoProps {
  contactInfo: ContactInfo[];
  socialMedia: SocialMedia[];
}

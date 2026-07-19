export interface Experience {
  Title: string;
  Description: string;
  Platform: string;
  Date: string;
}

export interface Project {
  Title: string;
  Description: string;
  Github: string;
  Live: string;
}

export interface Certificate {
  Title: string;
  Issued_By: string;
  'Verify Link': string;
}

export interface Education {
  Title: string;
  Description: string;
  Tags: string;
  Date: string;
  Institution?: string;
}

export interface Social {
  Title: string;
  Description: string;
  Link: string;
  Tags: string;
}

export interface PortfolioData {
  experiences: Experience[];
  projects: Project[];
  certificates: Certificate[];
  education: Education[];
  social: Social[];
}

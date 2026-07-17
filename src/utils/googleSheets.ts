import Papa from 'papaparse';
import type { PortfolioData, Experience, Project, Certificate, Education, Social } from '../types';
import { CMS_URLS } from '../config';

export async function fetchCsvData(url: string): Promise<any[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1500);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV from URL: ${url}`);
    }
    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        complete: (results) => {
          resolve(results.data);
        },
        error: (error: any) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

async function safeFetchCsv(url: string): Promise<any[]> {
  try {
    return await fetchCsvData(url);
  } catch {
    return [];
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const [
    experiencesRaw,
    projectsRaw,
    certificatesRaw,
    educationRaw,
    socialRaw
  ] = await Promise.all([
    safeFetchCsv(CMS_URLS.experiences),
    safeFetchCsv(CMS_URLS.projects),
    safeFetchCsv(CMS_URLS.certificates),
    safeFetchCsv(CMS_URLS.education),
    safeFetchCsv(CMS_URLS.social)
  ]);
  
  const experiences: Experience[] = experiencesRaw.map((e: any) => ({
    Title: e.Title || e.title || '',
    Description: e.Description || e.description || '',
    Platform: e.Platform || e.platform || '',
    Date: e.Date || e.date || ''
  }));

  const projects: Project[] = projectsRaw.map((p: any) => ({
    Title: p.Title || p.title || '',
    Description: p.Description || p.description || '',
    Github: p.Github || p.github || '',
    Live: p.Live || p.live || p.Link || p.link || ''
  }));

  const certificates: Certificate[] = certificatesRaw.map((c: any) => ({
    Title: c.Title || c.title || '',
    Issued_By: c.Issued_By || c.issued_by || c.Issuer || c.issuer || c.Description || c.description || '',
    'Verify Link': c['Verify Link'] || c['Verify Link '] || c['verify link'] || c['verify link '] || c.Link || c.link || ''
  }));

  const education: Education[] = educationRaw.map((e: any) => ({
    Title: e.Title || e.title || e.Degree || e.degree || '',
    Description: e.Description || e.description || '',
    Tags: e.Tags || e.tags || '',
    Date: e.Date || e.date || '',
    Institution: e.Institution || e.institution || e.University || e.university || 'University of the People'
  }));

  const social: Social[] = socialRaw.map((s: any) => ({
    Title: s.Title || s.title || s.Platform || s.platform || '',
    Description: s.Description || s.description || s.Username || s.username || '',
    Link: s.Link || s.link || '',
    Tags: s.Tags || s.tags || ''
  }));

  return { experiences, projects, certificates, education, social };
}

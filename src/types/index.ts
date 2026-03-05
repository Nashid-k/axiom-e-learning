export interface Question {
  id: string;
  text: string;
  answer?: string;
  studied?: boolean;
}

export interface Section {
  title: string;
  questions: Question[];
}

export interface VideoData {
  url: string;
  title: string;
  duration: string;
  channel?: string;
  description?: string;
}

export interface Topic {
  id: string;
  title: string;
  description?: string;
  studied: boolean;
  createdAt: string;
  lastStudied?: string;
  nextReviewDate?: string; 
  reviewCount?: number; 
  studyGuide?: string; 
  structuredContent?: Section[]; 
  videos?: VideoData[]; 
  videoUrl?: string; 

  visibility?: 'curriculum' | 'community' | 'private'; 
  addedBy?: string; 
  addedByName?: string; 
  addedAt?: string; 
  studyingCount?: number; 
  category?: string; 
  itemType?: 'theory' | 'practical';
  suggestedPhase?: string;
  insertAfter?: string;
  projectDetails?: ProjectDetails;
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}


export type TopicInput = Omit<Topic, 'id' | 'createdAt' | 'studied'>;



export interface RichItem {
  id?: string;
  title: string;
  url?: string; 
  addedBy?: string;
  addedAt?: string;
  type?: 'theory' | 'practical' | 'project';
  insertAfter?: string;
  projectDetails?: ProjectDetails;
  description?: string; 
  studied?: boolean;
  videos?: VideoData[];
  videoUrl?: string;
}

export interface Phase {
  id?: string; 
  phase: number | string; 
  title: string;
  description?: string;
  theory?: (string | RichItem)[];
  practicals?: (string | RichItem)[];
  targetExperience?: string[];
  focus?: string;
  projects?: string[];
  commonErrors?: string[];
  patterns?: string[];
  libraries?: string[];
  tools?: string[];
  deployment?: string[];
  advancedTopics?: string[];
  games?: (string | RichItem)[]; 
}

export interface CurriculumData {
  id?: string;
  title?: string;
  fileName: string;
  description: string;
  category?: string;
  subDescription?: string;
  phases: Phase[];
  experienceLevels?: string[];
  duration?: string;
  prerequisites?: string[];
  [key: string]: unknown;
}

export type Category =
  | 'Foundation'
  | 'HTML'
  | 'CSS'
  | 'JavaScript'
  | 'Git'
  | 'Web Fundamentals'
  | 'React'
  | 'TypeScript'
  | 'Next.js'
  | 'NodeJS'
  | 'NestJS'
  | 'Python'
  | 'MongoDB'
  | 'SQL'
  | 'DSA'
  | 'Networking'
  | 'Operating Systems'
  | 'Testing'
  | 'DevOps'
  | 'System Design'
  | 'Interview Prep';

export interface ProjectDetails {
  difficulty: string;
  features: string[];
  hooks?: string[];
  concepts?: string[];
  api?: string;
  tags?: string[];
  estimatedTime?: string;
}

export interface CurriculumEntry {
  slug: string;
  category: Category;
  dataKey: string;
  foundations?: string[];
  foundationTitles?: string[];
  getData: () => CurriculumData;
}

export interface VideoResult {
  url: string;
  title: string;
  channel: string;
  channelUrl?: string;
  viewCount?: number;
  likeCount?: number;
  thumbnail?: string;
  duration?: string;
  relevanceScore?: number;
  searchSource: 'YouTube' | 'Google';
  isPriorityCreator?: boolean;
  description?: string;
}

export interface PracticeProblem {
  title: string;
  platform: 'LeetCode' | 'Neetcode' | 'HackerRank' | 'CodeSignal' | 'GeeksForGeeks' | 'Other';
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  url: string;
  description: string;
}

export interface ProjectIdea {
  title: string;
  description: string;
  url: string;
  source: 'GitHub' | 'Medium' | 'Dev.to' | 'Other';
  stars?: string;
}

export interface Article {
  url: string;
  title: string;
  source: string;
  snippet: string;
}

export interface InterviewQuestion {
  title: string;
  url: string;
  source: string;
  snippet: string;
}

export interface ResourceResponse {
  videos: VideoResult[];
  articles: Article[];
  practiceProblems: PracticeProblem[];
  projectIdeas: ProjectIdea[];
  interviewQuestions: InterviewQuestion[];
}

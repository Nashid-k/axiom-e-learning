import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUserProgress extends Document {
    uniqueId: string;
    curriculumSlug: string;
    checkedItems: string[];
    lastUpdated: Date;
    totalItems: number;
    completedCount: number;
}

const UserProgressSchema = new Schema<IUserProgress>({
    uniqueId: { type: String, required: true, index: true },
    curriculumSlug: { type: String, required: true, index: true },
    checkedItems: { type: [String], default: [] },
    lastUpdated: { type: Date, default: Date.now },
    totalItems: { type: Number, default: 0 },
    completedCount: { type: Number, default: 0 },
}, {
    timestamps: true,
});

UserProgressSchema.index({ uniqueId: 1, curriculumSlug: 1 }, { unique: true });

UserProgressSchema.index({ lastUpdated: -1 });

export interface IStudyGuideCache extends Document {
    topicId: string;
    mode: 'theory' | 'practical' | 'project' | 'quiz';
    language?: 'typescript' | 'javascript';
    chapter?: number;
    content: string;
    category: string;
    createdAt: Date;
    expiresAt: Date;

    accessCount: number;
    lastAccessed: Date;

    compressed: boolean;
    originalSize?: number;
    compressedSize?: number;
}

const StudyGuideCacheSchema = new Schema<IStudyGuideCache>({
    topicId: { type: String, required: true, index: true },
    mode: { type: String, enum: ['theory', 'practical', 'project', 'quiz'], required: true },
    language: { type: String, enum: ['typescript', 'javascript'] },
    chapter: { type: Number, min: 1, max: 5 },
    content: { type: String, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },

    accessCount: { type: Number, default: 0 },
    lastAccessed: { type: Date, default: Date.now },

    compressed: { type: Boolean, default: false },
    originalSize: { type: Number },
    compressedSize: { type: Number },
});

StudyGuideCacheSchema.index({ topicId: 1, mode: 1, language: 1, chapter: 1 }, { unique: true });

StudyGuideCacheSchema.index({ accessCount: -1 });
StudyGuideCacheSchema.index({ createdAt: 1 });
StudyGuideCacheSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });



export interface IUserTopic extends Document {
    uniqueId: string;
    title: string;
    description?: string;
    studied: boolean;
    createdAt: Date;
    lastStudied?: Date;
    studyGuide?: string;
    category: string;
    videoUrl?: string;
}

const UserTopicSchema = new Schema<IUserTopic>({
    uniqueId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    description: { type: String },
    studied: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    lastStudied: { type: Date },
    studyGuide: { type: String },
    category: { type: String, default: 'Other' },
    videoUrl: { type: String },
}, {
    timestamps: true,
});

UserTopicSchema.index({ uniqueId: 1, title: 1 });

export interface ICommunityTopic extends Document {
    title: string;
    description?: string;
    category: string;
    addedBy: string;
    addedByName: string;
    addedAt: Date;
    studyingCount: number;
    visibility: 'community' | 'private';
    itemType: 'theory' | 'practical';
    suggestedPhase?: string;
    insertAfter?: string;
    videoUrl?: string;
}

const CommunityTopicSchema = new Schema<ICommunityTopic>({
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true, index: true },
    addedBy: { type: String, required: true, index: true },
    addedByName: { type: String, required: true },
    addedAt: { type: Date, default: Date.now },
    studyingCount: { type: Number, default: 0 },
    visibility: { type: String, enum: ['community', 'private'], default: 'community' },
    itemType: { type: String, enum: ['theory', 'practical'], default: 'theory' },
    suggestedPhase: { type: String },
    insertAfter: { type: String },
    videoUrl: { type: String },
}, {
    timestamps: true,
});

CommunityTopicSchema.index({ category: 1, visibility: 1 });
CommunityTopicSchema.index({ title: 'text', description: 'text' });

export const UserProgress: Model<IUserProgress> =
    mongoose.models.UserProgress || mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);

export const StudyGuideCache: Model<IStudyGuideCache> =
    mongoose.models.StudyGuideCache || mongoose.model<IStudyGuideCache>('StudyGuideCache', StudyGuideCacheSchema);

export const UserTopic: Model<IUserTopic> =
    mongoose.models.UserTopic || mongoose.model<IUserTopic>('UserTopic', UserTopicSchema);

export const CommunityTopic: Model<ICommunityTopic> =
    mongoose.models.CommunityTopic || mongoose.model<ICommunityTopic>('CommunityTopic', CommunityTopicSchema);

export interface ILearningProfile {
    weaknesses: string[];
    strengths: string[];
    preferredStack: {
        database?: string;
        auth?: string;
        language?: 'typescript' | 'javascript';
    };
    learningStyle: 'theory' | 'practical' | 'project';
}

export interface IUser extends Document {
    email: string;
    name: string;
    image?: string;
    googleId?: string;
    authProvider?: string;
    lastLogin?: Date;
    learningProfile?: ILearningProfile;
    mayaPreferences?: {
        nickname?: string;
        vibe?: 'chill' | 'professional' | 'active';
        introSeen?: boolean;
    };
    totalMastered?: number;
    totalPoints?: number;
    termsAccepted?: boolean;
    termsAcceptedAt?: Date;
}

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: { type: String },
    googleId: { type: String },
    authProvider: { type: String },
    lastLogin: { type: Date },
    learningProfile: {
        weaknesses: { type: [String], default: [] },
        strengths: { type: [String], default: [] },
        preferredStack: {
            database: String,
            auth: String,
            language: { type: String, enum: ['typescript', 'javascript'], default: 'typescript' }
        },
        learningStyle: { type: String, enum: ['theory', 'practical', 'project'], default: 'project' }
    },
    mayaPreferences: {
        nickname: String,
        vibe: { type: String, enum: ['chill', 'professional', 'active'], default: 'chill' },
        introSeen: { type: Boolean, default: false }
    },
    totalMastered: { type: Number, default: 0, index: true },
    totalPoints: { type: Number, default: 0, index: true },
    termsAccepted: { type: Boolean, default: false },
    termsAcceptedAt: { type: Date },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export interface ILeaderboardEntry extends Document {
    uniqueId: string;
    name: string;
    image?: string;
    totalMastered: number;
    totalPoints: number;
    lastUpdated: Date;
    isGuest: boolean;
}

const LeaderboardEntrySchema = new Schema<ILeaderboardEntry>({
    uniqueId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    image: { type: String },
    totalMastered: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
    isGuest: { type: Boolean, default: false },
}, { timestamps: true });

LeaderboardEntrySchema.index({ totalPoints: -1, totalMastered: -1, lastUpdated: -1 });
LeaderboardEntrySchema.index({ isGuest: 1, totalPoints: -1 }); 

export const LeaderboardEntry: Model<ILeaderboardEntry> =
    mongoose.models.LeaderboardEntry || mongoose.model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardEntrySchema);

export interface ICurriculumEmbedding extends Document {
    curriculum: string;
    phase: string;
    topic: string;
    content: string;
    embedding: number[];
    metadata: {
        difficulty?: string;
        practicals?: string[];
        relatedTopics?: string[];
        category: string;
    };
    createdAt: Date;
}

const CurriculumEmbeddingSchema = new Schema<ICurriculumEmbedding>({
    curriculum: { type: String, required: true, index: true },
    phase: { type: String, required: true },
    topic: { type: String, required: true },
    content: { type: String, required: true },
    embedding: { type: [Number], required: true },
    metadata: {
        difficulty: String,
        practicals: [String],
        relatedTopics: [String],
        category: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now },
});

CurriculumEmbeddingSchema.index({ curriculum: 1, phase: 1 });
CurriculumEmbeddingSchema.index({ 'metadata.category': 1 });

export const CurriculumEmbedding: Model<ICurriculumEmbedding> =
    mongoose.models.CurriculumEmbedding || mongoose.model<ICurriculumEmbedding>('CurriculumEmbedding', CurriculumEmbeddingSchema);

export interface IInteractionLog extends Document {
    uniqueId: string;
    topicId: string;
    topicTitle?: string;
    category?: string;
    action: string;
    dwellTimeMs?: number;
    metadata?: Record<string, unknown>;
    timestamp: Date;
}

const InteractionLogSchema = new Schema<IInteractionLog>({
    uniqueId: { type: String, required: true, index: true },
    topicId: { type: String, required: true },
    topicTitle: { type: String },
    category: { type: String },
    action: { type: String, required: true },
    dwellTimeMs: { type: Number },
    metadata: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now, index: true } 
});

InteractionLogSchema.index({ uniqueId: 1, timestamp: -1 }); 

export const InteractionLog: Model<IInteractionLog> =
    mongoose.models.InteractionLog || mongoose.model<IInteractionLog>('InteractionLog', InteractionLogSchema);


export interface IUserStruggle extends Document {
    uniqueId: string;
    topicId: string;
    topicTitle: string;
    category: string;
    status: 'active' | 'resolved' | 'ignored';
    struggleScore: number;
    detectedAt: Date;
    resolvedAt?: Date;
    resolutionMethod?: 'ai_modal' | 'manual' | 'timeout';
}

const UserStruggleSchema = new Schema<IUserStruggle>({
    uniqueId: { type: String, required: true, index: true },
    topicId: { type: String, required: true, index: true },
    topicTitle: { type: String, required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ['active', 'resolved', 'ignored'], default: 'active', index: true },
    struggleScore: { type: Number, default: 0 },
    detectedAt: { type: Date, default: Date.now },
    resolvedAt: { type: Date },
    resolutionMethod: { type: String }
});

UserStruggleSchema.index({ uniqueId: 1, topicId: 1, status: 1 });


export const UserStruggle: Model<IUserStruggle> =
    mongoose.models.UserStruggle || mongoose.model<IUserStruggle>('UserStruggle', UserStruggleSchema);


export interface IAIMemory extends Document {
    userId: string;
    facts: string[];
    interests: string[];
    strengths: string[];
    weaknesses: string[];
    reflections: {
        topic: string;
        insight: string;
        timestamp: Date;
    }[];
    messages: {
        id: string;
        role: 'user' | 'assistant' | 'system';
        content: string;
        timestamp: Date;
        feedback?: 'good' | 'bad';
    }[];
    lastInteraction: Date;
    version: string;
}

const AIMemorySchema = new Schema<IAIMemory>({
    userId: { type: String, required: true, unique: true, index: true },
    facts: { type: [String], default: [] },
    interests: { type: [String], default: [] },
    strengths: { type: [String], default: [] },
    weaknesses: { type: [String], default: [] },
    reflections: [{
        topic: { type: String, required: true },
        insight: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }],
    messages: [{
        id: { type: String, required: true },
        role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        feedback: { type: String, enum: ['good', 'bad'] }
    }],
    lastInteraction: { type: Date, default: Date.now },
    version: { type: String }
}, { timestamps: true });

export const AIMemory: Model<IAIMemory> =
    mongoose.models.AIMemory || mongoose.model<IAIMemory>('AIMemory', AIMemorySchema);

export interface IResourceCache extends Document {
    topicKey: string;
    topicTitle: string;
    curriculum: string;
    phase: string;
    resources: Record<string, unknown>;
    hitCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const ResourceCacheSchema = new Schema<IResourceCache>({
    topicKey: { type: String, required: true, unique: true, index: true },
    topicTitle: { type: String, required: true },
    curriculum: { type: String, required: true },
    phase: { type: String, required: true },
    resources: { type: Schema.Types.Mixed, required: true },
    hitCount: { type: Number, default: 0 },
}, { timestamps: true });

export const ResourceCache: Model<IResourceCache> =
    mongoose.models.ResourceCache || mongoose.model<IResourceCache>('ResourceCache', ResourceCacheSchema);

function getVitalsRetentionSeconds(): number {
    const rawDays = Number.parseInt(process.env.VITALS_RETENTION_DAYS ?? '30', 10);
    const safeDays = Number.isFinite(rawDays) && rawDays > 0 ? rawDays : 30;
    return safeDays * 24 * 60 * 60;
}

const VITALS_RETENTION_SECONDS = getVitalsRetentionSeconds();

type PrimitiveTag = string | number | boolean;

export interface IApiVitalEvent extends Document {
    ts: Date;
    endpoint: string;
    method: string;
    path: string;
    status: number;
    durationMs: number;
}

const ApiVitalEventSchema = new Schema<IApiVitalEvent>({
    ts: { type: Date, required: true },
    endpoint: { type: String, required: true, index: true },
    method: { type: String, required: true, index: true },
    path: { type: String, required: true, index: true },
    status: { type: Number, required: true, index: true },
    durationMs: { type: Number, required: true },
}, {
    timestamps: true,
});

ApiVitalEventSchema.index({ ts: -1 });
ApiVitalEventSchema.index({ method: 1, path: 1, ts: -1 });
ApiVitalEventSchema.index({ endpoint: 1, ts: -1 });
ApiVitalEventSchema.index({ ts: 1 }, { expireAfterSeconds: VITALS_RETENTION_SECONDS });

export const ApiVitalEvent: Model<IApiVitalEvent> =
    mongoose.models.ApiVitalEvent || mongoose.model<IApiVitalEvent>('ApiVitalEvent', ApiVitalEventSchema);

export interface IWebVitalEvent extends Document {
    ts: Date;
    metricId: string;
    metric: string;
    path: string;
    value: number;
    delta?: number;
    rating?: string;
    navigationType?: string;
    tags?: Record<string, PrimitiveTag>;
}

const WebVitalEventSchema = new Schema<IWebVitalEvent>({
    ts: { type: Date, required: true },
    metricId: { type: String, required: true },
    metric: { type: String, required: true, index: true },
    path: { type: String, required: true, index: true },
    value: { type: Number, required: true },
    delta: { type: Number },
    rating: { type: String },
    navigationType: { type: String },
    tags: { type: Schema.Types.Mixed },
}, {
    timestamps: true,
});

WebVitalEventSchema.index({ ts: -1 });
WebVitalEventSchema.index({ metric: 1, path: 1, ts: -1 });
WebVitalEventSchema.index({ ts: 1 }, { expireAfterSeconds: VITALS_RETENTION_SECONDS });

export const WebVitalEvent: Model<IWebVitalEvent> =
    mongoose.models.WebVitalEvent || mongoose.model<IWebVitalEvent>('WebVitalEvent', WebVitalEventSchema);

export type ModuleDifficulty =
    | 'VeryEasy'
    | 'Easy'
    | 'Medium'
    | 'Hard'
    | 'VeryHard';

export type ModuleID = string;

export interface ModuleData {
    Author?: string | null | undefined;
    Compatibility: 'Unplayable' | 'Compatible' | 'Problematic' | 'Untested';
    DefuserDifficulty: ModuleDifficulty;
    Description: string;
    ExpertDifficulty: ModuleDifficulty;
    FileName?: string;
    ModuleID: ModuleID;
    Name: string;
    Origin: 'Vanilla' | 'Mods';
    Published: string;
    SortKey: string;
    SourceUrl?: string | null | undefined;
    Souvenir?: ModuleSouvenirCompatibility | null | undefined;
    SteamID?: string | null | undefined;
    Symbol?: string | null | undefined;
    TutorialVideoUrl?: string | null | undefined;
    Type: 'Regular' | 'Needy';
    DescriptionText: string;
    TagList?: string[] | null | undefined;
    MysteryModule?:
        | 'MustNotBeHidden'
        | 'RequiresAutoSolve'
        | 'MustNotBeHiddenOrKey'
        | 'MustNotBeKey'
        | null
        | undefined;
    RuleSeedSupport?: 'Supported' | null | undefined;
    TwitchPlays?: ModuleTwitchPlaysData | null | undefined;
    Contributors?: ModuleContributors | null | undefined;
    IsFullBoss?: boolean | null | undefined;
    Ignore?: (ModuleID | '+FullBoss' | '+SemiBoss')[] | null | undefined;
    IsSemiBoss?: boolean | null | undefined;
    License?: 'Republishable' | null | undefined;
    CompatibilityExplanation?: string | null | undefined;
    DisplayName?: string | null | undefined;
    TranslationOf?: string | null | undefined;
}

export interface ModuleSouvenirCompatibility {
    Status: string;
    Explanation?: string | null;
}

export interface ModuleTwitchPlaysData {
    HelpText?: string | null;
    AutoPin?: boolean | null;
    ScoreExplanation?: string | null;
    NeedyScoring?: string | null;
    TagPosition?: string | null;
}

export interface ModuleContributors {
    Developer?: string[] | null;
    'Twitch Plays'?: string[] | null;
    Maintainer?: string[] | null;
    Manual?: string[] | null;
}

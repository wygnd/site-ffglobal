export type BuildMode = "production" | "development";
export type BuildPlatform = "mobile" | "desktop";
export type environmentsVariable = ".development.env" | ".production.env";

export interface BuildPaths {
  entry: string;
  html: string;
  output: string;
  src: string;
  stylesSrc?: string;
  public: string;
}

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  analyzer?: boolean;
  platform: BuildPlatform
}

export interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
}
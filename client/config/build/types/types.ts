export interface IBuildPaths {
    entry: string;
    otput: string;
    html: string;
    src: string;
}

export interface IBuildOptions {
    paths: IBuildPaths,
    port: number;
    mode: 'development' | 'production';
}
interface Options {
    immediate?: boolean;
    lazy?: boolean;
    flush?: string;
    scheduler?: () => void;
    // 其他可能的字段...
}

type EffectFn = (() => void) & { options?: Options, deps?: [] }
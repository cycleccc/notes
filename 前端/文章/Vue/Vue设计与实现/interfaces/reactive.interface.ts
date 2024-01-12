interface Options {
    immediate?: boolean;
    lazy?: boolean;
    flush?: string;
    scheduler?: () => void;
    // 其他可能的字段...
}

interface EffectFn {
    deps?: [];
    options?: Options;
    // 其他可能的字段...
}

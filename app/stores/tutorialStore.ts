// Pinia's defineStore is auto-imported in Nuxt 3 via auto-imports, explicit import may not be required.
// import { defineStore } from "pinia";

export interface TutorialStep {
    id: string;
    title: string;
    description: string;
    target?: string; // data-tutorial-id target
    requiresAction?: boolean;
    optional?: boolean;
}

interface TutorialState {
    active: boolean;
    currentIndex: number;
    completed: Set<string>;
    steps: TutorialStep[];
    dismissed: boolean;
    replayMode: boolean;
}

const LS_KEY = "palette_tutorial_done";

export const useTutorialStore = defineStore("tutorial", () => {
    const uiStore = useUiStore();
    const imageStore = useImageStore();
    const colorStore = useColorStore();
    const colorMode = useColorMode();
    const { t } = useI18n();

    const state = reactive<TutorialState>({
        active: false,
        currentIndex: 0,
        completed: new Set<string>(),
        dismissed: false,
        steps: [],
        replayMode: false,
    });

    const buildSteps = () => {
        state.steps = [
            {
                id: "intro",
                title: t("tutorial.intro.title"),
                description: t("tutorial.intro.desc"),
            },
            {
                id: "language",
                title: t("tutorial.language.title"),
                description: t("tutorial.language.desc"),
                target: "language-select",
                requiresAction: true,
            },
            {
                id: "color-mode",
                title: t("tutorial.mode.title"),
                description: t("tutorial.mode.desc"),
                target: "color-mode-toggle",
                requiresAction: true,
            },
            {
                id: "upload",
                title: t("tutorial.upload.title"),
                description: t("tutorial.upload.desc"),
                target: "upload-dropzone",
                requiresAction: true,
            },
            {
                id: "slider",
                title: t("tutorial.slider.title"),
                description: t("tutorial.slider.desc"),
                target: "color-slider",
                requiresAction: true,
            },
            {
                id: "export",
                title: t("tutorial.export.title"),
                description: t("tutorial.export.desc"),
                target: "export-json",
                requiresAction: true,
            },
            {
                id: "copy",
                title: t("tutorial.copy.title"),
                description: t("tutorial.copy.desc"),
                target: "copy-all",
                requiresAction: true,
            },
            {
                id: "finish",
                title: t("tutorial.finish.title"),
                description: t("tutorial.finish.desc"),
            },
        ];
    };

    const isDone = computed(() => state.completed.has("finish"));
    const currentStep = computed(() => state.steps[state.currentIndex]);

    const persistCompletion = () => {
        if (import.meta.client && isDone.value) {
            localStorage.setItem(LS_KEY, "1");
        }
    };

    const start = () => {
        if (state.active) return;
        buildSteps();
        state.active = true;
        state.currentIndex = 0;
        state.replayMode = false;
    };

    const skip = () => {
        state.active = false;
        state.dismissed = true;
        state.completed.add("finish");
        persistCompletion();
    };

    const markSilent = (id: string) => {
        if (!state.completed.has(id)) state.completed.add(id);
    };

    /**
     * Replay the tour: auto-complete early contextual steps based on current app state
     * Desired behavior (example): if image already uploaded, jump directly to slider step.
     */
    const startReplay = () => {
        buildSteps();
        state.completed.clear();
        state.replayMode = true;
        state.active = true;

        // Always skip intro on replay
        markSilent("intro");
        // Consider language + color-mode inherently done (user saw header already)
        markSilent("language");
        markSilent("color-mode");
        // If an image is present, treat upload as done
        if (imageStore.imagePreview) markSilent("upload");
        // Do NOT silently mark slider/export/copy so user can revisit them

        // Determine first uncompleted step
        const firstPendingIndex = state.steps.findIndex(
            (s) => !state.completed.has(s.id),
        );
        state.currentIndex = firstPendingIndex === -1 ? 0 : firstPendingIndex;
    };

    const mark = (id: string) => {
        if (!state.active) return;
        if (state.completed.has(id)) return;
        state.completed.add(id);
        if (id === "finish") {
            state.active = false;
            persistCompletion();
            return;
        }
        // If the user completed the current step, move exactly one step forward (do not chain-skip to finish)
        if (currentStep.value?.id === id) {
            queueMicrotask(() => {
                if (state.currentIndex < state.steps.length - 1) {
                    state.currentIndex += 1;
                }
            });
        }
    };

    const nextStep = () => {
        if (state.currentIndex < state.steps.length - 1) {
            state.currentIndex += 1;
        } else {
            mark("finish");
        }
    };

    const prevStep = () => {
        if (state.currentIndex > 0) state.currentIndex -= 1;
    };

    watch(
        () => uiStore.currentLocale,
        (_newLocale, _oldLocale) => {
            // Rebuild step titles/descriptions so they re-run i18n lookups
            // and keep the current step selected (by id) so the tour doesn't jump.
            const currentId = currentStep.value?.id;
            buildSteps();
            if (currentId) {
                const idx = state.steps.findIndex((s) => s.id === currentId);
                state.currentIndex = idx !== -1 ? idx : state.currentIndex;
            }
            if (state.active) mark("language");
        },
    );

    watch(
        () => colorMode.preference,
        () => {
            if (state.active && currentStep.value?.id === "color-mode") {
                mark("color-mode");
            }
        },
    );

    watch(
        () => imageStore.imagePreview,
        (val) => {
            if (val && state.active) mark("upload");
        },
    );

    watch(
        () => colorStore.colorCount,
        (val) => {
            if (val && imageStore.imagePreview && state.active) mark("slider");
        },
    );

    const onExport = () => mark("export");
    const onCopyAll = () => mark("copy");

    onMounted(() => {
        if (import.meta.client) {
            const done = localStorage.getItem(LS_KEY);
            if (!done) start();
        }
    });

    // -------------------------
    // Overlay / Spotlight Logic
    // Centralized here so the component template stays declarative only.
    // -------------------------
    const targetRect = ref<DOMRect | null>(null);
    const highlightStyle = ref<Record<string, string>>({});
    const cardStyle = ref<Record<string, string>>({});

    const isCompleted = (id: string) => state.completed.has(id);

    const currentPosition = computed(
        () => `${state.currentIndex + 1} / ${state.steps.length}`,
    );
    const hasPrev = computed(() => state.currentIndex > 0);
    const showNext = computed(
        () => !!currentStep.value && currentStep.value.id !== "finish",
    );
    const nextLabel = computed(() => {
        if (!currentStep.value) return "";
        if (currentStep.value.id === "finish") return "";
        const isPenultimate =
            state.currentIndex === state.steps.length - 2; // next is finish
        return isPenultimate
            ? t("tutorial.controls.finish")
            : t("tutorial.controls.next");
    });

    function findTargetEl(): HTMLElement | null {
        if (!import.meta.client) return null;
        const step = currentStep.value;
        if (!step?.target) return null;
        return document.querySelector<HTMLElement>(
            `[data-tutorial-id="${step.target}"]`,
        );
    }

    function updateStyles() {
        if (!import.meta.client) return;
        const padding = 8;
        if (targetRect.value) {
            const r = targetRect.value;
            highlightStyle.value = {
                top: `${r.top - padding}px`,
                left: `${r.left - padding}px`,
                width: `${r.width + padding * 2}px`,
                height: `${r.height + padding * 2}px`,
                transition: "all 0.25s ease",
            };

            // Card positioning: attempt below; fallback above if not enough space; clamp horizontally.
            const viewportW = window.innerWidth;
            const cardWidth = 300; // matches w-[300px]
            const gap = 12;
            let top = r.bottom + gap;
            const spaceBelow = window.innerHeight - r.bottom;
            if (spaceBelow < 160) {
                // not enough space below, show above
                top = Math.max(8, r.top - gap - 180);
            }
            let left = r.left + r.width / 2 - cardWidth / 2;
            left = Math.min(
                Math.max(8, left),
                Math.max(8, viewportW - cardWidth - 8),
            );
            cardStyle.value = {
                top: `${top}px`,
                left: `${left}px`,
            };
        } else {
            // Center the card if no target element yet.
            highlightStyle.value = {};
            cardStyle.value = {
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            };
        }
    }

    let rafId: number | null = null;
    function measureTarget() {
        if (!import.meta.client) return;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
            const el = findTargetEl();
            if (el) {
                const rect = el.getBoundingClientRect();
                // Only update if changed to reduce reactive churn.
                const prev = targetRect.value;
                if (
                    !prev ||
                    prev.top !== rect.top ||
                    prev.left !== rect.left ||
                    prev.width !== rect.width ||
                    prev.height !== rect.height
                ) {
                    targetRect.value = rect;
                }
            } else {
                targetRect.value = null;
            }
            updateStyles();
        });
    }

    let mutationObserver: MutationObserver | null = null;
    function ensureObserver() {
        if (!import.meta.client) return;
        if (mutationObserver) return;
        mutationObserver = new MutationObserver(() => {
            if (findTargetEl()) {
                measureTarget();
                mutationObserver?.disconnect();
                mutationObserver = null;
            }
        });
        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    // React when the step changes.
    watch(
        () => currentStep.value?.id,
        () => {
            nextTick(() => {
                measureTarget();
                const step = currentStep.value;
                if (step?.target && !findTargetEl()) ensureObserver();
            });
        },
    );

    // Re-measure on resize / scroll.
    if (import.meta.client) {
        window.addEventListener("resize", measureTarget);
        window.addEventListener("scroll", measureTarget, true);
    }

    // Public method if the component ever wants to force re-measure.
    const updateRect = () => measureTarget();

    // Initial styles (centered) before first measurement.
    updateStyles();

    return {
        active: computed(() => state.active),
        steps: computed(() => state.steps),
        currentIndex: computed(() => state.currentIndex),
        currentStep,
        completed: computed(() => state.completed),
        isDone,
        // Spotlight
        targetRect,
        highlightStyle,
        cardStyle,
        currentPosition,
        hasPrev,
        showNext,
        nextLabel,
        isCompleted,
        updateRect,
        start,
        replay: startReplay,
        restart: startReplay,
        skip,
        nextStep,
        prevStep,
        mark,
        onExport,
        onCopyAll,
    };
});

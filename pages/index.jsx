import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { SUBJECT_FILES } from "../lib/contentMap";
import {
  detectGuestMode,
  getDefaultGuestQuota,
  getGuestQuotaSnapshot,
  incrementGuestUsage,
  subscribeToAuthChanges,
  AUTH_SESSION_STORAGE_KEY,
  AUTH_STATE_EVENT,
  broadcastAuthChange,
} from "../lib/guestUsage";

const CREDITS_PER_GENERATION = 1;

const readStoredCredits = () => {
  if (typeof window === "undefined") return 0;
  const stored = window.localStorage.getItem("teachwiseai:credits");
  return stored ? parseInt(stored, 10) : 0;
};

const consumeStoredCredits = (amount) => {
  const current = readStoredCredits();
  const nextCredits = Math.max(current - amount, 0);
  if (typeof window !== "undefined") {
    window.localStorage.setItem("teachwiseai:credits", nextCredits.toString());
  }
  return { nextCredits };
};

const startCreditPurchaseFlow = (router, isGuestUser) => {
  // Dummy implementation
  alert("Credit purchase not implemented");
};

const CreditCounterBadge = ({ theme, isGuestUser, guestQuota, userCredits, userEmail, onAddCredits, style }) => {
  return null; // Dummy component
};

const GRADE_CONFIGS = [
  {
    id: "grade12",
    label: "Grade 12",
    number: 12,
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
  },
  {
    id: "grade11",
    label: "Grade 11",
    number: 11,
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
  },
  {
    id: "grade10",
    label: "Grade 10",
    number: 10,
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
  },
  {
    id: "grade9",
    label: "Grade 9",
    number: 9,
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
  },
  {
    id: "grade8",
    label: "Grade 8",
    number: 8,
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
  },
  {
    id: "grade7",
    label: "Grade 7",
    number: 7,
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
  },
  {
    id: "grade6",
    label: "Grade 6",
    number: 6,
    subjects: ["Maths", "Physics", "Chemistry", "Biology"],
  },
];

const GRADE_NUMBER_MAP = GRADE_CONFIGS.reduce((accumulator, config) => {
  if (config?.id) {
    accumulator[config.id] = config?.number ?? config?.label ?? config.id;
  }
  return accumulator;
}, {});

const SUBJECT_PDF_ACTIONS = {
  grade12: {
    Maths: new Set(["Syllabus", "Reading Materials"]),
  },
  grade11: {},
  grade10: {},
  grade9: {},
  grade8: {},
  grade7: {},
  grade6: {},
};

function PdfContentViewer({ base64Data, isLoading, error, theme, label }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let canceled = false;

    const renderPdf = async () => {
      if (!base64Data || !containerRef.current) {
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
        return;
      }

      try {
        const [{ getDocument, GlobalWorkerOptions }, workerModule] = await Promise.all([
          import("pdfjs-dist/build/pdf"),
          import("pdfjs-dist/build/pdf.worker.entry"),
        ]);

        if (canceled || !containerRef.current) {
          return;
        }

        const workerSrc = workerModule?.default ?? workerModule;
        GlobalWorkerOptions.workerSrc = workerSrc;

        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let index = 0; index < binaryString.length; index += 1) {
          bytes[index] = binaryString.charCodeAt(index);
        }

        const pdfDoc = await getDocument({ data: bytes }).promise;
        if (canceled || !containerRef.current) {
          return;
        }

        const container = containerRef.current;
        container.innerHTML = "";

        for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber += 1) {
          const page = await pdfDoc.getPage(pageNumber);
          if (canceled || !containerRef.current) {
            return;
          }

          const viewport = page.getViewport({ scale: 1.1 });
          const canvas = document.createElement("canvas");
          canvas.style.boxShadow = theme.isDark
            ? "0 10px 25px rgba(15, 23, 42, 0.6)"
            : "0 12px 24px rgba(15, 23, 42, 0.12)";
          canvas.style.borderRadius = "12px";
          canvas.style.width = "100%";
          canvas.style.height = "auto";

          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          container.appendChild(canvas);
          await page.render({ canvasContext: context, viewport }).promise;
        }
      } catch (renderError) {
        if (!containerRef.current) {
          return;
        }
        containerRef.current.innerHTML = "";
        const fallback = document.createElement("div");
        fallback.textContent = "Unable to preview PDF content.";
        fallback.style.padding = "12px";
        fallback.style.border = "1px solid";
        fallback.style.borderRadius = "12px";
        fallback.style.borderColor = theme.panelBorder;
        fallback.style.color = theme.text;
        containerRef.current.appendChild(fallback);
      }
    };

    renderPdf();

    return () => {
      canceled = true;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [base64Data, theme.isDark, theme.panelBorder, theme.text]);

  if (isLoading) {
    return (
      <div
        style={{
          marginTop: "12px",
          padding: "16px",
          borderRadius: "12px",
          border: "1px dashed",
          borderColor: theme.panelBorder,
          color: theme.text,
          fontSize: "0.95rem",
        }}
      >
        Loading {label}...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          marginTop: "12px",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid",
          borderColor: "#f87171",
          color: theme.text,
          fontSize: "0.95rem",
          background: theme.isDark ? "rgba(248, 113, 113, 0.15)" : "#fee2e2",
        }}
      >
        Unable to load {label}. Please try again later.
      </div>
    );
  }

  if (!base64Data) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        display: "grid",
        gap: "18px",
        marginTop: "16px",
        overflowX: "auto",
        paddingBottom: "12px",
      }}
    />
  );
}

function Home() {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/login");
  };

  return (
    <main>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "48px",
            alignItems: "center",
          }}
        >
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(56, 189, 248, 0.18)",
                    color: "#0f172a",
                    padding: "8px 18px",
                    borderRadius: "9999px",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    width: "fit-content",
                    letterSpacing: "0.08em",
                  }}
                >
                  Teachwise AI
                </span>
                <h1
                  style={{
                    fontSize: "clamp(2.3rem, 4vw, 3rem)",
                    margin: 0,
                    fontWeight: 700,
                    color: "#0f172a",
                  }}
                >
                  AI Solutions for Smarter Teaching
                </h1>
                <p
                  style={{
                    margin: 0,
                    fontSize: "1.05rem",
                    lineHeight: 1.8,
                    color: "#1f2937",
                    maxWidth: "540px",
                  }}
                >
                  Streamline lesson planning, automate exam preparation, and gain insights into
                  student progress&mdash;all with Teachwise AI.
                </p>
              </div>

              <blockquote
                style={{
                  margin: 0,
                  paddingLeft: "16px",
                  borderLeft: "3px solid rgba(94, 234, 212, 0.6)",
                  color: "#475569",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  maxWidth: "560px",
                }}
              >
                “A good teacher can inspire hope, ignite the imagination, and instill a love of
                learning.” — Brad Henry
              </blockquote>
            </div>

            <div
              style={{
                position: "relative",
                width: "100%",
                borderRadius: "32px",
                overflow: "hidden",
                boxShadow: "0 32px 60px rgba(15, 23, 42, 0.45)",
              }}
            >
              <Image
                src="/images/classroom-hero.jpg"
                alt="Teacher guiding students in a classroom"
                width={1200}
                height={900}
                priority
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            width: "min(1120px, 100%)",
            marginTop: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              color: "#0ea5e9",
              fontWeight: 700,
              fontSize: "1.05rem",
              letterSpacing: "0.03em",
            }}
          >
            Get started for free
          </span>
          <button
            type="button"
            onClick={handleSignInClick}
            style={{
              padding: "10px 20px",
              borderRadius: "24px",
              border: "1px solid rgba(59, 130, 246, 0.65)",
              background: "rgba(59, 130, 246, 0.12)",
              color: "#1d4ed8",
              fontWeight: 600,
              fontSize: "0.9rem",
              letterSpacing: "0.03em",
              cursor: "pointer",
              boxShadow: "none",
              minWidth: "140px",
              alignSelf: "flex-start",
            }}
          >
            Sign in
          </button>
        </div>
      </main>
  );
}
// End of Home component



export function CbseDashboard({ boardLabel = "CBSE" } = {}) {
  const router = useRouter();
  const [grade12, setGrade12] = useState(false);
  const [grade11, setGrade11] = useState(false);
  const [grade10, setGrade10] = useState(false);
  const [grade9, setGrade9] = useState(false);
  const [grade8, setGrade8] = useState(false);
  const [grade7, setGrade7] = useState(false);
  const [grade6, setGrade6] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState({});
  const [subjectActionSelections, setSubjectActionSelections] = useState({});
  const [pdfCache, setPdfCache] = useState({});
  const [pdfLoading, setPdfLoading] = useState({});
  const [pdfError, setPdfError] = useState({});
  const [presentationStatus, setPresentationStatus] = useState({});
  const [presentationError, setPresentationError] = useState({});
  const [presentationTopics, setPresentationTopics] = useState({});
  const [presentationHistory, setPresentationHistory] = useState({});
  const [handoutStatus, setHandoutStatus] = useState({});
  const [handoutError, setHandoutError] = useState({});
  const [handoutTopics, setHandoutTopics] = useState({});
  const [handoutHistory, setHandoutHistory] = useState({});
  const [lessonPlanStatus, setLessonPlanStatus] = useState({});
  const [lessonPlanError, setLessonPlanError] = useState({});
  const [lessonPlanTopics, setLessonPlanTopics] = useState({});
  const [lessonPlanHistory, setLessonPlanHistory] = useState({});
  const [webPageStatus, setWebPageStatus] = useState({});
  const [webPageError, setWebPageError] = useState({});
  const [webPageTopics, setWebPageTopics] = useState({});
  const [webPageHistory, setWebPageHistory] = useState({});
  const [conceptMapStatus, setConceptMapStatus] = useState({});
  const [conceptMapError, setConceptMapError] = useState({});
  const [conceptMapTopics, setConceptMapTopics] = useState({});
  const [conceptMapHistory, setConceptMapHistory] = useState({});
  const [mcqStatus, setMcqStatus] = useState({});
  const [mcqError, setMcqError] = useState({});
  const [mcqTopics, setMcqTopics] = useState({});
  const [mcqHistory, setMcqHistory] = useState({});
  const initialGuestMode = detectGuestMode();
  const [isGuestUser, setIsGuestUser] = useState(initialGuestMode);
  const [guestQuota, setGuestQuota] = useState(() => getGuestQuotaSnapshot());
  const [userCredits, setUserCredits] = useState(() =>
    initialGuestMode ? null : readStoredCredits(),
  );
  const [userEmail, setUserEmail] = useState(() =>
    initialGuestMode ? null : readStoredEmail(),
  );
  const [authLoading, setAuthLoading] = useState(true);

  const gradeControls = {
    grade12: { isActive: grade12, setActive: setGrade12 },
    grade11: { isActive: grade11, setActive: setGrade11 },
    grade10: { isActive: grade10, setActive: setGrade10 },
    grade9: { isActive: grade9, setActive: setGrade9 },
    grade8: { isActive: grade8, setActive: setGrade8 },
    grade7: { isActive: grade7, setActive: setGrade7 },
    grade6: { isActive: grade6, setActive: setGrade6 },
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    const gradeQuery = router.query.grade;
    const gradeIds = Array.isArray(gradeQuery)
      ? gradeQuery
      : gradeQuery
      ? [gradeQuery]
      : [];

    if (gradeIds.length === 0) {
      return;
    }

    gradeIds.forEach((gradeId) => {
      const control = gradeControls[gradeId];
      if (control && !control.isActive) {
        control.setActive(true);
      }
    });
  }, [router.isReady, router.query.grade]);

  useEffect(() => {
    if (typeof window === "undefined") {
      setAuthLoading(false);
      return () => {};
    }

    setIsGuestUser(detectGuestMode());
    setAuthLoading(false);

    const unsubscribe = subscribeToAuthChanges((guestMode) => {
      setIsGuestUser(guestMode);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (isGuestUser) {
      setGuestQuota(getGuestQuotaSnapshot());
    } else {
      setGuestQuota(getDefaultGuestQuota());
    }
  }, [isGuestUser]);

  useEffect(() => {
    if (isGuestUser) {
      setUserCredits(null);
      setUserEmail(null);
      return;
    }

    setUserCredits(readStoredCredits());
    setUserEmail(readStoredEmail());
  }, [isGuestUser]);

  useEffect(() => {
    const syncCredits = () => {
      setUserCredits(readStoredCredits());
      setUserEmail(readStoredEmail());
    };

    syncCredits();

    if (typeof window === "undefined") {
      return () => {};
    }

    window.addEventListener("storage", syncCredits);
    window.addEventListener(AUTH_STATE_EVENT, syncCredits);

    return () => {
      window.removeEventListener("storage", syncCredits);
      window.removeEventListener(AUTH_STATE_EVENT, syncCredits);
    };
  }, []);

  const handleAddCreditsRequest = () => {
    startCreditPurchaseFlow(router, isGuestUser);
  };

  useEffect(() => {
    if (!router.isReady || authLoading) {
      return;
    }

    const hasAuthTokens =
      typeof window !== "undefined" &&
      ((window.location.search && window.location.search.includes("access_token=")) ||
        (window.location.hash && window.location.hash.includes("access_token=")));

    if (!hasAuthTokens && isGuestUser) {
      router.replace("/login");
    }
  }, [authLoading, isGuestUser, router]);

  const getSubjectKey = (gradeId, subject) => `${gradeId}::${subject}`;
  const getActionKey = (gradeId, subject, action) => `${gradeId}::${subject}::${action}`;

  const handleGenerationConsumption = () => {
    if (isGuestUser) {
      const updatedQuota = incrementGuestUsage();
      setGuestQuota(updatedQuota);
      return;
    }

    const { nextCredits } = consumeStoredCredits(CREDITS_PER_GENERATION);
    setUserCredits((previous) => {
      if (typeof nextCredits === "number") {
        return nextCredits;
      }

      const baseline = typeof previous === "number" ? previous : 0;
      return Math.max(baseline - CREDITS_PER_GENERATION, 0);
    });
  };

  const fetchPdfContent = async (gradeId, subject, action) => {
    const cacheKey = getActionKey(gradeId, subject, action);

    if (pdfCache[cacheKey] || pdfLoading[cacheKey]) {
      return;
    }

    const pdfActions = SUBJECT_PDF_ACTIONS[gradeId]?.[subject];
    if (!pdfActions || !pdfActions.has(action)) {
      return;
    }

    try {
      setPdfLoading((prev) => ({ ...prev, [cacheKey]: true }));
      setPdfError((prev) => ({ ...prev, [cacheKey]: null }));

      const gradeParam = GRADE_NUMBER_MAP[gradeId] ?? gradeId;
      const params = new URLSearchParams({
        subject,
        type: action,
        grade: String(gradeParam),
      });
      const response = await fetch(`/api/syllabus?${params.toString()}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }

      const payload = await response.json();
      setPdfCache((prev) => ({ ...prev, [cacheKey]: payload?.base64 ?? null }));
    } catch (error) {
      setPdfError((prev) => ({
        ...prev,
        [cacheKey]: error.message || "Unknown error",
      }));
    } finally {
      setPdfLoading((prev) => ({ ...prev, [cacheKey]: false }));
    }
  };

  const toggleSubjectSelection = (gradeConfig, subject) => {
    const gradeId = gradeConfig.id;
    const subjectKey = getSubjectKey(gradeId, subject);
    setSelectedSubjects((prev) => {
      const gradeSubjects = { ...(prev?.[gradeId] ?? {}) };
      const isSelected = Boolean(gradeSubjects[subject]);

      if (isSelected) {
        delete gradeSubjects[subject];
      } else {
        gradeSubjects[subject] = true;
      }

      const nextSelected = {
        ...prev,
        [gradeId]: gradeSubjects,
      };

      if (Object.keys(gradeSubjects).length === 0) {
        delete nextSelected[gradeId];
      }

      setSubjectActionSelections((prevActions) => {
        const gradeActions = { ...(prevActions?.[gradeId] ?? {}) };
        if (isSelected) {
          delete gradeActions[subject];
        } else {
          const initialActionsState = SUBJECT_ACTIONS.reduce(
            (acc, action) => ({ ...acc, [action]: false }),
            {}
          );
          gradeActions[subject] = initialActionsState;
        }

        const nextActions = {
          ...prevActions,
          [gradeId]: gradeActions,
        };

        if (Object.keys(gradeActions).length === 0) {
          delete nextActions[gradeId];
        }

        return nextActions;
      });

      if (isSelected) {
        const actionPrefix = `${gradeId}::${subject}::`;

        setPdfCache((prevCache) => {
          const updatedCache = { ...prevCache };
          Object.keys(updatedCache).forEach((key) => {
            if (key.startsWith(actionPrefix)) {
              delete updatedCache[key];
            }
          });
          return updatedCache;
        });

        setPdfLoading((prevLoading) => {
          const updatedLoading = { ...prevLoading };
          Object.keys(updatedLoading).forEach((key) => {
            if (key.startsWith(actionPrefix)) {
              delete updatedLoading[key];
            }
          });
          return updatedLoading;
        });

        setPdfError((prevError) => {
          const updatedError = { ...prevError };
          Object.keys(updatedError).forEach((key) => {
            if (key.startsWith(actionPrefix)) {
              delete updatedError[key];
            }
          });
          return updatedError;
        });

        setPresentationStatus((prevStatus) => {
          const updated = { ...prevStatus };
          delete updated[subjectKey];
          return updated;
        });

        setPresentationError((prevPresentationError) => {
          const updated = { ...prevPresentationError };
          delete updated[subjectKey];
          return updated;
        });

        setPresentationTopics((prevTopics) => {
          const updated = { ...prevTopics };
          delete updated[subjectKey];
          return updated;
        });

        setPresentationHistory((prevHistory) => {
          const updated = { ...prevHistory };
          delete updated[subjectKey];
          return updated;
        });

        setHandoutStatus((prevHandoutStatus) => {
          const updated = { ...prevHandoutStatus };
          delete updated[subjectKey];
          return updated;
        });

        setHandoutError((prevHandoutError) => {
          const updated = { ...prevHandoutError };
          delete updated[subjectKey];
          return updated;
        });

        setHandoutTopics((prevHandoutTopics) => {
          const updated = { ...prevHandoutTopics };
          delete updated[subjectKey];
          return updated;
        });

        setHandoutHistory((prevHandoutHistory) => {
          const updated = { ...prevHandoutHistory };
          delete updated[subjectKey];
          return updated;
        });

        setLessonPlanStatus((prevLessonPlanStatus) => {
          const updated = { ...prevLessonPlanStatus };
          delete updated[subjectKey];
          return updated;
        });

        setLessonPlanError((prevLessonPlanError) => {
          const updated = { ...prevLessonPlanError };
          delete updated[subjectKey];
          return updated;
        });

        setLessonPlanTopics((prevLessonPlanTopics) => {
          const updated = { ...prevLessonPlanTopics };
          delete updated[subjectKey];
          return updated;
        });

        setLessonPlanHistory((prevLessonPlanHistory) => {
          const updated = { ...prevLessonPlanHistory };
          delete updated[subjectKey];
          return updated;
        });

        setWebPageStatus((prevWebPageStatus) => {
          const updated = { ...prevWebPageStatus };
          delete updated[subjectKey];
          return updated;
        });

        setWebPageError((prevWebPageError) => {
          const updated = { ...prevWebPageError };
          delete updated[subjectKey];
          return updated;
        });

        setWebPageTopics((prevWebPageTopics) => {
          const updated = { ...prevWebPageTopics };
          delete updated[subjectKey];
          return updated;
        });

        setWebPageHistory((prevWebPageHistory) => {
          const updated = { ...prevWebPageHistory };
          delete updated[subjectKey];
          return updated;
        });

        setConceptMapStatus((prevConceptMapStatus) => {
          const updated = { ...prevConceptMapStatus };
          delete updated[subjectKey];
          return updated;
        });

        setConceptMapError((prevConceptMapError) => {
          const updated = { ...prevConceptMapError };
          delete updated[subjectKey];
          return updated;
        });

        setConceptMapTopics((prevConceptMapTopics) => {
          const updated = { ...prevConceptMapTopics };
          delete updated[subjectKey];
          return updated;
        });

        setConceptMapHistory((prevConceptMapHistory) => {
          const updated = { ...prevConceptMapHistory };
          delete updated[subjectKey];
          return updated;
        });

        setMcqStatus((prevMcqStatus) => {
          const updated = { ...prevMcqStatus };
          delete updated[subjectKey];
          return updated;
        });

        setMcqError((prevMcqError) => {
          const updated = { ...prevMcqError };
          delete updated[subjectKey];
          return updated;
        });

        setMcqTopics((prevMcqTopics) => {
          const updated = { ...prevMcqTopics };
          delete updated[subjectKey];
          return updated;
        });

        setMcqHistory((prevMcqHistory) => {
          const updated = { ...prevMcqHistory };
          delete updated[subjectKey];
          return updated;
        });
      }

      return nextSelected;
    });
  };

  const triggerPresentationDownload = async (gradeId, subject, topic) => {
    if (isGuestUser) {
      router.push("/login");
      return;
    }
    const subjectKey = getSubjectKey(gradeId, subject);
    const gradeParam = GRADE_NUMBER_MAP[gradeId] ?? gradeId;

    if (!topic) {
      setPresentationStatus((prev) => ({ ...prev, [subjectKey]: "missing-topic" }));
      return;
    }

    if (isGuestUser && guestQuota.remaining <= 0) {
      setPresentationStatus((prev) => ({ ...prev, [subjectKey]: "quota-exceeded" }));
      return;
    }

    if (!isGuestUser && isOutOfCredits) {
      setPresentationStatus((prev) => ({ ...prev, [subjectKey]: "no-credits" }));
      return;
    }

    setPresentationStatus((prev) => ({ ...prev, [subjectKey]: "loading" }));
    setPresentationError((prev) => ({ ...prev, [subjectKey]: null }));

    try {
      const response = await fetch(`/api/presentation?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}&grade=${encodeURIComponent(String(gradeParam))}`, {
        cache: "no-store",
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to generate presentation");
      }

      const payload = await response.json();
      if (!payload?.base64) {
        throw new Error("Missing presentation content");
      }

      const byteCharacters = atob(payload.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i += 1) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      });

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${subject.replace(/\s+/g, "_")}_${topic.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "presentation"}.pptx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setPresentationTopics((prev) => ({ ...prev, [subjectKey]: "" }));
      setPresentationHistory((prev) => ({
        ...prev,
        [subjectKey]: [topic, ...(prev?.[subjectKey] ?? []).filter((item) => item !== topic)].slice(0, 5),
      }));

      handleGenerationConsumption();

      setPresentationStatus((prev) => ({ ...prev, [subjectKey]: "success" }));
    } catch (error) {
      setPresentationStatus((prev) => ({ ...prev, [subjectKey]: "error" }));
      setPresentationError((prev) => ({
        ...prev,
        [subjectKey]: error.message || "Unable to generate presentation",
      }));
    }
  };

  // Reads the stored user email from localStorage
const readStoredEmail = () => {
  if (typeof window === "undefined") return null;

  try {
    const email = window.localStorage.getItem("teachwiseai:email");
    return email || null;
  } catch (error) {
    console.error("Failed to4 read stored email:", error);
    return null;
  }
};


  const triggerHandoutDownload = async (gradeId, subject, topic) => {
    if (isGuestUser) {
      router.push("/login");
      return;
    }
    const subjectKey = getSubjectKey(gradeId, subject);
    const gradeParam = GRADE_NUMBER_MAP[gradeId] ?? gradeId;

    if (!topic) {
      setHandoutStatus((prev) => ({ ...prev, [subjectKey]: "missing-topic" }));
      return;
    }

    if (isGuestUser && guestQuota.remaining <= 0) {
      setHandoutStatus((prev) => ({ ...prev, [subjectKey]: "quota-exceeded" }));
      return;
    }

    if (!isGuestUser && isOutOfCredits) {
      setHandoutStatus((prev) => ({ ...prev, [subjectKey]: "no-credits" }));
      return;
    }

    setHandoutStatus((prev) => ({ ...prev, [subjectKey]: "loading" }));
    setHandoutError((prev) => ({ ...prev, [subjectKey]: null }));

    try {
      const response = await fetch(`/api/pdf?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}&grade=${encodeURIComponent(String(gradeParam))}`, {
        cache: "no-store",
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const payload = await response.json();
      if (!payload?.base64) {
        throw new Error("Missing PDF content");
      }

      const byteCharacters = atob(payload.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i += 1) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${subject.replace(/\s+/g, "_")}_${topic.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "handout"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setHandoutTopics((prev) => ({ ...prev, [subjectKey]: "" }));
      setHandoutHistory((prev) => ({
        ...prev,
        [subjectKey]: [topic, ...(prev?.[subjectKey] ?? []).filter((item) => item !== topic)].slice(0, 5),
      }));

      handleGenerationConsumption();

      setHandoutStatus((prev) => ({ ...prev, [subjectKey]: "success" }));
    } catch (error) {
      setHandoutStatus((prev) => ({ ...prev, [subjectKey]: "error" }));
      setHandoutError((prev) => ({
        ...prev,
        [subjectKey]: error.message || "Unable to generate PDF",
      }));
    }
  };

  const triggerLessonPlanDownload = async (gradeId, subject, topic) => {
    if (isGuestUser) {
      router.push("/login");
      return;
    }
    const subjectKey = getSubjectKey(gradeId, subject);
    const gradeParam = GRADE_NUMBER_MAP[gradeId] ?? gradeId;

    if (!topic) {
      setLessonPlanStatus((prev) => ({ ...prev, [subjectKey]: "missing-topic" }));
      return;
    }

    if (isGuestUser && guestQuota.remaining <= 0) {
      setLessonPlanStatus((prev) => ({ ...prev, [subjectKey]: "quota-exceeded" }));
      return;
    }

    if (!isGuestUser && isOutOfCredits) {
      setLessonPlanStatus((prev) => ({ ...prev, [subjectKey]: "no-credits" }));
      return;
    }

    setLessonPlanStatus((prev) => ({ ...prev, [subjectKey]: "loading" }));
    setLessonPlanError((prev) => ({ ...prev, [subjectKey]: null }));

    try {
      const response = await fetch(`/api/lesson-plan?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}&grade=${encodeURIComponent(String(gradeParam))}`, {
        cache: "no-store",
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to generate lesson plan");
      }

      const payload = await response.json();
      if (!payload?.base64) {
        throw new Error("Missing lesson plan content");
      }

      const byteCharacters = atob(payload.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i += 1) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${subject.replace(/\s+/g, "_")}_${topic.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "lesson_plan"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setLessonPlanTopics((prev) => ({ ...prev, [subjectKey]: "" }));
      setLessonPlanHistory((prev) => ({
        ...prev,
        [subjectKey]: [topic, ...(prev?.[subjectKey] ?? []).filter((item) => item !== topic)].slice(0, 5),
      }));

      handleGenerationConsumption();

      setLessonPlanStatus((prev) => ({ ...prev, [subjectKey]: "success" }));
    } catch (error) {
      setLessonPlanStatus((prev) => ({ ...prev, [subjectKey]: "error" }));
      setLessonPlanError((prev) => ({
        ...prev,
        [subjectKey]: error.message || "Unable to generate lesson plan",
      }));
    }
  };

  const triggerWebPageDownload = async (gradeId, subject, topic) => {
    if (isGuestUser) {
      router.push("/login");
      return;
    }
    const subjectKey = getSubjectKey(gradeId, subject);
    const gradeParam = GRADE_NUMBER_MAP[gradeId] ?? gradeId;

    if (!topic) {
      setWebPageStatus((prev) => ({ ...prev, [subjectKey]: "missing-topic" }));
      return;
    }

    if (isGuestUser && guestQuota.remaining <= 0) {
      setWebPageStatus((prev) => ({ ...prev, [subjectKey]: "quota-exceeded" }));
      return;
    }

    if (!isGuestUser && isOutOfCredits) {
      setWebPageStatus((prev) => ({ ...prev, [subjectKey]: "no-credits" }));
      return;
    }

    setWebPageStatus((prev) => ({ ...prev, [subjectKey]: "loading" }));
    setWebPageError((prev) => ({ ...prev, [subjectKey]: null }));

    try {
      const response = await fetch(`/api/web-page?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}&grade=${encodeURIComponent(String(gradeParam))}`, {
        cache: "no-store",
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to generate web page");
      }

      const payload = await response.json();
      if (!payload?.base64) {
        throw new Error("Missing web page content");
      }

      const byteCharacters = atob(payload.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i += 1) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "text/html;charset=utf-8" });

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${subject.replace(/\s+/g, "_")}_${topic.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "lesson"}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setWebPageTopics((prev) => ({ ...prev, [subjectKey]: "" }));
      setWebPageHistory((prev) => ({
        ...prev,
        [subjectKey]: [topic, ...(prev?.[subjectKey] ?? []).filter((item) => item !== topic)].slice(0, 5),
      }));

      handleGenerationConsumption();

      setWebPageStatus((prev) => ({ ...prev, [subjectKey]: "success" }));
    } catch (error) {
      setWebPageStatus((prev) => ({ ...prev, [subjectKey]: "error" }));
      setWebPageError((prev) => ({
        ...prev,
        [subjectKey]: error.message || "Unable to generate web page",
      }));
    }
  };

  const triggerConceptMapDownload = async (gradeId, subject, topic) => {
    if (isGuestUser) {
      router.push("/login");
      return;
    }
    const subjectKey = getSubjectKey(gradeId, subject);
    const gradeParam = GRADE_NUMBER_MAP[gradeId] ?? gradeId;

    if (!topic) {
      setConceptMapStatus((prev) => ({ ...prev, [subjectKey]: "missing-topic" }));
      return;
    }

    if (isGuestUser && guestQuota.remaining <= 0) {
      setConceptMapStatus((prev) => ({ ...prev, [subjectKey]: "quota-exceeded" }));
      return;
    }

    if (!isGuestUser && isOutOfCredits) {
      setConceptMapStatus((prev) => ({ ...prev, [subjectKey]: "no-credits" }));
      return;
    }

    setConceptMapStatus((prev) => ({ ...prev, [subjectKey]: "loading" }));
    setConceptMapError((prev) => ({ ...prev, [subjectKey]: null }));

    try {
      const response = await fetch(`/api/concept-map?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}&grade=${encodeURIComponent(String(gradeParam))}`, {
        cache: "no-store",
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to generate concept map");
      }

      const payload = await response.json();
      if (!payload?.base64) {
        throw new Error("Missing concept map content");
      }

      const byteCharacters = atob(payload.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i += 1) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: "application/pdf",
      });

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${subject.replace(/\s+/g, "_")}_${topic.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "concept_map"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setConceptMapTopics((prev) => ({ ...prev, [subjectKey]: "" }));
      setConceptMapHistory((prev) => ({
        ...prev,
        [subjectKey]: [topic, ...(prev?.[subjectKey] ?? []).filter((item) => item !== topic)].slice(0, 5),
      }));

      handleGenerationConsumption();

      setConceptMapStatus((prev) => ({ ...prev, [subjectKey]: "success" }));
    } catch (error) {
      setConceptMapStatus((prev) => ({ ...prev, [subjectKey]: "error" }));
      setConceptMapError((prev) => ({
        ...prev,
        [subjectKey]: error.message || "Unable to generate concept map",
      }));
    }
  };

  const triggerMcqDownload = async (gradeId, subject, topic) => {
    if (isGuestUser) {
      router.push("/login");
      return;
    }
    const subjectKey = getSubjectKey(gradeId, subject);
    const gradeParam = GRADE_NUMBER_MAP[gradeId] ?? gradeId;

    if (!topic) {
      setMcqStatus((prev) => ({ ...prev, [subjectKey]: "missing-topic" }));
      return;
    }

    if (isGuestUser && guestQuota.remaining <= 0) {
      setMcqStatus((prev) => ({ ...prev, [subjectKey]: "quota-exceeded" }));
      return;
    }

    if (!isGuestUser && isOutOfCredits) {
      setMcqStatus((prev) => ({ ...prev, [subjectKey]: "no-credits" }));
      return;
    }

    setMcqStatus((prev) => ({ ...prev, [subjectKey]: "loading" }));
    setMcqError((prev) => ({ ...prev, [subjectKey]: null }));

    try {
      const response = await fetch(`/api/mcqs?subject=${encodeURIComponent(subject)}&topic=${encodeURIComponent(topic)}&grade=${encodeURIComponent(String(gradeParam))}`, {
        cache: "no-store",
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to generate MCQs");
      }

      const payload = await response.json();
      if (!payload?.base64) {
        throw new Error("Missing MCQ content");
      }

      const byteCharacters = atob(payload.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let index = 0; index < byteCharacters.length; index += 1) {
        byteNumbers[index] = byteCharacters.charCodeAt(index);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: "application/pdf",
      });

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${subject.replace(/\s+/g, "_")}_${topic.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "mcqs"}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      setMcqTopics((prev) => ({ ...prev, [subjectKey]: "" }));
      setMcqHistory((prev) => ({
        ...prev,
        [subjectKey]: [topic, ...(prev?.[subjectKey] ?? []).filter((item) => item !== topic)].slice(0, 5),
      }));

      handleGenerationConsumption();

      setMcqStatus((prev) => ({ ...prev, [subjectKey]: "success" }));
    } catch (error) {
      setMcqStatus((prev) => ({ ...prev, [subjectKey]: "error" }));
      setMcqError((prev) => ({
        ...prev,
        [subjectKey]: error.message || "Unable to generate MCQs",
      }));
    }
  };

  const toggleSubjectAction = (gradeConfig, subject, action) => {
    const gradeId = gradeConfig.id;
    const subjectKey = getSubjectKey(gradeId, subject);
    const subjectState = subjectActionSelections?.[gradeId]?.[subject] ?? {};
    const cacheKey = getActionKey(gradeId, subject, action);
    const hasPdf = Boolean(SUBJECT_PDF_ACTIONS[gradeId]?.[subject]?.has(action));

    if (action === "Syllabus" || action === "Reading Materials") {
      const subjectSlug = subject.toLowerCase();
      const actionKey = action.toLowerCase();
      const fileName = SUBJECT_FILES[subjectSlug]?.[actionKey];
      const normalizedPath =
        fileName &&
        (fileName.startsWith("http")
          ? fileName
          : `/${fileName.replace(/^[/\\]+/, "")}`);

      setSubjectActionSelections((prev) => {
        const gradeActions = { ...(prev?.[gradeId] ?? {}) };
        const updatedSubjectState = {
          ...(gradeActions[subject] ?? {}),
          [action]: false,
        };

        if (Object.values(updatedSubjectState).every((value) => value === false)) {
          delete gradeActions[subject];
        } else {
          gradeActions[subject] = updatedSubjectState;
        }

        const nextState = {
          ...prev,
          [gradeId]: gradeActions,
        };

        if (Object.keys(gradeActions).length === 0) {
          delete nextState[gradeId];
        }

        return nextState;
      });

      if (hasPdf) {
        setPdfCache((prev) => {
          if (!prev?.[cacheKey]) {
            return prev;
          }
          const updated = { ...prev };
          delete updated[cacheKey];
          return updated;
        });
        setPdfLoading((prev) => {
          if (!prev?.[cacheKey]) {
            return prev;
          }
          const updated = { ...prev };
          delete updated[cacheKey];
          return updated;
        });
        setPdfError((prev) => {
          if (!prev?.[cacheKey]) {
            return prev;
          }
          const updated = { ...prev };
          delete updated[cacheKey];
          return updated;
        });
      }

      if (normalizedPath && typeof window !== "undefined") {
        window.open(normalizedPath, "_blank", "noopener,noreferrer");
      }

      return;
    }

    const nextValue = !subjectState?.[action];

    setSubjectActionSelections((prev) => {
      const gradeActions = { ...(prev?.[gradeId] ?? {}) };
      const updatedSubjectState = {
        ...(gradeActions[subject] ?? {}),
        [action]: nextValue,
      };

      if (Object.values(updatedSubjectState).every((value) => value === false)) {
        delete gradeActions[subject];
      } else {
        gradeActions[subject] = updatedSubjectState;
      }

      const nextActions = {
        ...prev,
        [gradeId]: gradeActions,
      };

      if (Object.keys(gradeActions).length === 0) {
        delete nextActions[gradeId];
      }

      return nextActions;
    });

    if (nextValue) {
      if (hasPdf) {
        fetchPdfContent(gradeId, subject, action);
      }
      if (action === "Generate presentations") {
        const topic = presentationTopics[subjectKey]?.trim();
        triggerPresentationDownload(gradeId, subject, topic);
      }
      if (action === "Generate PDF") {
        const topic = handoutTopics[subjectKey]?.trim();
        triggerHandoutDownload(gradeId, subject, topic);
      }
      if (action === "Lesson Plan") {
        const topic = lessonPlanTopics[subjectKey]?.trim();
        triggerLessonPlanDownload(gradeId, subject, topic);
      }
      if (action === "Generate Web Page") {
        const topic = webPageTopics[subjectKey]?.trim();
        triggerWebPageDownload(gradeId, subject, topic);
      }
      if (action === "Generate Concept Map") {
        const topic = conceptMapTopics[subjectKey]?.trim();
        triggerConceptMapDownload(gradeId, subject, topic);
      }
      if (action === "Generate MCQs") {
        const topic = mcqTopics[subjectKey]?.trim();
        triggerMcqDownload(gradeId, subject, topic);
      }
    } else {
      if (hasPdf) {
        setPdfCache((prev) => {
          const updated = { ...prev };
          delete updated[cacheKey];
          return updated;
        });
        setPdfLoading((prev) => {
          const updated = { ...prev };
          delete updated[cacheKey];
          return updated;
        });
        setPdfError((prev) => {
          const updated = { ...prev };
          delete updated[cacheKey];
          return updated;
        });
      }

      if (action === "Generate presentations") {
        setPresentationStatus((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setPresentationError((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setPresentationTopics((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
      }
      if (action === "Generate PDF") {
        setHandoutStatus((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setHandoutError((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setHandoutTopics((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setHandoutHistory((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
      }
      if (action === "Lesson Plan") {
        setLessonPlanStatus((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setLessonPlanError((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setLessonPlanTopics((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setLessonPlanHistory((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
      }
      if (action === "Generate Web Page") {
        setWebPageStatus((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setWebPageError((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setWebPageTopics((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setWebPageHistory((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
      }
      if (action === "Generate Concept Map") {
        setConceptMapStatus((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setConceptMapError((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setConceptMapTopics((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setConceptMapHistory((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
      }
      if (action === "Generate MCQs") {
        setMcqStatus((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setMcqError((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setMcqTopics((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
        setMcqHistory((prev) => {
          const { [subjectKey]: _removed, ...rest } = prev;
          return rest;
        });
      }
    }
  };

  const theme = isDarkMode
    ? {
        background: "#0b1120",
        text: "#e2e8f0",
        panel: "#111827",
        panelBorder: "#1f2937",
        accent: "#38bdf8",
        isDark: true,
      }
    : {
        background: "#ffffff",
        text: "#0f172a",
        panel: "#f8fafc",
        panelBorder: "#e2e8f0",
        accent: "#2563eb",
        isDark: false,
      };
  const guestLimitMessage = "Guest limit reached.";
  const noCreditsMessage = `You need at least ${CREDITS_PER_GENERATION} credits to generate.`;
  const guestLimitReached = isGuestUser && guestQuota.remaining <= 0;
  const effectiveCredits = typeof userCredits === "number" ? userCredits : 0;
  const isOutOfCredits = effectiveCredits < CREDITS_PER_GENERATION;
  const shouldDisableGeneration = guestLimitReached || (!isGuestUser && isOutOfCredits);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: theme.background,
        color: theme.text,
        position: "relative",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        padding: "60px 20px 40px",
        textAlign: "center",
      }}
    >
      <CreditCounterBadge
        theme={theme}
        isGuestUser={isGuestUser}
        guestQuota={guestQuota}
        userCredits={userCredits}
        userEmail={userEmail}
        onAddCredits={handleAddCreditsRequest}
        style={{ top: "24px" }}
      />
      <button
        type="button"
        onClick={() => setIsDarkMode(!isDarkMode)}
        aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
        style={{
          position: "absolute",
          top: "24px",
          right: "16px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "8px 16px",
          borderRadius: "9999px",
          border: "1px solid",
          borderColor: theme.panelBorder,
          background: theme.panel,
          color: theme.text,
          cursor: "pointer",
          fontWeight: 600,
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
      >
        <span>{isDarkMode ? "Dark" : "Light"}</span>
        <span
          style={{
            position: "relative",
            width: "42px",
            height: "22px",
            borderRadius: "9999px",
            background: isDarkMode ? theme.accent : "#cbd5f5",
            border: "1px solid",
            borderColor: theme.panelBorder,
            transition: "background 0.2s ease",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "2px",
              left: isDarkMode ? "22px" : "2px",
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              background: isDarkMode ? "#0b1120" : "#f8fafc",
              boxShadow: "0 2px 4px rgba(15, 23, 42, 0.25)",
              transition: "left 0.2s ease, background 0.2s ease",
            }}
          />
        </span>
      </button>
      <button
        type="button"
        onClick={() => router.push("/")}
        style={{
          alignSelf: "flex-end",
          marginBottom: "16px",
          padding: "8px 14px",
          borderRadius: "9999px",
          border: "1px solid",
          borderColor: theme.panelBorder,
          background: theme.isDark ? "rgba(30, 64, 175, 0.25)" : "#eff6ff",
          color: theme.isDark ? "#bfdbfe" : "#1d4ed8",
          fontSize: "0.9rem",
          fontWeight: 600,
          cursor: "pointer",
          transition: "background 0.2s ease, color 0.2s ease",
        }}
      >
        Back to Board Selection
      </button>
      {/* Welcome Message */}
      <h1
        style={{
          fontSize: "1.6rem",
          fontWeight: 600,
          marginBottom: "12px",
          letterSpacing: "0.01em",
        }}
      >
        Welcome to teachwiseai.mpaiapps.com
      </h1>

      {/* Board Heading */}
      <h2
        style={{
          fontSize: "1.35rem",
          fontWeight: 700,
          marginBottom: "10px",
          letterSpacing: "0.02em",
        }}
      >
        {boardLabel}
      </h2>



      {/* Checkboxes */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: "1.2rem",
          background: theme.panel,
          border: "1px solid",
          borderColor: theme.panelBorder,
          padding: "16px 24px",
          borderRadius: "14px",
          width: "100%",
          maxWidth: "720px",
          textAlign: "left",
          boxShadow: isDarkMode
            ? "0 20px 35px rgba(15, 23, 42, 0.5)"
            : "0 18px 30px rgba(15, 23, 42, 0.08)",
        }}
      >
        {GRADE_CONFIGS.map((gradeConfig) => {
          const control = gradeControls[gradeConfig.id];
          if (!control) {
            return null;
          }

          const { isActive, setActive } = control;
          const selectedGradeSubjects = selectedSubjects?.[gradeConfig.id] ?? {};

          return (
            <div
              key={gradeConfig.id}
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => setActive(!isActive)}
                  style={{ accentColor: theme.accent }}
                />
                {gradeConfig.label}
              </label>

              {isActive && (
                <div
                  style={{
                    paddingLeft: "30px",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: "8px 18px",
                    fontSize: "1rem",
                    color: theme.text,
                  }}
                >
                  {gradeConfig.subjects.map((subject) => {
                    const isSelected = Boolean(selectedGradeSubjects[subject]);
                    const subjectKey = getSubjectKey(gradeConfig.id, subject);
                    const actionState =
                      subjectActionSelections?.[gradeConfig.id]?.[subject] ?? {};

                    return (
                      <div
                        key={`${gradeConfig.id}-${subject}`}
                        style={{ display: "flex", flexDirection: "column", gap: "6px" }}
                      >
                        <label
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            background: isDarkMode
                              ? isSelected
                                ? "rgba(56, 189, 248, 0.25)"
                                : "rgba(15, 23, 42, 0.35)"
                              : isSelected
                              ? "#bfdbfe"
                              : "#eef2ff",
                            borderRadius: "12px",
                            padding: "8px 10px",
                            border: "1px solid",
                            borderColor: isDarkMode
                              ? isSelected
                                ? "#38bdf8"
                                : "#1e293b"
                              : isSelected
                              ? "#60a5fa"
                              : "#c7d2fe",
                            transition: "background 0.2s ease, border-color 0.2s ease",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSubjectSelection(gradeConfig, subject)}
                            style={{ accentColor: theme.accent }}
                          />
                          {subject}
                        </label>

                        {isSelected && (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              paddingLeft: "32px",
                              paddingRight: "8px",
                            }}
                          >
                            {SUBJECT_ACTIONS.map((action) => {
                              const isActionSelected = Boolean(actionState[action]);
                              const cacheKey = getActionKey(gradeConfig.id, subject, action);
                              const pdfSet =
                                SUBJECT_PDF_ACTIONS[gradeConfig.id]?.[subject];
                              const hasPdf = Boolean(pdfSet?.has(action));
                              const isSyllabus = action === "Syllabus";
                              const isReadingMaterials = action === "Reading Materials";
                              const showInlinePdf = hasPdf && !isSyllabus && !isReadingMaterials;
                              const presentationState = presentationStatus[subjectKey];
                              const presentationErrorMessage = presentationError[subjectKey];
                              const topicValue = presentationTopics[subjectKey] ?? "";
                              const recentTopics = presentationHistory[subjectKey] ?? [];
                              const handoutState = handoutStatus[subjectKey];
                              const handoutErrorMessage = handoutError[subjectKey];
                              const handoutValue = handoutTopics[subjectKey] ?? "";
                              const handoutRecent = handoutHistory[subjectKey] ?? [];
                              const lessonPlanState = lessonPlanStatus[subjectKey];
                              const lessonPlanErrorMessage = lessonPlanError[subjectKey];
                              const lessonPlanValue = lessonPlanTopics[subjectKey] ?? "";
                              const lessonPlanRecent = lessonPlanHistory[subjectKey] ?? [];
                              const webPageState = webPageStatus[subjectKey];
                              const webPageErrorMessage = webPageError[subjectKey];
                              const webPageValue = webPageTopics[subjectKey] ?? "";
                              const webPageRecent = webPageHistory[subjectKey] ?? [];
                              const conceptMapState = conceptMapStatus[subjectKey];
                              const conceptMapErrorMessage = conceptMapError[subjectKey];
                              const conceptMapValue = conceptMapTopics[subjectKey] ?? "";
                              const conceptMapRecent = conceptMapHistory[subjectKey] ?? [];
                              const mcqState = mcqStatus[subjectKey];
                              const mcqErrorMessage = mcqError[subjectKey];
                              const mcqValue = mcqTopics[subjectKey] ?? "";
                              const mcqRecent = mcqHistory[subjectKey] ?? [];

                              return (
                                <div
                                  key={action}
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "6px",
                                  }}
                                >
                                  <label
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                      fontSize: "0.92rem",
                                      color: theme.text,
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={isActionSelected}
                                      onChange={() =>
                                        toggleSubjectAction(gradeConfig, subject, action)
                                      }
                                      style={{ accentColor: theme.accent }}
                                    />
                                    {action}
                                  </label>

                                  {isActionSelected && showInlinePdf && (
                                    <PdfContentViewer
                                      base64Data={pdfCache[cacheKey]}
                                      isLoading={Boolean(pdfLoading[cacheKey])}
                                      error={pdfError[cacheKey]}
                                      theme={theme}
                                      label={`${gradeConfig.label} ${subject} ${action}`}
                                    />
                                  )}

                                  {isActionSelected && action === "Generate presentations" && (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "6px",
                                        paddingLeft: "6px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "8px",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          value={topicValue}
                                          onChange={(event) => {
                                            const { value } = event.target;
                                            setPresentationTopics((prev) => ({
                                              ...prev,
                                              [subjectKey]: value,
                                            }));
                                            if (presentationStatus[subjectKey] === "missing-topic") {
                                              setPresentationStatus((prev) => ({
                                                ...prev,
                                                [subjectKey]: null,
                                              }));
                                            }
                                          }}
                                          placeholder="Search topic"
                                          style={{
                                            flex: "1",
                                            padding: "8px 12px",
                                            borderRadius: "10px",
                                            border: "1px solid",
                                            borderColor: theme.panelBorder,
                                            background: theme.isDark ? "#0f172a" : "#f8fafc",
                                            color: theme.text,
                                          }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            triggerPresentationDownload(
                                              gradeConfig.id,
                                              subject,
                                              topicValue.trim()
                                            )
                                          }
                                          style={{
                                            padding: "8px 16px",
                                            borderRadius: "10px",
                                            border: "none",
                                            background: theme.accent,
                                            color: theme.isDark ? "#0b1120" : "#ffffff",
                                            fontWeight: 600,
                                            cursor: "pointer",
                                          }}
                                          disabled={presentationState === "loading" || shouldDisableGeneration}
                                        >
                                          {presentationState === "loading"
                                            ? "Generating..."
                                            : "Generate"}
                                        </button>
                                      </div>
                                      {presentationState === "missing-topic" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f97316",
                                          }}
                                        >
                                          Enter a topic to continue.
                                        </span>
                                      )}
                                      {presentationState === "error" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          Unable to generate presentation: {presentationErrorMessage ?? "Unknown error"}
                                        </span>
                                      )}
                                      {presentationState === "quota-exceeded" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          {guestLimitMessage}
                                        </span>
                                      )}
                                      {presentationState === "no-credits" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          {noCreditsMessage}
                                        </span>
                                      )}
                                      {presentationState === "success" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: theme.isDark ? "#38bdf8" : "#2563eb",
                                          }}
                                        >
                                          Presentation downloaded.
                                        </span>
                                      )}
                                      {!presentationState && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: theme.isDark ? "#94a3b8" : "#475569",
                                          }}
                                        >
                                          Ready to generate when you are.
                                        </span>
                                      )}
                                      {recentTopics.length > 0 && (
                                        <div
                                          style={{
                                            display: "flex",
                                            gap: "6px",
                                            flexWrap: "wrap",
                                            marginTop: "4px",
                                          }}
                                        >
                                          {recentTopics.map((recentTopic) => (
                                            <button
                                              key={recentTopic}
                                              type="button"
                                              onClick={() => {
                                                setPresentationTopics((prev) => ({
                                                  ...prev,
                                                  [subjectKey]: recentTopic,
                                                }));
                                                triggerPresentationDownload(
                                                  gradeConfig.id,
                                                  subject,
                                                  recentTopic
                                                );
                                              }}
                                              style={{
                                                padding: "4px 10px",
                                                borderRadius: "9999px",
                                                border: "1px solid",
                                                borderColor: theme.panelBorder,
                                                background: theme.isDark
                                                  ? "#1e293b"
                                                  : "#e2e8f0",
                                                color: theme.text,
                                                fontSize: "0.78rem",
                                                cursor: "pointer",
                                              }}
                                              disabled={presentationState === "loading" || shouldDisableGeneration}
                                            >
                                              {recentTopic}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {isActionSelected && action === "Generate PDF" && (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "6px",
                                        paddingLeft: "6px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "8px",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          value={handoutValue}
                                          onChange={(event) => {
                                            const { value } = event.target;
                                            setHandoutTopics((prev) => ({
                                              ...prev,
                                              [subjectKey]: value,
                                            }));
                                            if (handoutStatus[subjectKey] === "missing-topic") {
                                              setHandoutStatus((prev) => ({
                                                ...prev,
                                                [subjectKey]: null,
                                              }));
                                            }
                                          }}
                                          placeholder="Search topic"
                                          style={{
                                            flex: "1",
                                            padding: "8px 12px",
                                            borderRadius: "10px",
                                            border: "1px solid",
                                            borderColor: theme.panelBorder,
                                            background: theme.isDark ? "#0f172a" : "#f8fafc",
                                            color: theme.text,
                                          }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            triggerHandoutDownload(
                                              gradeConfig.id,
                                              subject,
                                              handoutValue.trim()
                                            )
                                          }
                                          style={{
                                            padding: "8px 16px",
                                            borderRadius: "10px",
                                            border: "none",
                                            background: theme.accent,
                                            color: theme.isDark ? "#0b1120" : "#ffffff",
                                            fontWeight: 600,
                                            cursor: "pointer",
                                          }}
                                          disabled={handoutState === "loading"}
                                        >
                                          {handoutState === "loading"
                                            ? "Generating..."
                                            : "Generate"}
                                        </button>
                                      </div>
                                      {handoutState === "missing-topic" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f97316",
                                          }}
                                        >
                                          Enter a topic to continue.
                                        </span>
                                      )}
                                      {handoutState === "error" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          Unable to generate PDF: {handoutErrorMessage ?? "Unknown error"}
                                        </span>
                                      )}
                                      {handoutState === "quota-exceeded" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          {guestLimitMessage}
                                        </span>
                                      )}
                                      {handoutState === "no-credits" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          {noCreditsMessage}
                                        </span>
                                      )}
                                      {handoutState === "success" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: theme.isDark ? "#38bdf8" : "#2563eb",
                                          }}
                                        >
                                          PDF downloaded.
                                        </span>
                                      )}
                                      {!handoutState && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: theme.isDark ? "#94a3b8" : "#475569",
                                          }}
                                        >
                                          Ready to generate when you are.
                                        </span>
                                      )}
                                      {handoutRecent.length > 0 && (
                                        <div
                                          style={{
                                            display: "flex",
                                            gap: "6px",
                                            flexWrap: "wrap",
                                            marginTop: "4px",
                                          }}
                                        >
                                          {handoutRecent.map((recentTopic) => (
                                            <button
                                              key={recentTopic}
                                              type="button"
                                              onClick={() => {
                                                setHandoutTopics((prev) => ({
                                                  ...prev,
                                                  [subjectKey]: recentTopic,
                                                }));
                                                triggerHandoutDownload(
                                                  gradeConfig.id,
                                                  subject,
                                                  recentTopic
                                                );
                                              }}
                                              style={{
                                                padding: "4px 10px",
                                                borderRadius: "9999px",
                                                border: "1px solid",
                                                borderColor: theme.panelBorder,
                                                background: theme.isDark
                                                  ? "#1e293b"
                                                  : "#e2e8f0",
                                                color: theme.text,
                                                fontSize: "0.78rem",
                                                cursor: "pointer",
                                              }}
                                              disabled={handoutState === "loading" || shouldDisableGeneration}
                                            >
                                              {recentTopic}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {isActionSelected && action === "Lesson Plan" && (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "6px",
                                        paddingLeft: "6px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "8px",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          value={lessonPlanValue}
                                          onChange={(event) => {
                                            const { value } = event.target;
                                            setLessonPlanTopics((prev) => ({
                                              ...prev,
                                              [subjectKey]: value,
                                            }));
                                            if (lessonPlanStatus[subjectKey] === "missing-topic") {
                                              setLessonPlanStatus((prev) => ({
                                                ...prev,
                                                [subjectKey]: null,
                                              }));
                                            }
                                          }}
                                          placeholder="Search topic"
                                          style={{
                                            flex: "1",
                                            padding: "8px 12px",
                                            borderRadius: "10px",
                                            border: "1px solid",
                                            borderColor: theme.panelBorder,
                                            background: theme.isDark ? "#0f172a" : "#f8fafc",
                                            color: theme.text,
                                          }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            triggerLessonPlanDownload(
                                              gradeConfig.id,
                                              subject,
                                              lessonPlanValue.trim()
                                            )
                                          }
                                          style={{
                                            padding: "8px 16px",
                                            borderRadius: "10px",
                                            border: "none",
                                            background: theme.accent,
                                            color: theme.isDark ? "#0b1120" : "#ffffff",
                                            fontWeight: 600,
                                            cursor: "pointer",
                                          }}
                                          disabled={lessonPlanState === "loading" || shouldDisableGeneration}
                                        >
                                          {lessonPlanState === "loading"
                                            ? "Generating..."
                                            : "Generate"}
                                        </button>
                                      </div>
                                      {lessonPlanState === "missing-topic" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f97316",
                                          }}
                                        >
                                          Enter a topic to continue.
                                        </span>
                                      )}
                                      {lessonPlanState === "error" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          Unable to generate lesson plan: {lessonPlanErrorMessage ?? "Unknown error"}
                                        </span>
                                      )}
                                      {lessonPlanState === "quota-exceeded" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          {guestLimitMessage}
                                        </span>
                                      )}
                                      {lessonPlanState === "no-credits" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          {noCreditsMessage}
                                        </span>
                                      )}
                                      {lessonPlanState === "success" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: theme.isDark ? "#38bdf8" : "#2563eb",
                                          }}
                                        >
                                          Lesson plan downloaded.
                                        </span>
                                      )}
                                      {!lessonPlanState && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: theme.isDark ? "#94a3b8" : "#475569",
                                          }}
                                        >
                                          Ready to generate when you are.
                                        </span>
                                      )}
                                      {lessonPlanRecent.length > 0 && (
                                        <div
                                          style={{
                                            display: "flex",
                                            gap: "6px",
                                            flexWrap: "wrap",
                                            marginTop: "4px",
                                          }}
                                        >
                                          {lessonPlanRecent.map((recentTopic) => (
                                            <button
                                              key={recentTopic}
                                              type="button"
                                              onClick={() => {
                                                setLessonPlanTopics((prev) => ({
                                                  ...prev,
                                                  [subjectKey]: recentTopic,
                                                }));
                                                triggerLessonPlanDownload(
                                                  gradeConfig.id,
                                                  subject,
                                                  recentTopic
                                                );
                                              }}
                                              style={{
                                                padding: "4px 10px",
                                                borderRadius: "9999px",
                                                border: "1px solid",
                                                borderColor: theme.panelBorder,
                                                background: theme.isDark
                                                  ? "#1e293b"
                                                  : "#e2e8f0",
                                                color: theme.text,
                                                fontSize: "0.78rem",
                                                cursor: "pointer",
                                              }}
                                              disabled={lessonPlanState === "loading" || shouldDisableGeneration}
                                            >
                                              {recentTopic}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {isActionSelected && action === "Generate Web Page" && (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "6px",
                                        paddingLeft: "6px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "8px",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          value={webPageValue}
                                          onChange={(event) => {
                                            const { value } = event.target;
                                            setWebPageTopics((prev) => ({
                                              ...prev,
                                              [subjectKey]: value,
                                            }));
                                            if (webPageStatus[subjectKey] === "missing-topic") {
                                              setWebPageStatus((prev) => ({
                                                ...prev,
                                                [subjectKey]: null,
                                              }));
                                            }
                                          }}
                                          placeholder="Search topic"
                                          style={{
                                            flex: "1",
                                            padding: "8px 12px",
                                            borderRadius: "10px",
                                            border: "1px solid",
                                            borderColor: theme.panelBorder,
                                            background: theme.isDark ? "#0f172a" : "#f8fafc",
                                            color: theme.text,
                                          }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            triggerWebPageDownload(
                                              gradeConfig.id,
                                              subject,
                                              webPageValue.trim()
                                            )
                                          }
                                          style={{
                                            padding: "8px 16px",
                                            borderRadius: "10px",
                                            border: "none",
                                            background: theme.accent,
                                            color: theme.isDark ? "#0b1120" : "#ffffff",
                                            fontWeight: 600,
                                            cursor: "pointer",
                                          }}
                                          disabled={webPageState === "loading" || shouldDisableGeneration}
                                        >
                                          {webPageState === "loading" ? "Generating..." : "Generate"}
                                        </button>
                                      </div>
                                      {webPageState === "missing-topic" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f97316",
                                          }}
                                        >
                                          Enter a topic to continue.
                                        </span>
                                      )}
                                      {webPageState === "error" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          Unable to generate web page: {webPageErrorMessage ?? "Unknown error"}
                                        </span>
                                      )}
                                      {webPageState === "quota-exceeded" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          {guestLimitMessage}
                                        </span>
                                      )}
                                      {webPageState === "no-credits" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          {noCreditsMessage}
                                        </span>
                                      )}
                                      {webPageState === "success" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: theme.isDark ? "#38bdf8" : "#2563eb",
                                          }}
                                        >
                                          Web page downloaded.
                                        </span>
                                      )}
                                      {!webPageState && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: theme.isDark ? "#94a3b8" : "#475569",
                                          }}
                                        >
                                          Ready to generate when you are.
                                        </span>
                                      )}
                                      {webPageRecent.length > 0 && (
                                        <div
                                          style={{
                                            display: "flex",
                                            gap: "6px",
                                            flexWrap: "wrap",
                                            marginTop: "4px",
                                          }}
                                        >
                                          {webPageRecent.map((recentTopic) => (
                                            <button
                                              key={recentTopic}
                                              type="button"
                                              onClick={() => {
                                                setWebPageTopics((prev) => ({
                                                  ...prev,
                                                  [subjectKey]: recentTopic,
                                                }));
                                                triggerWebPageDownload(
                                                  gradeConfig.id,
                                                  subject,
                                                  recentTopic
                                                );
                                              }}
                                              style={{
                                                padding: "4px 10px",
                                                borderRadius: "9999px",
                                                border: "1px solid",
                                                borderColor: theme.panelBorder,
                                                background: theme.isDark
                                                  ? "#1e293b"
                                                  : "#e2e8f0",
                                                color: theme.text,
                                                fontSize: "0.78rem",
                                                cursor: "pointer",
                                              }}
                                              disabled={webPageState === "loading" || shouldDisableGeneration}
                                            >
                                              {recentTopic}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {isActionSelected && action === "Generate Concept Map" && (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "6px",
                                        paddingLeft: "6px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "8px",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          value={conceptMapValue}
                                          onChange={(event) => {
                                            const { value } = event.target;
                                            setConceptMapTopics((prev) => ({
                                              ...prev,
                                              [subjectKey]: value,
                                            }));
                                            if (conceptMapStatus[subjectKey] === "missing-topic") {
                                              setConceptMapStatus((prev) => ({
                                                ...prev,
                                                [subjectKey]: null,
                                              }));
                                            }
                                          }}
                                          placeholder="Search topic"
                                          style={{
                                            flex: "1",
                                            padding: "8px 12px",
                                            borderRadius: "10px",
                                            border: "1px solid",
                                            borderColor: theme.panelBorder,
                                            background: theme.isDark ? "#0f172a" : "#f8fafc",
                                            color: theme.text,
                                          }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            triggerConceptMapDownload(
                                              gradeConfig.id,
                                              subject,
                                              conceptMapValue.trim()
                                            )
                                          }
                                          style={{
                                            padding: "8px 16px",
                                            borderRadius: "10px",
                                            border: "none",
                                            background: theme.accent,
                                            color: theme.isDark ? "#0b1120" : "#ffffff",
                                            fontWeight: 600,
                                            cursor: "pointer",
                                          }}
                                          disabled={conceptMapState === "loading" || shouldDisableGeneration}
                                        >
                                          {conceptMapState === "loading"
                                            ? "Generating..."
                                            : "Generate"}
                                        </button>
                                      </div>
                                      {conceptMapState === "missing-topic" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f97316",
                                          }}
                                        >
                                          Enter a topic to continue.
                                        </span>
                                      )}
                                      {conceptMapState === "error" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          Unable to generate concept map: {conceptMapErrorMessage ?? "Unknown error"}
                                        </span>
                                      )}
                                      {conceptMapState === "quota-exceeded" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          {guestLimitMessage}
                                        </span>
                                      )}
                                      {conceptMapState === "no-credits" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          {noCreditsMessage}
                                        </span>
                                      )}
                                      {conceptMapState === "success" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: theme.isDark ? "#38bdf8" : "#2563eb",
                                          }}
                                        >
                                          Concept map PDF downloaded.
                                        </span>
                                      )}
                                      {!conceptMapState && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: theme.isDark ? "#94a3b8" : "#475569",
                                          }}
                                        >
                                          Ready to generate when you are.
                                        </span>
                                      )}
                                      {conceptMapRecent.length > 0 && (
                                        <div
                                          style={{
                                            display: "flex",
                                            gap: "6px",
                                            flexWrap: "wrap",
                                            marginTop: "4px",
                                          }}
                                        >
                                          {conceptMapRecent.map((recentTopic) => (
                                            <button
                                              key={recentTopic}
                                              type="button"
                                              onClick={() => {
                                                setConceptMapTopics((prev) => ({
                                                  ...prev,
                                                  [subjectKey]: recentTopic,
                                                }));
                                                triggerConceptMapDownload(
                                                  gradeConfig.id,
                                                  subject,
                                                  recentTopic
                                                );
                                              }}
                                              style={{
                                                padding: "4px 10px",
                                                borderRadius: "9999px",
                                                border: "1px solid",
                                                borderColor: theme.panelBorder,
                                                background: theme.isDark
                                                  ? "#1e293b"
                                                  : "#e2e8f0",
                                                color: theme.text,
                                                fontSize: "0.78rem",
                                                cursor: "pointer",
                                              }}
                                              disabled={conceptMapState === "loading" || shouldDisableGeneration}
                                            >
                                              {recentTopic}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {isActionSelected && action === "Generate MCQs" && (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "6px",
                                        paddingLeft: "6px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: "8px",
                                          alignItems: "center",
                                        }}
                                      >
                                        <input
                                          type="text"
                                          value={mcqValue}
                                          onChange={(event) => {
                                            const { value } = event.target;
                                            setMcqTopics((prev) => ({
                                              ...prev,
                                              [subjectKey]: value,
                                            }));
                                            if (mcqStatus[subjectKey] === "missing-topic") {
                                              setMcqStatus((prev) => ({
                                                ...prev,
                                                [subjectKey]: null,
                                              }));
                                            }
                                          }}
                                          placeholder="Search topic"
                                          style={{
                                            flex: "1",
                                            padding: "8px 12px",
                                            borderRadius: "10px",
                                            border: "1px solid",
                                            borderColor: theme.panelBorder,
                                            background: theme.isDark ? "#0f172a" : "#f8fafc",
                                            color: theme.text,
                                          }}
                                        />
                                        <button
                                          type="button"
                                          onClick={() =>
                                            triggerMcqDownload(
                                              gradeConfig.id,
                                              subject,
                                              mcqValue.trim()
                                            )
                                          }
                                          style={{
                                            padding: "8px 16px",
                                            borderRadius: "10px",
                                            border: "none",
                                            background: theme.accent,
                                            color: theme.isDark ? "#0b1120" : "#ffffff",
                                            fontWeight: 600,
                                            cursor: "pointer",
                                          }}
                                          disabled={mcqState === "loading"}
                                        >
                                          {mcqState === "loading" ? "Generating..." : "Generate"}
                                        </button>
                                      </div>
                                      {mcqState === "missing-topic" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f97316",
                                          }}
                                        >
                                          Enter a topic to continue.
                                        </span>
                                      )}
                                      {mcqState === "error" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          Unable to generate MCQs: {mcqErrorMessage ?? "Unknown error"}
                                        </span>
                                      )}
                                      {mcqState === "quota-exceeded" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          {guestLimitMessage}
                                        </span>
                                      )}
                                      {mcqState === "no-credits" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: "#f87171",
                                          }}
                                        >
                                          {noCreditsMessage}
                                        </span>
                                      )}
                                      {mcqState === "success" && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: theme.isDark ? "#38bdf8" : "#2563eb",
                                          }}
                                        >
                                          MCQ set PDF downloaded.
                                        </span>
                                      )}
                                      {!mcqState && (
                                        <span
                                          style={{
                                            fontSize: "0.82rem",
                                            color: theme.isDark ? "#94a3b8" : "#475569",
                                          }}
                                        >
                                          Ready to generate when you are.
                                        </span>
                                      )}
                                      {mcqRecent.length > 0 && (
                                        <div
                                          style={{
                                            display: "flex",
                                            gap: "6px",
                                            flexWrap: "wrap",
                                            marginTop: "4px",
                                          }}
                                        >
                                          {mcqRecent.map((recentTopic) => (
                                            <button
                                              key={recentTopic}
                                              type="button"
                                              onClick={() => {
                                                setMcqTopics((prev) => ({
                                                  ...prev,
                                                  [subjectKey]: recentTopic,
                                                }));
                                                triggerMcqDownload(
                                                  gradeConfig.id,
                                                  subject,
                                                  recentTopic
                                                );
                                              }}
                                              style={{
                                                padding: "4px 10px",
                                                borderRadius: "9999px",
                                                border: "1px solid",
                                                borderColor: theme.panelBorder,
                                                background: theme.isDark
                                                  ? "#1e293b"
                                                  : "#e2e8f0",
                                                color: theme.text,
                                                fontSize: "0.78rem",
                                                cursor: "pointer",
                                              }}
                                              disabled={mcqState === "loading" || shouldDisableGeneration}
                                            >
                                              {recentTopic}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {isActionSelected &&
                                    !hasPdf &&
                                    action !== "Generate presentations" &&
                                    action !== "Generate PDF" &&
                                    action !== "Lesson Plan" &&
                                    action !== "Generate Web Page" &&
                                    action !== "Generate Concept Map" &&
                                    action !== "Generate MCQs" && (
                                    <span
                                      style={{
                                        fontSize: "0.88rem",
                                        color: theme.isDark ? "#94a3b8" : "#475569",
                                        paddingLeft: "6px",
                                      }}
                                    >
                                      Resource coming soon
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function TamilNaduDashboard() {
  return <CbseDashboard boardLabel="Tamil Nadu State Board (English Medium)" />;
}

export function KarnatakaDashboard() {
  return <CbseDashboard boardLabel="Karnataka State Board (English Medium)" />;
}

export default Home;



__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CbseDashboard: function() { return /* binding */ CbseDashboard; },
/* harmony export */   "default": function() { return /* binding */ Home; }
/* harmony export */ });
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_contentMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/contentMap */ "./lib/contentMap.js");

var _s = $RefreshSig$(), _s1 = $RefreshSig$(), _s2 = $RefreshSig$();



const GRADE_CONFIGS = [
    {
        id: "grade12",
        label: "Grade 12",
        number: 12,
        subjects: [
            "Maths",
            "Physics",
            "Chemistry",
            "Biology"
        ]
    },
    {
        id: "grade11",
        label: "Grade 11",
        number: 11,
        subjects: [
            "Maths",
            "Physics",
            "Chemistry",
            "Biology"
        ]
    },
    {
        id: "grade10",
        label: "Grade 10",
        number: 10,
        subjects: [
            "Maths",
            "Physics",
            "Chemistry",
            "Biology"
        ]
    },
    {
        id: "grade9",
        label: "Grade 9",
        number: 9,
        subjects: [
            "Maths",
            "Physics",
            "Chemistry",
            "Biology"
        ]
    },
    {
        id: "grade8",
        label: "Grade 8",
        number: 8,
        subjects: [
            "Maths",
            "Physics",
            "Chemistry",
            "Biology"
        ]
    }
];
const GRADE_NUMBER_MAP = GRADE_CONFIGS.reduce(_c = (accumulator, config)=>{
    accumulator[config.id] = config.number;
    return accumulator;
}, {});
_c1 = GRADE_NUMBER_MAP;
const SUBJECT_ACTIONS = [
    "Syllabus",
    "Lesson Plan",
    "Generate presentations",
    "Reading Materials",
    "Generate PDF",
    "Generate Web Page",
    "Generate Concept Map",
    "Generate MCQs"
];
const SUBJECT_PDF_ACTIONS = {
    grade12: {
        Maths: new Set([
            "Syllabus",
            "Reading Materials"
        ])
    },
    grade11: {},
    grade10: {},
    grade9: {},
    grade8: {}
};
// Renders subject PDFs onto canvases once the data is available.
function PdfContentViewer(param) {
    let { base64Data, isLoading, error, theme, label } = param;
    _s();
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let canceled = false;
        const renderPdf = async ()=>{
            if (!base64Data || !containerRef.current) {
                if (containerRef.current) {
                    containerRef.current.innerHTML = "";
                }
                return;
            }
            const [{ getDocument, GlobalWorkerOptions }, workerModule] = await Promise.all([
                __webpack_require__.e(/*! import() */ "node_modules_pdfjs-dist_build_pdf_js").then(__webpack_require__.t.bind(__webpack_require__, /*! pdfjs-dist/build/pdf */ "./node_modules/pdfjs-dist/build/pdf.js", 23)),
                __webpack_require__.e(/*! import() */ "node_modules_pdfjs-dist_build_pdf_worker_entry_js").then(__webpack_require__.t.bind(__webpack_require__, /*! pdfjs-dist/build/pdf.worker.entry */ "./node_modules/pdfjs-dist/build/pdf.worker.entry.js", 23))
            ]);
            if (canceled) return;
            var _workerModule_default;
            const workerSrc = (_workerModule_default = workerModule === null || workerModule === void 0 ? void 0 : workerModule.default) !== null && _workerModule_default !== void 0 ? _workerModule_default : workerModule;
            GlobalWorkerOptions.workerSrc = workerSrc;
            const binaryString = atob(base64Data);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for(let i = 0; i < len; i += 1){
                bytes[i] = binaryString.charCodeAt(i);
            }
            const pdfDoc = await getDocument({
                data: bytes
            }).promise;
            if (canceled || !containerRef.current) return;
            const container = containerRef.current;
            container.innerHTML = "";
            for(let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber += 1){
                const page = await pdfDoc.getPage(pageNumber);
                if (canceled || !containerRef.current) return;
                const viewport = page.getViewport({
                    scale: 1.1
                });
                const canvas = document.createElement("canvas");
                canvas.style.boxShadow = theme.isDark ? "0 10px 25px rgba(15, 23, 42, 0.6)" : "0 12px 24px rgba(15, 23, 42, 0.12)";
                canvas.style.borderRadius = "12px";
                canvas.style.width = "100%";
                canvas.style.height = "auto";
                const context = canvas.getContext("2d");
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                container.appendChild(canvas);
                await page.render({
                    canvasContext: context,
                    viewport
                }).promise;
            }
        };
        renderPdf();
        return ()=>{
            canceled = true;
            if (containerRef.current) {
                containerRef.current.innerHTML = "";
            }
        };
    }, [
        base64Data,
        theme.isDark
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            style: {
                marginTop: "12px",
                padding: "16px",
                borderRadius: "12px",
                border: "1px dashed",
                borderColor: theme.panelBorder,
                color: theme.text,
                fontSize: "0.95rem"
            },
            children: "Loading ".concat(label, "â€¦")
        }, void 0, false, {
            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
            lineNumber: 133,
            columnNumber: 7
        }, this);
    }
    if (error) {
        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            style: {
                marginTop: "12px",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "#f87171",
                color: theme.text,
                fontSize: "0.95rem",
                background: theme.isDark ? "rgba(248, 113, 113, 0.15)" : "#fee2e2"
            },
            children: "Unable to load ".concat(label, ". Please try again later.")
        }, void 0, false, {
            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
            lineNumber: 151,
            columnNumber: 7
        }, this);
    }
    if (!base64Data) {
        return null;
    }
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        ref: containerRef,
        style: {
            display: "grid",
            gap: "18px",
            marginTop: "16px",
            overflowX: "auto",
            paddingBottom: "12px"
        }
    }, void 0, false, {
        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
        lineNumber: 173,
        columnNumber: 5
    }, this);
}
_s(PdfContentViewer, "8puyVO4ts1RhCfXUmci3vLI3Njw=");
_c2 = PdfContentViewer;
const COUNTRY_OPTIONS = [
    {
        id: "india",
        label: "India"
    },
    {
        id: "usa",
        label: "USA"
    }
];
const INDIA_SUB_OPTIONS = [
    {
        id: "schools",
        label: "Schools"
    },
    {
        id: "colleges",
        label: "Colleges"
    }
];
const INDIA_SCHOOL_OPTIONS = [
    {
        id: "cbse",
        label: "CBSE"
    },
    {
        id: "stateBoards",
        label: "State boards"
    }
];
function Home() {
    _s1();
    const [activeCountries, setActiveCountries] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [indiaSelections, setIndiaSelections] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [indiaSchoolSelections, setIndiaSchoolSelections] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [isDarkMode, setIsDarkMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const toggleCountry = (countryId)=>{
        setActiveCountries((prev)=>({
                ...prev,
                [countryId]: !prev[countryId]
            }));
        if (countryId === "india" && activeCountries[countryId]) {
            setIndiaSelections({});
            setIndiaSchoolSelections({});
        }
    };
    const toggleIndiaOption = (optionId)=>{
        setIndiaSelections((prev)=>({
                ...prev,
                [optionId]: !prev[optionId]
            }));
        if (optionId === "schools" && indiaSelections[optionId]) {
            setIndiaSchoolSelections({});
        }
    };
    const toggleIndiaSchoolOption = (optionId)=>{
        setIndiaSchoolSelections((prev)=>({
                ...prev,
                [optionId]: !prev[optionId]
            }));
    };
    const theme = isDarkMode ? {
        appBackground: "#0f172a",
        panel: "#111827",
        text: "#e2e8f0",
        accent: "#38bdf8",
        border: "#1f2937",
        secondaryText: "#cbd5f5"
    } : {
        appBackground: "#f1f5f9",
        panel: "#ffffff",
        text: "#0f172a",
        accent: "#2563eb",
        border: "#cbd5f5",
        secondaryText: "#475569"
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("main", {
        style: {
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: theme.appBackground,
            padding: "40px 16px"
        },
        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
            style: {
                width: "min(480px, 100%)",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                background: theme.panel,
                color: theme.text,
                borderRadius: "18px",
                padding: "32px",
                boxShadow: "0 22px 44px rgba(15, 23, 42, 0.08)",
                position: "relative"
            },
            children: [
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                    type: "button",
                    onClick: ()=>setIsDarkMode((previous)=>!previous),
                    "aria-label": "Switch to ".concat(isDarkMode ? "light" : "dark", " mode"),
                    style: {
                        position: "absolute",
                        top: "18px",
                        right: "18px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "6px 16px",
                        borderRadius: "9999px",
                        border: "1px solid ".concat(theme.border),
                        background: isDarkMode ? "rgba(56, 189, 248, 0.1)" : "#e0f2fe",
                        color: theme.text,
                        fontWeight: 600,
                        cursor: "pointer"
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                            children: isDarkMode ? "Dark" : "Light"
                        }, void 0, false, {
                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                            lineNumber: 298,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                            style: {
                                display: "inline-block",
                                width: "38px",
                                height: "20px",
                                borderRadius: "9999px",
                                background: isDarkMode ? theme.accent : "#bfdbfe",
                                position: "relative",
                                border: "1px solid ".concat(theme.border)
                            },
                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                style: {
                                    position: "absolute",
                                    top: "2px",
                                    left: isDarkMode ? "20px" : "2px",
                                    width: "14px",
                                    height: "14px",
                                    borderRadius: "50%",
                                    background: isDarkMode ? "#0f172a" : "#ffffff",
                                    transition: "left 0.2s ease"
                                }
                            }, void 0, false, {
                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                lineNumber: 310,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                            lineNumber: 299,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                    lineNumber: 278,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h1", {
                    style: {
                        margin: 0,
                        textAlign: "center",
                        color: theme.text,
                        fontSize: "1.9rem"
                    },
                    children: "Welcome to teachwiseai.mpaiapps.com"
                }, void 0, false, {
                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                    lineNumber: 324,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                    style: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px"
                    },
                    children: [
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                            style: {
                                fontSize: "1rem",
                                fontWeight: 600,
                                color: theme.text
                            },
                            children: "Countries"
                        }, void 0, false, {
                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                            lineNumber: 335,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                paddingLeft: "6px"
                            },
                            children: COUNTRY_OPTIONS.map((country)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "8px"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("label", {
                                            style: {
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                                    type: "checkbox",
                                                    checked: Boolean(activeCountries[country.id]),
                                                    onChange: ()=>toggleCountry(country.id),
                                                    style: {
                                                        accentColor: theme.accent,
                                                        transform: "scale(1.05)"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                    lineNumber: 356,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                    style: {
                                                        fontWeight: 600,
                                                        color: theme.text
                                                    },
                                                    children: country.label
                                                }, void 0, false, {
                                                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                    lineNumber: 362,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                            lineNumber: 355,
                                            columnNumber: 17
                                        }, this),
                                        country.id === "india" && activeCountries.india ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                            style: {
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "6px",
                                                paddingLeft: "26px"
                                            },
                                            children: [
                                                INDIA_SUB_OPTIONS.map((option)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("label", {
                                                        style: {
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: "8px"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                                                type: "checkbox",
                                                                checked: Boolean(indiaSelections[option.id]),
                                                                onChange: ()=>toggleIndiaOption(option.id),
                                                                style: {
                                                                    accentColor: theme.accent,
                                                                    transform: "scale(1.03)"
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 376,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                style: {
                                                                    fontWeight: 500,
                                                                    color: theme.text
                                                                },
                                                                children: option.label
                                                            }, void 0, false, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 382,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, option.id, true, {
                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                        lineNumber: 375,
                                                        columnNumber: 23
                                                    }, this)),
                                                indiaSelections.schools ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                    style: {
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "6px",
                                                        paddingLeft: "24px"
                                                    },
                                                    children: INDIA_SCHOOL_OPTIONS.map((schoolOption)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("label", {
                                                            style: {
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "8px"
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                                                    type: "checkbox",
                                                                    checked: Boolean(indiaSchoolSelections[schoolOption.id]),
                                                                    onChange: ()=>toggleIndiaSchoolOption(schoolOption.id),
                                                                    style: {
                                                                        accentColor: theme.accent,
                                                                        transform: "scale(1.02)"
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                    lineNumber: 400,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                    style: {
                                                                        fontWeight: 500,
                                                                        color: theme.text
                                                                    },
                                                                    children: schoolOption.label
                                                                }, void 0, false, {
                                                                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                    lineNumber: 406,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, schoolOption.id, true, {
                                                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                            lineNumber: 396,
                                                            columnNumber: 27
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                    lineNumber: 387,
                                                    columnNumber: 23
                                                }, this) : null
                                            ]
                                        }, void 0, true, {
                                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                            lineNumber: 366,
                                            columnNumber: 19
                                        }, this) : null
                                    ]
                                }, country.id, true, {
                                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                    lineNumber: 354,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                            lineNumber: 345,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                    lineNumber: 334,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
            lineNumber: 264,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
        lineNumber: 254,
        columnNumber: 5
    }, this);
}
_s1(Home, "lwiGpCskGRbre9APLySbhMv7BOs=");
_c3 = Home;
function CbseDashboard() {
    _s2();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [grade12, setGrade12] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [grade11, setGrade11] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [grade10, setGrade10] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [grade9, setGrade9] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [grade8, setGrade8] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [isDarkMode, setIsDarkMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [selectedSubjects, setSelectedSubjects] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [subjectActionSelections, setSubjectActionSelections] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [pdfCache, setPdfCache] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [pdfLoading, setPdfLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [pdfError, setPdfError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [presentationStatus, setPresentationStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [presentationError, setPresentationError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [presentationTopics, setPresentationTopics] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [presentationHistory, setPresentationHistory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [handoutStatus, setHandoutStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [handoutError, setHandoutError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [handoutTopics, setHandoutTopics] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [handoutHistory, setHandoutHistory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [lessonPlanStatus, setLessonPlanStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [lessonPlanError, setLessonPlanError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [lessonPlanTopics, setLessonPlanTopics] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [lessonPlanHistory, setLessonPlanHistory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [webPageStatus, setWebPageStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [webPageError, setWebPageError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [webPageTopics, setWebPageTopics] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [webPageHistory, setWebPageHistory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [conceptMapStatus, setConceptMapStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [conceptMapError, setConceptMapError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [conceptMapTopics, setConceptMapTopics] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [conceptMapHistory, setConceptMapHistory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [mcqStatus, setMcqStatus] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [mcqError, setMcqError] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [mcqTopics, setMcqTopics] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [mcqHistory, setMcqHistory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const gradeControls = {
        grade12: {
            isActive: grade12,
            setActive: setGrade12
        },
        grade11: {
            isActive: grade11,
            setActive: setGrade11
        },
        grade10: {
            isActive: grade10,
            setActive: setGrade10
        },
        grade9: {
            isActive: grade9,
            setActive: setGrade9
        },
        grade8: {
            isActive: grade8,
            setActive: setGrade8
        }
    };
    const getSubjectKey = (gradeId, subject)=>"".concat(gradeId, "::").concat(subject);
    const getActionKey = (gradeId, subject, action)=>"".concat(gradeId, "::").concat(subject, "::").concat(action);
    const fetchPdfContent = async (gradeId, subject, action)=>{
        var _SUBJECT_PDF_ACTIONS_gradeId;
        const cacheKey = getActionKey(gradeId, subject, action);
        if (pdfCache[cacheKey] || pdfLoading[cacheKey]) {
            return;
        }
        const pdfActions = (_SUBJECT_PDF_ACTIONS_gradeId = SUBJECT_PDF_ACTIONS[gradeId]) === null || _SUBJECT_PDF_ACTIONS_gradeId === void 0 ? void 0 : _SUBJECT_PDF_ACTIONS_gradeId[subject];
        if (!pdfActions || !pdfActions.has(action)) {
            return;
        }
        try {
            setPdfLoading((prev)=>({
                    ...prev,
                    [cacheKey]: true
                }));
            setPdfError((prev)=>({
                    ...prev,
                    [cacheKey]: null
                }));
            var _GRADE_NUMBER_MAP_gradeId;
            const gradeParam = (_GRADE_NUMBER_MAP_gradeId = GRADE_NUMBER_MAP[gradeId]) !== null && _GRADE_NUMBER_MAP_gradeId !== void 0 ? _GRADE_NUMBER_MAP_gradeId : gradeId;
            const params = new URLSearchParams({
                subject,
                type: action,
                grade: String(gradeParam)
            });
            const response = await fetch("/api/syllabus?".concat(params.toString()), {
                cache: "no-store"
            });
            if (!response.ok) {
                throw new Error("Failed to fetch content");
            }
            const payload = await response.json();
            setPdfCache((prev)=>{
                var _payload_base64;
                return {
                    ...prev,
                    [cacheKey]: (_payload_base64 = payload === null || payload === void 0 ? void 0 : payload.base64) !== null && _payload_base64 !== void 0 ? _payload_base64 : null
                };
            });
        } catch (error) {
            setPdfError((prev)=>({
                    ...prev,
                    [cacheKey]: error.message || "Unknown error"
                }));
        } finally{
            setPdfLoading((prev)=>({
                    ...prev,
                    [cacheKey]: false
                }));
        }
    };
    const toggleSubjectSelection = (gradeConfig, subject)=>{
        const gradeId = gradeConfig.id;
        const subjectKey = getSubjectKey(gradeId, subject);
        setSelectedSubjects((prev)=>{
            var _prev_gradeId;
            const gradeSubjects = {
                ...(_prev_gradeId = prev === null || prev === void 0 ? void 0 : prev[gradeId]) !== null && _prev_gradeId !== void 0 ? _prev_gradeId : {}
            };
            const isSelected = Boolean(gradeSubjects[subject]);
            if (isSelected) {
                delete gradeSubjects[subject];
            } else {
                gradeSubjects[subject] = true;
            }
            const nextSelected = {
                ...prev,
                [gradeId]: gradeSubjects
            };
            if (Object.keys(gradeSubjects).length === 0) {
                delete nextSelected[gradeId];
            }
            setSubjectActionSelections((prevActions)=>{
                var _prevActions_gradeId;
                const gradeActions = {
                    ...(_prevActions_gradeId = prevActions === null || prevActions === void 0 ? void 0 : prevActions[gradeId]) !== null && _prevActions_gradeId !== void 0 ? _prevActions_gradeId : {}
                };
                if (isSelected) {
                    delete gradeActions[subject];
                } else {
                    const initialActionsState = SUBJECT_ACTIONS.reduce((acc, action)=>({
                            ...acc,
                            [action]: false
                        }), {});
                    gradeActions[subject] = initialActionsState;
                }
                const nextActions = {
                    ...prevActions,
                    [gradeId]: gradeActions
                };
                if (Object.keys(gradeActions).length === 0) {
                    delete nextActions[gradeId];
                }
                return nextActions;
            });
            if (isSelected) {
                const actionPrefix = "".concat(gradeId, "::").concat(subject, "::");
                setPdfCache((prevCache)=>{
                    const updatedCache = {
                        ...prevCache
                    };
                    Object.keys(updatedCache).forEach((key)=>{
                        if (key.startsWith(actionPrefix)) {
                            delete updatedCache[key];
                        }
                    });
                    return updatedCache;
                });
                setPdfLoading((prevLoading)=>{
                    const updatedLoading = {
                        ...prevLoading
                    };
                    Object.keys(updatedLoading).forEach((key)=>{
                        if (key.startsWith(actionPrefix)) {
                            delete updatedLoading[key];
                        }
                    });
                    return updatedLoading;
                });
                setPdfError((prevError)=>{
                    const updatedError = {
                        ...prevError
                    };
                    Object.keys(updatedError).forEach((key)=>{
                        if (key.startsWith(actionPrefix)) {
                            delete updatedError[key];
                        }
                    });
                    return updatedError;
                });
                setPresentationStatus((prevStatus)=>{
                    const updated = {
                        ...prevStatus
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setPresentationError((prevPresentationError)=>{
                    const updated = {
                        ...prevPresentationError
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setPresentationTopics((prevTopics)=>{
                    const updated = {
                        ...prevTopics
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setPresentationHistory((prevHistory)=>{
                    const updated = {
                        ...prevHistory
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setHandoutStatus((prevHandoutStatus)=>{
                    const updated = {
                        ...prevHandoutStatus
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setHandoutError((prevHandoutError)=>{
                    const updated = {
                        ...prevHandoutError
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setHandoutTopics((prevHandoutTopics)=>{
                    const updated = {
                        ...prevHandoutTopics
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setHandoutHistory((prevHandoutHistory)=>{
                    const updated = {
                        ...prevHandoutHistory
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setLessonPlanStatus((prevLessonPlanStatus)=>{
                    const updated = {
                        ...prevLessonPlanStatus
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setLessonPlanError((prevLessonPlanError)=>{
                    const updated = {
                        ...prevLessonPlanError
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setLessonPlanTopics((prevLessonPlanTopics)=>{
                    const updated = {
                        ...prevLessonPlanTopics
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setLessonPlanHistory((prevLessonPlanHistory)=>{
                    const updated = {
                        ...prevLessonPlanHistory
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setWebPageStatus((prevWebPageStatus)=>{
                    const updated = {
                        ...prevWebPageStatus
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setWebPageError((prevWebPageError)=>{
                    const updated = {
                        ...prevWebPageError
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setWebPageTopics((prevWebPageTopics)=>{
                    const updated = {
                        ...prevWebPageTopics
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setWebPageHistory((prevWebPageHistory)=>{
                    const updated = {
                        ...prevWebPageHistory
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setConceptMapStatus((prevConceptMapStatus)=>{
                    const updated = {
                        ...prevConceptMapStatus
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setConceptMapError((prevConceptMapError)=>{
                    const updated = {
                        ...prevConceptMapError
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setConceptMapTopics((prevConceptMapTopics)=>{
                    const updated = {
                        ...prevConceptMapTopics
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setConceptMapHistory((prevConceptMapHistory)=>{
                    const updated = {
                        ...prevConceptMapHistory
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setMcqStatus((prevMcqStatus)=>{
                    const updated = {
                        ...prevMcqStatus
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setMcqError((prevMcqError)=>{
                    const updated = {
                        ...prevMcqError
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setMcqTopics((prevMcqTopics)=>{
                    const updated = {
                        ...prevMcqTopics
                    };
                    delete updated[subjectKey];
                    return updated;
                });
                setMcqHistory((prevMcqHistory)=>{
                    const updated = {
                        ...prevMcqHistory
                    };
                    delete updated[subjectKey];
                    return updated;
                });
            }
            return nextSelected;
        });
    };
    const triggerPresentationDownload = async (gradeId, subject, topic)=>{
        const subjectKey = getSubjectKey(gradeId, subject);
        var _GRADE_NUMBER_MAP_gradeId;
        const gradeParam = (_GRADE_NUMBER_MAP_gradeId = GRADE_NUMBER_MAP[gradeId]) !== null && _GRADE_NUMBER_MAP_gradeId !== void 0 ? _GRADE_NUMBER_MAP_gradeId : gradeId;
        if (!topic) {
            setPresentationStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "missing-topic"
                }));
            return;
        }
        setPresentationStatus((prev)=>({
                ...prev,
                [subjectKey]: "loading"
            }));
        setPresentationError((prev)=>({
                ...prev,
                [subjectKey]: null
            }));
        try {
            const response = await fetch("/api/presentation?subject=".concat(encodeURIComponent(subject), "&topic=").concat(encodeURIComponent(topic), "&grade=").concat(encodeURIComponent(String(gradeParam))), {
                cache: "no-store",
                method: "GET"
            });
            if (!response.ok) {
                throw new Error("Failed to generate presentation");
            }
            const payload = await response.json();
            if (!(payload === null || payload === void 0 ? void 0 : payload.base64)) {
                throw new Error("Missing presentation content");
            }
            const byteCharacters = atob(payload.base64);
            const byteNumbers = new Array(byteCharacters.length);
            for(let i = 0; i < byteCharacters.length; i += 1){
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([
                byteArray
            ], {
                type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
            });
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "".concat(subject.replace(/\s+/g, "_"), "_").concat(topic.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "presentation", ".pptx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
            setPresentationTopics((prev)=>({
                    ...prev,
                    [subjectKey]: ""
                }));
            setPresentationHistory((prev)=>{
                var _prev_subjectKey;
                return {
                    ...prev,
                    [subjectKey]: [
                        topic,
                        ...((_prev_subjectKey = prev === null || prev === void 0 ? void 0 : prev[subjectKey]) !== null && _prev_subjectKey !== void 0 ? _prev_subjectKey : []).filter((item)=>item !== topic)
                    ].slice(0, 5)
                };
            });
            setPresentationStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "success"
                }));
        } catch (error) {
            setPresentationStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "error"
                }));
            setPresentationError((prev)=>({
                    ...prev,
                    [subjectKey]: error.message || "Unable to generate presentation"
                }));
        }
    };
    const triggerHandoutDownload = async (gradeId, subject, topic)=>{
        const subjectKey = getSubjectKey(gradeId, subject);
        var _GRADE_NUMBER_MAP_gradeId;
        const gradeParam = (_GRADE_NUMBER_MAP_gradeId = GRADE_NUMBER_MAP[gradeId]) !== null && _GRADE_NUMBER_MAP_gradeId !== void 0 ? _GRADE_NUMBER_MAP_gradeId : gradeId;
        if (!topic) {
            setHandoutStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "missing-topic"
                }));
            return;
        }
        setHandoutStatus((prev)=>({
                ...prev,
                [subjectKey]: "loading"
            }));
        setHandoutError((prev)=>({
                ...prev,
                [subjectKey]: null
            }));
        try {
            const response = await fetch("/api/pdf?subject=".concat(encodeURIComponent(subject), "&topic=").concat(encodeURIComponent(topic), "&grade=").concat(encodeURIComponent(String(gradeParam))), {
                cache: "no-store",
                method: "GET"
            });
            if (!response.ok) {
                throw new Error("Failed to generate PDF");
            }
            const payload = await response.json();
            if (!(payload === null || payload === void 0 ? void 0 : payload.base64)) {
                throw new Error("Missing PDF content");
            }
            const byteCharacters = atob(payload.base64);
            const byteNumbers = new Array(byteCharacters.length);
            for(let i = 0; i < byteCharacters.length; i += 1){
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([
                byteArray
            ], {
                type: "application/pdf"
            });
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "".concat(subject.replace(/\s+/g, "_"), "_").concat(topic.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "handout", ".pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
            setHandoutTopics((prev)=>({
                    ...prev,
                    [subjectKey]: ""
                }));
            setHandoutHistory((prev)=>{
                var _prev_subjectKey;
                return {
                    ...prev,
                    [subjectKey]: [
                        topic,
                        ...((_prev_subjectKey = prev === null || prev === void 0 ? void 0 : prev[subjectKey]) !== null && _prev_subjectKey !== void 0 ? _prev_subjectKey : []).filter((item)=>item !== topic)
                    ].slice(0, 5)
                };
            });
            setHandoutStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "success"
                }));
        } catch (error) {
            setHandoutStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "error"
                }));
            setHandoutError((prev)=>({
                    ...prev,
                    [subjectKey]: error.message || "Unable to generate PDF"
                }));
        }
    };
    const triggerLessonPlanDownload = async (gradeId, subject, topic)=>{
        const subjectKey = getSubjectKey(gradeId, subject);
        var _GRADE_NUMBER_MAP_gradeId;
        const gradeParam = (_GRADE_NUMBER_MAP_gradeId = GRADE_NUMBER_MAP[gradeId]) !== null && _GRADE_NUMBER_MAP_gradeId !== void 0 ? _GRADE_NUMBER_MAP_gradeId : gradeId;
        if (!topic) {
            setLessonPlanStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "missing-topic"
                }));
            return;
        }
        setLessonPlanStatus((prev)=>({
                ...prev,
                [subjectKey]: "loading"
            }));
        setLessonPlanError((prev)=>({
                ...prev,
                [subjectKey]: null
            }));
        try {
            const response = await fetch("/api/lesson-plan?subject=".concat(encodeURIComponent(subject), "&topic=").concat(encodeURIComponent(topic), "&grade=").concat(encodeURIComponent(String(gradeParam))), {
                cache: "no-store",
                method: "GET"
            });
            if (!response.ok) {
                throw new Error("Failed to generate lesson plan");
            }
            const payload = await response.json();
            if (!(payload === null || payload === void 0 ? void 0 : payload.base64)) {
                throw new Error("Missing lesson plan content");
            }
            const byteCharacters = atob(payload.base64);
            const byteNumbers = new Array(byteCharacters.length);
            for(let i = 0; i < byteCharacters.length; i += 1){
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([
                byteArray
            ], {
                type: "application/pdf"
            });
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "".concat(subject.replace(/\s+/g, "_"), "_").concat(topic.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "lesson_plan", ".pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
            setLessonPlanTopics((prev)=>({
                    ...prev,
                    [subjectKey]: ""
                }));
            setLessonPlanHistory((prev)=>{
                var _prev_subjectKey;
                return {
                    ...prev,
                    [subjectKey]: [
                        topic,
                        ...((_prev_subjectKey = prev === null || prev === void 0 ? void 0 : prev[subjectKey]) !== null && _prev_subjectKey !== void 0 ? _prev_subjectKey : []).filter((item)=>item !== topic)
                    ].slice(0, 5)
                };
            });
            setLessonPlanStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "success"
                }));
        } catch (error) {
            setLessonPlanStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "error"
                }));
            setLessonPlanError((prev)=>({
                    ...prev,
                    [subjectKey]: error.message || "Unable to generate lesson plan"
                }));
        }
    };
    const triggerWebPageDownload = async (gradeId, subject, topic)=>{
        const subjectKey = getSubjectKey(gradeId, subject);
        var _GRADE_NUMBER_MAP_gradeId;
        const gradeParam = (_GRADE_NUMBER_MAP_gradeId = GRADE_NUMBER_MAP[gradeId]) !== null && _GRADE_NUMBER_MAP_gradeId !== void 0 ? _GRADE_NUMBER_MAP_gradeId : gradeId;
        if (!topic) {
            setWebPageStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "missing-topic"
                }));
            return;
        }
        setWebPageStatus((prev)=>({
                ...prev,
                [subjectKey]: "loading"
            }));
        setWebPageError((prev)=>({
                ...prev,
                [subjectKey]: null
            }));
        try {
            const response = await fetch("/api/web-page?subject=".concat(encodeURIComponent(subject), "&topic=").concat(encodeURIComponent(topic), "&grade=").concat(encodeURIComponent(String(gradeParam))), {
                cache: "no-store",
                method: "GET"
            });
            if (!response.ok) {
                throw new Error("Failed to generate web page");
            }
            const payload = await response.json();
            if (!(payload === null || payload === void 0 ? void 0 : payload.base64)) {
                throw new Error("Missing web page content");
            }
            const byteCharacters = atob(payload.base64);
            const byteNumbers = new Array(byteCharacters.length);
            for(let i = 0; i < byteCharacters.length; i += 1){
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([
                byteArray
            ], {
                type: "text/html;charset=utf-8"
            });
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "".concat(subject.replace(/\s+/g, "_"), "_").concat(topic.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "lesson", ".html");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
            setWebPageTopics((prev)=>({
                    ...prev,
                    [subjectKey]: ""
                }));
            setWebPageHistory((prev)=>{
                var _prev_subjectKey;
                return {
                    ...prev,
                    [subjectKey]: [
                        topic,
                        ...((_prev_subjectKey = prev === null || prev === void 0 ? void 0 : prev[subjectKey]) !== null && _prev_subjectKey !== void 0 ? _prev_subjectKey : []).filter((item)=>item !== topic)
                    ].slice(0, 5)
                };
            });
            setWebPageStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "success"
                }));
        } catch (error) {
            setWebPageStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "error"
                }));
            setWebPageError((prev)=>({
                    ...prev,
                    [subjectKey]: error.message || "Unable to generate web page"
                }));
        }
    };
    const triggerConceptMapDownload = async (gradeId, subject, topic)=>{
        const subjectKey = getSubjectKey(gradeId, subject);
        var _GRADE_NUMBER_MAP_gradeId;
        const gradeParam = (_GRADE_NUMBER_MAP_gradeId = GRADE_NUMBER_MAP[gradeId]) !== null && _GRADE_NUMBER_MAP_gradeId !== void 0 ? _GRADE_NUMBER_MAP_gradeId : gradeId;
        if (!topic) {
            setConceptMapStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "missing-topic"
                }));
            return;
        }
        setConceptMapStatus((prev)=>({
                ...prev,
                [subjectKey]: "loading"
            }));
        setConceptMapError((prev)=>({
                ...prev,
                [subjectKey]: null
            }));
        try {
            const response = await fetch("/api/concept-map?subject=".concat(encodeURIComponent(subject), "&topic=").concat(encodeURIComponent(topic), "&grade=").concat(encodeURIComponent(String(gradeParam))), {
                cache: "no-store",
                method: "GET"
            });
            if (!response.ok) {
                throw new Error("Failed to generate concept map");
            }
            const payload = await response.json();
            if (!(payload === null || payload === void 0 ? void 0 : payload.base64)) {
                throw new Error("Missing concept map content");
            }
            const byteCharacters = atob(payload.base64);
            const byteNumbers = new Array(byteCharacters.length);
            for(let i = 0; i < byteCharacters.length; i += 1){
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([
                byteArray
            ], {
                type: "application/pdf"
            });
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "".concat(subject.replace(/\s+/g, "_"), "_").concat(topic.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "concept_map", ".pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
            setConceptMapTopics((prev)=>({
                    ...prev,
                    [subjectKey]: ""
                }));
            setConceptMapHistory((prev)=>{
                var _prev_subjectKey;
                return {
                    ...prev,
                    [subjectKey]: [
                        topic,
                        ...((_prev_subjectKey = prev === null || prev === void 0 ? void 0 : prev[subjectKey]) !== null && _prev_subjectKey !== void 0 ? _prev_subjectKey : []).filter((item)=>item !== topic)
                    ].slice(0, 5)
                };
            });
            setConceptMapStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "success"
                }));
        } catch (error) {
            setConceptMapStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "error"
                }));
            setConceptMapError((prev)=>({
                    ...prev,
                    [subjectKey]: error.message || "Unable to generate concept map"
                }));
        }
    };
    const triggerMcqDownload = async (gradeId, subject, topic)=>{
        const subjectKey = getSubjectKey(gradeId, subject);
        var _GRADE_NUMBER_MAP_gradeId;
        const gradeParam = (_GRADE_NUMBER_MAP_gradeId = GRADE_NUMBER_MAP[gradeId]) !== null && _GRADE_NUMBER_MAP_gradeId !== void 0 ? _GRADE_NUMBER_MAP_gradeId : gradeId;
        if (!topic) {
            setMcqStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "missing-topic"
                }));
            return;
        }
        setMcqStatus((prev)=>({
                ...prev,
                [subjectKey]: "loading"
            }));
        setMcqError((prev)=>({
                ...prev,
                [subjectKey]: null
            }));
        try {
            const response = await fetch("/api/mcqs?subject=".concat(encodeURIComponent(subject), "&topic=").concat(encodeURIComponent(topic), "&grade=").concat(encodeURIComponent(String(gradeParam))), {
                cache: "no-store",
                method: "GET"
            });
            if (!response.ok) {
                throw new Error("Failed to generate MCQs");
            }
            const payload = await response.json();
            if (!(payload === null || payload === void 0 ? void 0 : payload.base64)) {
                throw new Error("Missing MCQ content");
            }
            const byteCharacters = atob(payload.base64);
            const byteNumbers = new Array(byteCharacters.length);
            for(let index = 0; index < byteCharacters.length; index += 1){
                byteNumbers[index] = byteCharacters.charCodeAt(index);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([
                byteArray
            ], {
                type: "application/pdf"
            });
            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = downloadUrl;
            link.download = "".concat(subject.replace(/\s+/g, "_"), "_").concat(topic.replace(/[^a-z0-9]+/gi, "_").toLowerCase() || "mcqs", ".pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(downloadUrl);
            setMcqTopics((prev)=>({
                    ...prev,
                    [subjectKey]: ""
                }));
            setMcqHistory((prev)=>{
                var _prev_subjectKey;
                return {
                    ...prev,
                    [subjectKey]: [
                        topic,
                        ...((_prev_subjectKey = prev === null || prev === void 0 ? void 0 : prev[subjectKey]) !== null && _prev_subjectKey !== void 0 ? _prev_subjectKey : []).filter((item)=>item !== topic)
                    ].slice(0, 5)
                };
            });
            setMcqStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "success"
                }));
        } catch (error) {
            setMcqStatus((prev)=>({
                    ...prev,
                    [subjectKey]: "error"
                }));
            setMcqError((prev)=>({
                    ...prev,
                    [subjectKey]: error.message || "Unable to generate MCQs"
                }));
        }
    };
    const toggleSubjectAction = (gradeConfig, subject, action)=>{
        var _subjectActionSelections_gradeId, _SUBJECT_PDF_ACTIONS_gradeId_subject, _SUBJECT_PDF_ACTIONS_gradeId;
        const gradeId = gradeConfig.id;
        const subjectKey = getSubjectKey(gradeId, subject);
        var _subjectActionSelections_gradeId_subject;
        const subjectState = (_subjectActionSelections_gradeId_subject = subjectActionSelections === null || subjectActionSelections === void 0 ? void 0 : (_subjectActionSelections_gradeId = subjectActionSelections[gradeId]) === null || _subjectActionSelections_gradeId === void 0 ? void 0 : _subjectActionSelections_gradeId[subject]) !== null && _subjectActionSelections_gradeId_subject !== void 0 ? _subjectActionSelections_gradeId_subject : {};
        const cacheKey = getActionKey(gradeId, subject, action);
        const hasPdf = Boolean((_SUBJECT_PDF_ACTIONS_gradeId = SUBJECT_PDF_ACTIONS[gradeId]) === null || _SUBJECT_PDF_ACTIONS_gradeId === void 0 ? void 0 : (_SUBJECT_PDF_ACTIONS_gradeId_subject = _SUBJECT_PDF_ACTIONS_gradeId[subject]) === null || _SUBJECT_PDF_ACTIONS_gradeId_subject === void 0 ? void 0 : _SUBJECT_PDF_ACTIONS_gradeId_subject.has(action));
        if (action === "Syllabus" || action === "Reading Materials") {
            var _SUBJECT_FILES_subjectSlug;
            const subjectSlug = subject.toLowerCase();
            const actionKey = action.toLowerCase();
            const fileName = (_SUBJECT_FILES_subjectSlug = _lib_contentMap__WEBPACK_IMPORTED_MODULE_3__.SUBJECT_FILES[subjectSlug]) === null || _SUBJECT_FILES_subjectSlug === void 0 ? void 0 : _SUBJECT_FILES_subjectSlug[actionKey];
            const normalizedPath = fileName && (fileName.startsWith("http") ? fileName : "/".concat(fileName.replace(/^[/\\]+/, "")));
            setSubjectActionSelections((prev)=>{
                var _prev_gradeId;
                const gradeActions = {
                    ...(_prev_gradeId = prev === null || prev === void 0 ? void 0 : prev[gradeId]) !== null && _prev_gradeId !== void 0 ? _prev_gradeId : {}
                };
                var _gradeActions_subject;
                const updatedSubjectState = {
                    ...(_gradeActions_subject = gradeActions[subject]) !== null && _gradeActions_subject !== void 0 ? _gradeActions_subject : {},
                    [action]: false
                };
                if (Object.values(updatedSubjectState).every((value)=>value === false)) {
                    delete gradeActions[subject];
                } else {
                    gradeActions[subject] = updatedSubjectState;
                }
                const nextState = {
                    ...prev,
                    [gradeId]: gradeActions
                };
                if (Object.keys(gradeActions).length === 0) {
                    delete nextState[gradeId];
                }
                return nextState;
            });
            if (hasPdf) {
                setPdfCache((prev)=>{
                    if (!(prev === null || prev === void 0 ? void 0 : prev[cacheKey])) {
                        return prev;
                    }
                    const updated = {
                        ...prev
                    };
                    delete updated[cacheKey];
                    return updated;
                });
                setPdfLoading((prev)=>{
                    if (!(prev === null || prev === void 0 ? void 0 : prev[cacheKey])) {
                        return prev;
                    }
                    const updated = {
                        ...prev
                    };
                    delete updated[cacheKey];
                    return updated;
                });
                setPdfError((prev)=>{
                    if (!(prev === null || prev === void 0 ? void 0 : prev[cacheKey])) {
                        return prev;
                    }
                    const updated = {
                        ...prev
                    };
                    delete updated[cacheKey];
                    return updated;
                });
            }
            if (normalizedPath && "object" !== "undefined") {
                window.open(normalizedPath, "_blank", "noopener,noreferrer");
            }
            return;
        }
        const nextValue = !(subjectState === null || subjectState === void 0 ? void 0 : subjectState[action]);
        setSubjectActionSelections((prev)=>{
            var _prev_gradeId;
            const gradeActions = {
                ...(_prev_gradeId = prev === null || prev === void 0 ? void 0 : prev[gradeId]) !== null && _prev_gradeId !== void 0 ? _prev_gradeId : {}
            };
            var _gradeActions_subject;
            const updatedSubjectState = {
                ...(_gradeActions_subject = gradeActions[subject]) !== null && _gradeActions_subject !== void 0 ? _gradeActions_subject : {},
                [action]: nextValue
            };
            if (Object.values(updatedSubjectState).every((value)=>value === false)) {
                delete gradeActions[subject];
            } else {
                gradeActions[subject] = updatedSubjectState;
            }
            const nextActions = {
                ...prev,
                [gradeId]: gradeActions
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
                var _presentationTopics_subjectKey;
                const topic = (_presentationTopics_subjectKey = presentationTopics[subjectKey]) === null || _presentationTopics_subjectKey === void 0 ? void 0 : _presentationTopics_subjectKey.trim();
                triggerPresentationDownload(gradeId, subject, topic);
            }
            if (action === "Generate PDF") {
                var _handoutTopics_subjectKey;
                const topic = (_handoutTopics_subjectKey = handoutTopics[subjectKey]) === null || _handoutTopics_subjectKey === void 0 ? void 0 : _handoutTopics_subjectKey.trim();
                triggerHandoutDownload(gradeId, subject, topic);
            }
            if (action === "Lesson Plan") {
                var _lessonPlanTopics_subjectKey;
                const topic = (_lessonPlanTopics_subjectKey = lessonPlanTopics[subjectKey]) === null || _lessonPlanTopics_subjectKey === void 0 ? void 0 : _lessonPlanTopics_subjectKey.trim();
                triggerLessonPlanDownload(gradeId, subject, topic);
            }
            if (action === "Generate Web Page") {
                var _webPageTopics_subjectKey;
                const topic = (_webPageTopics_subjectKey = webPageTopics[subjectKey]) === null || _webPageTopics_subjectKey === void 0 ? void 0 : _webPageTopics_subjectKey.trim();
                triggerWebPageDownload(gradeId, subject, topic);
            }
            if (action === "Generate Concept Map") {
                var _conceptMapTopics_subjectKey;
                const topic = (_conceptMapTopics_subjectKey = conceptMapTopics[subjectKey]) === null || _conceptMapTopics_subjectKey === void 0 ? void 0 : _conceptMapTopics_subjectKey.trim();
                triggerConceptMapDownload(gradeId, subject, topic);
            }
            if (action === "Generate MCQs") {
                var _mcqTopics_subjectKey;
                const topic = (_mcqTopics_subjectKey = mcqTopics[subjectKey]) === null || _mcqTopics_subjectKey === void 0 ? void 0 : _mcqTopics_subjectKey.trim();
                triggerMcqDownload(gradeId, subject, topic);
            }
        } else {
            if (hasPdf) {
                setPdfCache((prev)=>{
                    const updated = {
                        ...prev
                    };
                    delete updated[cacheKey];
                    return updated;
                });
                setPdfLoading((prev)=>{
                    const updated = {
                        ...prev
                    };
                    delete updated[cacheKey];
                    return updated;
                });
                setPdfError((prev)=>{
                    const updated = {
                        ...prev
                    };
                    delete updated[cacheKey];
                    return updated;
                });
            }
            if (action === "Generate presentations") {
                setPresentationStatus((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setPresentationError((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setPresentationTopics((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
            }
            if (action === "Generate PDF") {
                setHandoutStatus((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setHandoutError((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setHandoutTopics((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setHandoutHistory((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
            }
            if (action === "Lesson Plan") {
                setLessonPlanStatus((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setLessonPlanError((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setLessonPlanTopics((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setLessonPlanHistory((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
            }
            if (action === "Generate Web Page") {
                setWebPageStatus((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setWebPageError((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setWebPageTopics((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setWebPageHistory((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
            }
            if (action === "Generate Concept Map") {
                setConceptMapStatus((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setConceptMapError((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setConceptMapTopics((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setConceptMapHistory((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
            }
            if (action === "Generate MCQs") {
                setMcqStatus((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setMcqError((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setMcqTopics((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
                setMcqHistory((prev)=>{
                    const { [subjectKey]: _removed, ...rest } = prev;
                    return rest;
                });
            }
        }
    };
    const theme = isDarkMode ? {
        background: "#0b1120",
        text: "#e2e8f0",
        panel: "#111827",
        panelBorder: "#1f2937",
        accent: "#38bdf8",
        isDark: true
    } : {
        background: "#ffffff",
        text: "#0f172a",
        panel: "#f8fafc",
        panelBorder: "#e2e8f0",
        accent: "#2563eb",
        isDark: false
    };
    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
        style: {
            minHeight: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: theme.background,
            color: theme.text,
            position: "relative",
            fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            padding: "60px 20px 40px",
            textAlign: "center"
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                type: "button",
                onClick: ()=>setIsDarkMode(!isDarkMode),
                "aria-label": "Switch to ".concat(isDarkMode ? "light" : "dark", " mode"),
                style: {
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
                    transition: "background 0.2s ease, border-color 0.2s ease"
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        children: isDarkMode ? "Dark" : "Light"
                    }, void 0, false, {
                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                        lineNumber: 1426,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                        style: {
                            position: "relative",
                            width: "42px",
                            height: "22px",
                            borderRadius: "9999px",
                            background: isDarkMode ? theme.accent : "#cbd5f5",
                            border: "1px solid",
                            borderColor: theme.panelBorder,
                            transition: "background 0.2s ease"
                        },
                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                            style: {
                                position: "absolute",
                                top: "2px",
                                left: isDarkMode ? "22px" : "2px",
                                width: "16px",
                                height: "16px",
                                borderRadius: "50%",
                                background: isDarkMode ? "#0b1120" : "#f8fafc",
                                boxShadow: "0 2px 4px rgba(15, 23, 42, 0.25)",
                                transition: "left 0.2s ease, background 0.2s ease"
                            }
                        }, void 0, false, {
                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                            lineNumber: 1439,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                        lineNumber: 1427,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                lineNumber: 1404,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                type: "button",
                onClick: ()=>router.push("/"),
                style: {
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
                    transition: "background 0.2s ease, color 0.2s ease"
                },
                children: "â† Back to Board Selection"
            }, void 0, false, {
                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                lineNumber: 1454,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h1", {
                style: {
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    marginBottom: "12px",
                    letterSpacing: "0.01em"
                },
                children: "Welcome to teachwiseai.mpaiapps.com"
            }, void 0, false, {
                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                lineNumber: 1475,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("h2", {
                style: {
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    marginBottom: "10px",
                    letterSpacing: "0.02em"
                },
                children: "CBSE"
            }, void 0, false, {
                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                lineNumber: 1487,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                style: {
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
                    boxShadow: isDarkMode ? "0 20px 35px rgba(15, 23, 42, 0.5)" : "0 18px 30px rgba(15, 23, 42, 0.08)"
                },
                children: GRADE_CONFIGS.map((gradeConfig)=>{
                    const control = gradeControls[gradeConfig.id];
                    if (!control) {
                        return null;
                    }
                    const { isActive, setActive } = control;
                    var _selectedSubjects_gradeConfig_id;
                    const selectedGradeSubjects = (_selectedSubjects_gradeConfig_id = selectedSubjects === null || selectedSubjects === void 0 ? void 0 : selectedSubjects[gradeConfig.id]) !== null && _selectedSubjects_gradeConfig_id !== void 0 ? _selectedSubjects_gradeConfig_id : {};
                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px"
                        },
                        children: [
                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("label", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px"
                                },
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                        type: "checkbox",
                                        checked: isActive,
                                        onChange: ()=>setActive(!isActive),
                                        style: {
                                            accentColor: theme.accent
                                        }
                                    }, void 0, false, {
                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                        lineNumber: 1533,
                                        columnNumber: 17
                                    }, this),
                                    gradeConfig.label
                                ]
                            }, void 0, true, {
                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                lineNumber: 1532,
                                columnNumber: 15
                            }, this),
                            isActive && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                style: {
                                    paddingLeft: "30px",
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                    gap: "8px 18px",
                                    fontSize: "1rem",
                                    color: theme.text
                                },
                                children: gradeConfig.subjects.map((subject)=>{
                                    var _subjectActionSelections_gradeConfig_id;
                                    const isSelected = Boolean(selectedGradeSubjects[subject]);
                                    const subjectKey = getSubjectKey(gradeConfig.id, subject);
                                    var _subjectActionSelections_gradeConfig_id_subject;
                                    const actionState = (_subjectActionSelections_gradeConfig_id_subject = subjectActionSelections === null || subjectActionSelections === void 0 ? void 0 : (_subjectActionSelections_gradeConfig_id = subjectActionSelections[gradeConfig.id]) === null || _subjectActionSelections_gradeConfig_id === void 0 ? void 0 : _subjectActionSelections_gradeConfig_id[subject]) !== null && _subjectActionSelections_gradeConfig_id_subject !== void 0 ? _subjectActionSelections_gradeConfig_id_subject : {};
                                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                        style: {
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "6px"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("label", {
                                                style: {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "8px",
                                                    background: isDarkMode ? isSelected ? "rgba(56, 189, 248, 0.25)" : "rgba(15, 23, 42, 0.35)" : isSelected ? "#bfdbfe" : "#eef2ff",
                                                    borderRadius: "12px",
                                                    padding: "8px 10px",
                                                    border: "1px solid",
                                                    borderColor: isDarkMode ? isSelected ? "#38bdf8" : "#1e293b" : isSelected ? "#60a5fa" : "#c7d2fe",
                                                    transition: "background 0.2s ease, border-color 0.2s ease"
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                                        type: "checkbox",
                                                        checked: isSelected,
                                                        onChange: ()=>toggleSubjectSelection(gradeConfig, subject),
                                                        style: {
                                                            accentColor: theme.accent
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                        lineNumber: 1589,
                                                        columnNumber: 27
                                                    }, this),
                                                    subject
                                                ]
                                            }, void 0, true, {
                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                lineNumber: 1564,
                                                columnNumber: 25
                                            }, this),
                                            isSelected && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                style: {
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "4px",
                                                    paddingLeft: "32px",
                                                    paddingRight: "8px"
                                                },
                                                children: SUBJECT_ACTIONS.map((action)=>{
                                                    var _SUBJECT_PDF_ACTIONS_gradeConfig_id;
                                                    const isActionSelected = Boolean(actionState[action]);
                                                    const cacheKey = getActionKey(gradeConfig.id, subject, action);
                                                    const pdfSet = (_SUBJECT_PDF_ACTIONS_gradeConfig_id = SUBJECT_PDF_ACTIONS[gradeConfig.id]) === null || _SUBJECT_PDF_ACTIONS_gradeConfig_id === void 0 ? void 0 : _SUBJECT_PDF_ACTIONS_gradeConfig_id[subject];
                                                    const hasPdf = Boolean(pdfSet === null || pdfSet === void 0 ? void 0 : pdfSet.has(action));
                                                    const isSyllabus = action === "Syllabus";
                                                    const isReadingMaterials = action === "Reading Materials";
                                                    const showInlinePdf = hasPdf && !isSyllabus && !isReadingMaterials;
                                                    const presentationState = presentationStatus[subjectKey];
                                                    const presentationErrorMessage = presentationError[subjectKey];
                                                    var _presentationTopics_subjectKey;
                                                    const topicValue = (_presentationTopics_subjectKey = presentationTopics[subjectKey]) !== null && _presentationTopics_subjectKey !== void 0 ? _presentationTopics_subjectKey : "";
                                                    var _presentationHistory_subjectKey;
                                                    const recentTopics = (_presentationHistory_subjectKey = presentationHistory[subjectKey]) !== null && _presentationHistory_subjectKey !== void 0 ? _presentationHistory_subjectKey : [];
                                                    const handoutState = handoutStatus[subjectKey];
                                                    const handoutErrorMessage = handoutError[subjectKey];
                                                    var _handoutTopics_subjectKey;
                                                    const handoutValue = (_handoutTopics_subjectKey = handoutTopics[subjectKey]) !== null && _handoutTopics_subjectKey !== void 0 ? _handoutTopics_subjectKey : "";
                                                    var _handoutHistory_subjectKey;
                                                    const handoutRecent = (_handoutHistory_subjectKey = handoutHistory[subjectKey]) !== null && _handoutHistory_subjectKey !== void 0 ? _handoutHistory_subjectKey : [];
                                                    const lessonPlanState = lessonPlanStatus[subjectKey];
                                                    const lessonPlanErrorMessage = lessonPlanError[subjectKey];
                                                    var _lessonPlanTopics_subjectKey;
                                                    const lessonPlanValue = (_lessonPlanTopics_subjectKey = lessonPlanTopics[subjectKey]) !== null && _lessonPlanTopics_subjectKey !== void 0 ? _lessonPlanTopics_subjectKey : "";
                                                    var _lessonPlanHistory_subjectKey;
                                                    const lessonPlanRecent = (_lessonPlanHistory_subjectKey = lessonPlanHistory[subjectKey]) !== null && _lessonPlanHistory_subjectKey !== void 0 ? _lessonPlanHistory_subjectKey : [];
                                                    const webPageState = webPageStatus[subjectKey];
                                                    const webPageErrorMessage = webPageError[subjectKey];
                                                    var _webPageTopics_subjectKey;
                                                    const webPageValue = (_webPageTopics_subjectKey = webPageTopics[subjectKey]) !== null && _webPageTopics_subjectKey !== void 0 ? _webPageTopics_subjectKey : "";
                                                    var _webPageHistory_subjectKey;
                                                    const webPageRecent = (_webPageHistory_subjectKey = webPageHistory[subjectKey]) !== null && _webPageHistory_subjectKey !== void 0 ? _webPageHistory_subjectKey : [];
                                                    const conceptMapState = conceptMapStatus[subjectKey];
                                                    const conceptMapErrorMessage = conceptMapError[subjectKey];
                                                    var _conceptMapTopics_subjectKey;
                                                    const conceptMapValue = (_conceptMapTopics_subjectKey = conceptMapTopics[subjectKey]) !== null && _conceptMapTopics_subjectKey !== void 0 ? _conceptMapTopics_subjectKey : "";
                                                    var _conceptMapHistory_subjectKey;
                                                    const conceptMapRecent = (_conceptMapHistory_subjectKey = conceptMapHistory[subjectKey]) !== null && _conceptMapHistory_subjectKey !== void 0 ? _conceptMapHistory_subjectKey : [];
                                                    const mcqState = mcqStatus[subjectKey];
                                                    const mcqErrorMessage = mcqError[subjectKey];
                                                    var _mcqTopics_subjectKey;
                                                    const mcqValue = (_mcqTopics_subjectKey = mcqTopics[subjectKey]) !== null && _mcqTopics_subjectKey !== void 0 ? _mcqTopics_subjectKey : "";
                                                    var _mcqHistory_subjectKey;
                                                    const mcqRecent = (_mcqHistory_subjectKey = mcqHistory[subjectKey]) !== null && _mcqHistory_subjectKey !== void 0 ? _mcqHistory_subjectKey : [];
                                                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                        style: {
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            gap: "6px"
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("label", {
                                                                style: {
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: "8px",
                                                                    fontSize: "0.92rem",
                                                                    color: theme.text
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                                                        type: "checkbox",
                                                                        checked: isActionSelected,
                                                                        onChange: ()=>toggleSubjectAction(gradeConfig, subject, action),
                                                                        style: {
                                                                            accentColor: theme.accent
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1660,
                                                                        columnNumber: 37
                                                                    }, this),
                                                                    action
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 1651,
                                                                columnNumber: 35
                                                            }, this),
                                                            isActionSelected && showInlinePdf && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(PdfContentViewer, {
                                                                base64Data: pdfCache[cacheKey],
                                                                isLoading: Boolean(pdfLoading[cacheKey]),
                                                                error: pdfError[cacheKey],
                                                                theme: theme,
                                                                label: "".concat(gradeConfig.label, " ").concat(subject, " ").concat(action)
                                                            }, void 0, false, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 1672,
                                                                columnNumber: 37
                                                            }, this),
                                                            isActionSelected && action === "Generate presentations" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                style: {
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    gap: "6px",
                                                                    paddingLeft: "6px"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            gap: "8px",
                                                                            alignItems: "center"
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                                                                type: "text",
                                                                                value: topicValue,
                                                                                onChange: (event)=>{
                                                                                    const { value } = event.target;
                                                                                    setPresentationTopics((prev)=>({
                                                                                            ...prev,
                                                                                            [subjectKey]: value
                                                                                        }));
                                                                                    if (presentationStatus[subjectKey] === "missing-topic") {
                                                                                        setPresentationStatus((prev)=>({
                                                                                                ...prev,
                                                                                                [subjectKey]: null
                                                                                            }));
                                                                                    }
                                                                                },
                                                                                placeholder: "Search topic",
                                                                                style: {
                                                                                    flex: "1",
                                                                                    padding: "8px 12px",
                                                                                    borderRadius: "10px",
                                                                                    border: "1px solid",
                                                                                    borderColor: theme.panelBorder,
                                                                                    background: theme.isDark ? "#0f172a" : "#f8fafc",
                                                                                    color: theme.text
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 1697,
                                                                                columnNumber: 41
                                                                            }, this),
                                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                                                                type: "button",
                                                                                onClick: ()=>triggerPresentationDownload(gradeConfig.id, subject, topicValue.trim()),
                                                                                style: {
                                                                                    padding: "8px 16px",
                                                                                    borderRadius: "10px",
                                                                                    border: "none",
                                                                                    background: theme.accent,
                                                                                    color: theme.isDark ? "#0b1120" : "#ffffff",
                                                                                    fontWeight: 600,
                                                                                    cursor: "pointer"
                                                                                },
                                                                                disabled: presentationState === "loading",
                                                                                children: presentationState === "loading" ? "Generatingâ€¦" : "Generate"
                                                                            }, void 0, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 1724,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1690,
                                                                        columnNumber: 39
                                                                    }, this),
                                                                    presentationState === "missing-topic" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: "#f97316"
                                                                        },
                                                                        children: "Enter a topic to continue."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1750,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    presentationState === "error" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: "#f87171"
                                                                        },
                                                                        children: [
                                                                            "Unable to generate presentation: ",
                                                                            presentationErrorMessage !== null && presentationErrorMessage !== void 0 ? presentationErrorMessage : "Unknown error"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1760,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    presentationState === "success" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: theme.isDark ? "#38bdf8" : "#2563eb"
                                                                        },
                                                                        children: "Presentation downloaded."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1770,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    !presentationState && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: theme.isDark ? "#94a3b8" : "#475569"
                                                                        },
                                                                        children: "Type a topic and click Generate to download a PPTX."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1780,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    recentTopics.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            gap: "6px",
                                                                            flexWrap: "wrap",
                                                                            marginTop: "4px"
                                                                        },
                                                                        children: recentTopics.map((recentTopic)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                                                                type: "button",
                                                                                onClick: ()=>{
                                                                                    setPresentationTopics((prev)=>({
                                                                                            ...prev,
                                                                                            [subjectKey]: recentTopic
                                                                                        }));
                                                                                    triggerPresentationDownload(gradeConfig.id, subject, recentTopic);
                                                                                },
                                                                                style: {
                                                                                    padding: "4px 10px",
                                                                                    borderRadius: "9999px",
                                                                                    border: "1px solid",
                                                                                    borderColor: theme.panelBorder,
                                                                                    background: theme.isDark ? "#1e293b" : "#e2e8f0",
                                                                                    color: theme.text,
                                                                                    fontSize: "0.78rem",
                                                                                    cursor: "pointer"
                                                                                },
                                                                                disabled: presentationState === "loading",
                                                                                children: recentTopic
                                                                            }, recentTopic, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 1799,
                                                                                columnNumber: 45
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1790,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 1682,
                                                                columnNumber: 37
                                                            }, this),
                                                            isActionSelected && action === "Generate PDF" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                style: {
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    gap: "6px",
                                                                    paddingLeft: "6px"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            gap: "8px",
                                                                            alignItems: "center"
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                                                                type: "text",
                                                                                value: handoutValue,
                                                                                onChange: (event)=>{
                                                                                    const { value } = event.target;
                                                                                    setHandoutTopics((prev)=>({
                                                                                            ...prev,
                                                                                            [subjectKey]: value
                                                                                        }));
                                                                                    if (handoutStatus[subjectKey] === "missing-topic") {
                                                                                        setHandoutStatus((prev)=>({
                                                                                                ...prev,
                                                                                                [subjectKey]: null
                                                                                            }));
                                                                                    }
                                                                                },
                                                                                placeholder: "Search topic",
                                                                                style: {
                                                                                    flex: "1",
                                                                                    padding: "8px 12px",
                                                                                    borderRadius: "10px",
                                                                                    border: "1px solid",
                                                                                    borderColor: theme.panelBorder,
                                                                                    background: theme.isDark ? "#0f172a" : "#f8fafc",
                                                                                    color: theme.text
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 1851,
                                                                                columnNumber: 41
                                                                            }, this),
                                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                                                                type: "button",
                                                                                onClick: ()=>triggerHandoutDownload(gradeConfig.id, subject, handoutValue.trim()),
                                                                                style: {
                                                                                    padding: "8px 16px",
                                                                                    borderRadius: "10px",
                                                                                    border: "none",
                                                                                    background: theme.accent,
                                                                                    color: theme.isDark ? "#0b1120" : "#ffffff",
                                                                                    fontWeight: 600,
                                                                                    cursor: "pointer"
                                                                                },
                                                                                disabled: handoutState === "loading",
                                                                                children: handoutState === "loading" ? "Generatingâ€¦" : "Generate"
                                                                            }, void 0, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 1878,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1844,
                                                                        columnNumber: 39
                                                                    }, this),
                                                                    handoutState === "missing-topic" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: "#f97316"
                                                                        },
                                                                        children: "Enter a topic to continue."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1904,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    handoutState === "error" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: "#f87171"
                                                                        },
                                                                        children: [
                                                                            "Unable to generate PDF: ",
                                                                            handoutErrorMessage !== null && handoutErrorMessage !== void 0 ? handoutErrorMessage : "Unknown error"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1914,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    handoutState === "success" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: theme.isDark ? "#38bdf8" : "#2563eb"
                                                                        },
                                                                        children: "PDF downloaded."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1924,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    !handoutState && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: theme.isDark ? "#94a3b8" : "#475569"
                                                                        },
                                                                        children: "Type a topic and click Generate to download a PDF handout."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1934,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    handoutRecent.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            gap: "6px",
                                                                            flexWrap: "wrap",
                                                                            marginTop: "4px"
                                                                        },
                                                                        children: handoutRecent.map((recentTopic)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                                                                type: "button",
                                                                                onClick: ()=>{
                                                                                    setHandoutTopics((prev)=>({
                                                                                            ...prev,
                                                                                            [subjectKey]: recentTopic
                                                                                        }));
                                                                                    triggerHandoutDownload(gradeConfig.id, subject, recentTopic);
                                                                                },
                                                                                style: {
                                                                                    padding: "4px 10px",
                                                                                    borderRadius: "9999px",
                                                                                    border: "1px solid",
                                                                                    borderColor: theme.panelBorder,
                                                                                    background: theme.isDark ? "#1e293b" : "#e2e8f0",
                                                                                    color: theme.text,
                                                                                    fontSize: "0.78rem",
                                                                                    cursor: "pointer"
                                                                                },
                                                                                disabled: handoutState === "loading",
                                                                                children: recentTopic
                                                                            }, recentTopic, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 1953,
                                                                                columnNumber: 45
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1944,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 1836,
                                                                columnNumber: 37
                                                            }, this),
                                                            isActionSelected && action === "Lesson Plan" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                style: {
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    gap: "6px",
                                                                    paddingLeft: "6px"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            gap: "8px",
                                                                            alignItems: "center"
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                                                                type: "text",
                                                                                value: lessonPlanValue,
                                                                                onChange: (event)=>{
                                                                                    const { value } = event.target;
                                                                                    setLessonPlanTopics((prev)=>({
                                                                                            ...prev,
                                                                                            [subjectKey]: value
                                                                                        }));
                                                                                    if (lessonPlanStatus[subjectKey] === "missing-topic") {
                                                                                        setLessonPlanStatus((prev)=>({
                                                                                                ...prev,
                                                                                                [subjectKey]: null
                                                                                            }));
                                                                                    }
                                                                                },
                                                                                placeholder: "Search topic",
                                                                                style: {
                                                                                    flex: "1",
                                                                                    padding: "8px 12px",
                                                                                    borderRadius: "10px",
                                                                                    border: "1px solid",
                                                                                    borderColor: theme.panelBorder,
                                                                                    background: theme.isDark ? "#0f172a" : "#f8fafc",
                                                                                    color: theme.text
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 2005,
                                                                                columnNumber: 41
                                                                            }, this),
                                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                                                                type: "button",
                                                                                onClick: ()=>triggerLessonPlanDownload(gradeConfig.id, subject, lessonPlanValue.trim()),
                                                                                style: {
                                                                                    padding: "8px 16px",
                                                                                    borderRadius: "10px",
                                                                                    border: "none",
                                                                                    background: theme.accent,
                                                                                    color: theme.isDark ? "#0b1120" : "#ffffff",
                                                                                    fontWeight: 600,
                                                                                    cursor: "pointer"
                                                                                },
                                                                                disabled: lessonPlanState === "loading",
                                                                                children: lessonPlanState === "loading" ? "Generatingâ€¦" : "Generate"
                                                                            }, void 0, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 2032,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1998,
                                                                        columnNumber: 39
                                                                    }, this),
                                                                    lessonPlanState === "missing-topic" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: "#f97316"
                                                                        },
                                                                        children: "Enter a topic to continue."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2058,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    lessonPlanState === "error" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: "#f87171"
                                                                        },
                                                                        children: [
                                                                            "Unable to generate lesson plan: ",
                                                                            lessonPlanErrorMessage !== null && lessonPlanErrorMessage !== void 0 ? lessonPlanErrorMessage : "Unknown error"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2068,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    lessonPlanState === "success" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: theme.isDark ? "#38bdf8" : "#2563eb"
                                                                        },
                                                                        children: "Lesson plan downloaded."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2078,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    !lessonPlanState && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: theme.isDark ? "#94a3b8" : "#475569"
                                                                        },
                                                                        children: "Type a topic and click Generate to download a lesson plan PDF."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2088,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    lessonPlanRecent.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            gap: "6px",
                                                                            flexWrap: "wrap",
                                                                            marginTop: "4px"
                                                                        },
                                                                        children: lessonPlanRecent.map((recentTopic)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                                                                type: "button",
                                                                                onClick: ()=>{
                                                                                    setLessonPlanTopics((prev)=>({
                                                                                            ...prev,
                                                                                            [subjectKey]: recentTopic
                                                                                        }));
                                                                                    triggerLessonPlanDownload(gradeConfig.id, subject, recentTopic);
                                                                                },
                                                                                style: {
                                                                                    padding: "4px 10px",
                                                                                    borderRadius: "9999px",
                                                                                    border: "1px solid",
                                                                                    borderColor: theme.panelBorder,
                                                                                    background: theme.isDark ? "#1e293b" : "#e2e8f0",
                                                                                    color: theme.text,
                                                                                    fontSize: "0.78rem",
                                                                                    cursor: "pointer"
                                                                                },
                                                                                disabled: lessonPlanState === "loading",
                                                                                children: recentTopic
                                                                            }, recentTopic, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 2107,
                                                                                columnNumber: 45
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2098,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 1990,
                                                                columnNumber: 37
                                                            }, this),
                                                            isActionSelected && action === "Generate Web Page" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                style: {
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    gap: "6px",
                                                                    paddingLeft: "6px"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            gap: "8px",
                                                                            alignItems: "center"
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                                                                type: "text",
                                                                                value: webPageValue,
                                                                                onChange: (event)=>{
                                                                                    const { value } = event.target;
                                                                                    setWebPageTopics((prev)=>({
                                                                                            ...prev,
                                                                                            [subjectKey]: value
                                                                                        }));
                                                                                    if (webPageStatus[subjectKey] === "missing-topic") {
                                                                                        setWebPageStatus((prev)=>({
                                                                                                ...prev,
                                                                                                [subjectKey]: null
                                                                                            }));
                                                                                    }
                                                                                },
                                                                                placeholder: "Search topic",
                                                                                style: {
                                                                                    flex: "1",
                                                                                    padding: "8px 12px",
                                                                                    borderRadius: "10px",
                                                                                    border: "1px solid",
                                                                                    borderColor: theme.panelBorder,
                                                                                    background: theme.isDark ? "#0f172a" : "#f8fafc",
                                                                                    color: theme.text
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 2159,
                                                                                columnNumber: 41
                                                                            }, this),
                                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                                                                type: "button",
                                                                                onClick: ()=>triggerWebPageDownload(gradeConfig.id, subject, webPageValue.trim()),
                                                                                style: {
                                                                                    padding: "8px 16px",
                                                                                    borderRadius: "10px",
                                                                                    border: "none",
                                                                                    background: theme.accent,
                                                                                    color: theme.isDark ? "#0b1120" : "#ffffff",
                                                                                    fontWeight: 600,
                                                                                    cursor: "pointer"
                                                                                },
                                                                                disabled: webPageState === "loading",
                                                                                children: webPageState === "loading" ? "Generatingâ€¦" : "Generate"
                                                                            }, void 0, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 2186,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2152,
                                                                        columnNumber: 39
                                                                    }, this),
                                                                    webPageState === "missing-topic" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: "#f97316"
                                                                        },
                                                                        children: "Enter a topic to continue."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2210,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    webPageState === "error" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: "#f87171"
                                                                        },
                                                                        children: [
                                                                            "Unable to generate web page: ",
                                                                            webPageErrorMessage !== null && webPageErrorMessage !== void 0 ? webPageErrorMessage : "Unknown error"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2220,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    webPageState === "success" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: theme.isDark ? "#38bdf8" : "#2563eb"
                                                                        },
                                                                        children: "Web page downloaded."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2230,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    !webPageState && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: theme.isDark ? "#94a3b8" : "#475569"
                                                                        },
                                                                        children: "Type a topic and click Generate to download an HTML web page."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2240,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    webPageRecent.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            gap: "6px",
                                                                            flexWrap: "wrap",
                                                                            marginTop: "4px"
                                                                        },
                                                                        children: webPageRecent.map((recentTopic)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                                                                type: "button",
                                                                                onClick: ()=>{
                                                                                    setWebPageTopics((prev)=>({
                                                                                            ...prev,
                                                                                            [subjectKey]: recentTopic
                                                                                        }));
                                                                                    triggerWebPageDownload(gradeConfig.id, subject, recentTopic);
                                                                                },
                                                                                style: {
                                                                                    padding: "4px 10px",
                                                                                    borderRadius: "9999px",
                                                                                    border: "1px solid",
                                                                                    borderColor: theme.panelBorder,
                                                                                    background: theme.isDark ? "#1e293b" : "#e2e8f0",
                                                                                    color: theme.text,
                                                                                    fontSize: "0.78rem",
                                                                                    cursor: "pointer"
                                                                                },
                                                                                disabled: webPageState === "loading",
                                                                                children: recentTopic
                                                                            }, recentTopic, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 2259,
                                                                                columnNumber: 45
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2250,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 2144,
                                                                columnNumber: 37
                                                            }, this),
                                                            isActionSelected && action === "Generate Concept Map" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                style: {
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    gap: "6px",
                                                                    paddingLeft: "6px"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            gap: "8px",
                                                                            alignItems: "center"
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                                                                type: "text",
                                                                                value: conceptMapValue,
                                                                                onChange: (event)=>{
                                                                                    const { value } = event.target;
                                                                                    setConceptMapTopics((prev)=>({
                                                                                            ...prev,
                                                                                            [subjectKey]: value
                                                                                        }));
                                                                                    if (conceptMapStatus[subjectKey] === "missing-topic") {
                                                                                        setConceptMapStatus((prev)=>({
                                                                                                ...prev,
                                                                                                [subjectKey]: null
                                                                                            }));
                                                                                    }
                                                                                },
                                                                                placeholder: "Search topic",
                                                                                style: {
                                                                                    flex: "1",
                                                                                    padding: "8px 12px",
                                                                                    borderRadius: "10px",
                                                                                    border: "1px solid",
                                                                                    borderColor: theme.panelBorder,
                                                                                    background: theme.isDark ? "#0f172a" : "#f8fafc",
                                                                                    color: theme.text
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 2311,
                                                                                columnNumber: 41
                                                                            }, this),
                                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                                                                type: "button",
                                                                                onClick: ()=>triggerConceptMapDownload(gradeConfig.id, subject, conceptMapValue.trim()),
                                                                                style: {
                                                                                    padding: "8px 16px",
                                                                                    borderRadius: "10px",
                                                                                    border: "none",
                                                                                    background: theme.accent,
                                                                                    color: theme.isDark ? "#0b1120" : "#ffffff",
                                                                                    fontWeight: 600,
                                                                                    cursor: "pointer"
                                                                                },
                                                                                disabled: conceptMapState === "loading",
                                                                                children: conceptMapState === "loading" ? "Generatingâ€¦" : "Generate"
                                                                            }, void 0, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 2338,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2304,
                                                                        columnNumber: 39
                                                                    }, this),
                                                                    conceptMapState === "missing-topic" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: "#f97316"
                                                                        },
                                                                        children: "Enter a topic to continue."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2364,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    conceptMapState === "error" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: "#f87171"
                                                                        },
                                                                        children: [
                                                                            "Unable to generate concept map: ",
                                                                            conceptMapErrorMessage !== null && conceptMapErrorMessage !== void 0 ? conceptMapErrorMessage : "Unknown error"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2374,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    conceptMapState === "success" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: theme.isDark ? "#38bdf8" : "#2563eb"
                                                                        },
                                                                        children: "Concept map PDF downloaded."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2384,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    !conceptMapState && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: theme.isDark ? "#94a3b8" : "#475569"
                                                                        },
                                                                        children: "Type a topic and click Generate to download a concept map PDF."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2394,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    conceptMapRecent.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            gap: "6px",
                                                                            flexWrap: "wrap",
                                                                            marginTop: "4px"
                                                                        },
                                                                        children: conceptMapRecent.map((recentTopic)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                                                                type: "button",
                                                                                onClick: ()=>{
                                                                                    setConceptMapTopics((prev)=>({
                                                                                            ...prev,
                                                                                            [subjectKey]: recentTopic
                                                                                        }));
                                                                                    triggerConceptMapDownload(gradeConfig.id, subject, recentTopic);
                                                                                },
                                                                                style: {
                                                                                    padding: "4px 10px",
                                                                                    borderRadius: "9999px",
                                                                                    border: "1px solid",
                                                                                    borderColor: theme.panelBorder,
                                                                                    background: theme.isDark ? "#1e293b" : "#e2e8f0",
                                                                                    color: theme.text,
                                                                                    fontSize: "0.78rem",
                                                                                    cursor: "pointer"
                                                                                },
                                                                                disabled: conceptMapState === "loading",
                                                                                children: recentTopic
                                                                            }, recentTopic, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 2413,
                                                                                columnNumber: 45
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2404,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 2296,
                                                                columnNumber: 37
                                                            }, this),
                                                            isActionSelected && action === "Generate MCQs" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                style: {
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    gap: "6px",
                                                                    paddingLeft: "6px"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            gap: "8px",
                                                                            alignItems: "center"
                                                                        },
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                                                                type: "text",
                                                                                value: mcqValue,
                                                                                onChange: (event)=>{
                                                                                    const { value } = event.target;
                                                                                    setMcqTopics((prev)=>({
                                                                                            ...prev,
                                                                                            [subjectKey]: value
                                                                                        }));
                                                                                    if (mcqStatus[subjectKey] === "missing-topic") {
                                                                                        setMcqStatus((prev)=>({
                                                                                                ...prev,
                                                                                                [subjectKey]: null
                                                                                            }));
                                                                                    }
                                                                                },
                                                                                placeholder: "Search topic",
                                                                                style: {
                                                                                    flex: "1",
                                                                                    padding: "8px 12px",
                                                                                    borderRadius: "10px",
                                                                                    border: "1px solid",
                                                                                    borderColor: theme.panelBorder,
                                                                                    background: theme.isDark ? "#0f172a" : "#f8fafc",
                                                                                    color: theme.text
                                                                                }
                                                                            }, void 0, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 2465,
                                                                                columnNumber: 41
                                                                            }, this),
                                                                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                                                                type: "button",
                                                                                onClick: ()=>triggerMcqDownload(gradeConfig.id, subject, mcqValue.trim()),
                                                                                style: {
                                                                                    padding: "8px 16px",
                                                                                    borderRadius: "10px",
                                                                                    border: "none",
                                                                                    background: theme.accent,
                                                                                    color: theme.isDark ? "#0b1120" : "#ffffff",
                                                                                    fontWeight: 600,
                                                                                    cursor: "pointer"
                                                                                },
                                                                                disabled: mcqState === "loading",
                                                                                children: mcqState === "loading" ? "Generatingâ€¦" : "Generate"
                                                                            }, void 0, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 2492,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2458,
                                                                        columnNumber: 39
                                                                    }, this),
                                                                    mcqState === "missing-topic" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: "#f97316"
                                                                        },
                                                                        children: "Enter a topic to continue."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2516,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    mcqState === "error" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: "#f87171"
                                                                        },
                                                                        children: [
                                                                            "Unable to generate MCQs: ",
                                                                            mcqErrorMessage !== null && mcqErrorMessage !== void 0 ? mcqErrorMessage : "Unknown error"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2526,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    mcqState === "success" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: theme.isDark ? "#38bdf8" : "#2563eb"
                                                                        },
                                                                        children: "MCQ set PDF downloaded."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2536,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    !mcqState && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                        style: {
                                                                            fontSize: "0.82rem",
                                                                            color: theme.isDark ? "#94a3b8" : "#475569"
                                                                        },
                                                                        children: "Type a topic and click Generate to download a multiple-choice practice PDF."
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2546,
                                                                        columnNumber: 41
                                                                    }, this),
                                                                    mcqRecent.length > 0 && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                                        style: {
                                                                            display: "flex",
                                                                            gap: "6px",
                                                                            flexWrap: "wrap",
                                                                            marginTop: "4px"
                                                                        },
                                                                        children: mcqRecent.map((recentTopic)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("button", {
                                                                                type: "button",
                                                                                onClick: ()=>{
                                                                                    setMcqTopics((prev)=>({
                                                                                            ...prev,
                                                                                            [subjectKey]: recentTopic
                                                                                        }));
                                                                                    triggerMcqDownload(gradeConfig.id, subject, recentTopic);
                                                                                },
                                                                                style: {
                                                                                    padding: "4px 10px",
                                                                                    borderRadius: "9999px",
                                                                                    border: "1px solid",
                                                                                    borderColor: theme.panelBorder,
                                                                                    background: theme.isDark ? "#1e293b" : "#e2e8f0",
                                                                                    color: theme.text,
                                                                                    fontSize: "0.78rem",
                                                                                    cursor: "pointer"
                                                                                },
                                                                                disabled: mcqState === "loading",
                                                                                children: recentTopic
                                                                            }, recentTopic, false, {
                                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                                lineNumber: 2565,
                                                                                columnNumber: 45
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2556,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 2450,
                                                                columnNumber: 37
                                                            }, this),
                                                            isActionSelected && !hasPdf && action !== "Generate presentations" && action !== "Generate PDF" && action !== "Lesson Plan" && action !== "Generate Web Page" && action !== "Generate Concept Map" && action !== "Generate MCQs" && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                style: {
                                                                    fontSize: "0.88rem",
                                                                    color: theme.isDark ? "#94a3b8" : "#475569",
                                                                    paddingLeft: "6px"
                                                                },
                                                                children: "Resource coming soon"
                                                            }, void 0, false, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 2609,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, action, true, {
                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                        lineNumber: 1643,
                                                        columnNumber: 33
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                lineNumber: 1599,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, "".concat(gradeConfig.id, "-").concat(subject), true, {
                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                        lineNumber: 1560,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                lineNumber: 1543,
                                columnNumber: 17
                            }, this)
                        ]
                    }, gradeConfig.id, true, {
                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                        lineNumber: 1528,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                lineNumber: 1499,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
        lineNumber: 1387,
        columnNumber: 5
    }, this);
}
_s2(CbseDashboard, "OKJW6DAAD6Ro1Pajph+zO0bj+DE=", false, function() {
    return [
        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter
    ];
});
_c4 = CbseDashboard;
var _c, _c1, _c2, _c3, _c4;
$RefreshReg$(_c, "GRADE_NUMBER_MAP$GRADE_CONFIGS.reduce");
$RefreshReg$(_c1, "GRADE_NUMBER_MAP");
$RefreshReg$(_c2, "PdfContentViewer");
$RefreshReg$(_c3, "Home");
$RefreshReg$(_c4, "CbseDashboard");


;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();
//# sourceURL=[module]
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLEtBQVcsT0FBUmdOOzs7OztnQ0F5aUNoQzs7Ozs7Ozt1QkF6a0NDdUIsWUFBWXZPLEVBQUU7Ozs7O2dCQThrQ3pCOzs7Ozs7Ozs7Ozs7QUFJUjtJQXBxRWdCMEk7O1FBQ0M3SSxrREFBU0E7OztNQURWNkkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaW5kZXguanN4PzdmZmQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCB7IFNVQkpFQ1RfRklMRVMgfSBmcm9tIFwiLi4vbGliL2NvbnRlbnRNYXBcIjtcblxuY29uc3QgR1JBREVfQ09ORklHUyA9IFtcbiAge1xuICAgIGlkOiBcImdyYWRlMTJcIixcbiAgICBsYWJlbDogXCJHcmFkZSAxMlwiLFxuICAgIG51bWJlcjogMTIsXG4gICAgc3ViamVjdHM6IFtcIk1hdGhzXCIsIFwiUGh5c2ljc1wiLCBcIkNoZW1pc3RyeVwiLCBcIkJpb2xvZ3lcIl0sXG4gIH0sXG4gIHtcbiAgICBpZDogXCJncmFkZTExXCIsXG4gICAgbGFiZWw6IFwiR3JhZGUgMTFcIixcbiAgICBudW1iZXI6IDExLFxuICAgIHN1YmplY3RzOiBbXCJNYXRoc1wiLCBcIlBoeXNpY3NcIiwgXCJDaGVtaXN0cnlcIiwgXCJCaW9sb2d5XCJdLFxuICB9LFxuICB7XG4gICAgaWQ6IFwiZ3JhZGUxMFwiLFxuICAgIGxhYmVsOiBcIkdyYWRlIDEwXCIsXG4gICAgbnVtYmVyOiAxMCxcbiAgICBzdWJqZWN0czogW1wiTWF0aHNcIiwgXCJQaHlzaWNzXCIsIFwiQ2hlbWlzdHJ5XCIsIFwiQmlvbG9neVwiXSxcbiAgfSxcbiAge1xuICAgIGlkOiBcImdyYWRlOVwiLFxuICAgIGxhYmVsOiBcIkdyYWRlIDlcIixcbiAgICBudW1iZXI6IDksXG4gICAgc3ViamVjdHM6IFtcIk1hdGhzXCIsIFwiUGh5c2ljc1wiLCBcIkNoZW1pc3RyeVwiLCBcIkJpb2xvZ3lcIl0sXG4gIH0sXG4gIHtcbiAgICBpZDogXCJncmFkZThcIixcbiAgICBsYWJlbDogXCJHcmFkZSA4XCIsXG4gICAgbnVtYmVyOiA4LFxuICAgIHN1YmplY3RzOiBbXCJNYXRoc1wiLCBcIlBoeXNpY3NcIiwgXCJDaGVtaXN0cnlcIiwgXCJCaW9sb2d5XCJdLFxuICB9LFxuXTtcbmNvbnN0IEdSQURFX05VTUJFUl9NQVAgPSBHUkFERV9DT05GSUdTLnJlZHVjZSgoYWNjdW11bGF0b3IsIGNvbmZpZykgPT4ge1xuICBhY2N1bXVsYXRvcltjb25maWcuaWRdID0gY29uZmlnLm51bWJlcjtcbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufSwge30pO1xuY29uc3QgU1VCSkVDVF9BQ1RJT05TID0gW1xuICBcIlN5bGxhYnVzXCIsXG4gIFwiTGVzc29uIFBsYW5cIixcbiAgXCJHZW5lcmF0ZSBwcmVzZW50YXRpb25zXCIsXG4gIFwiUmVhZGluZyBNYXRlcmlhbHNcIixcbiAgXCJHZW5lcmF0ZSBQREZcIixcbiAgXCJHZW5lcmF0ZSBXZWIgUGFnZVwiLFxuICBcIkdlbmVyYXRlIENvbmNlcHQgTWFwXCIsXG4gIFwiR2VuZXJhdGUgTUNRc1wiLFxuXTtcbmNvbnN0IFNVQkpFQ1RfUERGX0FDVElPTlMgPSB7XG4gIGdyYWRlMTI6IHtcbiAgICBNYXRoczogbmV3IFNldChbXCJTeWxsYWJ1c1wiLCBcIlJlYWRpbmcgTWF0ZXJpYWxzXCJdKSxcbiAgfSxcbiAgZ3JhZGUxMToge30sXG4gIGdyYWRlMTA6IHt9LFxuICBncmFkZTk6IHt9LFxuICBncmFkZTg6IHt9LFxufTtcblxuLy8gUmVuZGVycyBzdWJqZWN0IFBERnMgb250byBjYW52YXNlcyBvbmNlIHRoZSBkYXRhIGlzIGF2YWlsYWJsZS5cbmZ1bmN0aW9uIFBkZkNvbnRlbnRWaWV3ZXIoeyBiYXNlNjREYXRhLCBpc0xvYWRpbmcsIGVycm9yLCB0aGVtZSwgbGFiZWwgfSkge1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWYobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgY2FuY2VsZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IHJlbmRlclBkZiA9IGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghYmFzZTY0RGF0YSB8fCAhY29udGFpbmVyUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgaWYgKGNvbnRhaW5lclJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgY29udGFpbmVyUmVmLmN1cnJlbnQuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IFt7IGdldERvY3VtZW50LCBHbG9iYWxXb3JrZXJPcHRpb25zIH0sIHdvcmtlck1vZHVsZV0gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGltcG9ydChcInBkZmpzLWRpc3QvYnVpbGQvcGRmXCIpLFxuICAgICAgICBpbXBvcnQoXCJwZGZqcy1kaXN0L2J1aWxkL3BkZi53b3JrZXIuZW50cnlcIiksXG4gICAgICBdKTtcblxuICAgICAgaWYgKGNhbmNlbGVkKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHdvcmtlclNyYyA9IHdvcmtlck1vZHVsZT8uZGVmYXVsdCA/PyB3b3JrZXJNb2R1bGU7XG4gICAgICBHbG9iYWxXb3JrZXJPcHRpb25zLndvcmtlclNyYyA9IHdvcmtlclNyYztcblxuICAgICAgY29uc3QgYmluYXJ5U3RyaW5nID0gYXRvYihiYXNlNjREYXRhKTtcbiAgICAgIGNvbnN0IGxlbiA9IGJpbmFyeVN0cmluZy5sZW5ndGg7XG4gICAgICBjb25zdCBieXRlcyA9IG5ldyBVaW50OEFycmF5KGxlbik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgIGJ5dGVzW2ldID0gYmluYXJ5U3RyaW5nLmNoYXJDb2RlQXQoaSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBkZkRvYyA9IGF3YWl0IGdldERvY3VtZW50KHsgZGF0YTogYnl0ZXMgfSkucHJvbWlzZTtcbiAgICAgIGlmIChjYW5jZWxlZCB8fCAhY29udGFpbmVyUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgY29uc3QgY29udGFpbmVyID0gY29udGFpbmVyUmVmLmN1cnJlbnQ7XG4gICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgZm9yIChsZXQgcGFnZU51bWJlciA9IDE7IHBhZ2VOdW1iZXIgPD0gcGRmRG9jLm51bVBhZ2VzOyBwYWdlTnVtYmVyICs9IDEpIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IGF3YWl0IHBkZkRvYy5nZXRQYWdlKHBhZ2VOdW1iZXIpO1xuICAgICAgICBpZiAoY2FuY2VsZWQgfHwgIWNvbnRhaW5lclJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICAgICAgY29uc3Qgdmlld3BvcnQgPSBwYWdlLmdldFZpZXdwb3J0KHsgc2NhbGU6IDEuMSB9KTtcbiAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgY2FudmFzLnN0eWxlLmJveFNoYWRvdyA9IHRoZW1lLmlzRGFya1xuICAgICAgICAgID8gXCIwIDEwcHggMjVweCByZ2JhKDE1LCAyMywgNDIsIDAuNilcIlxuICAgICAgICAgIDogXCIwIDEycHggMjRweCByZ2JhKDE1LCAyMywgNDIsIDAuMTIpXCI7XG4gICAgICAgIGNhbnZhcy5zdHlsZS5ib3JkZXJSYWRpdXMgPSBcIjEycHhcIjtcbiAgICAgICAgY2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIjtcblxuICAgICAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IHZpZXdwb3J0LmhlaWdodDtcbiAgICAgICAgY2FudmFzLndpZHRoID0gdmlld3BvcnQud2lkdGg7XG5cbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgICAgIGF3YWl0IHBhZ2UucmVuZGVyKHsgY2FudmFzQ29udGV4dDogY29udGV4dCwgdmlld3BvcnQgfSkucHJvbWlzZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVuZGVyUGRmKCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2FuY2VsZWQgPSB0cnVlO1xuICAgICAgaWYgKGNvbnRhaW5lclJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNvbnRhaW5lclJlZi5jdXJyZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW2Jhc2U2NERhdGEsIHRoZW1lLmlzRGFya10pO1xuXG4gIGlmIChpc0xvYWRpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIG1hcmdpblRvcDogXCIxMnB4XCIsXG4gICAgICAgICAgcGFkZGluZzogXCIxNnB4XCIsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEycHhcIixcbiAgICAgICAgICBib3JkZXI6IFwiMXB4IGRhc2hlZFwiLFxuICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZS5wYW5lbEJvcmRlcixcbiAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICBmb250U2l6ZTogXCIwLjk1cmVtXCIsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtgTG9hZGluZyAke2xhYmVsfeKApmB9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTJweFwiLFxuICAgICAgICAgIHBhZGRpbmc6IFwiMTZweFwiLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxMnB4XCIsXG4gICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZFwiLFxuICAgICAgICAgIGJvcmRlckNvbG9yOiBcIiNmODcxNzFcIixcbiAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICBmb250U2l6ZTogXCIwLjk1cmVtXCIsXG4gICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuaXNEYXJrID8gXCJyZ2JhKDI0OCwgMTEzLCAxMTMsIDAuMTUpXCIgOiBcIiNmZWUyZTJcIixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAge2BVbmFibGUgdG8gbG9hZCAke2xhYmVsfS4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci5gfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGlmICghYmFzZTY0RGF0YSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIGRpc3BsYXk6IFwiZ3JpZFwiLFxuICAgICAgICBnYXA6IFwiMThweFwiLFxuICAgICAgICBtYXJnaW5Ub3A6IFwiMTZweFwiLFxuICAgICAgICBvdmVyZmxvd1g6IFwiYXV0b1wiLFxuICAgICAgICBwYWRkaW5nQm90dG9tOiBcIjEycHhcIixcbiAgICAgIH19XG4gICAgLz5cbiAgKTtcbn1cblxuY29uc3QgQ09VTlRSWV9PUFRJT05TID0gW1xuICB7IGlkOiBcImluZGlhXCIsIGxhYmVsOiBcIkluZGlhXCIgfSxcbiAgeyBpZDogXCJ1c2FcIiwgbGFiZWw6IFwiVVNBXCIgfSxcbl07XG5jb25zdCBJTkRJQV9TVUJfT1BUSU9OUyA9IFtcbiAgeyBpZDogXCJzY2hvb2xzXCIsIGxhYmVsOiBcIlNjaG9vbHNcIiB9LFxuICB7IGlkOiBcImNvbGxlZ2VzXCIsIGxhYmVsOiBcIkNvbGxlZ2VzXCIgfSxcbl07XG5jb25zdCBJTkRJQV9TQ0hPT0xfT1BUSU9OUyA9IFtcbiAgeyBpZDogXCJjYnNlXCIsIGxhYmVsOiBcIkNCU0VcIiB9LFxuICB7IGlkOiBcInN0YXRlQm9hcmRzXCIsIGxhYmVsOiBcIlN0YXRlIGJvYXJkc1wiIH0sXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCBbYWN0aXZlQ291bnRyaWVzLCBzZXRBY3RpdmVDb3VudHJpZXNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbaW5kaWFTZWxlY3Rpb25zLCBzZXRJbmRpYVNlbGVjdGlvbnNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbaW5kaWFTY2hvb2xTZWxlY3Rpb25zLCBzZXRJbmRpYVNjaG9vbFNlbGVjdGlvbnNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbaXNEYXJrTW9kZSwgc2V0SXNEYXJrTW9kZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgdG9nZ2xlQ291bnRyeSA9IChjb3VudHJ5SWQpID0+IHtcbiAgICBzZXRBY3RpdmVDb3VudHJpZXMoKHByZXYpID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgW2NvdW50cnlJZF06ICFwcmV2W2NvdW50cnlJZF0sXG4gICAgfSkpO1xuXG4gICAgaWYgKGNvdW50cnlJZCA9PT0gXCJpbmRpYVwiICYmIGFjdGl2ZUNvdW50cmllc1tjb3VudHJ5SWRdKSB7XG4gICAgICBzZXRJbmRpYVNlbGVjdGlvbnMoe30pO1xuICAgICAgc2V0SW5kaWFTY2hvb2xTZWxlY3Rpb25zKHt9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlSW5kaWFPcHRpb24gPSAob3B0aW9uSWQpID0+IHtcbiAgICBzZXRJbmRpYVNlbGVjdGlvbnMoKHByZXYpID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgW29wdGlvbklkXTogIXByZXZbb3B0aW9uSWRdLFxuICAgIH0pKTtcblxuICAgIGlmIChvcHRpb25JZCA9PT0gXCJzY2hvb2xzXCIgJiYgaW5kaWFTZWxlY3Rpb25zW29wdGlvbklkXSkge1xuICAgICAgc2V0SW5kaWFTY2hvb2xTZWxlY3Rpb25zKHt9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlSW5kaWFTY2hvb2xPcHRpb24gPSAob3B0aW9uSWQpID0+IHtcbiAgICBzZXRJbmRpYVNjaG9vbFNlbGVjdGlvbnMoKHByZXYpID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgW29wdGlvbklkXTogIXByZXZbb3B0aW9uSWRdLFxuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCB0aGVtZSA9IGlzRGFya01vZGVcbiAgICA/IHtcbiAgICAgICAgYXBwQmFja2dyb3VuZDogXCIjMGYxNzJhXCIsXG4gICAgICAgIHBhbmVsOiBcIiMxMTE4MjdcIixcbiAgICAgICAgdGV4dDogXCIjZTJlOGYwXCIsXG4gICAgICAgIGFjY2VudDogXCIjMzhiZGY4XCIsXG4gICAgICAgIGJvcmRlcjogXCIjMWYyOTM3XCIsXG4gICAgICAgIHNlY29uZGFyeVRleHQ6IFwiI2NiZDVmNVwiLFxuICAgICAgfVxuICAgIDoge1xuICAgICAgICBhcHBCYWNrZ3JvdW5kOiBcIiNmMWY1ZjlcIixcbiAgICAgICAgcGFuZWw6IFwiI2ZmZmZmZlwiLFxuICAgICAgICB0ZXh0OiBcIiMwZjE3MmFcIixcbiAgICAgICAgYWNjZW50OiBcIiMyNTYzZWJcIixcbiAgICAgICAgYm9yZGVyOiBcIiNjYmQ1ZjVcIixcbiAgICAgICAgc2Vjb25kYXJ5VGV4dDogXCIjNDc1NTY5XCIsXG4gICAgICB9O1xuXG4gIHJldHVybiAoXG4gICAgPG1haW5cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIG1pbkhlaWdodDogXCIxMDB2aFwiLFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmFwcEJhY2tncm91bmQsXG4gICAgICAgIHBhZGRpbmc6IFwiNDBweCAxNnB4XCIsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICB3aWR0aDogXCJtaW4oNDgwcHgsIDEwMCUpXCIsXG4gICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICBnYXA6IFwiMjBweFwiLFxuICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLnBhbmVsLFxuICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0LFxuICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxOHB4XCIsXG4gICAgICAgICAgcGFkZGluZzogXCIzMnB4XCIsXG4gICAgICAgICAgYm94U2hhZG93OiBcIjAgMjJweCA0NHB4IHJnYmEoMTUsIDIzLCA0MiwgMC4wOClcIixcbiAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNEYXJrTW9kZSgocHJldmlvdXMpID0+ICFwcmV2aW91cyl9XG4gICAgICAgICAgYXJpYS1sYWJlbD17YFN3aXRjaCB0byAke2lzRGFya01vZGUgPyBcImxpZ2h0XCIgOiBcImRhcmtcIn0gbW9kZWB9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICB0b3A6IFwiMThweFwiLFxuICAgICAgICAgICAgcmlnaHQ6IFwiMThweFwiLFxuICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgZ2FwOiBcIjEwcHhcIixcbiAgICAgICAgICAgIHBhZGRpbmc6IFwiNnB4IDE2cHhcIixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI5OTk5cHhcIixcbiAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogaXNEYXJrTW9kZSA/IFwicmdiYSg1NiwgMTg5LCAyNDgsIDAuMSlcIiA6IFwiI2UwZjJmZVwiLFxuICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8c3Bhbj57aXNEYXJrTW9kZSA/IFwiRGFya1wiIDogXCJMaWdodFwifTwvc3Bhbj5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcbiAgICAgICAgICAgICAgd2lkdGg6IFwiMzhweFwiLFxuICAgICAgICAgICAgICBoZWlnaHQ6IFwiMjBweFwiLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOTk5OXB4XCIsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IGlzRGFya01vZGUgPyB0aGVtZS5hY2NlbnQgOiBcIiNiZmRiZmVcIixcbiAgICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICB0b3A6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgbGVmdDogaXNEYXJrTW9kZSA/IFwiMjBweFwiIDogXCIycHhcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogXCIxNHB4XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjE0cHhcIixcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNTAlXCIsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaXNEYXJrTW9kZSA/IFwiIzBmMTcyYVwiIDogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogXCJsZWZ0IDAuMnMgZWFzZVwiLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8aDFcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICBmb250U2l6ZTogXCIxLjlyZW1cIixcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgV2VsY29tZSB0byB0ZWFjaHdpc2VhaS5tcGFpYXBwcy5jb21cbiAgICAgICAgPC9oMT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIiwgZ2FwOiBcIjEycHhcIiB9fT5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZm9udFNpemU6IFwiMXJlbVwiLFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBDb3VudHJpZXNcbiAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgZ2FwOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiNnB4XCIsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtDT1VOVFJZX09QVElPTlMubWFwKChjb3VudHJ5KSA9PiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtjb3VudHJ5LmlkfSBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIiwgZ2FwOiBcIjhweFwiIH19PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgZ2FwOiBcIjhweFwiIH19PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e0Jvb2xlYW4oYWN0aXZlQ291bnRyaWVzW2NvdW50cnkuaWRdKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHRvZ2dsZUNvdW50cnkoY291bnRyeS5pZCl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGFjY2VudENvbG9yOiB0aGVtZS5hY2NlbnQsIHRyYW5zZm9ybTogXCJzY2FsZSgxLjA1KVwiIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dCB9fT57Y291bnRyeS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgIHtjb3VudHJ5LmlkID09PSBcImluZGlhXCIgJiYgYWN0aXZlQ291bnRyaWVzLmluZGlhID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBcIjI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge0lORElBX1NVQl9PUFRJT05TLm1hcCgob3B0aW9uKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGtleT17b3B0aW9uLmlkfSBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgZ2FwOiBcIjhweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e0Jvb2xlYW4oaW5kaWFTZWxlY3Rpb25zW29wdGlvbi5pZF0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gdG9nZ2xlSW5kaWFPcHRpb24ob3B0aW9uLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYWNjZW50Q29sb3I6IHRoZW1lLmFjY2VudCwgdHJhbnNmb3JtOiBcInNjYWxlKDEuMDMpXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA1MDAsIGNvbG9yOiB0aGVtZS50ZXh0IH19PntvcHRpb24ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuXG4gICAgICAgICAgICAgICAgICAgIHtpbmRpYVNlbGVjdGlvbnMuc2Nob29scyA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogXCIyNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtJTkRJQV9TQ0hPT0xfT1BUSU9OUy5tYXAoKHNjaG9vbE9wdGlvbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3NjaG9vbE9wdGlvbi5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgZ2FwOiBcIjhweFwiIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtCb29sZWFuKGluZGlhU2Nob29sU2VsZWN0aW9uc1tzY2hvb2xPcHRpb24uaWRdKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB0b2dnbGVJbmRpYVNjaG9vbE9wdGlvbihzY2hvb2xPcHRpb24uaWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYWNjZW50Q29sb3I6IHRoZW1lLmFjY2VudCwgdHJhbnNmb3JtOiBcInNjYWxlKDEuMDIpXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDUwMCwgY29sb3I6IHRoZW1lLnRleHQgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2Nob29sT3B0aW9uLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbWFpbj5cbiAgKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBDYnNlRGFzaGJvYXJkKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgW2dyYWRlMTIsIHNldEdyYWRlMTJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZ3JhZGUxMSwgc2V0R3JhZGUxMV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtncmFkZTEwLCBzZXRHcmFkZTEwXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2dyYWRlOSwgc2V0R3JhZGU5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2dyYWRlOCwgc2V0R3JhZGU4XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzRGFya01vZGUsIHNldElzRGFya01vZGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VsZWN0ZWRTdWJqZWN0cywgc2V0U2VsZWN0ZWRTdWJqZWN0c10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtzdWJqZWN0QWN0aW9uU2VsZWN0aW9ucywgc2V0U3ViamVjdEFjdGlvblNlbGVjdGlvbnNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbcGRmQ2FjaGUsIHNldFBkZkNhY2hlXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW3BkZkxvYWRpbmcsIHNldFBkZkxvYWRpbmddID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbcGRmRXJyb3IsIHNldFBkZkVycm9yXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW3ByZXNlbnRhdGlvblN0YXR1cywgc2V0UHJlc2VudGF0aW9uU3RhdHVzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW3ByZXNlbnRhdGlvbkVycm9yLCBzZXRQcmVzZW50YXRpb25FcnJvcl0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtwcmVzZW50YXRpb25Ub3BpY3MsIHNldFByZXNlbnRhdGlvblRvcGljc10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtwcmVzZW50YXRpb25IaXN0b3J5LCBzZXRQcmVzZW50YXRpb25IaXN0b3J5XSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW2hhbmRvdXRTdGF0dXMsIHNldEhhbmRvdXRTdGF0dXNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbaGFuZG91dEVycm9yLCBzZXRIYW5kb3V0RXJyb3JdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbaGFuZG91dFRvcGljcywgc2V0SGFuZG91dFRvcGljc10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtoYW5kb3V0SGlzdG9yeSwgc2V0SGFuZG91dEhpc3RvcnldID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbGVzc29uUGxhblN0YXR1cywgc2V0TGVzc29uUGxhblN0YXR1c10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtsZXNzb25QbGFuRXJyb3IsIHNldExlc3NvblBsYW5FcnJvcl0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtsZXNzb25QbGFuVG9waWNzLCBzZXRMZXNzb25QbGFuVG9waWNzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW2xlc3NvblBsYW5IaXN0b3J5LCBzZXRMZXNzb25QbGFuSGlzdG9yeV0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFt3ZWJQYWdlU3RhdHVzLCBzZXRXZWJQYWdlU3RhdHVzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW3dlYlBhZ2VFcnJvciwgc2V0V2ViUGFnZUVycm9yXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW3dlYlBhZ2VUb3BpY3MsIHNldFdlYlBhZ2VUb3BpY3NdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbd2ViUGFnZUhpc3RvcnksIHNldFdlYlBhZ2VIaXN0b3J5XSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW2NvbmNlcHRNYXBTdGF0dXMsIHNldENvbmNlcHRNYXBTdGF0dXNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbY29uY2VwdE1hcEVycm9yLCBzZXRDb25jZXB0TWFwRXJyb3JdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbY29uY2VwdE1hcFRvcGljcywgc2V0Q29uY2VwdE1hcFRvcGljc10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtjb25jZXB0TWFwSGlzdG9yeSwgc2V0Q29uY2VwdE1hcEhpc3RvcnldID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWNxU3RhdHVzLCBzZXRNY3FTdGF0dXNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWNxRXJyb3IsIHNldE1jcUVycm9yXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21jcVRvcGljcywgc2V0TWNxVG9waWNzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21jcUhpc3RvcnksIHNldE1jcUhpc3RvcnldID0gdXNlU3RhdGUoe30pO1xuXG4gIGNvbnN0IGdyYWRlQ29udHJvbHMgPSB7XG4gICAgZ3JhZGUxMjogeyBpc0FjdGl2ZTogZ3JhZGUxMiwgc2V0QWN0aXZlOiBzZXRHcmFkZTEyIH0sXG4gICAgZ3JhZGUxMTogeyBpc0FjdGl2ZTogZ3JhZGUxMSwgc2V0QWN0aXZlOiBzZXRHcmFkZTExIH0sXG4gICAgZ3JhZGUxMDogeyBpc0FjdGl2ZTogZ3JhZGUxMCwgc2V0QWN0aXZlOiBzZXRHcmFkZTEwIH0sXG4gICAgZ3JhZGU5OiB7IGlzQWN0aXZlOiBncmFkZTksIHNldEFjdGl2ZTogc2V0R3JhZGU5IH0sXG4gICAgZ3JhZGU4OiB7IGlzQWN0aXZlOiBncmFkZTgsIHNldEFjdGl2ZTogc2V0R3JhZGU4IH0sXG4gIH07XG5cbiAgY29uc3QgZ2V0U3ViamVjdEtleSA9IChncmFkZUlkLCBzdWJqZWN0KSA9PiBgJHtncmFkZUlkfTo6JHtzdWJqZWN0fWA7XG4gIGNvbnN0IGdldEFjdGlvbktleSA9IChncmFkZUlkLCBzdWJqZWN0LCBhY3Rpb24pID0+IGAke2dyYWRlSWR9Ojoke3N1YmplY3R9Ojoke2FjdGlvbn1gO1xuXG4gIGNvbnN0IGZldGNoUGRmQ29udGVudCA9IGFzeW5jIChncmFkZUlkLCBzdWJqZWN0LCBhY3Rpb24pID0+IHtcbiAgICBjb25zdCBjYWNoZUtleSA9IGdldEFjdGlvbktleShncmFkZUlkLCBzdWJqZWN0LCBhY3Rpb24pO1xuXG4gICAgaWYgKHBkZkNhY2hlW2NhY2hlS2V5XSB8fCBwZGZMb2FkaW5nW2NhY2hlS2V5XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBkZkFjdGlvbnMgPSBTVUJKRUNUX1BERl9BQ1RJT05TW2dyYWRlSWRdPy5bc3ViamVjdF07XG4gICAgaWYgKCFwZGZBY3Rpb25zIHx8ICFwZGZBY3Rpb25zLmhhcyhhY3Rpb24pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHNldFBkZkxvYWRpbmcoKHByZXYpID0+ICh7IC4uLnByZXYsIFtjYWNoZUtleV06IHRydWUgfSkpO1xuICAgICAgc2V0UGRmRXJyb3IoKHByZXYpID0+ICh7IC4uLnByZXYsIFtjYWNoZUtleV06IG51bGwgfSkpO1xuXG4gICAgICBjb25zdCBncmFkZVBhcmFtID0gR1JBREVfTlVNQkVSX01BUFtncmFkZUlkXSA/PyBncmFkZUlkO1xuICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgIHN1YmplY3QsXG4gICAgICAgIHR5cGU6IGFjdGlvbixcbiAgICAgICAgZ3JhZGU6IFN0cmluZyhncmFkZVBhcmFtKSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9zeWxsYWJ1cz8ke3BhcmFtcy50b1N0cmluZygpfWAsIHtcbiAgICAgICAgY2FjaGU6IFwibm8tc3RvcmVcIixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCBjb250ZW50XCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgc2V0UGRmQ2FjaGUoKHByZXYpID0+ICh7IC4uLnByZXYsIFtjYWNoZUtleV06IHBheWxvYWQ/LmJhc2U2NCA/PyBudWxsIH0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgc2V0UGRmRXJyb3IoKHByZXYpID0+ICh7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIFtjYWNoZUtleV06IGVycm9yLm1lc3NhZ2UgfHwgXCJVbmtub3duIGVycm9yXCIsXG4gICAgICB9KSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFBkZkxvYWRpbmcoKHByZXYpID0+ICh7IC4uLnByZXYsIFtjYWNoZUtleV06IGZhbHNlIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlU3ViamVjdFNlbGVjdGlvbiA9IChncmFkZUNvbmZpZywgc3ViamVjdCkgPT4ge1xuICAgIGNvbnN0IGdyYWRlSWQgPSBncmFkZUNvbmZpZy5pZDtcbiAgICBjb25zdCBzdWJqZWN0S2V5ID0gZ2V0U3ViamVjdEtleShncmFkZUlkLCBzdWJqZWN0KTtcbiAgICBzZXRTZWxlY3RlZFN1YmplY3RzKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBncmFkZVN1YmplY3RzID0geyAuLi4ocHJldj8uW2dyYWRlSWRdID8/IHt9KSB9O1xuICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IEJvb2xlYW4oZ3JhZGVTdWJqZWN0c1tzdWJqZWN0XSk7XG5cbiAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgIGRlbGV0ZSBncmFkZVN1YmplY3RzW3N1YmplY3RdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JhZGVTdWJqZWN0c1tzdWJqZWN0XSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5leHRTZWxlY3RlZCA9IHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW2dyYWRlSWRdOiBncmFkZVN1YmplY3RzLFxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGdyYWRlU3ViamVjdHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWxldGUgbmV4dFNlbGVjdGVkW2dyYWRlSWRdO1xuICAgICAgfVxuXG4gICAgICBzZXRTdWJqZWN0QWN0aW9uU2VsZWN0aW9ucygocHJldkFjdGlvbnMpID0+IHtcbiAgICAgICAgY29uc3QgZ3JhZGVBY3Rpb25zID0geyAuLi4ocHJldkFjdGlvbnM/LltncmFkZUlkXSA/PyB7fSkgfTtcbiAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICBkZWxldGUgZ3JhZGVBY3Rpb25zW3N1YmplY3RdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGluaXRpYWxBY3Rpb25zU3RhdGUgPSBTVUJKRUNUX0FDVElPTlMucmVkdWNlKFxuICAgICAgICAgICAgKGFjYywgYWN0aW9uKSA9PiAoeyAuLi5hY2MsIFthY3Rpb25dOiBmYWxzZSB9KSxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKTtcbiAgICAgICAgICBncmFkZUFjdGlvbnNbc3ViamVjdF0gPSBpbml0aWFsQWN0aW9uc1N0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dEFjdGlvbnMgPSB7XG4gICAgICAgICAgLi4ucHJldkFjdGlvbnMsXG4gICAgICAgICAgW2dyYWRlSWRdOiBncmFkZUFjdGlvbnMsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdyYWRlQWN0aW9ucykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZGVsZXRlIG5leHRBY3Rpb25zW2dyYWRlSWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRBY3Rpb25zO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgIGNvbnN0IGFjdGlvblByZWZpeCA9IGAke2dyYWRlSWR9Ojoke3N1YmplY3R9OjpgO1xuXG4gICAgICAgIHNldFBkZkNhY2hlKChwcmV2Q2FjaGUpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkQ2FjaGUgPSB7IC4uLnByZXZDYWNoZSB9O1xuICAgICAgICAgIE9iamVjdC5rZXlzKHVwZGF0ZWRDYWNoZSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYWN0aW9uUHJlZml4KSkge1xuICAgICAgICAgICAgICBkZWxldGUgdXBkYXRlZENhY2hlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWRDYWNoZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0UGRmTG9hZGluZygocHJldkxvYWRpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkTG9hZGluZyA9IHsgLi4ucHJldkxvYWRpbmcgfTtcbiAgICAgICAgICBPYmplY3Qua2V5cyh1cGRhdGVkTG9hZGluZykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYWN0aW9uUHJlZml4KSkge1xuICAgICAgICAgICAgICBkZWxldGUgdXBkYXRlZExvYWRpbmdba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZExvYWRpbmc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFBkZkVycm9yKChwcmV2RXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkRXJyb3IgPSB7IC4uLnByZXZFcnJvciB9O1xuICAgICAgICAgIE9iamVjdC5rZXlzKHVwZGF0ZWRFcnJvcikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYWN0aW9uUHJlZml4KSkge1xuICAgICAgICAgICAgICBkZWxldGUgdXBkYXRlZEVycm9yW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWRFcnJvcjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0UHJlc2VudGF0aW9uU3RhdHVzKChwcmV2U3RhdHVzKSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldlN0YXR1cyB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRQcmVzZW50YXRpb25FcnJvcigocHJldlByZXNlbnRhdGlvbkVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldlByZXNlbnRhdGlvbkVycm9yIH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFByZXNlbnRhdGlvblRvcGljcygocHJldlRvcGljcykgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZUb3BpY3MgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0UHJlc2VudGF0aW9uSGlzdG9yeSgocHJldkhpc3RvcnkpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2SGlzdG9yeSB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRIYW5kb3V0U3RhdHVzKChwcmV2SGFuZG91dFN0YXR1cykgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZIYW5kb3V0U3RhdHVzIH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldEhhbmRvdXRFcnJvcigocHJldkhhbmRvdXRFcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZIYW5kb3V0RXJyb3IgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0SGFuZG91dFRvcGljcygocHJldkhhbmRvdXRUb3BpY3MpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2SGFuZG91dFRvcGljcyB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRIYW5kb3V0SGlzdG9yeSgocHJldkhhbmRvdXRIaXN0b3J5KSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldkhhbmRvdXRIaXN0b3J5IH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldExlc3NvblBsYW5TdGF0dXMoKHByZXZMZXNzb25QbGFuU3RhdHVzKSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldkxlc3NvblBsYW5TdGF0dXMgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0TGVzc29uUGxhbkVycm9yKChwcmV2TGVzc29uUGxhbkVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldkxlc3NvblBsYW5FcnJvciB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRMZXNzb25QbGFuVG9waWNzKChwcmV2TGVzc29uUGxhblRvcGljcykgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZMZXNzb25QbGFuVG9waWNzIH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldExlc3NvblBsYW5IaXN0b3J5KChwcmV2TGVzc29uUGxhbkhpc3RvcnkpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2TGVzc29uUGxhbkhpc3RvcnkgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0V2ViUGFnZVN0YXR1cygocHJldldlYlBhZ2VTdGF0dXMpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2V2ViUGFnZVN0YXR1cyB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRXZWJQYWdlRXJyb3IoKHByZXZXZWJQYWdlRXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2V2ViUGFnZUVycm9yIH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFdlYlBhZ2VUb3BpY3MoKHByZXZXZWJQYWdlVG9waWNzKSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldldlYlBhZ2VUb3BpY3MgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0V2ViUGFnZUhpc3RvcnkoKHByZXZXZWJQYWdlSGlzdG9yeSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZXZWJQYWdlSGlzdG9yeSB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRDb25jZXB0TWFwU3RhdHVzKChwcmV2Q29uY2VwdE1hcFN0YXR1cykgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZDb25jZXB0TWFwU3RhdHVzIH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldENvbmNlcHRNYXBFcnJvcigocHJldkNvbmNlcHRNYXBFcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZDb25jZXB0TWFwRXJyb3IgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0Q29uY2VwdE1hcFRvcGljcygocHJldkNvbmNlcHRNYXBUb3BpY3MpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2Q29uY2VwdE1hcFRvcGljcyB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRDb25jZXB0TWFwSGlzdG9yeSgocHJldkNvbmNlcHRNYXBIaXN0b3J5KSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldkNvbmNlcHRNYXBIaXN0b3J5IH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldE1jcVN0YXR1cygocHJldk1jcVN0YXR1cykgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZNY3FTdGF0dXMgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0TWNxRXJyb3IoKHByZXZNY3FFcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZNY3FFcnJvciB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRNY3FUb3BpY3MoKHByZXZNY3FUb3BpY3MpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2TWNxVG9waWNzIH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldE1jcUhpc3RvcnkoKHByZXZNY3FIaXN0b3J5KSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldk1jcUhpc3RvcnkgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXh0U2VsZWN0ZWQ7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgdHJpZ2dlclByZXNlbnRhdGlvbkRvd25sb2FkID0gYXN5bmMgKGdyYWRlSWQsIHN1YmplY3QsIHRvcGljKSA9PiB7XG4gICAgY29uc3Qgc3ViamVjdEtleSA9IGdldFN1YmplY3RLZXkoZ3JhZGVJZCwgc3ViamVjdCk7XG4gICAgY29uc3QgZ3JhZGVQYXJhbSA9IEdSQURFX05VTUJFUl9NQVBbZ3JhZGVJZF0gPz8gZ3JhZGVJZDtcblxuICAgIGlmICghdG9waWMpIHtcbiAgICAgIHNldFByZXNlbnRhdGlvblN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcIm1pc3NpbmctdG9waWNcIiB9KSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0UHJlc2VudGF0aW9uU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwibG9hZGluZ1wiIH0pKTtcbiAgICBzZXRQcmVzZW50YXRpb25FcnJvcigocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBudWxsIH0pKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL3ByZXNlbnRhdGlvbj9zdWJqZWN0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHN1YmplY3QpfSZ0b3BpYz0ke2VuY29kZVVSSUNvbXBvbmVudCh0b3BpYyl9JmdyYWRlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhncmFkZVBhcmFtKSl9YCwge1xuICAgICAgICBjYWNoZTogXCJuby1zdG9yZVwiLFxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2VuZXJhdGUgcHJlc2VudGF0aW9uXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKCFwYXlsb2FkPy5iYXNlNjQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBwcmVzZW50YXRpb24gY29udGVudFwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnl0ZUNoYXJhY3RlcnMgPSBhdG9iKHBheWxvYWQuYmFzZTY0KTtcbiAgICAgIGNvbnN0IGJ5dGVOdW1iZXJzID0gbmV3IEFycmF5KGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGJ5dGVOdW1iZXJzW2ldID0gYnl0ZUNoYXJhY3RlcnMuY2hhckNvZGVBdChpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZU51bWJlcnMpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtieXRlQXJyYXldLCB7XG4gICAgICAgIHR5cGU6IFwiYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnByZXNlbnRhdGlvblwiLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRvd25sb2FkVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgIGxpbmsuaHJlZiA9IGRvd25sb2FkVXJsO1xuICAgICAgbGluay5kb3dubG9hZCA9IGAke3N1YmplY3QucmVwbGFjZSgvXFxzKy9nLCBcIl9cIil9XyR7dG9waWMucmVwbGFjZSgvW15hLXowLTldKy9naSwgXCJfXCIpLnRvTG93ZXJDYXNlKCkgfHwgXCJwcmVzZW50YXRpb25cIn0ucHB0eGA7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgbGluay5jbGljaygpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoZG93bmxvYWRVcmwpO1xuXG4gICAgICBzZXRQcmVzZW50YXRpb25Ub3BpY3MoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJcIiB9KSk7XG4gICAgICBzZXRQcmVzZW50YXRpb25IaXN0b3J5KChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbc3ViamVjdEtleV06IFt0b3BpYywgLi4uKHByZXY/LltzdWJqZWN0S2V5XSA/PyBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSB0b3BpYyldLnNsaWNlKDAsIDUpLFxuICAgICAgfSkpO1xuXG4gICAgICBzZXRQcmVzZW50YXRpb25TdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJzdWNjZXNzXCIgfSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBzZXRQcmVzZW50YXRpb25TdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJlcnJvclwiIH0pKTtcbiAgICAgIHNldFByZXNlbnRhdGlvbkVycm9yKChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbc3ViamVjdEtleV06IGVycm9yLm1lc3NhZ2UgfHwgXCJVbmFibGUgdG8gZ2VuZXJhdGUgcHJlc2VudGF0aW9uXCIsXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHRyaWdnZXJIYW5kb3V0RG93bmxvYWQgPSBhc3luYyAoZ3JhZGVJZCwgc3ViamVjdCwgdG9waWMpID0+IHtcbiAgICBjb25zdCBzdWJqZWN0S2V5ID0gZ2V0U3ViamVjdEtleShncmFkZUlkLCBzdWJqZWN0KTtcbiAgICBjb25zdCBncmFkZVBhcmFtID0gR1JBREVfTlVNQkVSX01BUFtncmFkZUlkXSA/PyBncmFkZUlkO1xuXG4gICAgaWYgKCF0b3BpYykge1xuICAgICAgc2V0SGFuZG91dFN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcIm1pc3NpbmctdG9waWNcIiB9KSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0SGFuZG91dFN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcImxvYWRpbmdcIiB9KSk7XG4gICAgc2V0SGFuZG91dEVycm9yKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IG51bGwgfSkpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hcGkvcGRmP3N1YmplY3Q9JHtlbmNvZGVVUklDb21wb25lbnQoc3ViamVjdCl9JnRvcGljPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRvcGljKX0mZ3JhZGU9JHtlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGdyYWRlUGFyYW0pKX1gLCB7XG4gICAgICAgIGNhY2hlOiBcIm5vLXN0b3JlXCIsXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBnZW5lcmF0ZSBQREZcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoIXBheWxvYWQ/LmJhc2U2NCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIFBERiBjb250ZW50XCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBieXRlQ2hhcmFjdGVycyA9IGF0b2IocGF5bG9hZC5iYXNlNjQpO1xuICAgICAgY29uc3QgYnl0ZU51bWJlcnMgPSBuZXcgQXJyYXkoYnl0ZUNoYXJhY3RlcnMubGVuZ3RoKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZUNoYXJhY3RlcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYnl0ZU51bWJlcnNbaV0gPSBieXRlQ2hhcmFjdGVycy5jaGFyQ29kZUF0KGkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBieXRlQXJyYXkgPSBuZXcgVWludDhBcnJheShieXRlTnVtYmVycyk7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2J5dGVBcnJheV0sIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9wZGZcIiB9KTtcblxuICAgICAgY29uc3QgZG93bmxvYWRVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgbGluay5ocmVmID0gZG93bmxvYWRVcmw7XG4gICAgICBsaW5rLmRvd25sb2FkID0gYCR7c3ViamVjdC5yZXBsYWNlKC9cXHMrL2csIFwiX1wiKX1fJHt0b3BpYy5yZXBsYWNlKC9bXmEtejAtOV0rL2dpLCBcIl9cIikudG9Mb3dlckNhc2UoKSB8fCBcImhhbmRvdXRcIn0ucGRmYDtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChkb3dubG9hZFVybCk7XG5cbiAgICAgIHNldEhhbmRvdXRUb3BpY3MoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJcIiB9KSk7XG4gICAgICBzZXRIYW5kb3V0SGlzdG9yeSgocHJldikgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW3N1YmplY3RLZXldOiBbdG9waWMsIC4uLihwcmV2Py5bc3ViamVjdEtleV0gPz8gW10pLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gdG9waWMpXS5zbGljZSgwLCA1KSxcbiAgICAgIH0pKTtcblxuICAgICAgc2V0SGFuZG91dFN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcInN1Y2Nlc3NcIiB9KSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHNldEhhbmRvdXRTdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJlcnJvclwiIH0pKTtcbiAgICAgIHNldEhhbmRvdXRFcnJvcigocHJldikgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW3N1YmplY3RLZXldOiBlcnJvci5tZXNzYWdlIHx8IFwiVW5hYmxlIHRvIGdlbmVyYXRlIFBERlwiLFxuICAgICAgfSkpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB0cmlnZ2VyTGVzc29uUGxhbkRvd25sb2FkID0gYXN5bmMgKGdyYWRlSWQsIHN1YmplY3QsIHRvcGljKSA9PiB7XG4gICAgY29uc3Qgc3ViamVjdEtleSA9IGdldFN1YmplY3RLZXkoZ3JhZGVJZCwgc3ViamVjdCk7XG4gICAgY29uc3QgZ3JhZGVQYXJhbSA9IEdSQURFX05VTUJFUl9NQVBbZ3JhZGVJZF0gPz8gZ3JhZGVJZDtcblxuICAgIGlmICghdG9waWMpIHtcbiAgICAgIHNldExlc3NvblBsYW5TdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJtaXNzaW5nLXRvcGljXCIgfSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldExlc3NvblBsYW5TdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJsb2FkaW5nXCIgfSkpO1xuICAgIHNldExlc3NvblBsYW5FcnJvcigocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBudWxsIH0pKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL2xlc3Nvbi1wbGFuP3N1YmplY3Q9JHtlbmNvZGVVUklDb21wb25lbnQoc3ViamVjdCl9JnRvcGljPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRvcGljKX0mZ3JhZGU9JHtlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGdyYWRlUGFyYW0pKX1gLCB7XG4gICAgICAgIGNhY2hlOiBcIm5vLXN0b3JlXCIsXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBnZW5lcmF0ZSBsZXNzb24gcGxhblwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmICghcGF5bG9hZD8uYmFzZTY0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgbGVzc29uIHBsYW4gY29udGVudFwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnl0ZUNoYXJhY3RlcnMgPSBhdG9iKHBheWxvYWQuYmFzZTY0KTtcbiAgICAgIGNvbnN0IGJ5dGVOdW1iZXJzID0gbmV3IEFycmF5KGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGJ5dGVOdW1iZXJzW2ldID0gYnl0ZUNoYXJhY3RlcnMuY2hhckNvZGVBdChpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZU51bWJlcnMpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtieXRlQXJyYXldLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vcGRmXCIgfSk7XG5cbiAgICAgIGNvbnN0IGRvd25sb2FkVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgIGxpbmsuaHJlZiA9IGRvd25sb2FkVXJsO1xuICAgICAgbGluay5kb3dubG9hZCA9IGAke3N1YmplY3QucmVwbGFjZSgvXFxzKy9nLCBcIl9cIil9XyR7dG9waWMucmVwbGFjZSgvW15hLXowLTldKy9naSwgXCJfXCIpLnRvTG93ZXJDYXNlKCkgfHwgXCJsZXNzb25fcGxhblwifS5wZGZgO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGRvd25sb2FkVXJsKTtcblxuICAgICAgc2V0TGVzc29uUGxhblRvcGljcygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcIlwiIH0pKTtcbiAgICAgIHNldExlc3NvblBsYW5IaXN0b3J5KChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbc3ViamVjdEtleV06IFt0b3BpYywgLi4uKHByZXY/LltzdWJqZWN0S2V5XSA/PyBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSB0b3BpYyldLnNsaWNlKDAsIDUpLFxuICAgICAgfSkpO1xuXG4gICAgICBzZXRMZXNzb25QbGFuU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwic3VjY2Vzc1wiIH0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgc2V0TGVzc29uUGxhblN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcImVycm9yXCIgfSkpO1xuICAgICAgc2V0TGVzc29uUGxhbkVycm9yKChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbc3ViamVjdEtleV06IGVycm9yLm1lc3NhZ2UgfHwgXCJVbmFibGUgdG8gZ2VuZXJhdGUgbGVzc29uIHBsYW5cIixcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdHJpZ2dlcldlYlBhZ2VEb3dubG9hZCA9IGFzeW5jIChncmFkZUlkLCBzdWJqZWN0LCB0b3BpYykgPT4ge1xuICAgIGNvbnN0IHN1YmplY3RLZXkgPSBnZXRTdWJqZWN0S2V5KGdyYWRlSWQsIHN1YmplY3QpO1xuICAgIGNvbnN0IGdyYWRlUGFyYW0gPSBHUkFERV9OVU1CRVJfTUFQW2dyYWRlSWRdID8/IGdyYWRlSWQ7XG5cbiAgICBpZiAoIXRvcGljKSB7XG4gICAgICBzZXRXZWJQYWdlU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwibWlzc2luZy10b3BpY1wiIH0pKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRXZWJQYWdlU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwibG9hZGluZ1wiIH0pKTtcbiAgICBzZXRXZWJQYWdlRXJyb3IoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogbnVsbCB9KSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS93ZWItcGFnZT9zdWJqZWN0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHN1YmplY3QpfSZ0b3BpYz0ke2VuY29kZVVSSUNvbXBvbmVudCh0b3BpYyl9JmdyYWRlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhncmFkZVBhcmFtKSl9YCwge1xuICAgICAgICBjYWNoZTogXCJuby1zdG9yZVwiLFxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2VuZXJhdGUgd2ViIHBhZ2VcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoIXBheWxvYWQ/LmJhc2U2NCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHdlYiBwYWdlIGNvbnRlbnRcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ5dGVDaGFyYWN0ZXJzID0gYXRvYihwYXlsb2FkLmJhc2U2NCk7XG4gICAgICBjb25zdCBieXRlTnVtYmVycyA9IG5ldyBBcnJheShieXRlQ2hhcmFjdGVycy5sZW5ndGgpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlQ2hhcmFjdGVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBieXRlTnVtYmVyc1tpXSA9IGJ5dGVDaGFyYWN0ZXJzLmNoYXJDb2RlQXQoaSk7XG4gICAgICB9XG4gICAgICBjb25zdCBieXRlQXJyYXkgPSBuZXcgVWludDhBcnJheShieXRlTnVtYmVycyk7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2J5dGVBcnJheV0sIHsgdHlwZTogXCJ0ZXh0L2h0bWw7Y2hhcnNldD11dGYtOFwiIH0pO1xuXG4gICAgICBjb25zdCBkb3dubG9hZFVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICBsaW5rLmhyZWYgPSBkb3dubG9hZFVybDtcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBgJHtzdWJqZWN0LnJlcGxhY2UoL1xccysvZywgXCJfXCIpfV8ke3RvcGljLnJlcGxhY2UoL1teYS16MC05XSsvZ2ksIFwiX1wiKS50b0xvd2VyQ2FzZSgpIHx8IFwibGVzc29uXCJ9Lmh0bWxgO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGRvd25sb2FkVXJsKTtcblxuICAgICAgc2V0V2ViUGFnZVRvcGljcygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcIlwiIH0pKTtcbiAgICAgIHNldFdlYlBhZ2VIaXN0b3J5KChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbc3ViamVjdEtleV06IFt0b3BpYywgLi4uKHByZXY/LltzdWJqZWN0S2V5XSA/PyBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSB0b3BpYyldLnNsaWNlKDAsIDUpLFxuICAgICAgfSkpO1xuXG4gICAgICBzZXRXZWJQYWdlU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwic3VjY2Vzc1wiIH0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgc2V0V2ViUGFnZVN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcImVycm9yXCIgfSkpO1xuICAgICAgc2V0V2ViUGFnZUVycm9yKChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbc3ViamVjdEtleV06IGVycm9yLm1lc3NhZ2UgfHwgXCJVbmFibGUgdG8gZ2VuZXJhdGUgd2ViIHBhZ2VcIixcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdHJpZ2dlckNvbmNlcHRNYXBEb3dubG9hZCA9IGFzeW5jIChncmFkZUlkLCBzdWJqZWN0LCB0b3BpYykgPT4ge1xuICAgIGNvbnN0IHN1YmplY3RLZXkgPSBnZXRTdWJqZWN0S2V5KGdyYWRlSWQsIHN1YmplY3QpO1xuICAgIGNvbnN0IGdyYWRlUGFyYW0gPSBHUkFERV9OVU1CRVJfTUFQW2dyYWRlSWRdID8/IGdyYWRlSWQ7XG5cbiAgICBpZiAoIXRvcGljKSB7XG4gICAgICBzZXRDb25jZXB0TWFwU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwibWlzc2luZy10b3BpY1wiIH0pKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRDb25jZXB0TWFwU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwibG9hZGluZ1wiIH0pKTtcbiAgICBzZXRDb25jZXB0TWFwRXJyb3IoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogbnVsbCB9KSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9jb25jZXB0LW1hcD9zdWJqZWN0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHN1YmplY3QpfSZ0b3BpYz0ke2VuY29kZVVSSUNvbXBvbmVudCh0b3BpYyl9JmdyYWRlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhncmFkZVBhcmFtKSl9YCwge1xuICAgICAgICBjYWNoZTogXCJuby1zdG9yZVwiLFxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2VuZXJhdGUgY29uY2VwdCBtYXBcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoIXBheWxvYWQ/LmJhc2U2NCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGNvbmNlcHQgbWFwIGNvbnRlbnRcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ5dGVDaGFyYWN0ZXJzID0gYXRvYihwYXlsb2FkLmJhc2U2NCk7XG4gICAgICBjb25zdCBieXRlTnVtYmVycyA9IG5ldyBBcnJheShieXRlQ2hhcmFjdGVycy5sZW5ndGgpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlQ2hhcmFjdGVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBieXRlTnVtYmVyc1tpXSA9IGJ5dGVDaGFyYWN0ZXJzLmNoYXJDb2RlQXQoaSk7XG4gICAgICB9XG4gICAgICBjb25zdCBieXRlQXJyYXkgPSBuZXcgVWludDhBcnJheShieXRlTnVtYmVycyk7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2J5dGVBcnJheV0sIHtcbiAgICAgICAgdHlwZTogXCJhcHBsaWNhdGlvbi9wZGZcIixcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkb3dubG9hZFVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICBsaW5rLmhyZWYgPSBkb3dubG9hZFVybDtcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBgJHtzdWJqZWN0LnJlcGxhY2UoL1xccysvZywgXCJfXCIpfV8ke3RvcGljLnJlcGxhY2UoL1teYS16MC05XSsvZ2ksIFwiX1wiKS50b0xvd2VyQ2FzZSgpIHx8IFwiY29uY2VwdF9tYXBcIn0ucGRmYDtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChkb3dubG9hZFVybCk7XG5cbiAgICAgIHNldENvbmNlcHRNYXBUb3BpY3MoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJcIiB9KSk7XG4gICAgICBzZXRDb25jZXB0TWFwSGlzdG9yeSgocHJldikgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW3N1YmplY3RLZXldOiBbdG9waWMsIC4uLihwcmV2Py5bc3ViamVjdEtleV0gPz8gW10pLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gdG9waWMpXS5zbGljZSgwLCA1KSxcbiAgICAgIH0pKTtcblxuICAgICAgc2V0Q29uY2VwdE1hcFN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcInN1Y2Nlc3NcIiB9KSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHNldENvbmNlcHRNYXBTdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJlcnJvclwiIH0pKTtcbiAgICAgIHNldENvbmNlcHRNYXBFcnJvcigocHJldikgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW3N1YmplY3RLZXldOiBlcnJvci5tZXNzYWdlIHx8IFwiVW5hYmxlIHRvIGdlbmVyYXRlIGNvbmNlcHQgbWFwXCIsXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHRyaWdnZXJNY3FEb3dubG9hZCA9IGFzeW5jIChncmFkZUlkLCBzdWJqZWN0LCB0b3BpYykgPT4ge1xuICAgIGNvbnN0IHN1YmplY3RLZXkgPSBnZXRTdWJqZWN0S2V5KGdyYWRlSWQsIHN1YmplY3QpO1xuICAgIGNvbnN0IGdyYWRlUGFyYW0gPSBHUkFERV9OVU1CRVJfTUFQW2dyYWRlSWRdID8/IGdyYWRlSWQ7XG5cbiAgICBpZiAoIXRvcGljKSB7XG4gICAgICBzZXRNY3FTdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJtaXNzaW5nLXRvcGljXCIgfSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldE1jcVN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcImxvYWRpbmdcIiB9KSk7XG4gICAgc2V0TWNxRXJyb3IoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogbnVsbCB9KSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9tY3FzP3N1YmplY3Q9JHtlbmNvZGVVUklDb21wb25lbnQoc3ViamVjdCl9JnRvcGljPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRvcGljKX0mZ3JhZGU9JHtlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGdyYWRlUGFyYW0pKX1gLCB7XG4gICAgICAgIGNhY2hlOiBcIm5vLXN0b3JlXCIsXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBnZW5lcmF0ZSBNQ1FzXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKCFwYXlsb2FkPy5iYXNlNjQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBNQ1EgY29udGVudFwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnl0ZUNoYXJhY3RlcnMgPSBhdG9iKHBheWxvYWQuYmFzZTY0KTtcbiAgICAgIGNvbnN0IGJ5dGVOdW1iZXJzID0gbmV3IEFycmF5KGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aCk7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnl0ZUNoYXJhY3RlcnMubGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgICAgIGJ5dGVOdW1iZXJzW2luZGV4XSA9IGJ5dGVDaGFyYWN0ZXJzLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgICAgfVxuICAgICAgY29uc3QgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZU51bWJlcnMpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtieXRlQXJyYXldLCB7XG4gICAgICAgIHR5cGU6IFwiYXBwbGljYXRpb24vcGRmXCIsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZG93bmxvYWRVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgbGluay5ocmVmID0gZG93bmxvYWRVcmw7XG4gICAgICBsaW5rLmRvd25sb2FkID0gYCR7c3ViamVjdC5yZXBsYWNlKC9cXHMrL2csIFwiX1wiKX1fJHt0b3BpYy5yZXBsYWNlKC9bXmEtejAtOV0rL2dpLCBcIl9cIikudG9Mb3dlckNhc2UoKSB8fCBcIm1jcXNcIn0ucGRmYDtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChkb3dubG9hZFVybCk7XG5cbiAgICAgIHNldE1jcVRvcGljcygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcIlwiIH0pKTtcbiAgICAgIHNldE1jcUhpc3RvcnkoKHByZXYpID0+ICh7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIFtzdWJqZWN0S2V5XTogW3RvcGljLCAuLi4ocHJldj8uW3N1YmplY3RLZXldID8/IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IHRvcGljKV0uc2xpY2UoMCwgNSksXG4gICAgICB9KSk7XG5cbiAgICAgIHNldE1jcVN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcInN1Y2Nlc3NcIiB9KSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHNldE1jcVN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcImVycm9yXCIgfSkpO1xuICAgICAgc2V0TWNxRXJyb3IoKHByZXYpID0+ICh7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIFtzdWJqZWN0S2V5XTogZXJyb3IubWVzc2FnZSB8fCBcIlVuYWJsZSB0byBnZW5lcmF0ZSBNQ1FzXCIsXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZVN1YmplY3RBY3Rpb24gPSAoZ3JhZGVDb25maWcsIHN1YmplY3QsIGFjdGlvbikgPT4ge1xuICAgIGNvbnN0IGdyYWRlSWQgPSBncmFkZUNvbmZpZy5pZDtcbiAgICBjb25zdCBzdWJqZWN0S2V5ID0gZ2V0U3ViamVjdEtleShncmFkZUlkLCBzdWJqZWN0KTtcbiAgICBjb25zdCBzdWJqZWN0U3RhdGUgPSBzdWJqZWN0QWN0aW9uU2VsZWN0aW9ucz8uW2dyYWRlSWRdPy5bc3ViamVjdF0gPz8ge307XG4gICAgY29uc3QgY2FjaGVLZXkgPSBnZXRBY3Rpb25LZXkoZ3JhZGVJZCwgc3ViamVjdCwgYWN0aW9uKTtcbiAgICBjb25zdCBoYXNQZGYgPSBCb29sZWFuKFNVQkpFQ1RfUERGX0FDVElPTlNbZ3JhZGVJZF0/LltzdWJqZWN0XT8uaGFzKGFjdGlvbikpO1xuXG4gICAgaWYgKGFjdGlvbiA9PT0gXCJTeWxsYWJ1c1wiIHx8IGFjdGlvbiA9PT0gXCJSZWFkaW5nIE1hdGVyaWFsc1wiKSB7XG4gICAgICBjb25zdCBzdWJqZWN0U2x1ZyA9IHN1YmplY3QudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IGFjdGlvbktleSA9IGFjdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBTVUJKRUNUX0ZJTEVTW3N1YmplY3RTbHVnXT8uW2FjdGlvbktleV07XG4gICAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9XG4gICAgICAgIGZpbGVOYW1lICYmXG4gICAgICAgIChmaWxlTmFtZS5zdGFydHNXaXRoKFwiaHR0cFwiKVxuICAgICAgICAgID8gZmlsZU5hbWVcbiAgICAgICAgICA6IGAvJHtmaWxlTmFtZS5yZXBsYWNlKC9eWy9cXFxcXSsvLCBcIlwiKX1gKTtcblxuICAgICAgc2V0U3ViamVjdEFjdGlvblNlbGVjdGlvbnMoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgZ3JhZGVBY3Rpb25zID0geyAuLi4ocHJldj8uW2dyYWRlSWRdID8/IHt9KSB9O1xuICAgICAgICBjb25zdCB1cGRhdGVkU3ViamVjdFN0YXRlID0ge1xuICAgICAgICAgIC4uLihncmFkZUFjdGlvbnNbc3ViamVjdF0gPz8ge30pLFxuICAgICAgICAgIFthY3Rpb25dOiBmYWxzZSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoT2JqZWN0LnZhbHVlcyh1cGRhdGVkU3ViamVjdFN0YXRlKS5ldmVyeSgodmFsdWUpID0+IHZhbHVlID09PSBmYWxzZSkpIHtcbiAgICAgICAgICBkZWxldGUgZ3JhZGVBY3Rpb25zW3N1YmplY3RdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyYWRlQWN0aW9uc1tzdWJqZWN0XSA9IHVwZGF0ZWRTdWJqZWN0U3RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB7XG4gICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICBbZ3JhZGVJZF06IGdyYWRlQWN0aW9ucyxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZ3JhZGVBY3Rpb25zKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkZWxldGUgbmV4dFN0YXRlW2dyYWRlSWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaGFzUGRmKSB7XG4gICAgICAgIHNldFBkZkNhY2hlKChwcmV2KSA9PiB7XG4gICAgICAgICAgaWYgKCFwcmV2Py5bY2FjaGVLZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldiB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW2NhY2hlS2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFBkZkxvYWRpbmcoKHByZXYpID0+IHtcbiAgICAgICAgICBpZiAoIXByZXY/LltjYWNoZUtleV0pIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2IH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbY2FjaGVLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0UGRmRXJyb3IoKHByZXYpID0+IHtcbiAgICAgICAgICBpZiAoIXByZXY/LltjYWNoZUtleV0pIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2IH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbY2FjaGVLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vcm1hbGl6ZWRQYXRoICYmIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgd2luZG93Lm9wZW4obm9ybWFsaXplZFBhdGgsIFwiX2JsYW5rXCIsIFwibm9vcGVuZXIsbm9yZWZlcnJlclwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRWYWx1ZSA9ICFzdWJqZWN0U3RhdGU/LlthY3Rpb25dO1xuXG4gICAgc2V0U3ViamVjdEFjdGlvblNlbGVjdGlvbnMoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGdyYWRlQWN0aW9ucyA9IHsgLi4uKHByZXY/LltncmFkZUlkXSA/PyB7fSkgfTtcbiAgICAgIGNvbnN0IHVwZGF0ZWRTdWJqZWN0U3RhdGUgPSB7XG4gICAgICAgIC4uLihncmFkZUFjdGlvbnNbc3ViamVjdF0gPz8ge30pLFxuICAgICAgICBbYWN0aW9uXTogbmV4dFZhbHVlLFxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC52YWx1ZXModXBkYXRlZFN1YmplY3RTdGF0ZSkuZXZlcnkoKHZhbHVlKSA9PiB2YWx1ZSA9PT0gZmFsc2UpKSB7XG4gICAgICAgIGRlbGV0ZSBncmFkZUFjdGlvbnNbc3ViamVjdF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncmFkZUFjdGlvbnNbc3ViamVjdF0gPSB1cGRhdGVkU3ViamVjdFN0YXRlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXh0QWN0aW9ucyA9IHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW2dyYWRlSWRdOiBncmFkZUFjdGlvbnMsXG4gICAgICB9O1xuXG4gICAgICBpZiAoT2JqZWN0LmtleXMoZ3JhZGVBY3Rpb25zKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZGVsZXRlIG5leHRBY3Rpb25zW2dyYWRlSWRdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV4dEFjdGlvbnM7XG4gICAgfSk7XG5cbiAgICBpZiAobmV4dFZhbHVlKSB7XG4gICAgICBpZiAoaGFzUGRmKSB7XG4gICAgICAgIGZldGNoUGRmQ29udGVudChncmFkZUlkLCBzdWJqZWN0LCBhY3Rpb24pO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGlvbiA9PT0gXCJHZW5lcmF0ZSBwcmVzZW50YXRpb25zXCIpIHtcbiAgICAgICAgY29uc3QgdG9waWMgPSBwcmVzZW50YXRpb25Ub3BpY3Nbc3ViamVjdEtleV0/LnRyaW0oKTtcbiAgICAgICAgdHJpZ2dlclByZXNlbnRhdGlvbkRvd25sb2FkKGdyYWRlSWQsIHN1YmplY3QsIHRvcGljKTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3Rpb24gPT09IFwiR2VuZXJhdGUgUERGXCIpIHtcbiAgICAgICAgY29uc3QgdG9waWMgPSBoYW5kb3V0VG9waWNzW3N1YmplY3RLZXldPy50cmltKCk7XG4gICAgICAgIHRyaWdnZXJIYW5kb3V0RG93bmxvYWQoZ3JhZGVJZCwgc3ViamVjdCwgdG9waWMpO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGlvbiA9PT0gXCJMZXNzb24gUGxhblwiKSB7XG4gICAgICAgIGNvbnN0IHRvcGljID0gbGVzc29uUGxhblRvcGljc1tzdWJqZWN0S2V5XT8udHJpbSgpO1xuICAgICAgICB0cmlnZ2VyTGVzc29uUGxhbkRvd25sb2FkKGdyYWRlSWQsIHN1YmplY3QsIHRvcGljKTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3Rpb24gPT09IFwiR2VuZXJhdGUgV2ViIFBhZ2VcIikge1xuICAgICAgICBjb25zdCB0b3BpYyA9IHdlYlBhZ2VUb3BpY3Nbc3ViamVjdEtleV0/LnRyaW0oKTtcbiAgICAgICAgdHJpZ2dlcldlYlBhZ2VEb3dubG9hZChncmFkZUlkLCBzdWJqZWN0LCB0b3BpYyk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uID09PSBcIkdlbmVyYXRlIENvbmNlcHQgTWFwXCIpIHtcbiAgICAgICAgY29uc3QgdG9waWMgPSBjb25jZXB0TWFwVG9waWNzW3N1YmplY3RLZXldPy50cmltKCk7XG4gICAgICAgIHRyaWdnZXJDb25jZXB0TWFwRG93bmxvYWQoZ3JhZGVJZCwgc3ViamVjdCwgdG9waWMpO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGlvbiA9PT0gXCJHZW5lcmF0ZSBNQ1FzXCIpIHtcbiAgICAgICAgY29uc3QgdG9waWMgPSBtY3FUb3BpY3Nbc3ViamVjdEtleV0/LnRyaW0oKTtcbiAgICAgICAgdHJpZ2dlck1jcURvd25sb2FkKGdyYWRlSWQsIHN1YmplY3QsIHRvcGljKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhc1BkZikge1xuICAgICAgICBzZXRQZGZDYWNoZSgocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXYgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtjYWNoZUtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRQZGZMb2FkaW5nKChwcmV2KSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldiB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW2NhY2hlS2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFBkZkVycm9yKChwcmV2KSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldiB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW2NhY2hlS2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3Rpb24gPT09IFwiR2VuZXJhdGUgcHJlc2VudGF0aW9uc1wiKSB7XG4gICAgICAgIHNldFByZXNlbnRhdGlvblN0YXR1cygocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFByZXNlbnRhdGlvbkVycm9yKChwcmV2KSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBbc3ViamVjdEtleV06IF9yZW1vdmVkLCAuLi5yZXN0IH0gPSBwcmV2O1xuICAgICAgICAgIHJldHVybiByZXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0UHJlc2VudGF0aW9uVG9waWNzKChwcmV2KSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBbc3ViamVjdEtleV06IF9yZW1vdmVkLCAuLi5yZXN0IH0gPSBwcmV2O1xuICAgICAgICAgIHJldHVybiByZXN0O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3Rpb24gPT09IFwiR2VuZXJhdGUgUERGXCIpIHtcbiAgICAgICAgc2V0SGFuZG91dFN0YXR1cygocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldEhhbmRvdXRFcnJvcigocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldEhhbmRvdXRUb3BpY3MoKHByZXYpID0+IHtcbiAgICAgICAgICBjb25zdCB7IFtzdWJqZWN0S2V5XTogX3JlbW92ZWQsIC4uLnJlc3QgfSA9IHByZXY7XG4gICAgICAgICAgcmV0dXJuIHJlc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRIYW5kb3V0SGlzdG9yeSgocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uID09PSBcIkxlc3NvbiBQbGFuXCIpIHtcbiAgICAgICAgc2V0TGVzc29uUGxhblN0YXR1cygocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldExlc3NvblBsYW5FcnJvcigocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldExlc3NvblBsYW5Ub3BpY3MoKHByZXYpID0+IHtcbiAgICAgICAgICBjb25zdCB7IFtzdWJqZWN0S2V5XTogX3JlbW92ZWQsIC4uLnJlc3QgfSA9IHByZXY7XG4gICAgICAgICAgcmV0dXJuIHJlc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRMZXNzb25QbGFuSGlzdG9yeSgocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uID09PSBcIkdlbmVyYXRlIFdlYiBQYWdlXCIpIHtcbiAgICAgICAgc2V0V2ViUGFnZVN0YXR1cygocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFdlYlBhZ2VFcnJvcigocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFdlYlBhZ2VUb3BpY3MoKHByZXYpID0+IHtcbiAgICAgICAgICBjb25zdCB7IFtzdWJqZWN0S2V5XTogX3JlbW92ZWQsIC4uLnJlc3QgfSA9IHByZXY7XG4gICAgICAgICAgcmV0dXJuIHJlc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRXZWJQYWdlSGlzdG9yeSgocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uID09PSBcIkdlbmVyYXRlIENvbmNlcHQgTWFwXCIpIHtcbiAgICAgICAgc2V0Q29uY2VwdE1hcFN0YXR1cygocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldENvbmNlcHRNYXBFcnJvcigocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldENvbmNlcHRNYXBUb3BpY3MoKHByZXYpID0+IHtcbiAgICAgICAgICBjb25zdCB7IFtzdWJqZWN0S2V5XTogX3JlbW92ZWQsIC4uLnJlc3QgfSA9IHByZXY7XG4gICAgICAgICAgcmV0dXJuIHJlc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRDb25jZXB0TWFwSGlzdG9yeSgocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uID09PSBcIkdlbmVyYXRlIE1DUXNcIikge1xuICAgICAgICBzZXRNY3FTdGF0dXMoKHByZXYpID0+IHtcbiAgICAgICAgICBjb25zdCB7IFtzdWJqZWN0S2V5XTogX3JlbW92ZWQsIC4uLnJlc3QgfSA9IHByZXY7XG4gICAgICAgICAgcmV0dXJuIHJlc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRNY3FFcnJvcigocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldE1jcVRvcGljcygocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldE1jcUhpc3RvcnkoKHByZXYpID0+IHtcbiAgICAgICAgICBjb25zdCB7IFtzdWJqZWN0S2V5XTogX3JlbW92ZWQsIC4uLnJlc3QgfSA9IHByZXY7XG4gICAgICAgICAgcmV0dXJuIHJlc3Q7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCB0aGVtZSA9IGlzRGFya01vZGVcbiAgICA/IHtcbiAgICAgICAgYmFja2dyb3VuZDogXCIjMGIxMTIwXCIsXG4gICAgICAgIHRleHQ6IFwiI2UyZThmMFwiLFxuICAgICAgICBwYW5lbDogXCIjMTExODI3XCIsXG4gICAgICAgIHBhbmVsQm9yZGVyOiBcIiMxZjI5MzdcIixcbiAgICAgICAgYWNjZW50OiBcIiMzOGJkZjhcIixcbiAgICAgICAgaXNEYXJrOiB0cnVlLFxuICAgICAgfVxuICAgIDoge1xuICAgICAgICBiYWNrZ3JvdW5kOiBcIiNmZmZmZmZcIixcbiAgICAgICAgdGV4dDogXCIjMGYxNzJhXCIsXG4gICAgICAgIHBhbmVsOiBcIiNmOGZhZmNcIixcbiAgICAgICAgcGFuZWxCb3JkZXI6IFwiI2UyZThmMFwiLFxuICAgICAgICBhY2NlbnQ6IFwiIzI1NjNlYlwiLFxuICAgICAgICBpc0Rhcms6IGZhbHNlLFxuICAgICAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIG1pbkhlaWdodDogXCIxMDB2aFwiLFxuICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJmbGV4LXN0YXJ0XCIsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUuYmFja2dyb3VuZCxcbiAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgIGZvbnRGYW1pbHk6XG4gICAgICAgICAgXCJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBzYW5zLXNlcmlmXCIsXG4gICAgICAgIHBhZGRpbmc6IFwiNjBweCAyMHB4IDQwcHhcIixcbiAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0RhcmtNb2RlKCFpc0RhcmtNb2RlKX1cbiAgICAgICAgYXJpYS1sYWJlbD17YFN3aXRjaCB0byAke2lzRGFya01vZGUgPyBcImxpZ2h0XCIgOiBcImRhcmtcIn0gbW9kZWB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICB0b3A6IFwiMjRweFwiLFxuICAgICAgICAgIHJpZ2h0OiBcIjE2cHhcIixcbiAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgIGdhcDogXCIxMnB4XCIsXG4gICAgICAgICAgcGFkZGluZzogXCI4cHggMTZweFwiLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogXCI5OTk5cHhcIixcbiAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLnBhbmVsLFxuICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0LFxuICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgIHRyYW5zaXRpb246IFwiYmFja2dyb3VuZCAwLjJzIGVhc2UsIGJvcmRlci1jb2xvciAwLjJzIGVhc2VcIixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4+e2lzRGFya01vZGUgPyBcIkRhcmtcIiA6IFwiTGlnaHRcIn08L3NwYW4+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICB3aWR0aDogXCI0MnB4XCIsXG4gICAgICAgICAgICBoZWlnaHQ6IFwiMjJweFwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjk5OTlweFwiLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogaXNEYXJrTW9kZSA/IHRoZW1lLmFjY2VudCA6IFwiI2NiZDVmNVwiLFxuICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZFwiLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogXCJiYWNrZ3JvdW5kIDAuMnMgZWFzZVwiLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgdG9wOiBcIjJweFwiLFxuICAgICAgICAgICAgICBsZWZ0OiBpc0RhcmtNb2RlID8gXCIyMnB4XCIgOiBcIjJweFwiLFxuICAgICAgICAgICAgICB3aWR0aDogXCIxNnB4XCIsXG4gICAgICAgICAgICAgIGhlaWdodDogXCIxNnB4XCIsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI1MCVcIixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogaXNEYXJrTW9kZSA/IFwiIzBiMTEyMFwiIDogXCIjZjhmYWZjXCIsXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogXCIwIDJweCA0cHggcmdiYSgxNSwgMjMsIDQyLCAwLjI1KVwiLFxuICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBcImxlZnQgMC4ycyBlYXNlLCBiYWNrZ3JvdW5kIDAuMnMgZWFzZVwiLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKFwiL1wiKX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBhbGlnblNlbGY6IFwiZmxleC1lbmRcIixcbiAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMTZweFwiLFxuICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDE0cHhcIixcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOTk5OXB4XCIsXG4gICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZFwiLFxuICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZS5wYW5lbEJvcmRlcixcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyBcInJnYmEoMzAsIDY0LCAxNzUsIDAuMjUpXCIgOiBcIiNlZmY2ZmZcIixcbiAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjYmZkYmZlXCIgOiBcIiMxZDRlZDhcIixcbiAgICAgICAgICBmb250U2l6ZTogXCIwLjlyZW1cIixcbiAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIixcbiAgICAgICAgICB0cmFuc2l0aW9uOiBcImJhY2tncm91bmQgMC4ycyBlYXNlLCBjb2xvciAwLjJzIGVhc2VcIixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAg4oaQIEJhY2sgdG8gQm9hcmQgU2VsZWN0aW9uXG4gICAgICA8L2J1dHRvbj5cbiAgICAgIHsvKiBXZWxjb21lIE1lc3NhZ2UgKi99XG4gICAgICA8aDFcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBmb250U2l6ZTogXCIxLjZyZW1cIixcbiAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjEycHhcIixcbiAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBcIjAuMDFlbVwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICBXZWxjb21lIHRvIHRlYWNod2lzZWFpLm1wYWlhcHBzLmNvbVxuICAgICAgPC9oMT5cblxuICAgICAgey8qIENCU0UgSGVhZGluZyAqL31cbiAgICAgIDxoMlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGZvbnRTaXplOiBcIjEuMzVyZW1cIixcbiAgICAgICAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjEwcHhcIixcbiAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBcIjAuMDJlbVwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICBDQlNFXG4gICAgICA8L2gyPlxuXG4gICAgICB7LyogQ2hlY2tib3hlcyAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgIGdhcDogXCI4cHhcIixcbiAgICAgICAgICBmb250U2l6ZTogXCIxLjJyZW1cIixcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5wYW5lbCxcbiAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgIHBhZGRpbmc6IFwiMTZweCAyNHB4XCIsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjE0cHhcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgbWF4V2lkdGg6IFwiNzIwcHhcIixcbiAgICAgICAgICB0ZXh0QWxpZ246IFwibGVmdFwiLFxuICAgICAgICAgIGJveFNoYWRvdzogaXNEYXJrTW9kZVxuICAgICAgICAgICAgPyBcIjAgMjBweCAzNXB4IHJnYmEoMTUsIDIzLCA0MiwgMC41KVwiXG4gICAgICAgICAgICA6IFwiMCAxOHB4IDMwcHggcmdiYSgxNSwgMjMsIDQyLCAwLjA4KVwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7R1JBREVfQ09ORklHUy5tYXAoKGdyYWRlQ29uZmlnKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udHJvbCA9IGdyYWRlQ29udHJvbHNbZ3JhZGVDb25maWcuaWRdO1xuICAgICAgICAgIGlmICghY29udHJvbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgeyBpc0FjdGl2ZSwgc2V0QWN0aXZlIH0gPSBjb250cm9sO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkR3JhZGVTdWJqZWN0cyA9IHNlbGVjdGVkU3ViamVjdHM/LltncmFkZUNvbmZpZy5pZF0gPz8ge307XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBrZXk9e2dyYWRlQ29uZmlnLmlkfVxuICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIiwgZ2FwOiBcIjhweFwiIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgZ2FwOiBcIjEwcHhcIiB9fT5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtpc0FjdGl2ZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBzZXRBY3RpdmUoIWlzQWN0aXZlKX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGFjY2VudENvbG9yOiB0aGVtZS5hY2NlbnQgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtncmFkZUNvbmZpZy5sYWJlbH1cbiAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICB7aXNBY3RpdmUgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBcIjMwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJncmlkXCIsXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6IFwicmVwZWF0KDIsIG1pbm1heCgwLCAxZnIpKVwiLFxuICAgICAgICAgICAgICAgICAgICBnYXA6IFwiOHB4IDE4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMXJlbVwiLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2dyYWRlQ29uZmlnLnN1YmplY3RzLm1hcCgoc3ViamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gQm9vbGVhbihzZWxlY3RlZEdyYWRlU3ViamVjdHNbc3ViamVjdF0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJqZWN0S2V5ID0gZ2V0U3ViamVjdEtleShncmFkZUNvbmZpZy5pZCwgc3ViamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvblN0YXRlID1cbiAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0QWN0aW9uU2VsZWN0aW9ucz8uW2dyYWRlQ29uZmlnLmlkXT8uW3N1YmplY3RdID8/IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtgJHtncmFkZUNvbmZpZy5pZH0tJHtzdWJqZWN0fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIiwgZ2FwOiBcIjZweFwiIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaXNEYXJrTW9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJyZ2JhKDU2LCAxODksIDI0OCwgMC4yNSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwicmdiYSgxNSwgMjMsIDQyLCAwLjM1KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCIjYmZkYmZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCIjZWVmMmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweCAxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBpc0RhcmtNb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiMzOGJkZjhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiIzFlMjkzYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCIjNjBhNWZhXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCIjYzdkMmZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogXCJiYWNrZ3JvdW5kIDAuMnMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMnMgZWFzZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2lzU2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHRvZ2dsZVN1YmplY3RTZWxlY3Rpb24oZ3JhZGVDb25maWcsIHN1YmplY3QpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGFjY2VudENvbG9yOiB0aGVtZS5hY2NlbnQgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3N1YmplY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNTZWxlY3RlZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjRweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiMzJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiBcIjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7U1VCSkVDVF9BQ1RJT05TLm1hcCgoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGlvblNlbGVjdGVkID0gQm9vbGVhbihhY3Rpb25TdGF0ZVthY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gZ2V0QWN0aW9uS2V5KGdyYWRlQ29uZmlnLmlkLCBzdWJqZWN0LCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGRmU2V0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU1VCSkVDVF9QREZfQUNUSU9OU1tncmFkZUNvbmZpZy5pZF0/LltzdWJqZWN0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1BkZiA9IEJvb2xlYW4ocGRmU2V0Py5oYXMoYWN0aW9uKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1N5bGxhYnVzID0gYWN0aW9uID09PSBcIlN5bGxhYnVzXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1JlYWRpbmdNYXRlcmlhbHMgPSBhY3Rpb24gPT09IFwiUmVhZGluZyBNYXRlcmlhbHNcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNob3dJbmxpbmVQZGYgPSBoYXNQZGYgJiYgIWlzU3lsbGFidXMgJiYgIWlzUmVhZGluZ01hdGVyaWFscztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXNlbnRhdGlvblN0YXRlID0gcHJlc2VudGF0aW9uU3RhdHVzW3N1YmplY3RLZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJlc2VudGF0aW9uRXJyb3JNZXNzYWdlID0gcHJlc2VudGF0aW9uRXJyb3Jbc3ViamVjdEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3BpY1ZhbHVlID0gcHJlc2VudGF0aW9uVG9waWNzW3N1YmplY3RLZXldID8/IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWNlbnRUb3BpY3MgPSBwcmVzZW50YXRpb25IaXN0b3J5W3N1YmplY3RLZXldID8/IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZG91dFN0YXRlID0gaGFuZG91dFN0YXR1c1tzdWJqZWN0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRvdXRFcnJvck1lc3NhZ2UgPSBoYW5kb3V0RXJyb3Jbc3ViamVjdEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kb3V0VmFsdWUgPSBoYW5kb3V0VG9waWNzW3N1YmplY3RLZXldID8/IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kb3V0UmVjZW50ID0gaGFuZG91dEhpc3Rvcnlbc3ViamVjdEtleV0gPz8gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsZXNzb25QbGFuU3RhdGUgPSBsZXNzb25QbGFuU3RhdHVzW3N1YmplY3RLZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVzc29uUGxhbkVycm9yTWVzc2FnZSA9IGxlc3NvblBsYW5FcnJvcltzdWJqZWN0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlc3NvblBsYW5WYWx1ZSA9IGxlc3NvblBsYW5Ub3BpY3Nbc3ViamVjdEtleV0gPz8gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlc3NvblBsYW5SZWNlbnQgPSBsZXNzb25QbGFuSGlzdG9yeVtzdWJqZWN0S2V5XSA/PyBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdlYlBhZ2VTdGF0ZSA9IHdlYlBhZ2VTdGF0dXNbc3ViamVjdEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3ZWJQYWdlRXJyb3JNZXNzYWdlID0gd2ViUGFnZUVycm9yW3N1YmplY3RLZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2ViUGFnZVZhbHVlID0gd2ViUGFnZVRvcGljc1tzdWJqZWN0S2V5XSA/PyBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2ViUGFnZVJlY2VudCA9IHdlYlBhZ2VIaXN0b3J5W3N1YmplY3RLZXldID8/IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29uY2VwdE1hcFN0YXRlID0gY29uY2VwdE1hcFN0YXR1c1tzdWJqZWN0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbmNlcHRNYXBFcnJvck1lc3NhZ2UgPSBjb25jZXB0TWFwRXJyb3Jbc3ViamVjdEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb25jZXB0TWFwVmFsdWUgPSBjb25jZXB0TWFwVG9waWNzW3N1YmplY3RLZXldID8/IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb25jZXB0TWFwUmVjZW50ID0gY29uY2VwdE1hcEhpc3Rvcnlbc3ViamVjdEtleV0gPz8gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtY3FTdGF0ZSA9IG1jcVN0YXR1c1tzdWJqZWN0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1jcUVycm9yTWVzc2FnZSA9IG1jcUVycm9yW3N1YmplY3RLZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWNxVmFsdWUgPSBtY3FUb3BpY3Nbc3ViamVjdEtleV0gPz8gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1jcVJlY2VudCA9IG1jcUhpc3Rvcnlbc3ViamVjdEtleV0gPz8gW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2FjdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuOTJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtpc0FjdGlvblNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVTdWJqZWN0QWN0aW9uKGdyYWRlQ29uZmlnLCBzdWJqZWN0LCBhY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYWNjZW50Q29sb3I6IHRoZW1lLmFjY2VudCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0FjdGlvblNlbGVjdGVkICYmIHNob3dJbmxpbmVQZGYgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBkZkNvbnRlbnRWaWV3ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZTY0RGF0YT17cGRmQ2FjaGVbY2FjaGVLZXldfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc9e0Jvb2xlYW4ocGRmTG9hZGluZ1tjYWNoZUtleV0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcj17cGRmRXJyb3JbY2FjaGVLZXldfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXtgJHtncmFkZUNvbmZpZy5sYWJlbH0gJHtzdWJqZWN0fSAke2FjdGlvbn1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzQWN0aW9uU2VsZWN0ZWQgJiYgYWN0aW9uID09PSBcIkdlbmVyYXRlIHByZXNlbnRhdGlvbnNcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0b3BpY1ZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFByZXNlbnRhdGlvblRvcGljcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdWJqZWN0S2V5XTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXNlbnRhdGlvblN0YXR1c1tzdWJqZWN0S2V5XSA9PT0gXCJtaXNzaW5nLXRvcGljXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQcmVzZW50YXRpb25TdGF0dXMoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHRvcGljXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweCAxMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyBcIiMwZjE3MmFcIiA6IFwiI2Y4ZmFmY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJQcmVzZW50YXRpb25Eb3dubG9hZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkZUNvbmZpZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcGljVmFsdWUudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjMGIxMTIwXCIgOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtwcmVzZW50YXRpb25TdGF0ZSA9PT0gXCJsb2FkaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ByZXNlbnRhdGlvblN0YXRlID09PSBcImxvYWRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiR2VuZXJhdGluZ+KAplwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJHZW5lcmF0ZVwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ByZXNlbnRhdGlvblN0YXRlID09PSBcIm1pc3NpbmctdG9waWNcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2Y5NzMxNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbnRlciBhIHRvcGljIHRvIGNvbnRpbnVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ByZXNlbnRhdGlvblN0YXRlID09PSBcImVycm9yXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNmODcxNzFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5hYmxlIHRvIGdlbmVyYXRlIHByZXNlbnRhdGlvbjoge3ByZXNlbnRhdGlvbkVycm9yTWVzc2FnZSA/PyBcIlVua25vd24gZXJyb3JcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcmVzZW50YXRpb25TdGF0ZSA9PT0gXCJzdWNjZXNzXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiMzOGJkZjhcIiA6IFwiIzI1NjNlYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmVzZW50YXRpb24gZG93bmxvYWRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshcHJlc2VudGF0aW9uU3RhdGUgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiM5NGEzYjhcIiA6IFwiIzQ3NTU2OVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBlIGEgdG9waWMgYW5kIGNsaWNrIEdlbmVyYXRlIHRvIGRvd25sb2FkIGEgUFBUWC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWNlbnRUb3BpY3MubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogXCI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWNlbnRUb3BpY3MubWFwKChyZWNlbnRUb3BpYykgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtyZWNlbnRUb3BpY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQcmVzZW50YXRpb25Ub3BpY3MoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdWJqZWN0S2V5XTogcmVjZW50VG9waWMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyUHJlc2VudGF0aW9uRG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlQ29uZmlnLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlbnRUb3BpY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjRweCAxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOTk5OXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWUucGFuZWxCb3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiMxZTI5M2JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiI2UyZThmMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjc4cmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3ByZXNlbnRhdGlvblN0YXRlID09PSBcImxvYWRpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWNlbnRUb3BpY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNBY3Rpb25TZWxlY3RlZCAmJiBhY3Rpb24gPT09IFwiR2VuZXJhdGUgUERGXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17aGFuZG91dFZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEhhbmRvdXRUb3BpY3MoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3ViamVjdEtleV06IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kb3V0U3RhdHVzW3N1YmplY3RLZXldID09PSBcIm1pc3NpbmctdG9waWNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEhhbmRvdXRTdGF0dXMoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHRvcGljXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweCAxMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyBcIiMwZjE3MmFcIiA6IFwiI2Y4ZmFmY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJIYW5kb3V0RG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGVDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kb3V0VmFsdWUudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjMGIxMTIwXCIgOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtoYW5kb3V0U3RhdGUgPT09IFwibG9hZGluZ1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtoYW5kb3V0U3RhdGUgPT09IFwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJHZW5lcmF0aW5n4oCmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkdlbmVyYXRlXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aGFuZG91dFN0YXRlID09PSBcIm1pc3NpbmctdG9waWNcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2Y5NzMxNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbnRlciBhIHRvcGljIHRvIGNvbnRpbnVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2hhbmRvdXRTdGF0ZSA9PT0gXCJlcnJvclwiICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZjg3MTcxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVuYWJsZSB0byBnZW5lcmF0ZSBQREY6IHtoYW5kb3V0RXJyb3JNZXNzYWdlID8/IFwiVW5rbm93biBlcnJvclwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2hhbmRvdXRTdGF0ZSA9PT0gXCJzdWNjZXNzXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiMzOGJkZjhcIiA6IFwiIzI1NjNlYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQREYgZG93bmxvYWRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshaGFuZG91dFN0YXRlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjOTRhM2I4XCIgOiBcIiM0NzU1NjlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwZSBhIHRvcGljIGFuZCBjbGljayBHZW5lcmF0ZSB0byBkb3dubG9hZCBhIFBERiBoYW5kb3V0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2hhbmRvdXRSZWNlbnQubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogXCI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtoYW5kb3V0UmVjZW50Lm1hcCgocmVjZW50VG9waWMpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cmVjZW50VG9waWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SGFuZG91dFRvcGljcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiByZWNlbnRUb3BpYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJIYW5kb3V0RG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlQ29uZmlnLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlbnRUb3BpY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjRweCAxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOTk5OXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWUucGFuZWxCb3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiMxZTI5M2JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiI2UyZThmMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjc4cmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2hhbmRvdXRTdGF0ZSA9PT0gXCJsb2FkaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVjZW50VG9waWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzQWN0aW9uU2VsZWN0ZWQgJiYgYWN0aW9uID09PSBcIkxlc3NvbiBQbGFuXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bGVzc29uUGxhblZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldExlc3NvblBsYW5Ub3BpY3MoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3ViamVjdEtleV06IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXNzb25QbGFuU3RhdHVzW3N1YmplY3RLZXldID09PSBcIm1pc3NpbmctdG9waWNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldExlc3NvblBsYW5TdGF0dXMoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHRvcGljXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweCAxMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyBcIiMwZjE3MmFcIiA6IFwiI2Y4ZmFmY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJMZXNzb25QbGFuRG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGVDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXNzb25QbGFuVmFsdWUudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjMGIxMTIwXCIgOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsZXNzb25QbGFuU3RhdGUgPT09IFwibG9hZGluZ1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsZXNzb25QbGFuU3RhdGUgPT09IFwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJHZW5lcmF0aW5n4oCmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkdlbmVyYXRlXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGVzc29uUGxhblN0YXRlID09PSBcIm1pc3NpbmctdG9waWNcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2Y5NzMxNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbnRlciBhIHRvcGljIHRvIGNvbnRpbnVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xlc3NvblBsYW5TdGF0ZSA9PT0gXCJlcnJvclwiICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZjg3MTcxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVuYWJsZSB0byBnZW5lcmF0ZSBsZXNzb24gcGxhbjoge2xlc3NvblBsYW5FcnJvck1lc3NhZ2UgPz8gXCJVbmtub3duIGVycm9yXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGVzc29uUGxhblN0YXRlID09PSBcInN1Y2Nlc3NcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLmlzRGFyayA/IFwiIzM4YmRmOFwiIDogXCIjMjU2M2ViXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExlc3NvbiBwbGFuIGRvd25sb2FkZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IWxlc3NvblBsYW5TdGF0ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLmlzRGFyayA/IFwiIzk0YTNiOFwiIDogXCIjNDc1NTY5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cGUgYSB0b3BpYyBhbmQgY2xpY2sgR2VuZXJhdGUgdG8gZG93bmxvYWQgYSBsZXNzb24gcGxhbiBQREYuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGVzc29uUGxhblJlY2VudC5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4V3JhcDogXCJ3cmFwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogXCI0cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xlc3NvblBsYW5SZWNlbnQubWFwKChyZWNlbnRUb3BpYykgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtyZWNlbnRUb3BpY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRMZXNzb25QbGFuVG9waWNzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3ViamVjdEtleV06IHJlY2VudFRvcGljLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckxlc3NvblBsYW5Eb3dubG9hZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGVDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VudFRvcGljXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiNHB4IDEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI5OTk5cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZS5wYW5lbEJvcmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmlzRGFya1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiIzFlMjkzYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCIjZTJlOGYwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuNzhyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bGVzc29uUGxhblN0YXRlID09PSBcImxvYWRpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWNlbnRUb3BpY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNBY3Rpb25TZWxlY3RlZCAmJiBhY3Rpb24gPT09IFwiR2VuZXJhdGUgV2ViIFBhZ2VcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt3ZWJQYWdlVmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0V2ViUGFnZVRvcGljcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdWJqZWN0S2V5XTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdlYlBhZ2VTdGF0dXNbc3ViamVjdEtleV0gPT09IFwibWlzc2luZy10b3BpY1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0V2ViUGFnZVN0YXR1cygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3ViamVjdEtleV06IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggdG9waWNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDEycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWUucGFuZWxCb3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmlzRGFyayA/IFwiIzBmMTcyYVwiIDogXCIjZjhmYWZjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcldlYlBhZ2VEb3dubG9hZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkZUNvbmZpZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlBhZ2VWYWx1ZS50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCI4cHggMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiMwYjExMjBcIiA6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3dlYlBhZ2VTdGF0ZSA9PT0gXCJsb2FkaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3dlYlBhZ2VTdGF0ZSA9PT0gXCJsb2FkaW5nXCIgPyBcIkdlbmVyYXRpbmfigKZcIiA6IFwiR2VuZXJhdGVcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt3ZWJQYWdlU3RhdGUgPT09IFwibWlzc2luZy10b3BpY1wiICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZjk3MzE2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVudGVyIGEgdG9waWMgdG8gY29udGludWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7d2ViUGFnZVN0YXRlID09PSBcImVycm9yXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNmODcxNzFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5hYmxlIHRvIGdlbmVyYXRlIHdlYiBwYWdlOiB7d2ViUGFnZUVycm9yTWVzc2FnZSA/PyBcIlVua25vd24gZXJyb3JcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt3ZWJQYWdlU3RhdGUgPT09IFwic3VjY2Vzc1wiICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjMzhiZGY4XCIgOiBcIiMyNTYzZWJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2ViIHBhZ2UgZG93bmxvYWRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshd2ViUGFnZVN0YXRlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjOTRhM2I4XCIgOiBcIiM0NzU1NjlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwZSBhIHRvcGljIGFuZCBjbGljayBHZW5lcmF0ZSB0byBkb3dubG9hZCBhbiBIVE1MIHdlYiBwYWdlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3dlYlBhZ2VSZWNlbnQubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogXCI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt3ZWJQYWdlUmVjZW50Lm1hcCgocmVjZW50VG9waWMpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cmVjZW50VG9waWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0V2ViUGFnZVRvcGljcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiByZWNlbnRUb3BpYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJXZWJQYWdlRG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlQ29uZmlnLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlbnRUb3BpY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjRweCAxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOTk5OXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWUucGFuZWxCb3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiMxZTI5M2JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiI2UyZThmMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjc4cmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3dlYlBhZ2VTdGF0ZSA9PT0gXCJsb2FkaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVjZW50VG9waWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzQWN0aW9uU2VsZWN0ZWQgJiYgYWN0aW9uID09PSBcIkdlbmVyYXRlIENvbmNlcHQgTWFwXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uY2VwdE1hcFZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbmNlcHRNYXBUb3BpY3MoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3ViamVjdEtleV06IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25jZXB0TWFwU3RhdHVzW3N1YmplY3RLZXldID09PSBcIm1pc3NpbmctdG9waWNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbmNlcHRNYXBTdGF0dXMoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHRvcGljXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweCAxMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyBcIiMwZjE3MmFcIiA6IFwiI2Y4ZmFmY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJDb25jZXB0TWFwRG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGVDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25jZXB0TWFwVmFsdWUudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjMGIxMTIwXCIgOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtjb25jZXB0TWFwU3RhdGUgPT09IFwibG9hZGluZ1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb25jZXB0TWFwU3RhdGUgPT09IFwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJHZW5lcmF0aW5n4oCmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkdlbmVyYXRlXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29uY2VwdE1hcFN0YXRlID09PSBcIm1pc3NpbmctdG9waWNcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2Y5NzMxNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbnRlciBhIHRvcGljIHRvIGNvbnRpbnVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbmNlcHRNYXBTdGF0ZSA9PT0gXCJlcnJvclwiICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZjg3MTcxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVuYWJsZSB0byBnZW5lcmF0ZSBjb25jZXB0IG1hcDoge2NvbmNlcHRNYXBFcnJvck1lc3NhZ2UgPz8gXCJVbmtub3duIGVycm9yXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29uY2VwdE1hcFN0YXRlID09PSBcInN1Y2Nlc3NcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLmlzRGFyayA/IFwiIzM4YmRmOFwiIDogXCIjMjU2M2ViXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmNlcHQgbWFwIFBERiBkb3dubG9hZGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyFjb25jZXB0TWFwU3RhdGUgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiM5NGEzYjhcIiA6IFwiIzQ3NTU2OVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBlIGEgdG9waWMgYW5kIGNsaWNrIEdlbmVyYXRlIHRvIGRvd25sb2FkIGEgY29uY2VwdCBtYXAgUERGLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbmNlcHRNYXBSZWNlbnQubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogXCI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb25jZXB0TWFwUmVjZW50Lm1hcCgocmVjZW50VG9waWMpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cmVjZW50VG9waWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29uY2VwdE1hcFRvcGljcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiByZWNlbnRUb3BpYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJDb25jZXB0TWFwRG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlQ29uZmlnLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlbnRUb3BpY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjRweCAxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOTk5OXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWUucGFuZWxCb3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiMxZTI5M2JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiI2UyZThmMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjc4cmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2NvbmNlcHRNYXBTdGF0ZSA9PT0gXCJsb2FkaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVjZW50VG9waWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzQWN0aW9uU2VsZWN0ZWQgJiYgYWN0aW9uID09PSBcIkdlbmVyYXRlIE1DUXNcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXttY3FWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNY3FUb3BpY3MoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3ViamVjdEtleV06IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtY3FTdGF0dXNbc3ViamVjdEtleV0gPT09IFwibWlzc2luZy10b3BpY1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWNxU3RhdHVzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdWJqZWN0S2V5XTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCB0b3BpY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCI4cHggMTJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZS5wYW5lbEJvcmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuaXNEYXJrID8gXCIjMGYxNzJhXCIgOiBcIiNmOGZhZmNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyTWNxRG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGVDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtY3FWYWx1ZS50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCI4cHggMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiMwYjExMjBcIiA6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e21jcVN0YXRlID09PSBcImxvYWRpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWNxU3RhdGUgPT09IFwibG9hZGluZ1wiID8gXCJHZW5lcmF0aW5n4oCmXCIgOiBcIkdlbmVyYXRlXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWNxU3RhdGUgPT09IFwibWlzc2luZy10b3BpY1wiICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZjk3MzE2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVudGVyIGEgdG9waWMgdG8gY29udGludWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWNxU3RhdGUgPT09IFwiZXJyb3JcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2Y4NzE3MVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVbmFibGUgdG8gZ2VuZXJhdGUgTUNRczoge21jcUVycm9yTWVzc2FnZSA/PyBcIlVua25vd24gZXJyb3JcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttY3FTdGF0ZSA9PT0gXCJzdWNjZXNzXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiMzOGJkZjhcIiA6IFwiIzI1NjNlYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNQ1Egc2V0IFBERiBkb3dubG9hZGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyFtY3FTdGF0ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLmlzRGFyayA/IFwiIzk0YTNiOFwiIDogXCIjNDc1NTY5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cGUgYSB0b3BpYyBhbmQgY2xpY2sgR2VuZXJhdGUgdG8gZG93bmxvYWQgYSBtdWx0aXBsZS1jaG9pY2UgcHJhY3RpY2UgUERGLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge21jcVJlY2VudC5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4V3JhcDogXCJ3cmFwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogXCI0cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge21jcVJlY2VudC5tYXAoKHJlY2VudFRvcGljKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3JlY2VudFRvcGljfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1jcVRvcGljcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiByZWNlbnRUb3BpYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJNY3FEb3dubG9hZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGVDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VudFRvcGljXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiNHB4IDEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI5OTk5cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZS5wYW5lbEJvcmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmlzRGFya1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiIzFlMjkzYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCIjZTJlOGYwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuNzhyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bWNxU3RhdGUgPT09IFwibG9hZGluZ1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlY2VudFRvcGljfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0FjdGlvblNlbGVjdGVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhaGFzUGRmICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24gIT09IFwiR2VuZXJhdGUgcHJlc2VudGF0aW9uc1wiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24gIT09IFwiR2VuZXJhdGUgUERGXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiAhPT0gXCJMZXNzb24gUGxhblwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24gIT09IFwiR2VuZXJhdGUgV2ViIFBhZ2VcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uICE9PSBcIkdlbmVyYXRlIENvbmNlcHQgTWFwXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiAhPT0gXCJHZW5lcmF0ZSBNQ1FzXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjg4cmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLmlzRGFyayA/IFwiIzk0YTNiOFwiIDogXCIjNDc1NTY5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlIGNvbWluZyBzb29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cblxuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZVN0YXRlIiwidXNlUm91dGVyIiwiU1VCSkVDVF9GSUxFUyIsIkdSQURFX0NPTkZJR1MiLCJpZCIsImxhYmVsIiwibnVtYmVyIiwic3ViamVjdHMiLCJHUkFERV9OVU1CRVJfTUFQIiwicmVkdWNlIiwiYWNjdW11bGF0b3IiLCJjb25maWciLCJTVUJKRUNUX0FDVElPTlMiLCJTVUJKRUNUX1BERl9BQ1RJT05TIiwiZ3JhZGUxMiIsIk1hdGhzIiwiU2V0IiwiZ3JhZGUxMSIsImdyYWRlMTAiLCJncmFkZTkiLCJncmFkZTgiLCJQZGZDb250ZW50Vmlld2VyIiwiYmFzZTY0RGF0YSIsImlzTG9hZGluZyIsImVycm9yIiwidGhlbWUiLCJjb250YWluZXJSZWYiLCJjYW5jZWxlZCIsInJlbmRlclBkZiIsImN1cnJlbnQiLCJpbm5lckhUTUwiLCJnZXREb2N1bWVudCIsIkdsb2JhbFdvcmtlck9wdGlvbnMiLCJ3b3JrZXJNb2R1bGUiLCJQcm9taXNlIiwiYWxsIiwid29ya2VyU3JjIiwiZGVmYXVsdCIsImJpbmFyeVN0cmluZyIsImF0b2IiLCJsZW4iLCJsZW5ndGgiLCJieXRlcyIsIlVpbnQ4QXJyYXkiLCJpIiwiY2hhckNvZGVBdCIsInBkZkRvYyIsImRhdGEiLCJwcm9taXNlIiwiY29udGFpbmVyIiwicGFnZU51bWJlciIsIm51bVBhZ2VzIiwicGFnZSIsImdldFBhZ2UiLCJ2aWV3cG9ydCIsImdldFZpZXdwb3J0Iiwic2NhbGUiLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImJveFNoYWRvdyIsImlzRGFyayIsImJvcmRlclJhZGl1cyIsIndpZHRoIiwiaGVpZ2h0IiwiY29udGV4dCIsImdldENvbnRleHQiLCJhcHBlbmRDaGlsZCIsInJlbmRlciIsImNhbnZhc0NvbnRleHQiLCJkaXYiLCJtYXJnaW5Ub3AiLCJwYWRkaW5nIiwiYm9yZGVyIiwiYm9yZGVyQ29sb3IiLCJwYW5lbEJvcmRlciIsImNvbG9yIiwidGV4dCIsImZvbnRTaXplIiwiYmFja2dyb3VuZCIsInJlZiIsImRpc3BsYXkiLCJnYXAiLCJvdmVyZmxvd1giLCJwYWRkaW5nQm90dG9tIiwiQ09VTlRSWV9PUFRJT05TIiwiSU5ESUFfU1VCX09QVElPTlMiLCJJTkRJQV9TQ0hPT0xfT1BUSU9OUyIsIkhvbWUiLCJhY3RpdmVDb3VudHJpZXMiLCJzZXRBY3RpdmVDb3VudHJpZXMiLCJpbmRpYVNlbGVjdGlvbnMiLCJzZXRJbmRpYVNlbGVjdGlvbnMiLCJpbmRpYVNjaG9vbFNlbGVjdGlvbnMiLCJzZXRJbmRpYVNjaG9vbFNlbGVjdGlvbnMiLCJpc0RhcmtNb2RlIiwic2V0SXNEYXJrTW9kZSIsInRvZ2dsZUNvdW50cnkiLCJjb3VudHJ5SWQiLCJwcmV2IiwidG9nZ2xlSW5kaWFPcHRpb24iLCJvcHRpb25JZCIsInRvZ2dsZUluZGlhU2Nob29sT3B0aW9uIiwiYXBwQmFja2dyb3VuZCIsInBhbmVsIiwiYWNjZW50Iiwic2Vjb25kYXJ5VGV4dCIsIm1haW4iLCJtaW5IZWlnaHQiLCJhbGlnbkl0ZW1zIiwianVzdGlmeUNvbnRlbnQiLCJmbGV4RGlyZWN0aW9uIiwicG9zaXRpb24iLCJidXR0b24iLCJ0eXBlIiwib25DbGljayIsInByZXZpb3VzIiwiYXJpYS1sYWJlbCIsInRvcCIsInJpZ2h0IiwiZm9udFdlaWdodCIsImN1cnNvciIsInNwYW4iLCJsZWZ0IiwidHJhbnNpdGlvbiIsImgxIiwibWFyZ2luIiwidGV4dEFsaWduIiwicGFkZGluZ0xlZnQiLCJtYXAiLCJjb3VudHJ5IiwiaW5wdXQiLCJjaGVja2VkIiwiQm9vbGVhbiIsIm9uQ2hhbmdlIiwiYWNjZW50Q29sb3IiLCJ0cmFuc2Zvcm0iLCJpbmRpYSIsIm9wdGlvbiIsInNjaG9vbHMiLCJzY2hvb2xPcHRpb24iLCJDYnNlRGFzaGJvYXJkIiwicm91dGVyIiwic2V0R3JhZGUxMiIsInNldEdyYWRlMTEiLCJzZXRHcmFkZTEwIiwic2V0R3JhZGU5Iiwic2V0R3JhZGU4Iiwic2VsZWN0ZWRTdWJqZWN0cyIsInNldFNlbGVjdGVkU3ViamVjdHMiLCJzdWJqZWN0QWN0aW9uU2VsZWN0aW9ucyIsInNldFN1YmplY3RBY3Rpb25TZWxlY3Rpb25zIiwicGRmQ2FjaGUiLCJzZXRQZGZDYWNoZSIsInBkZkxvYWRpbmciLCJzZXRQZGZMb2FkaW5nIiwicGRmRXJyb3IiLCJzZXRQZGZFcnJvciIsInByZXNlbnRhdGlvblN0YXR1cyIsInNldFByZXNlbnRhdGlvblN0YXR1cyIsInByZXNlbnRhdGlvbkVycm9yIiwic2V0UHJlc2VudGF0aW9uRXJyb3IiLCJwcmVzZW50YXRpb25Ub3BpY3MiLCJzZXRQcmVzZW50YXRpb25Ub3BpY3MiLCJwcmVzZW50YXRpb25IaXN0b3J5Iiwic2V0UHJlc2VudGF0aW9uSGlzdG9yeSIsImhhbmRvdXRTdGF0dXMiLCJzZXRIYW5kb3V0U3RhdHVzIiwiaGFuZG91dEVycm9yIiwic2V0SGFuZG91dEVycm9yIiwiaGFuZG91dFRvcGljcyIsInNldEhhbmRvdXRUb3BpY3MiLCJoYW5kb3V0SGlzdG9yeSIsInNldEhhbmRvdXRIaXN0b3J5IiwibGVzc29uUGxhblN0YXR1cyIsInNldExlc3NvblBsYW5TdGF0dXMiLCJsZXNzb25QbGFuRXJyb3IiLCJzZXRMZXNzb25QbGFuRXJyb3IiLCJsZXNzb25QbGFuVG9waWNzIiwic2V0TGVzc29uUGxhblRvcGljcyIsImxlc3NvblBsYW5IaXN0b3J5Iiwic2V0TGVzc29uUGxhbkhpc3RvcnkiLCJ3ZWJQYWdlU3RhdHVzIiwic2V0V2ViUGFnZVN0YXR1cyIsIndlYlBhZ2VFcnJvciIsInNldFdlYlBhZ2VFcnJvciIsIndlYlBhZ2VUb3BpY3MiLCJzZXRXZWJQYWdlVG9waWNzIiwid2ViUGFnZUhpc3RvcnkiLCJzZXRXZWJQYWdlSGlzdG9yeSIsImNvbmNlcHRNYXBTdGF0dXMiLCJzZXRDb25jZXB0TWFwU3RhdHVzIiwiY29uY2VwdE1hcEVycm9yIiwic2V0Q29uY2VwdE1hcEVycm9yIiwiY29uY2VwdE1hcFRvcGljcyIsInNldENvbmNlcHRNYXBUb3BpY3MiLCJjb25jZXB0TWFwSGlzdG9yeSIsInNldENvbmNlcHRNYXBIaXN0b3J5IiwibWNxU3RhdHVzIiwic2V0TWNxU3RhdHVzIiwibWNxRXJyb3IiLCJzZXRNY3FFcnJvciIsIm1jcVRvcGljcyIsInNldE1jcVRvcGljcyIsIm1jcUhpc3RvcnkiLCJzZXRNY3FIaXN0b3J5IiwiZ3JhZGVDb250cm9scyIsImlzQWN0aXZlIiwic2V0QWN0aXZlIiwiZ2V0U3ViamVjdEtleSIsImdyYWRlSWQiLCJzdWJqZWN0IiwiZ2V0QWN0aW9uS2V5IiwiYWN0aW9uIiwiZmV0Y2hQZGZDb250ZW50IiwiY2FjaGVLZXkiLCJwZGZBY3Rpb25zIiwiaGFzIiwiZ3JhZGVQYXJhbSIsInBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImdyYWRlIiwiU3RyaW5nIiwicmVzcG9uc2UiLCJmZXRjaCIsInRvU3RyaW5nIiwiY2FjaGUiLCJvayIsIkVycm9yIiwicGF5bG9hZCIsImpzb24iLCJiYXNlNjQiLCJtZXNzYWdlIiwidG9nZ2xlU3ViamVjdFNlbGVjdGlvbiIsImdyYWRlQ29uZmlnIiwic3ViamVjdEtleSIsImdyYWRlU3ViamVjdHMiLCJpc1NlbGVjdGVkIiwibmV4dFNlbGVjdGVkIiwiT2JqZWN0Iiwia2V5cyIsInByZXZBY3Rpb25zIiwiZ3JhZGVBY3Rpb25zIiwiaW5pdGlhbEFjdGlvbnNTdGF0ZSIsImFjYyIsIm5leHRBY3Rpb25zIiwiYWN0aW9uUHJlZml4IiwicHJldkNhY2hlIiwidXBkYXRlZENhY2hlIiwiZm9yRWFjaCIsImtleSIsInN0YXJ0c1dpdGgiLCJwcmV2TG9hZGluZyIsInVwZGF0ZWRMb2FkaW5nIiwicHJldkVycm9yIiwidXBkYXRlZEVycm9yIiwicHJldlN0YXR1cyIsInVwZGF0ZWQiLCJwcmV2UHJlc2VudGF0aW9uRXJyb3IiLCJwcmV2VG9waWNzIiwicHJldkhpc3RvcnkiLCJwcmV2SGFuZG91dFN0YXR1cyIsInByZXZIYW5kb3V0RXJyb3IiLCJwcmV2SGFuZG91dFRvcGljcyIsInByZXZIYW5kb3V0SGlzdG9yeSIsInByZXZMZXNzb25QbGFuU3RhdHVzIiwicHJldkxlc3NvblBsYW5FcnJvciIsInByZXZMZXNzb25QbGFuVG9waWNzIiwicHJldkxlc3NvblBsYW5IaXN0b3J5IiwicHJldldlYlBhZ2VTdGF0dXMiLCJwcmV2V2ViUGFnZUVycm9yIiwicHJldldlYlBhZ2VUb3BpY3MiLCJwcmV2V2ViUGFnZUhpc3RvcnkiLCJwcmV2Q29uY2VwdE1hcFN0YXR1cyIsInByZXZDb25jZXB0TWFwRXJyb3IiLCJwcmV2Q29uY2VwdE1hcFRvcGljcyIsInByZXZDb25jZXB0TWFwSGlzdG9yeSIsInByZXZNY3FTdGF0dXMiLCJwcmV2TWNxRXJyb3IiLCJwcmV2TWNxVG9waWNzIiwicHJldk1jcUhpc3RvcnkiLCJ0cmlnZ2VyUHJlc2VudGF0aW9uRG93bmxvYWQiLCJ0b3BpYyIsImVuY29kZVVSSUNvbXBvbmVudCIsIm1ldGhvZCIsImJ5dGVDaGFyYWN0ZXJzIiwiYnl0ZU51bWJlcnMiLCJBcnJheSIsImJ5dGVBcnJheSIsImJsb2IiLCJCbG9iIiwiZG93bmxvYWRVcmwiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJsaW5rIiwiaHJlZiIsImRvd25sb2FkIiwicmVwbGFjZSIsInRvTG93ZXJDYXNlIiwiYm9keSIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJyZXZva2VPYmplY3RVUkwiLCJmaWx0ZXIiLCJpdGVtIiwic2xpY2UiLCJ0cmlnZ2VySGFuZG91dERvd25sb2FkIiwidHJpZ2dlckxlc3NvblBsYW5Eb3dubG9hZCIsInRyaWdnZXJXZWJQYWdlRG93bmxvYWQiLCJ0cmlnZ2VyQ29uY2VwdE1hcERvd25sb2FkIiwidHJpZ2dlck1jcURvd25sb2FkIiwiaW5kZXgiLCJ0b2dnbGVTdWJqZWN0QWN0aW9uIiwic3ViamVjdFN0YXRlIiwiaGFzUGRmIiwic3ViamVjdFNsdWciLCJhY3Rpb25LZXkiLCJmaWxlTmFtZSIsIm5vcm1hbGl6ZWRQYXRoIiwidXBkYXRlZFN1YmplY3RTdGF0ZSIsInZhbHVlcyIsImV2ZXJ5IiwidmFsdWUiLCJuZXh0U3RhdGUiLCJ3aW5kb3ciLCJvcGVuIiwibmV4dFZhbHVlIiwidHJpbSIsIl9yZW1vdmVkIiwicmVzdCIsImJhY2tncm91bmRDb2xvciIsImZvbnRGYW1pbHkiLCJwdXNoIiwiYWxpZ25TZWxmIiwibWFyZ2luQm90dG9tIiwibGV0dGVyU3BhY2luZyIsImgyIiwibWF4V2lkdGgiLCJjb250cm9sIiwic2VsZWN0ZWRHcmFkZVN1YmplY3RzIiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsImFjdGlvblN0YXRlIiwicGFkZGluZ1JpZ2h0IiwiaXNBY3Rpb25TZWxlY3RlZCIsInBkZlNldCIsImlzU3lsbGFidXMiLCJpc1JlYWRpbmdNYXRlcmlhbHMiLCJzaG93SW5saW5lUGRmIiwicHJlc2VudGF0aW9uU3RhdGUiLCJwcmVzZW50YXRpb25FcnJvck1lc3NhZ2UiLCJ0b3BpY1ZhbHVlIiwicmVjZW50VG9waWNzIiwiaGFuZG91dFN0YXRlIiwiaGFuZG91dEVycm9yTWVzc2FnZSIsImhhbmRvdXRWYWx1ZSIsImhhbmRvdXRSZWNlbnQiLCJsZXNzb25QbGFuU3RhdGUiLCJsZXNzb25QbGFuRXJyb3JNZXNzYWdlIiwibGVzc29uUGxhblZhbHVlIiwibGVzc29uUGxhblJlY2VudCIsIndlYlBhZ2VTdGF0ZSIsIndlYlBhZ2VFcnJvck1lc3NhZ2UiLCJ3ZWJQYWdlVmFsdWUiLCJ3ZWJQYWdlUmVjZW50IiwiY29uY2VwdE1hcFN0YXRlIiwiY29uY2VwdE1hcEVycm9yTWVzc2FnZSIsImNvbmNlcHRNYXBWYWx1ZSIsImNvbmNlcHRNYXBSZWNlbnQiLCJtY3FTdGF0ZSIsIm1jcUVycm9yTWVzc2FnZSIsIm1jcVZhbHVlIiwibWNxUmVjZW50IiwiZXZlbnQiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsImZsZXgiLCJkaXNhYmxlZCIsImZsZXhXcmFwIiwicmVjZW50VG9waWMiXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=webpack-internal:///./pages/index.jsx

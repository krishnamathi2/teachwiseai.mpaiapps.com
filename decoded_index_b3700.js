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
    },
    {
        id: "grade7",
        label: "Grade 7",
        number: 7,
        subjects: [
            "Maths",
            "Physics",
            "Chemistry",
            "Biology"
        ]
    },
    {
        id: "grade6",
        label: "Grade 6",
        number: 6,
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
const GRADE_CONFIG_BY_ID = GRADE_CONFIGS.reduce(_c2 = (accumulator, config)=>{
    accumulator[config.id] = config;
    return accumulator;
}, {});
_c3 = GRADE_CONFIG_BY_ID;
const GRADE_GROUPS = [
    {
        id: "higherSecondary",
        title: "Higher Secondary",
        subtitle: "Grade 12 and Grade 11",
        gradeIds: [
            "grade12",
            "grade11"
        ]
    },
    {
        id: "secondary",
        title: "Secondary",
        subtitle: "Grades 10 to 6",
        gradeIds: [
            "grade10",
            "grade9",
            "grade8",
            "grade7",
            "grade6"
        ]
    }
];
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
    grade8: {},
    grade7: {},
    grade6: {}
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
            lineNumber: 165,
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
            lineNumber: 183,
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
        lineNumber: 205,
        columnNumber: 5
    }, this);
}
_s(PdfContentViewer, "8puyVO4ts1RhCfXUmci3vLI3Njw=");
_c4 = PdfContentViewer;
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
const INDIA_COLLEGE_OPTIONS = [
    {
        id: "engineering",
        label: "Engineering"
    },
    {
        id: "medical",
        label: "Medical"
    }
];
function Home() {
    _s1();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [activeCountries, setActiveCountries] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [indiaSchoolSelections, setIndiaSchoolSelections] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [indiaCollegeSelections, setIndiaCollegeSelections] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});
    const [isDarkMode, setIsDarkMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        router.prefetch("/cbse");
    }, [
        router
    ]);
    const toggleCountry = (countryId)=>{
        setActiveCountries((prev)=>({
                ...prev,
                [countryId]: !prev[countryId]
            }));
        if (countryId === "india" && activeCountries[countryId]) {
            setIndiaSchoolSelections({});
            setIndiaCollegeSelections({});
        }
    };
    const toggleIndiaSchoolOption = (optionId)=>{
        setIndiaSchoolSelections((prev)=>{
            const nextValue = !prev[optionId];
            const updated = {
                ...prev,
                [optionId]: nextValue
            };
            if (!nextValue) {
                delete updated[optionId];
            }
            if (optionId === "cbse" && nextValue) {
                router.push("/cbse");
            }
            return updated;
        });
    };
    const toggleIndiaCollegeOption = (optionId)=>{
        setIndiaCollegeSelections((prev)=>({
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
                            lineNumber: 344,
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
                                lineNumber: 356,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                            lineNumber: 345,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                    lineNumber: 324,
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
                    lineNumber: 370,
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
                            lineNumber: 381,
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
                                                    lineNumber: 402,
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
                                                    lineNumber: 408,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                            lineNumber: 401,
                                            columnNumber: 17
                                        }, this),
                                        country.id === "india" && activeCountries.india ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                            style: {
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "10px",
                                                paddingLeft: "26px"
                                            },
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                    style: {
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "6px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                            style: {
                                                                fontWeight: 500,
                                                                color: theme.text
                                                            },
                                                            children: "Schools"
                                                        }, void 0, false, {
                                                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                            lineNumber: 421,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                            style: {
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                gap: "6px",
                                                                paddingLeft: "20px"
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
                                                                            lineNumber: 435,
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
                                                                            lineNumber: 441,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, schoolOption.id, true, {
                                                                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                    lineNumber: 431,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                            lineNumber: 422,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                    lineNumber: 420,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                    style: {
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "6px"
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                            style: {
                                                                fontWeight: 500,
                                                                color: theme.text
                                                            },
                                                            children: "Colleges"
                                                        }, void 0, false, {
                                                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                            lineNumber: 450,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("div", {
                                                            style: {
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                gap: "6px",
                                                                paddingLeft: "20px"
                                                            },
                                                            children: INDIA_COLLEGE_OPTIONS.map((collegeOption)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("label", {
                                                                    style: {
                                                                        display: "flex",
                                                                        alignItems: "center",
                                                                        gap: "8px"
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("input", {
                                                                            type: "checkbox",
                                                                            checked: Boolean(indiaCollegeSelections[collegeOption.id]),
                                                                            onChange: ()=>toggleIndiaCollegeOption(collegeOption.id),
                                                                            style: {
                                                                                accentColor: theme.accent,
                                                                                transform: "scale(1.02)"
                                                                            }
                                                                        }, void 0, false, {
                                                                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                            lineNumber: 464,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)("span", {
                                                                            style: {
                                                                                fontWeight: 500,
                                                                                color: theme.text
                                                                            },
                                                                            children: collegeOption.label
                                                                        }, void 0, false, {
                                                                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                            lineNumber: 470,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, collegeOption.id, true, {
                                                                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                    lineNumber: 460,
                                                                    columnNumber: 27
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                            lineNumber: 451,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                    lineNumber: 449,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                            lineNumber: 412,
                                            columnNumber: 19
                                        }, this) : null
                                    ]
                                }, country.id, true, {
                                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                    lineNumber: 400,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                            lineNumber: 391,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                    lineNumber: 380,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
            lineNumber: 310,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
        lineNumber: 300,
        columnNumber: 5
    }, this);
}
_s1(Home, "1JcFtRHjPVLpTCxRZqk7ueXlMes=", false, function() {
    return [
        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter
    ];
});
_c5 = Home;
function CbseDashboard() {
    _s2();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [grade12, setGrade12] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [grade11, setGrade11] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [grade10, setGrade10] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [grade9, setGrade9] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [grade8, setGrade8] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [grade7, setGrade7] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [grade6, setGrade6] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
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
        },
        grade7: {
            isActive: grade7,
            setActive: setGrade7
        },
        grade6: {
            isActive: grade6,
            setActive: setGrade6
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
                        lineNumber: 1494,
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
                            lineNumber: 1507,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                        lineNumber: 1495,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                lineNumber: 1472,
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
                lineNumber: 1522,
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
                lineNumber: 1543,
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
                lineNumber: 1555,
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
                                        lineNumber: 1601,
                                        columnNumber: 17
                                    }, this),
                                    gradeConfig.label
                                ]
                            }, void 0, true, {
                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                lineNumber: 1600,
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
                                                        lineNumber: 1657,
                                                        columnNumber: 27
                                                    }, this),
                                                    subject
                                                ]
                                            }, void 0, true, {
                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                lineNumber: 1632,
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
                                                                        lineNumber: 1728,
                                                                        columnNumber: 37
                                                                    }, this),
                                                                    action
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 1719,
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
                                                                lineNumber: 1740,
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
                                                                                lineNumber: 1765,
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
                                                                                lineNumber: 1792,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1758,
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
                                                                        lineNumber: 1818,
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
                                                                        lineNumber: 1828,
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
                                                                        lineNumber: 1838,
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
                                                                        lineNumber: 1848,
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
                                                                                lineNumber: 1867,
                                                                                columnNumber: 45
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1858,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 1750,
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
                                                                                lineNumber: 1919,
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
                                                                                lineNumber: 1946,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 1912,
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
                                                                        lineNumber: 1972,
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
                                                                        lineNumber: 1982,
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
                                                                        lineNumber: 1992,
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
                                                                        lineNumber: 2002,
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
                                                                                lineNumber: 2021,
                                                                                columnNumber: 45
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2012,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 1904,
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
                                                                                lineNumber: 2073,
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
                                                                                lineNumber: 2100,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2066,
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
                                                                        lineNumber: 2126,
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
                                                                        lineNumber: 2136,
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
                                                                        lineNumber: 2146,
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
                                                                        lineNumber: 2156,
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
                                                                                lineNumber: 2175,
                                                                                columnNumber: 45
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2166,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 2058,
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
                                                                                lineNumber: 2227,
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
                                                                                lineNumber: 2254,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2220,
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
                                                                        lineNumber: 2278,
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
                                                                        lineNumber: 2288,
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
                                                                        lineNumber: 2298,
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
                                                                        lineNumber: 2308,
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
                                                                                lineNumber: 2327,
                                                                                columnNumber: 45
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2318,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 2212,
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
                                                                                lineNumber: 2379,
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
                                                                                lineNumber: 2406,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2372,
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
                                                                        lineNumber: 2432,
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
                                                                        lineNumber: 2442,
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
                                                                        lineNumber: 2452,
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
                                                                        lineNumber: 2462,
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
                                                                                lineNumber: 2481,
                                                                                columnNumber: 45
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2472,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 2364,
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
                                                                                lineNumber: 2533,
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
                                                                                lineNumber: 2560,
                                                                                columnNumber: 41
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2526,
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
                                                                        lineNumber: 2584,
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
                                                                        lineNumber: 2594,
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
                                                                        lineNumber: 2604,
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
                                                                        lineNumber: 2614,
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
                                                                                lineNumber: 2633,
                                                                                columnNumber: 45
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                        lineNumber: 2624,
                                                                        columnNumber: 41
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                                lineNumber: 2518,
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
                                                                lineNumber: 2677,
                                                                columnNumber: 37
                                                            }, this)
                                                        ]
                                                    }, action, true, {
                                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                        lineNumber: 1711,
                                                        columnNumber: 33
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                                lineNumber: 1667,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, "".concat(gradeConfig.id, "-").concat(subject), true, {
                                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                        lineNumber: 1628,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                                lineNumber: 1611,
                                columnNumber: 17
                            }, this)
                        ]
                    }, gradeConfig.id, true, {
                        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                        lineNumber: 1596,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
                lineNumber: 1567,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "C:\\Users\\Krishnapriya\\OneDrive\\Desktop\\teachwiseai\\pages\\index.jsx",
        lineNumber: 1455,
        columnNumber: 5
    }, this);
}
_s2(CbseDashboard, "r7rZpksEdoYSj4PjAWpT2CAKMN8=", false, function() {
    return [
        next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter
    ];
});
_c6 = CbseDashboard;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
$RefreshReg$(_c, "GRADE_NUMBER_MAP$GRADE_CONFIGS.reduce");
$RefreshReg$(_c1, "GRADE_NUMBER_MAP");
$RefreshReg$(_c2, "GRADE_CONFIG_BY_ID$GRADE_CONFIGS.reduce");
$RefreshReg$(_c3, "GRADE_CONFIG_BY_ID");
$RefreshReg$(_c4, "PdfContentViewer");
$RefreshReg$(_c5, "Home");
$RefreshReg$(_c6, "CbseDashboard");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qc3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBb0Q7QUFDWjtBQUNVO0FBRWxELE1BQU1LLGdCQUFnQjtJQUNwQjtRQUNFQyxJQUFJO1FBQ0pDLE9BQU87UUFDUEMsUUFBUTtRQUNSQyxVQUFVO1lBQUM7WUFBUztZQUFXO1lBQWE7U0FBVTtJQUN4RDtJQUNBO1FBQ0VILElBQUk7UUFDSkMsT0FBTztRQUNQQyxRQUFRO1FBQ1JDLFVBQVU7WUFBQztZQUFTO1lBQVc7WUFBYTtTQUFVO0lBQ3hEO0lBQ0E7UUFDRUgsSUFBSTtRQUNKQyxPQUFPO1FBQ1BDLFFBQVE7UUFDUkMsVUFBVTtZQUFDO1lBQVM7WUFBVztZQUFhO1NBQVU7SUFDeEQ7SUFDQTtRQUNFSCxJQUFJO1FBQ0pDLE9BQU87UUFDUEMsUUFBUTtRQUNSQyxVQUFVO1lBQUM7WUFBUztZQUFXO1lBQWE7U0FBVTtJQUN4RDtJQUNBO1FBQ0VILElBQUk7UUFDSkMsT0FBTztRQUNQQyxRQUFRO1FBQ1JDLFVBQVU7WUFBQztZQUFTO1lBQVc7WUFBYTtTQUFVO0lBQ3hEO0lBQ0E7UUFDRUgsSUFBSTtRQUNKQyxPQUFPO1FBQ1BDLFFBQVE7UUFDUkMsVUFBVTtZQUFDO1lBQVM7WUFBVztZQUFhO1NBQVU7SUFDeEQ7SUFDQTtRQUNFSCxJQUFJO1FBQ0pDLE9BQU87UUFDUEMsUUFBUTtRQUNSQyxVQUFVO1lBQUM7WUFBUztZQUFXO1lBQWE7U0FBVTtJQUN4RDtDQUNEO0FBQ0QsTUFBTUMsbUJBQW1CTCxjQUFjTSxNQUFNLE1BQUMsQ0FBQ0MsYUFBYUM7SUFDMURELFdBQVcsQ0FBQ0MsT0FBT1AsRUFBRSxDQUFDLEdBQUdPLE9BQU9MLE1BQU07SUFDdEMsT0FBT0k7QUFDVCxHQUFHLENBQUM7O0FBQ0osTUFBTUUscUJBQXFCVCxjQUFjTSxNQUFNLE9BQUMsQ0FBQ0MsYUFBYUM7SUFDNURELFdBQVcsQ0FBQ0MsT0FBT1AsRUFBRSxDQUFDLEdBQUdPO0lBQ3pCLE9BQU9EO0FBQ1QsR0FBRyxDQUFDOztBQUNKLE1BQU1HLGVBQWU7SUFDbkI7UUFDRVQsSUFBSTtRQUNKVSxPQUFPO1FBQ1BDLFVBQVU7UUFDVkMsVUFBVTtZQUFDO1lBQVc7U0FBVTtJQUNsQztJQUNBO1FBQ0VaLElBQUk7UUFDSlUsT0FBTztRQUNQQyxVQUFVO1FBQ1ZDLFVBQVU7WUFBQztZQUFXO1lBQVU7WUFBVTtZQUFVO1NBQVM7SUFDL0Q7Q0FDRDtBQUNELE1BQU1DLGtCQUFrQjtJQUN0QjtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0NBQ0Q7QUFDRCxNQUFNQyxzQkFBc0I7SUFDMUJDLFNBQVM7UUFDUEMsT0FBTyxJQUFJQyxJQUFJO1lBQUM7WUFBWTtTQUFvQjtJQUNsRDtJQUNBQyxTQUFTLENBQUM7SUFDVkMsU0FBUyxDQUFDO0lBQ1ZDLFFBQVEsQ0FBQztJQUNUQyxRQUFRLENBQUM7SUFDVEMsUUFBUSxDQUFDO0lBQ1RDLFFBQVEsQ0FBQztBQUNYO0FBRUEsaUVBQWlFO0FBQ2pFLFNBQVNDLGlCQUFpQixLQUE4QztRQUE5QyxFQUFFQyxVQUFVLEVBQUVDLFNBQVMsRUFBRUMsS0FBSyxFQUFFQyxLQUFLLEVBQUUzQixLQUFLLEVBQUUsR0FBOUM7O0lBQ3hCLE1BQU00QixlQUFlbEMsNkNBQU1BLENBQUM7SUFFNUJELGdEQUFTQSxDQUFDO1FBQ1IsSUFBSW9DLFdBQVc7UUFFZixNQUFNQyxZQUFZO1lBQ2hCLElBQUksQ0FBQ04sY0FBYyxDQUFDSSxhQUFhRyxPQUFPLEVBQUU7Z0JBQ3hDLElBQUlILGFBQWFHLE9BQU8sRUFBRTtvQkFDeEJILGFBQWFHLE9BQU8sQ0FBQ0MsU0FBUyxHQUFHO2dCQUNuQztnQkFDQTtZQUNGO1lBRUEsTUFBTSxDQUFDLEVBQUVDLFdBQVcsRUFBRUMsbUJBQW1CLEVBQUUsRUFBRUMsYUFBYSxHQUFHLE1BQU1DLFFBQVFDLEdBQUcsQ0FBQztnQkFDN0UsNk1BQThCO2dCQUM5QixvUEFBMkM7YUFDNUM7WUFFRCxJQUFJUixVQUFVO2dCQUVJTTtZQUFsQixNQUFNRyxZQUFZSCxDQUFBQSx3QkFBQUEseUJBQUFBLG1DQUFBQSxhQUFjSSxPQUFPLGNBQXJCSixtQ0FBQUEsd0JBQXlCQTtZQUMzQ0Qsb0JBQW9CSSxTQUFTLEdBQUdBO1lBRWhDLE1BQU1FLGVBQWVDLEtBQUtqQjtZQUMxQixNQUFNa0IsTUFBTUYsYUFBYUcsTUFBTTtZQUMvQixNQUFNQyxRQUFRLElBQUlDLFdBQVdIO1lBQzdCLElBQUssSUFBSUksSUFBSSxHQUFHQSxJQUFJSixLQUFLSSxLQUFLLEVBQUc7Z0JBQy9CRixLQUFLLENBQUNFLEVBQUUsR0FBR04sYUFBYU8sVUFBVSxDQUFDRDtZQUNyQztZQUVBLE1BQU1FLFNBQVMsTUFBTWYsWUFBWTtnQkFBRWdCLE1BQU1MO1lBQU0sR0FBR00sT0FBTztZQUN6RCxJQUFJckIsWUFBWSxDQUFDRCxhQUFhRyxPQUFPLEVBQUU7WUFFdkMsTUFBTW9CLFlBQVl2QixhQUFhRyxPQUFPO1lBQ3RDb0IsVUFBVW5CLFNBQVMsR0FBRztZQUV0QixJQUFLLElBQUlvQixhQUFhLEdBQUdBLGNBQWNKLE9BQU9LLFFBQVEsRUFBRUQsY0FBYyxFQUFHO2dCQUN2RSxNQUFNRSxPQUFPLE1BQU1OLE9BQU9PLE9BQU8sQ0FBQ0g7Z0JBQ2xDLElBQUl2QixZQUFZLENBQUNELGFBQWFHLE9BQU8sRUFBRTtnQkFFdkMsTUFBTXlCLFdBQVdGLEtBQUtHLFdBQVcsQ0FBQztvQkFBRUMsT0FBTztnQkFBSTtnQkFDL0MsTUFBTUMsU0FBU0MsU0FBU0MsYUFBYSxDQUFDO2dCQUN0Q0YsT0FBT0csS0FBSyxDQUFDQyxTQUFTLEdBQUdwQyxNQUFNcUMsTUFBTSxHQUNqQyxzQ0FDQTtnQkFDSkwsT0FBT0csS0FBSyxDQUFDRyxZQUFZLEdBQUc7Z0JBQzVCTixPQUFPRyxLQUFLLENBQUNJLEtBQUssR0FBRztnQkFDckJQLE9BQU9HLEtBQUssQ0FBQ0ssTUFBTSxHQUFHO2dCQUV0QixNQUFNQyxVQUFVVCxPQUFPVSxVQUFVLENBQUM7Z0JBQ2xDVixPQUFPUSxNQUFNLEdBQUdYLFNBQVNXLE1BQU07Z0JBQy9CUixPQUFPTyxLQUFLLEdBQUdWLFNBQVNVLEtBQUs7Z0JBRTdCZixVQUFVbUIsV0FBVyxDQUFDWDtnQkFDdEIsTUFBTUwsS0FBS2lCLE1BQU0sQ0FBQztvQkFBRUMsZUFBZUo7b0JBQVNaO2dCQUFTLEdBQUdOLE9BQU87WUFDakU7UUFDRjtRQUVBcEI7UUFFQSxPQUFPO1lBQ0xELFdBQVc7WUFDWCxJQUFJRCxhQUFhRyxPQUFPLEVBQUU7Z0JBQ3hCSCxhQUFhRyxPQUFPLENBQUNDLFNBQVMsR0FBRztZQUNuQztRQUNGO0lBQ0YsR0FBRztRQUFDUjtRQUFZRyxNQUFNcUMsTUFBTTtLQUFDO0lBRTdCLElBQUl2QyxXQUFXO1FBQ2IscUJBQ0UsOERBQUNnRDtZQUNDWCxPQUFPO2dCQUNMWSxXQUFXO2dCQUNYQyxTQUFTO2dCQUNUVixjQUFjO2dCQUNkVyxRQUFRO2dCQUNSQyxhQUFhbEQsTUFBTW1ELFdBQVc7Z0JBQzlCQyxPQUFPcEQsTUFBTXFELElBQUk7Z0JBQ2pCQyxVQUFVO1lBQ1o7c0JBRUMsV0FBaUIsT0FBTmpGLE9BQU07Ozs7OztJQUd4QjtJQUVBLElBQUkwQixPQUFPO1FBQ1QscUJBQ0UsOERBQUMrQztZQUNDWCxPQUFPO2dCQUNMWSxXQUFXO2dCQUNYQyxTQUFTO2dCQUNUVixjQUFjO2dCQUNkVyxRQUFRO2dCQUNSQyxhQUFhO2dCQUNiRSxPQUFPcEQsTUFBTXFELElBQUk7Z0JBQ2pCQyxVQUFVO2dCQUNWQyxZQUFZdkQsTUFBTXFDLE1BQU0sR0FBRyw4QkFBOEI7WUFDM0Q7c0JBRUMsa0JBQXdCLE9BQU5oRSxPQUFNOzs7Ozs7SUFHL0I7SUFFQSxJQUFJLENBQUN3QixZQUFZO1FBQ2YsT0FBTztJQUNUO0lBRUEscUJBQ0UsOERBQUNpRDtRQUNDVSxLQUFLdkQ7UUFDTGtDLE9BQU87WUFDTHNCLFNBQVM7WUFDVEMsS0FBSztZQUNMWCxXQUFXO1lBQ1hZLFdBQVc7WUFDWEMsZUFBZTtRQUNqQjs7Ozs7O0FBR047R0ExSFNoRTtNQUFBQTtBQTRIVCxNQUFNaUUsa0JBQWtCO0lBQ3RCO1FBQUV6RixJQUFJO1FBQVNDLE9BQU87SUFBUTtJQUM5QjtRQUFFRCxJQUFJO1FBQU9DLE9BQU87SUFBTTtDQUMzQjtBQUNELE1BQU15Rix1QkFBdUI7SUFDM0I7UUFBRTFGLElBQUk7UUFBUUMsT0FBTztJQUFPO0lBQzVCO1FBQUVELElBQUk7UUFBZUMsT0FBTztJQUFlO0NBQzVDO0FBQ0QsTUFBTTBGLHdCQUF3QjtJQUM1QjtRQUFFM0YsSUFBSTtRQUFlQyxPQUFPO0lBQWM7SUFDMUM7UUFBRUQsSUFBSTtRQUFXQyxPQUFPO0lBQVU7Q0FDbkM7QUFFYyxTQUFTMkY7O0lBQ3RCLE1BQU1DLFNBQVNoRyxzREFBU0E7SUFDeEIsTUFBTSxDQUFDaUcsaUJBQWlCQyxtQkFBbUIsR0FBR25HLCtDQUFRQSxDQUFDLENBQUM7SUFDeEQsTUFBTSxDQUFDb0csdUJBQXVCQyx5QkFBeUIsR0FBR3JHLCtDQUFRQSxDQUFDLENBQUM7SUFDcEUsTUFBTSxDQUFDc0csd0JBQXdCQywwQkFBMEIsR0FBR3ZHLCtDQUFRQSxDQUFDLENBQUM7SUFDdEUsTUFBTSxDQUFDd0csWUFBWUMsY0FBYyxHQUFHekcsK0NBQVFBLENBQUM7SUFFN0NGLGdEQUFTQSxDQUFDO1FBQ1JtRyxPQUFPUyxRQUFRLENBQUM7SUFDbEIsR0FBRztRQUFDVDtLQUFPO0lBRVgsTUFBTVUsZ0JBQWdCLENBQUNDO1FBQ3JCVCxtQkFBbUIsQ0FBQ1UsT0FBVTtnQkFDNUIsR0FBR0EsSUFBSTtnQkFDUCxDQUFDRCxVQUFVLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDRCxVQUFVO1lBQy9CO1FBRUEsSUFBSUEsY0FBYyxXQUFXVixlQUFlLENBQUNVLFVBQVUsRUFBRTtZQUN2RFAseUJBQXlCLENBQUM7WUFDMUJFLDBCQUEwQixDQUFDO1FBQzdCO0lBQ0Y7SUFFQSxNQUFNTywwQkFBMEIsQ0FBQ0M7UUFDL0JWLHlCQUF5QixDQUFDUTtZQUN4QixNQUFNRyxZQUFZLENBQUNILElBQUksQ0FBQ0UsU0FBUztZQUNqQyxNQUFNRSxVQUFVO2dCQUNkLEdBQUdKLElBQUk7Z0JBQ1AsQ0FBQ0UsU0FBUyxFQUFFQztZQUNkO1lBRUEsSUFBSSxDQUFDQSxXQUFXO2dCQUNkLE9BQU9DLE9BQU8sQ0FBQ0YsU0FBUztZQUMxQjtZQUVBLElBQUlBLGFBQWEsVUFBVUMsV0FBVztnQkFDcENmLE9BQU9pQixJQUFJLENBQUM7WUFDZDtZQUVBLE9BQU9EO1FBQ1Q7SUFDRjtJQUVBLE1BQU1FLDJCQUEyQixDQUFDSjtRQUNoQ1IsMEJBQTBCLENBQUNNLE9BQVU7Z0JBQ25DLEdBQUdBLElBQUk7Z0JBQ1AsQ0FBQ0UsU0FBUyxFQUFFLENBQUNGLElBQUksQ0FBQ0UsU0FBUztZQUM3QjtJQUNGO0lBRUEsTUFBTS9FLFFBQVF3RSxhQUNWO1FBQ0VZLGVBQWU7UUFDZkMsT0FBTztRQUNQaEMsTUFBTTtRQUNOaUMsUUFBUTtRQUNSckMsUUFBUTtRQUNSc0MsZUFBZTtJQUNqQixJQUNBO1FBQ0VILGVBQWU7UUFDZkMsT0FBTztRQUNQaEMsTUFBTTtRQUNOaUMsUUFBUTtRQUNSckMsUUFBUTtRQUNSc0MsZUFBZTtJQUNqQjtJQUVKLHFCQUNFLDhEQUFDQztRQUNDckQsT0FBTztZQUNMc0QsV0FBVztZQUNYaEMsU0FBUztZQUNUaUMsWUFBWTtZQUNaQyxnQkFBZ0I7WUFDaEJwQyxZQUFZdkQsTUFBTW9GLGFBQWE7WUFDL0JwQyxTQUFTO1FBQ1g7a0JBRUEsNEVBQUNGO1lBQ0NYLE9BQU87Z0JBQ0xJLE9BQU87Z0JBQ1BrQixTQUFTO2dCQUNUbUMsZUFBZTtnQkFDZmxDLEtBQUs7Z0JBQ0xILFlBQVl2RCxNQUFNcUYsS0FBSztnQkFDdkJqQyxPQUFPcEQsTUFBTXFELElBQUk7Z0JBQ2pCZixjQUFjO2dCQUNkVSxTQUFTO2dCQUNUWixXQUFXO2dCQUNYeUQsVUFBVTtZQUNaOzs4QkFFQSw4REFBQ0M7b0JBQ0NDLE1BQUs7b0JBQ0xDLFNBQVMsSUFBTXZCLGNBQWMsQ0FBQ3dCLFdBQWEsQ0FBQ0E7b0JBQzVDQyxjQUFZLGFBQTJDLE9BQTlCMUIsYUFBYSxVQUFVLFFBQU87b0JBQ3ZEckMsT0FBTzt3QkFDTDBELFVBQVU7d0JBQ1ZNLEtBQUs7d0JBQ0xDLE9BQU87d0JBQ1AzQyxTQUFTO3dCQUNUaUMsWUFBWTt3QkFDWmhDLEtBQUs7d0JBQ0xWLFNBQVM7d0JBQ1RWLGNBQWM7d0JBQ2RXLFFBQVEsYUFBMEIsT0FBYmpELE1BQU1pRCxNQUFNO3dCQUNqQ00sWUFBWWlCLGFBQWEsNEJBQTRCO3dCQUNyRHBCLE9BQU9wRCxNQUFNcUQsSUFBSTt3QkFDakJnRCxZQUFZO3dCQUNaQyxRQUFRO29CQUNWOztzQ0FFQSw4REFBQ0M7c0NBQU0vQixhQUFhLFNBQVM7Ozs7OztzQ0FDN0IsOERBQUMrQjs0QkFDQ3BFLE9BQU87Z0NBQ0xzQixTQUFTO2dDQUNUbEIsT0FBTztnQ0FDUEMsUUFBUTtnQ0FDUkYsY0FBYztnQ0FDZGlCLFlBQVlpQixhQUFheEUsTUFBTXNGLE1BQU0sR0FBRztnQ0FDeENPLFVBQVU7Z0NBQ1Y1QyxRQUFRLGFBQTBCLE9BQWJqRCxNQUFNaUQsTUFBTTs0QkFDbkM7c0NBRUEsNEVBQUNzRDtnQ0FDQ3BFLE9BQU87b0NBQ0wwRCxVQUFVO29DQUNWTSxLQUFLO29DQUNMSyxNQUFNaEMsYUFBYSxTQUFTO29DQUM1QmpDLE9BQU87b0NBQ1BDLFFBQVE7b0NBQ1JGLGNBQWM7b0NBQ2RpQixZQUFZaUIsYUFBYSxZQUFZO29DQUNyQ2lDLFlBQVk7Z0NBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQUlOLDhEQUFDQztvQkFDQ3ZFLE9BQU87d0JBQ0x3RSxRQUFRO3dCQUNSQyxXQUFXO3dCQUNYeEQsT0FBT3BELE1BQU1xRCxJQUFJO3dCQUNqQkMsVUFBVTtvQkFDWjs4QkFDRDs7Ozs7OzhCQUdELDhEQUFDUjtvQkFBSVgsT0FBTzt3QkFBRXNCLFNBQVM7d0JBQVFtQyxlQUFlO3dCQUFVbEMsS0FBSztvQkFBTzs7c0NBQ2xFLDhEQUFDNkM7NEJBQ0NwRSxPQUFPO2dDQUNMbUIsVUFBVTtnQ0FDVitDLFlBQVk7Z0NBQ1pqRCxPQUFPcEQsTUFBTXFELElBQUk7NEJBQ25CO3NDQUNEOzs7Ozs7c0NBSUQsOERBQUNQOzRCQUNDWCxPQUFPO2dDQUNMc0IsU0FBUztnQ0FDVG1DLGVBQWU7Z0NBQ2ZsQyxLQUFLO2dDQUNMbUQsYUFBYTs0QkFDZjtzQ0FFQ2hELGdCQUFnQmlELEdBQUcsQ0FBQyxDQUFDQyx3QkFDcEIsOERBQUNqRTtvQ0FBcUJYLE9BQU87d0NBQUVzQixTQUFTO3dDQUFRbUMsZUFBZTt3Q0FBVWxDLEtBQUs7b0NBQU07O3NEQUNsRiw4REFBQ3JGOzRDQUFNOEQsT0FBTztnREFBRXNCLFNBQVM7Z0RBQVFpQyxZQUFZO2dEQUFVaEMsS0FBSzs0Q0FBTTs7OERBQ2hFLDhEQUFDc0Q7b0RBQ0NqQixNQUFLO29EQUNMa0IsU0FBU0MsUUFBUWhELGVBQWUsQ0FBQzZDLFFBQVEzSSxFQUFFLENBQUM7b0RBQzVDK0ksVUFBVSxJQUFNeEMsY0FBY29DLFFBQVEzSSxFQUFFO29EQUN4QytELE9BQU87d0RBQUVpRixhQUFhcEgsTUFBTXNGLE1BQU07d0RBQUUrQixXQUFXO29EQUFjOzs7Ozs7OERBRS9ELDhEQUFDZDtvREFBS3BFLE9BQU87d0RBQUVrRSxZQUFZO3dEQUFLakQsT0FBT3BELE1BQU1xRCxJQUFJO29EQUFDOzhEQUFJMEQsUUFBUTFJLEtBQUs7Ozs7Ozs7Ozs7Ozt3Q0FHcEUwSSxRQUFRM0ksRUFBRSxLQUFLLFdBQVc4RixnQkFBZ0JvRCxLQUFLLGlCQUM5Qyw4REFBQ3hFOzRDQUNDWCxPQUFPO2dEQUNMc0IsU0FBUztnREFDVG1DLGVBQWU7Z0RBQ2ZsQyxLQUFLO2dEQUNMbUQsYUFBYTs0Q0FDZjs7OERBRUEsOERBQUMvRDtvREFBSVgsT0FBTzt3REFBRXNCLFNBQVM7d0RBQVFtQyxlQUFlO3dEQUFVbEMsS0FBSztvREFBTTs7c0VBQ2pFLDhEQUFDNkM7NERBQUtwRSxPQUFPO2dFQUFFa0UsWUFBWTtnRUFBS2pELE9BQU9wRCxNQUFNcUQsSUFBSTs0REFBQztzRUFBRzs7Ozs7O3NFQUNyRCw4REFBQ1A7NERBQ0NYLE9BQU87Z0VBQ0xzQixTQUFTO2dFQUNUbUMsZUFBZTtnRUFDZmxDLEtBQUs7Z0VBQ0xtRCxhQUFhOzREQUNmO3NFQUVDL0MscUJBQXFCZ0QsR0FBRyxDQUFDLENBQUNTLDZCQUN6Qiw4REFBQ2xKO29FQUVDOEQsT0FBTzt3RUFBRXNCLFNBQVM7d0VBQVFpQyxZQUFZO3dFQUFVaEMsS0FBSztvRUFBTTs7c0ZBRTNELDhEQUFDc0Q7NEVBQ0NqQixNQUFLOzRFQUNMa0IsU0FBU0MsUUFBUTlDLHFCQUFxQixDQUFDbUQsYUFBYW5KLEVBQUUsQ0FBQzs0RUFDdkQrSSxVQUFVLElBQU1yQyx3QkFBd0J5QyxhQUFhbkosRUFBRTs0RUFDdkQrRCxPQUFPO2dGQUFFaUYsYUFBYXBILE1BQU1zRixNQUFNO2dGQUFFK0IsV0FBVzs0RUFBYzs7Ozs7O3NGQUUvRCw4REFBQ2Q7NEVBQUtwRSxPQUFPO2dGQUFFa0UsWUFBWTtnRkFBS2pELE9BQU9wRCxNQUFNcUQsSUFBSTs0RUFBQztzRkFDL0NrRSxhQUFhbEosS0FBSzs7Ozs7OzttRUFWaEJrSixhQUFhbkosRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs4REFpQjVCLDhEQUFDMEU7b0RBQUlYLE9BQU87d0RBQUVzQixTQUFTO3dEQUFRbUMsZUFBZTt3REFBVWxDLEtBQUs7b0RBQU07O3NFQUNqRSw4REFBQzZDOzREQUFLcEUsT0FBTztnRUFBRWtFLFlBQVk7Z0VBQUtqRCxPQUFPcEQsTUFBTXFELElBQUk7NERBQUM7c0VBQUc7Ozs7OztzRUFDckQsOERBQUNQOzREQUNDWCxPQUFPO2dFQUNMc0IsU0FBUztnRUFDVG1DLGVBQWU7Z0VBQ2ZsQyxLQUFLO2dFQUNMbUQsYUFBYTs0REFDZjtzRUFFQzlDLHNCQUFzQitDLEdBQUcsQ0FBQyxDQUFDVSw4QkFDMUIsOERBQUNuSjtvRUFFQzhELE9BQU87d0VBQUVzQixTQUFTO3dFQUFRaUMsWUFBWTt3RUFBVWhDLEtBQUs7b0VBQU07O3NGQUUzRCw4REFBQ3NEOzRFQUNDakIsTUFBSzs0RUFDTGtCLFNBQVNDLFFBQVE1QyxzQkFBc0IsQ0FBQ2tELGNBQWNwSixFQUFFLENBQUM7NEVBQ3pEK0ksVUFBVSxJQUFNaEMseUJBQXlCcUMsY0FBY3BKLEVBQUU7NEVBQ3pEK0QsT0FBTztnRkFBRWlGLGFBQWFwSCxNQUFNc0YsTUFBTTtnRkFBRStCLFdBQVc7NEVBQWM7Ozs7OztzRkFFL0QsOERBQUNkOzRFQUFLcEUsT0FBTztnRkFBRWtFLFlBQVk7Z0ZBQUtqRCxPQUFPcEQsTUFBTXFELElBQUk7NEVBQUM7c0ZBQy9DbUUsY0FBY25KLEtBQUs7Ozs7Ozs7bUVBVmpCbUosY0FBY3BKLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttREFpQjdCOzttQ0E5RUkySSxRQUFRM0ksRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0ZsQztJQS9Qd0I0Rjs7UUFDUC9GLGtEQUFTQTs7O01BREYrRjtBQWdRakIsU0FBU3lEOztJQUNkLE1BQU14RCxTQUFTaEcsc0RBQVNBO0lBQ3hCLE1BQU0sQ0FBQ2tCLFNBQVN1SSxXQUFXLEdBQUcxSiwrQ0FBUUEsQ0FBQztJQUN2QyxNQUFNLENBQUNzQixTQUFTcUksV0FBVyxHQUFHM0osK0NBQVFBLENBQUM7SUFDdkMsTUFBTSxDQUFDdUIsU0FBU3FJLFdBQVcsR0FBRzVKLCtDQUFRQSxDQUFDO0lBQ3ZDLE1BQU0sQ0FBQ3dCLFFBQVFxSSxVQUFVLEdBQUc3SiwrQ0FBUUEsQ0FBQztJQUNyQyxNQUFNLENBQUN5QixRQUFRcUksVUFBVSxHQUFHOUosK0NBQVFBLENBQUM7SUFDckMsTUFBTSxDQUFDMEIsUUFBUXFJLFVBQVUsR0FBRy9KLCtDQUFRQSxDQUFDO0lBQ3JDLE1BQU0sQ0FBQzJCLFFBQVFxSSxVQUFVLEdBQUdoSywrQ0FBUUEsQ0FBQztJQUNyQyxNQUFNLENBQUN3RyxZQUFZQyxjQUFjLEdBQUd6RywrQ0FBUUEsQ0FBQztJQUM3QyxNQUFNLENBQUNpSyxrQkFBa0JDLG9CQUFvQixHQUFHbEssK0NBQVFBLENBQUMsQ0FBQztJQUMxRCxNQUFNLENBQUNtSyx5QkFBeUJDLDJCQUEyQixHQUFHcEssK0NBQVFBLENBQUMsQ0FBQztJQUN4RSxNQUFNLENBQUNxSyxVQUFVQyxZQUFZLEdBQUd0SywrQ0FBUUEsQ0FBQyxDQUFDO0lBQzFDLE1BQU0sQ0FBQ3VLLFlBQVlDLGNBQWMsR0FBR3hLLCtDQUFRQSxDQUFDLENBQUM7SUFDOUMsTUFBTSxDQUFDeUssVUFBVUMsWUFBWSxHQUFHMUssK0NBQVFBLENBQUMsQ0FBQztJQUMxQyxNQUFNLENBQUMySyxvQkFBb0JDLHNCQUFzQixHQUFHNUssK0NBQVFBLENBQUMsQ0FBQztJQUM5RCxNQUFNLENBQUM2SyxtQkFBbUJDLHFCQUFxQixHQUFHOUssK0NBQVFBLENBQUMsQ0FBQztJQUM1RCxNQUFNLENBQUMrSyxvQkFBb0JDLHNCQUFzQixHQUFHaEwsK0NBQVFBLENBQUMsQ0FBQztJQUM5RCxNQUFNLENBQUNpTCxxQkFBcUJDLHVCQUF1QixHQUFHbEwsK0NBQVFBLENBQUMsQ0FBQztJQUNoRSxNQUFNLENBQUNtTCxlQUFlQyxpQkFBaUIsR0FBR3BMLCtDQUFRQSxDQUFDLENBQUM7SUFDcEQsTUFBTSxDQUFDcUwsY0FBY0MsZ0JBQWdCLEdBQUd0TCwrQ0FBUUEsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sQ0FBQ3VMLGVBQWVDLGlCQUFpQixHQUFHeEwsK0NBQVFBLENBQUMsQ0FBQztJQUNwRCxNQUFNLENBQUN5TCxnQkFBZ0JDLGtCQUFrQixHQUFHMUwsK0NBQVFBLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMyTCxrQkFBa0JDLG9CQUFvQixHQUFHNUwsK0NBQVFBLENBQUMsQ0FBQztJQUMxRCxNQUFNLENBQUM2TCxpQkFBaUJDLG1CQUFtQixHQUFHOUwsK0NBQVFBLENBQUMsQ0FBQztJQUN4RCxNQUFNLENBQUMrTCxrQkFBa0JDLG9CQUFvQixHQUFHaE0sK0NBQVFBLENBQUMsQ0FBQztJQUMxRCxNQUFNLENBQUNpTSxtQkFBbUJDLHFCQUFxQixHQUFHbE0sK0NBQVFBLENBQUMsQ0FBQztJQUM1RCxNQUFNLENBQUNtTSxlQUFlQyxpQkFBaUIsR0FBR3BNLCtDQUFRQSxDQUFDLENBQUM7SUFDcEQsTUFBTSxDQUFDcU0sY0FBY0MsZ0JBQWdCLEdBQUd0TSwrQ0FBUUEsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sQ0FBQ3VNLGVBQWVDLGlCQUFpQixHQUFHeE0sK0NBQVFBLENBQUMsQ0FBQztJQUNwRCxNQUFNLENBQUN5TSxnQkFBZ0JDLGtCQUFrQixHQUFHMU0sK0NBQVFBLENBQUMsQ0FBQztJQUN0RCxNQUFNLENBQUMyTSxrQkFBa0JDLG9CQUFvQixHQUFHNU0sK0NBQVFBLENBQUMsQ0FBQztJQUMxRCxNQUFNLENBQUM2TSxpQkFBaUJDLG1CQUFtQixHQUFHOU0sK0NBQVFBLENBQUMsQ0FBQztJQUN4RCxNQUFNLENBQUMrTSxrQkFBa0JDLG9CQUFvQixHQUFHaE4sK0NBQVFBLENBQUMsQ0FBQztJQUMxRCxNQUFNLENBQUNpTixtQkFBbUJDLHFCQUFxQixHQUFHbE4sK0NBQVFBLENBQUMsQ0FBQztJQUM1RCxNQUFNLENBQUNtTixXQUFXQyxhQUFhLEdBQUdwTiwrQ0FBUUEsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sQ0FBQ3FOLFVBQVVDLFlBQVksR0FBR3ROLCtDQUFRQSxDQUFDLENBQUM7SUFDMUMsTUFBTSxDQUFDdU4sV0FBV0MsYUFBYSxHQUFHeE4sK0NBQVFBLENBQUMsQ0FBQztJQUM1QyxNQUFNLENBQUN5TixZQUFZQyxjQUFjLEdBQUcxTiwrQ0FBUUEsQ0FBQyxDQUFDO0lBRTlDLE1BQU0yTixnQkFBZ0I7UUFDcEJ4TSxTQUFTO1lBQUV5TSxVQUFVek07WUFBUzBNLFdBQVduRTtRQUFXO1FBQ3BEcEksU0FBUztZQUFFc00sVUFBVXRNO1lBQVN1TSxXQUFXbEU7UUFBVztRQUNwRHBJLFNBQVM7WUFBRXFNLFVBQVVyTTtZQUFTc00sV0FBV2pFO1FBQVc7UUFDcERwSSxRQUFRO1lBQUVvTSxVQUFVcE07WUFBUXFNLFdBQVdoRTtRQUFVO1FBQ2pEcEksUUFBUTtZQUFFbU0sVUFBVW5NO1lBQVFvTSxXQUFXL0Q7UUFBVTtRQUNqRHBJLFFBQVE7WUFBRWtNLFVBQVVsTTtZQUFRbU0sV0FBVzlEO1FBQVU7UUFDakRwSSxRQUFRO1lBQUVpTSxVQUFVak07WUFBUWtNLFdBQVc3RDtRQUFVO0lBQ25EO0lBRUEsTUFBTThELGdCQUFnQixDQUFDQyxTQUFTQyxVQUFZLEdBQWVBLE9BQVpELFNBQVEsTUFBWSxPQUFSQztJQUMzRCxNQUFNQyxlQUFlLENBQUNGLFNBQVNDLFNBQVNFLFNBQVcsR0FBZUYsT0FBWkQsU0FBUSxNQUFnQkcsT0FBWkYsU0FBUSxNQUFXLE9BQVBFO0lBRTlFLE1BQU1DLGtCQUFrQixPQUFPSixTQUFTQyxTQUFTRTtZQU81QmhOO1FBTm5CLE1BQU1rTixXQUFXSCxhQUFhRixTQUFTQyxTQUFTRTtRQUVoRCxJQUFJN0QsUUFBUSxDQUFDK0QsU0FBUyxJQUFJN0QsVUFBVSxDQUFDNkQsU0FBUyxFQUFFO1lBQzlDO1FBQ0Y7UUFFQSxNQUFNQyxjQUFhbk4sK0JBQUFBLG1CQUFtQixDQUFDNk0sUUFBUSxjQUE1QjdNLG1EQUFBQSw0QkFBOEIsQ0FBQzhNLFFBQVE7UUFDMUQsSUFBSSxDQUFDSyxjQUFjLENBQUNBLFdBQVdDLEdBQUcsQ0FBQ0osU0FBUztZQUMxQztRQUNGO1FBRUEsSUFBSTtZQUNGMUQsY0FBYyxDQUFDM0QsT0FBVTtvQkFBRSxHQUFHQSxJQUFJO29CQUFFLENBQUN1SCxTQUFTLEVBQUU7Z0JBQUs7WUFDckQxRCxZQUFZLENBQUM3RCxPQUFVO29CQUFFLEdBQUdBLElBQUk7b0JBQUUsQ0FBQ3VILFNBQVMsRUFBRTtnQkFBSztnQkFFaEM1TjtZQUFuQixNQUFNK04sYUFBYS9OLENBQUFBLDRCQUFBQSxnQkFBZ0IsQ0FBQ3VOLFFBQVEsY0FBekJ2Tix1Q0FBQUEsNEJBQTZCdU47WUFDaEQsTUFBTVMsU0FBUyxJQUFJQyxnQkFBZ0I7Z0JBQ2pDVDtnQkFDQWpHLE1BQU1tRztnQkFDTlEsT0FBT0MsT0FBT0o7WUFDaEI7WUFDQSxNQUFNSyxXQUFXLE1BQU1DLE1BQU0saUJBQW1DLE9BQWxCTCxPQUFPTSxRQUFRLEtBQU07Z0JBQ2pFQyxPQUFPO1lBQ1Q7WUFFQSxJQUFJLENBQUNILFNBQVNJLEVBQUUsRUFBRTtnQkFDaEIsTUFBTSxJQUFJQyxNQUFNO1lBQ2xCO1lBRUEsTUFBTUMsVUFBVSxNQUFNTixTQUFTTyxJQUFJO1lBQ25DN0UsWUFBWSxDQUFDekQ7b0JBQWlDcUk7dUJBQXZCO29CQUFFLEdBQUdySSxJQUFJO29CQUFFLENBQUN1SCxTQUFTLEVBQUVjLENBQUFBLGtCQUFBQSxvQkFBQUEsOEJBQUFBLFFBQVNFLE1BQU0sY0FBZkYsNkJBQUFBLGtCQUFtQjtnQkFBSztZQUFBO1FBQ3hFLEVBQUUsT0FBT25OLE9BQU87WUFDZDJJLFlBQVksQ0FBQzdELE9BQVU7b0JBQ3JCLEdBQUdBLElBQUk7b0JBQ1AsQ0FBQ3VILFNBQVMsRUFBRXJNLE1BQU1zTixPQUFPLElBQUk7Z0JBQy9CO1FBQ0YsU0FBVTtZQUNSN0UsY0FBYyxDQUFDM0QsT0FBVTtvQkFBRSxHQUFHQSxJQUFJO29CQUFFLENBQUN1SCxTQUFTLEVBQUU7Z0JBQU07UUFDeEQ7SUFDRjtJQUVBLE1BQU1rQix5QkFBeUIsQ0FBQ0MsYUFBYXZCO1FBQzNDLE1BQU1ELFVBQVV3QixZQUFZblAsRUFBRTtRQUM5QixNQUFNb1AsYUFBYTFCLGNBQWNDLFNBQVNDO1FBQzFDOUQsb0JBQW9CLENBQUNyRDtnQkFDU0E7WUFBNUIsTUFBTTRJLGdCQUFnQjtnQkFBRSxHQUFJNUksQ0FBQUEsZ0JBQUFBLGlCQUFBQSwyQkFBQUEsSUFBTSxDQUFDa0gsUUFBUSxjQUFmbEgsMkJBQUFBLGdCQUFtQixDQUFDLENBQUM7WUFBRTtZQUNuRCxNQUFNNkksYUFBYXhHLFFBQVF1RyxhQUFhLENBQUN6QixRQUFRO1lBRWpELElBQUkwQixZQUFZO2dCQUNkLE9BQU9ELGFBQWEsQ0FBQ3pCLFFBQVE7WUFDL0IsT0FBTztnQkFDTHlCLGFBQWEsQ0FBQ3pCLFFBQVEsR0FBRztZQUMzQjtZQUVBLE1BQU0yQixlQUFlO2dCQUNuQixHQUFHOUksSUFBSTtnQkFDUCxDQUFDa0gsUUFBUSxFQUFFMEI7WUFDYjtZQUVBLElBQUlHLE9BQU9DLElBQUksQ0FBQ0osZUFBZXpNLE1BQU0sS0FBSyxHQUFHO2dCQUMzQyxPQUFPMk0sWUFBWSxDQUFDNUIsUUFBUTtZQUM5QjtZQUVBM0QsMkJBQTJCLENBQUMwRjtvQkFDQ0E7Z0JBQTNCLE1BQU1DLGVBQWU7b0JBQUUsR0FBSUQsQ0FBQUEsdUJBQUFBLHdCQUFBQSxrQ0FBQUEsV0FBYSxDQUFDL0IsUUFBUSxjQUF0QitCLGtDQUFBQSx1QkFBMEIsQ0FBQyxDQUFDO2dCQUFFO2dCQUN6RCxJQUFJSixZQUFZO29CQUNkLE9BQU9LLFlBQVksQ0FBQy9CLFFBQVE7Z0JBQzlCLE9BQU87b0JBQ0wsTUFBTWdDLHNCQUFzQi9PLGdCQUFnQlIsTUFBTSxDQUNoRCxDQUFDd1AsS0FBSy9CLFNBQVk7NEJBQUUsR0FBRytCLEdBQUc7NEJBQUUsQ0FBQy9CLE9BQU8sRUFBRTt3QkFBTSxJQUM1QyxDQUFDO29CQUVINkIsWUFBWSxDQUFDL0IsUUFBUSxHQUFHZ0M7Z0JBQzFCO2dCQUVBLE1BQU1FLGNBQWM7b0JBQ2xCLEdBQUdKLFdBQVc7b0JBQ2QsQ0FBQy9CLFFBQVEsRUFBRWdDO2dCQUNiO2dCQUVBLElBQUlILE9BQU9DLElBQUksQ0FBQ0UsY0FBYy9NLE1BQU0sS0FBSyxHQUFHO29CQUMxQyxPQUFPa04sV0FBVyxDQUFDbkMsUUFBUTtnQkFDN0I7Z0JBRUEsT0FBT21DO1lBQ1Q7WUFFQSxJQUFJUixZQUFZO2dCQUNkLE1BQU1TLGVBQWUsR0FBZW5DLE9BQVpELFNBQVEsTUFBWSxPQUFSQyxTQUFRO2dCQUU1QzFELFlBQVksQ0FBQzhGO29CQUNYLE1BQU1DLGVBQWU7d0JBQUUsR0FBR0QsU0FBUztvQkFBQztvQkFDcENSLE9BQU9DLElBQUksQ0FBQ1EsY0FBY0MsT0FBTyxDQUFDLENBQUNDO3dCQUNqQyxJQUFJQSxJQUFJQyxVQUFVLENBQUNMLGVBQWU7NEJBQ2hDLE9BQU9FLFlBQVksQ0FBQ0UsSUFBSTt3QkFDMUI7b0JBQ0Y7b0JBQ0EsT0FBT0Y7Z0JBQ1Q7Z0JBRUE3RixjQUFjLENBQUNpRztvQkFDYixNQUFNQyxpQkFBaUI7d0JBQUUsR0FBR0QsV0FBVztvQkFBQztvQkFDeENiLE9BQU9DLElBQUksQ0FBQ2EsZ0JBQWdCSixPQUFPLENBQUMsQ0FBQ0M7d0JBQ25DLElBQUlBLElBQUlDLFVBQVUsQ0FBQ0wsZUFBZTs0QkFDaEMsT0FBT08sY0FBYyxDQUFDSCxJQUFJO3dCQUM1QjtvQkFDRjtvQkFDQSxPQUFPRztnQkFDVDtnQkFFQWhHLFlBQVksQ0FBQ2lHO29CQUNYLE1BQU1DLGVBQWU7d0JBQUUsR0FBR0QsU0FBUztvQkFBQztvQkFDcENmLE9BQU9DLElBQUksQ0FBQ2UsY0FBY04sT0FBTyxDQUFDLENBQUNDO3dCQUNqQyxJQUFJQSxJQUFJQyxVQUFVLENBQUNMLGVBQWU7NEJBQ2hDLE9BQU9TLFlBQVksQ0FBQ0wsSUFBSTt3QkFDMUI7b0JBQ0Y7b0JBQ0EsT0FBT0s7Z0JBQ1Q7Z0JBRUFoRyxzQkFBc0IsQ0FBQ2lHO29CQUNyQixNQUFNNUosVUFBVTt3QkFBRSxHQUFHNEosVUFBVTtvQkFBQztvQkFDaEMsT0FBTzVKLE9BQU8sQ0FBQ3VJLFdBQVc7b0JBQzFCLE9BQU92STtnQkFDVDtnQkFFQTZELHFCQUFxQixDQUFDZ0c7b0JBQ3BCLE1BQU03SixVQUFVO3dCQUFFLEdBQUc2SixxQkFBcUI7b0JBQUM7b0JBQzNDLE9BQU83SixPQUFPLENBQUN1SSxXQUFXO29CQUMxQixPQUFPdkk7Z0JBQ1Q7Z0JBRUErRCxzQkFBc0IsQ0FBQytGO29CQUNyQixNQUFNOUosVUFBVTt3QkFBRSxHQUFHOEosVUFBVTtvQkFBQztvQkFDaEMsT0FBTzlKLE9BQU8sQ0FBQ3VJLFdBQVc7b0JBQzFCLE9BQU92STtnQkFDVDtnQkFFQWlFLHVCQUF1QixDQUFDOEY7b0JBQ3RCLE1BQU0vSixVQUFVO3dCQUFFLEdBQUcrSixXQUFXO29CQUFDO29CQUNqQyxPQUFPL0osT0FBTyxDQUFDdUksV0FBVztvQkFDMUIsT0FBT3ZJO2dCQUNUO2dCQUVBbUUsaUJBQWlCLENBQUM2RjtvQkFDaEIsTUFBTWhLLFVBQVU7d0JBQUUsR0FBR2dLLGlCQUFpQjtvQkFBQztvQkFDdkMsT0FBT2hLLE9BQU8sQ0FBQ3VJLFdBQVc7b0JBQzFCLE9BQU92STtnQkFDVDtnQkFFQXFFLGdCQUFnQixDQUFDNEY7b0JBQ2YsTUFBTWpLLFVBQVU7d0JBQUUsR0FBR2lLLGdCQUFnQjtvQkFBQztvQkFDdEMsT0FBT2pLLE9BQU8sQ0FBQ3VJLFdBQVc7b0JBQzFCLE9BQU92STtnQkFDVDtnQkFFQXVFLGlCQUFpQixDQUFDMkY7b0JBQ2hCLE1BQU1sSyxVQUFVO3dCQUFFLEdBQUdrSyxpQkFBaUI7b0JBQUM7b0JBQ3ZDLE9BQU9sSyxPQUFPLENBQUN1SSxXQUFXO29CQUMxQixPQUFPdkk7Z0JBQ1Q7Z0JBRUF5RSxrQkFBa0IsQ0FBQzBGO29CQUNqQixNQUFNbkssVUFBVTt3QkFBRSxHQUFHbUssa0JBQWtCO29CQUFDO29CQUN4QyxPQUFPbkssT0FBTyxDQUFDdUksV0FBVztvQkFDMUIsT0FBT3ZJO2dCQUNUO2dCQUVBMkUsb0JBQW9CLENBQUN5RjtvQkFDbkIsTUFBTXBLLFVBQVU7d0JBQUUsR0FBR29LLG9CQUFvQjtvQkFBQztvQkFDMUMsT0FBT3BLLE9BQU8sQ0FBQ3VJLFdBQVc7b0JBQzFCLE9BQU92STtnQkFDVDtnQkFFQTZFLG1CQUFtQixDQUFDd0Y7b0JBQ2xCLE1BQU1ySyxVQUFVO3dCQUFFLEdBQUdxSyxtQkFBbUI7b0JBQUM7b0JBQ3pDLE9BQU9ySyxPQUFPLENBQUN1SSxXQUFXO29CQUMxQixPQUFPdkk7Z0JBQ1Q7Z0JBRUErRSxvQkFBb0IsQ0FBQ3VGO29CQUNuQixNQUFNdEssVUFBVTt3QkFBRSxHQUFHc0ssb0JBQW9CO29CQUFDO29CQUMxQyxPQUFPdEssT0FBTyxDQUFDdUksV0FBVztvQkFDMUIsT0FBT3ZJO2dCQUNUO2dCQUVBaUYscUJBQXFCLENBQUNzRjtvQkFDcEIsTUFBTXZLLFVBQVU7d0JBQUUsR0FBR3VLLHFCQUFxQjtvQkFBQztvQkFDM0MsT0FBT3ZLLE9BQU8sQ0FBQ3VJLFdBQVc7b0JBQzFCLE9BQU92STtnQkFDVDtnQkFFQW1GLGlCQUFpQixDQUFDcUY7b0JBQ2hCLE1BQU14SyxVQUFVO3dCQUFFLEdBQUd3SyxpQkFBaUI7b0JBQUM7b0JBQ3ZDLE9BQU94SyxPQUFPLENBQUN1SSxXQUFXO29CQUMxQixPQUFPdkk7Z0JBQ1Q7Z0JBRUFxRixnQkFBZ0IsQ0FBQ29GO29CQUNmLE1BQU16SyxVQUFVO3dCQUFFLEdBQUd5SyxnQkFBZ0I7b0JBQUM7b0JBQ3RDLE9BQU96SyxPQUFPLENBQUN1SSxXQUFXO29CQUMxQixPQUFPdkk7Z0JBQ1Q7Z0JBRUF1RixpQkFBaUIsQ0FBQ21GO29CQUNoQixNQUFNMUssVUFBVTt3QkFBRSxHQUFHMEssaUJBQWlCO29CQUFDO29CQUN2QyxPQUFPMUssT0FBTyxDQUFDdUksV0FBVztvQkFDMUIsT0FBT3ZJO2dCQUNUO2dCQUVBeUYsa0JBQWtCLENBQUNrRjtvQkFDakIsTUFBTTNLLFVBQVU7d0JBQUUsR0FBRzJLLGtCQUFrQjtvQkFBQztvQkFDeEMsT0FBTzNLLE9BQU8sQ0FBQ3VJLFdBQVc7b0JBQzFCLE9BQU92STtnQkFDVDtnQkFFQTJGLG9CQUFvQixDQUFDaUY7b0JBQ25CLE1BQU01SyxVQUFVO3dCQUFFLEdBQUc0SyxvQkFBb0I7b0JBQUM7b0JBQzFDLE9BQU81SyxPQUFPLENBQUN1SSxXQUFXO29CQUMxQixPQUFPdkk7Z0JBQ1Q7Z0JBRUE2RixtQkFBbUIsQ0FBQ2dGO29CQUNsQixNQUFNN0ssVUFBVTt3QkFBRSxHQUFHNkssbUJBQW1CO29CQUFDO29CQUN6QyxPQUFPN0ssT0FBTyxDQUFDdUksV0FBVztvQkFDMUIsT0FBT3ZJO2dCQUNUO2dCQUVBK0Ysb0JBQW9CLENBQUMrRTtvQkFDbkIsTUFBTTlLLFVBQVU7d0JBQUUsR0FBRzhLLG9CQUFvQjtvQkFBQztvQkFDMUMsT0FBTzlLLE9BQU8sQ0FBQ3VJLFdBQVc7b0JBQzFCLE9BQU92STtnQkFDVDtnQkFFQWlHLHFCQUFxQixDQUFDOEU7b0JBQ3BCLE1BQU0vSyxVQUFVO3dCQUFFLEdBQUcrSyxxQkFBcUI7b0JBQUM7b0JBQzNDLE9BQU8vSyxPQUFPLENBQUN1SSxXQUFXO29CQUMxQixPQUFPdkk7Z0JBQ1Q7Z0JBRUFtRyxhQUFhLENBQUM2RTtvQkFDWixNQUFNaEwsVUFBVTt3QkFBRSxHQUFHZ0wsYUFBYTtvQkFBQztvQkFDbkMsT0FBT2hMLE9BQU8sQ0FBQ3VJLFdBQVc7b0JBQzFCLE9BQU92STtnQkFDVDtnQkFFQXFHLFlBQVksQ0FBQzRFO29CQUNYLE1BQU1qTCxVQUFVO3dCQUFFLEdBQUdpTCxZQUFZO29CQUFDO29CQUNsQyxPQUFPakwsT0FBTyxDQUFDdUksV0FBVztvQkFDMUIsT0FBT3ZJO2dCQUNUO2dCQUVBdUcsYUFBYSxDQUFDMkU7b0JBQ1osTUFBTWxMLFVBQVU7d0JBQUUsR0FBR2tMLGFBQWE7b0JBQUM7b0JBQ25DLE9BQU9sTCxPQUFPLENBQUN1SSxXQUFXO29CQUMxQixPQUFPdkk7Z0JBQ1Q7Z0JBRUF5RyxjQUFjLENBQUMwRTtvQkFDYixNQUFNbkwsVUFBVTt3QkFBRSxHQUFHbUwsY0FBYztvQkFBQztvQkFDcEMsT0FBT25MLE9BQU8sQ0FBQ3VJLFdBQVc7b0JBQzFCLE9BQU92STtnQkFDVDtZQUNGO1lBRUEsT0FBTzBJO1FBQ1Q7SUFDRjtJQUVBLE1BQU0wQyw4QkFBOEIsT0FBT3RFLFNBQVNDLFNBQVNzRTtRQUMzRCxNQUFNOUMsYUFBYTFCLGNBQWNDLFNBQVNDO1lBQ3ZCeE47UUFBbkIsTUFBTStOLGFBQWEvTixDQUFBQSw0QkFBQUEsZ0JBQWdCLENBQUN1TixRQUFRLGNBQXpCdk4sdUNBQUFBLDRCQUE2QnVOO1FBRWhELElBQUksQ0FBQ3VFLE9BQU87WUFDVjFILHNCQUFzQixDQUFDL0QsT0FBVTtvQkFBRSxHQUFHQSxJQUFJO29CQUFFLENBQUMySSxXQUFXLEVBQUU7Z0JBQWdCO1lBQzFFO1FBQ0Y7UUFFQTVFLHNCQUFzQixDQUFDL0QsT0FBVTtnQkFBRSxHQUFHQSxJQUFJO2dCQUFFLENBQUMySSxXQUFXLEVBQUU7WUFBVTtRQUNwRTFFLHFCQUFxQixDQUFDakUsT0FBVTtnQkFBRSxHQUFHQSxJQUFJO2dCQUFFLENBQUMySSxXQUFXLEVBQUU7WUFBSztRQUU5RCxJQUFJO1lBQ0YsTUFBTVosV0FBVyxNQUFNQyxNQUFNLDZCQUFrRTBELE9BQXJDQSxtQkFBbUJ2RSxVQUFTLFdBQTRDdUUsT0FBbkNBLG1CQUFtQkQsUUFBTyxXQUFnRCxPQUF2Q0MsbUJBQW1CNUQsT0FBT0osZUFBZ0I7Z0JBQzFLUSxPQUFPO2dCQUNQeUQsUUFBUTtZQUNWO1lBRUEsSUFBSSxDQUFDNUQsU0FBU0ksRUFBRSxFQUFFO2dCQUNoQixNQUFNLElBQUlDLE1BQU07WUFDbEI7WUFFQSxNQUFNQyxVQUFVLE1BQU1OLFNBQVNPLElBQUk7WUFDbkMsSUFBSSxFQUFDRCxvQkFBQUEsOEJBQUFBLFFBQVNFLE1BQU0sR0FBRTtnQkFDcEIsTUFBTSxJQUFJSCxNQUFNO1lBQ2xCO1lBRUEsTUFBTXdELGlCQUFpQjNQLEtBQUtvTSxRQUFRRSxNQUFNO1lBQzFDLE1BQU1zRCxjQUFjLElBQUlDLE1BQU1GLGVBQWV6UCxNQUFNO1lBQ25ELElBQUssSUFBSUcsSUFBSSxHQUFHQSxJQUFJc1AsZUFBZXpQLE1BQU0sRUFBRUcsS0FBSyxFQUFHO2dCQUNqRHVQLFdBQVcsQ0FBQ3ZQLEVBQUUsR0FBR3NQLGVBQWVyUCxVQUFVLENBQUNEO1lBQzdDO1lBRUEsTUFBTXlQLFlBQVksSUFBSTFQLFdBQVd3UDtZQUNqQyxNQUFNRyxPQUFPLElBQUlDLEtBQUs7Z0JBQUNGO2FBQVUsRUFBRTtnQkFDakM3SyxNQUFNO1lBQ1I7WUFFQSxNQUFNZ0wsY0FBY0MsSUFBSUMsZUFBZSxDQUFDSjtZQUN4QyxNQUFNSyxPQUFPalAsU0FBU0MsYUFBYSxDQUFDO1lBQ3BDZ1AsS0FBS0MsSUFBSSxHQUFHSjtZQUNaRyxLQUFLRSxRQUFRLEdBQUcsR0FBbUNkLE9BQWhDdEUsUUFBUXFGLE9BQU8sQ0FBQyxRQUFRLE1BQUssS0FBc0UsT0FBbkVmLE1BQU1lLE9BQU8sQ0FBQyxnQkFBZ0IsS0FBS0MsV0FBVyxNQUFNLGdCQUFlO1lBQ3RIclAsU0FBU3NQLElBQUksQ0FBQzVPLFdBQVcsQ0FBQ3VPO1lBQzFCQSxLQUFLTSxLQUFLO1lBQ1Z2UCxTQUFTc1AsSUFBSSxDQUFDRSxXQUFXLENBQUNQO1lBQzFCRixJQUFJVSxlQUFlLENBQUNYO1lBRXBCL0gsc0JBQXNCLENBQUNuRSxPQUFVO29CQUFFLEdBQUdBLElBQUk7b0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtnQkFBRztZQUM3RHRFLHVCQUF1QixDQUFDckU7b0JBRUlBO3VCQUZNO29CQUNoQyxHQUFHQSxJQUFJO29CQUNQLENBQUMySSxXQUFXLEVBQUU7d0JBQUM4QzsyQkFBVSxDQUFDekwsQ0FBQUEsbUJBQUFBLGlCQUFBQSwyQkFBQUEsSUFBTSxDQUFDMkksV0FBVyxjQUFsQjNJLDhCQUFBQSxtQkFBc0IsRUFBRSxFQUFFOE0sTUFBTSxDQUFDLENBQUNDLE9BQVNBLFNBQVN0QjtxQkFBTyxDQUFDdUIsS0FBSyxDQUFDLEdBQUc7Z0JBQ2pHO1lBQUE7WUFFQWpKLHNCQUFzQixDQUFDL0QsT0FBVTtvQkFBRSxHQUFHQSxJQUFJO29CQUFFLENBQUMySSxXQUFXLEVBQUU7Z0JBQVU7UUFDdEUsRUFBRSxPQUFPek4sT0FBTztZQUNkNkksc0JBQXNCLENBQUMvRCxPQUFVO29CQUFFLEdBQUdBLElBQUk7b0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtnQkFBUTtZQUNsRTFFLHFCQUFxQixDQUFDakUsT0FBVTtvQkFDOUIsR0FBR0EsSUFBSTtvQkFDUCxDQUFDMkksV0FBVyxFQUFFek4sTUFBTXNOLE9BQU8sSUFBSTtnQkFDakM7UUFDRjtJQUNGO0lBRUEsTUFBTXlFLHlCQUF5QixPQUFPL0YsU0FBU0MsU0FBU3NFO1FBQ3RELE1BQU05QyxhQUFhMUIsY0FBY0MsU0FBU0M7WUFDdkJ4TjtRQUFuQixNQUFNK04sYUFBYS9OLENBQUFBLDRCQUFBQSxnQkFBZ0IsQ0FBQ3VOLFFBQVEsY0FBekJ2Tix1Q0FBQUEsNEJBQTZCdU47UUFFaEQsSUFBSSxDQUFDdUUsT0FBTztZQUNWbEgsaUJBQWlCLENBQUN2RSxPQUFVO29CQUFFLEdBQUdBLElBQUk7b0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtnQkFBZ0I7WUFDckU7UUFDRjtRQUVBcEUsaUJBQWlCLENBQUN2RSxPQUFVO2dCQUFFLEdBQUdBLElBQUk7Z0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtZQUFVO1FBQy9EbEUsZ0JBQWdCLENBQUN6RSxPQUFVO2dCQUFFLEdBQUdBLElBQUk7Z0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtZQUFLO1FBRXpELElBQUk7WUFDRixNQUFNWixXQUFXLE1BQU1DLE1BQU0sb0JBQXlEMEQsT0FBckNBLG1CQUFtQnZFLFVBQVMsV0FBNEN1RSxPQUFuQ0EsbUJBQW1CRCxRQUFPLFdBQWdELE9BQXZDQyxtQkFBbUI1RCxPQUFPSixlQUFnQjtnQkFDaktRLE9BQU87Z0JBQ1B5RCxRQUFRO1lBQ1Y7WUFFQSxJQUFJLENBQUM1RCxTQUFTSSxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSUMsTUFBTTtZQUNsQjtZQUVBLE1BQU1DLFVBQVUsTUFBTU4sU0FBU08sSUFBSTtZQUNuQyxJQUFJLEVBQUNELG9CQUFBQSw4QkFBQUEsUUFBU0UsTUFBTSxHQUFFO2dCQUNwQixNQUFNLElBQUlILE1BQU07WUFDbEI7WUFFQSxNQUFNd0QsaUJBQWlCM1AsS0FBS29NLFFBQVFFLE1BQU07WUFDMUMsTUFBTXNELGNBQWMsSUFBSUMsTUFBTUYsZUFBZXpQLE1BQU07WUFDbkQsSUFBSyxJQUFJRyxJQUFJLEdBQUdBLElBQUlzUCxlQUFlelAsTUFBTSxFQUFFRyxLQUFLLEVBQUc7Z0JBQ2pEdVAsV0FBVyxDQUFDdlAsRUFBRSxHQUFHc1AsZUFBZXJQLFVBQVUsQ0FBQ0Q7WUFDN0M7WUFFQSxNQUFNeVAsWUFBWSxJQUFJMVAsV0FBV3dQO1lBQ2pDLE1BQU1HLE9BQU8sSUFBSUMsS0FBSztnQkFBQ0Y7YUFBVSxFQUFFO2dCQUFFN0ssTUFBTTtZQUFrQjtZQUU3RCxNQUFNZ0wsY0FBY0MsSUFBSUMsZUFBZSxDQUFDSjtZQUN4QyxNQUFNSyxPQUFPalAsU0FBU0MsYUFBYSxDQUFDO1lBQ3BDZ1AsS0FBS0MsSUFBSSxHQUFHSjtZQUNaRyxLQUFLRSxRQUFRLEdBQUcsR0FBbUNkLE9BQWhDdEUsUUFBUXFGLE9BQU8sQ0FBQyxRQUFRLE1BQUssS0FBaUUsT0FBOURmLE1BQU1lLE9BQU8sQ0FBQyxnQkFBZ0IsS0FBS0MsV0FBVyxNQUFNLFdBQVU7WUFDakhyUCxTQUFTc1AsSUFBSSxDQUFDNU8sV0FBVyxDQUFDdU87WUFDMUJBLEtBQUtNLEtBQUs7WUFDVnZQLFNBQVNzUCxJQUFJLENBQUNFLFdBQVcsQ0FBQ1A7WUFDMUJGLElBQUlVLGVBQWUsQ0FBQ1g7WUFFcEJ2SCxpQkFBaUIsQ0FBQzNFLE9BQVU7b0JBQUUsR0FBR0EsSUFBSTtvQkFBRSxDQUFDMkksV0FBVyxFQUFFO2dCQUFHO1lBQ3hEOUQsa0JBQWtCLENBQUM3RTtvQkFFU0E7dUJBRkM7b0JBQzNCLEdBQUdBLElBQUk7b0JBQ1AsQ0FBQzJJLFdBQVcsRUFBRTt3QkFBQzhDOzJCQUFVLENBQUN6TCxDQUFBQSxtQkFBQUEsaUJBQUFBLDJCQUFBQSxJQUFNLENBQUMySSxXQUFXLGNBQWxCM0ksOEJBQUFBLG1CQUFzQixFQUFFLEVBQUU4TSxNQUFNLENBQUMsQ0FBQ0MsT0FBU0EsU0FBU3RCO3FCQUFPLENBQUN1QixLQUFLLENBQUMsR0FBRztnQkFDakc7WUFBQTtZQUVBekksaUJBQWlCLENBQUN2RSxPQUFVO29CQUFFLEdBQUdBLElBQUk7b0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtnQkFBVTtRQUNqRSxFQUFFLE9BQU96TixPQUFPO1lBQ2RxSixpQkFBaUIsQ0FBQ3ZFLE9BQVU7b0JBQUUsR0FBR0EsSUFBSTtvQkFBRSxDQUFDMkksV0FBVyxFQUFFO2dCQUFRO1lBQzdEbEUsZ0JBQWdCLENBQUN6RSxPQUFVO29CQUN6QixHQUFHQSxJQUFJO29CQUNQLENBQUMySSxXQUFXLEVBQUV6TixNQUFNc04sT0FBTyxJQUFJO2dCQUNqQztRQUNGO0lBQ0Y7SUFFQSxNQUFNMEUsNEJBQTRCLE9BQU9oRyxTQUFTQyxTQUFTc0U7UUFDekQsTUFBTTlDLGFBQWExQixjQUFjQyxTQUFTQztZQUN2QnhOO1FBQW5CLE1BQU0rTixhQUFhL04sQ0FBQUEsNEJBQUFBLGdCQUFnQixDQUFDdU4sUUFBUSxjQUF6QnZOLHVDQUFBQSw0QkFBNkJ1TjtRQUVoRCxJQUFJLENBQUN1RSxPQUFPO1lBQ1YxRyxvQkFBb0IsQ0FBQy9FLE9BQVU7b0JBQUUsR0FBR0EsSUFBSTtvQkFBRSxDQUFDMkksV0FBVyxFQUFFO2dCQUFnQjtZQUN4RTtRQUNGO1FBRUE1RCxvQkFBb0IsQ0FBQy9FLE9BQVU7Z0JBQUUsR0FBR0EsSUFBSTtnQkFBRSxDQUFDMkksV0FBVyxFQUFFO1lBQVU7UUFDbEUxRCxtQkFBbUIsQ0FBQ2pGLE9BQVU7Z0JBQUUsR0FBR0EsSUFBSTtnQkFBRSxDQUFDMkksV0FBVyxFQUFFO1lBQUs7UUFFNUQsSUFBSTtZQUNGLE1BQU1aLFdBQVcsTUFBTUMsTUFBTSw0QkFBaUUwRCxPQUFyQ0EsbUJBQW1CdkUsVUFBUyxXQUE0Q3VFLE9BQW5DQSxtQkFBbUJELFFBQU8sV0FBZ0QsT0FBdkNDLG1CQUFtQjVELE9BQU9KLGVBQWdCO2dCQUN6S1EsT0FBTztnQkFDUHlELFFBQVE7WUFDVjtZQUVBLElBQUksQ0FBQzVELFNBQVNJLEVBQUUsRUFBRTtnQkFDaEIsTUFBTSxJQUFJQyxNQUFNO1lBQ2xCO1lBRUEsTUFBTUMsVUFBVSxNQUFNTixTQUFTTyxJQUFJO1lBQ25DLElBQUksRUFBQ0Qsb0JBQUFBLDhCQUFBQSxRQUFTRSxNQUFNLEdBQUU7Z0JBQ3BCLE1BQU0sSUFBSUgsTUFBTTtZQUNsQjtZQUVBLE1BQU13RCxpQkFBaUIzUCxLQUFLb00sUUFBUUUsTUFBTTtZQUMxQyxNQUFNc0QsY0FBYyxJQUFJQyxNQUFNRixlQUFlelAsTUFBTTtZQUNuRCxJQUFLLElBQUlHLElBQUksR0FBR0EsSUFBSXNQLGVBQWV6UCxNQUFNLEVBQUVHLEtBQUssRUFBRztnQkFDakR1UCxXQUFXLENBQUN2UCxFQUFFLEdBQUdzUCxlQUFlclAsVUFBVSxDQUFDRDtZQUM3QztZQUVBLE1BQU15UCxZQUFZLElBQUkxUCxXQUFXd1A7WUFDakMsTUFBTUcsT0FBTyxJQUFJQyxLQUFLO2dCQUFDRjthQUFVLEVBQUU7Z0JBQUU3SyxNQUFNO1lBQWtCO1lBRTdELE1BQU1nTCxjQUFjQyxJQUFJQyxlQUFlLENBQUNKO1lBQ3hDLE1BQU1LLE9BQU9qUCxTQUFTQyxhQUFhLENBQUM7WUFDcENnUCxLQUFLQyxJQUFJLEdBQUdKO1lBQ1pHLEtBQUtFLFFBQVEsR0FBRyxHQUFtQ2QsT0FBaEN0RSxRQUFRcUYsT0FBTyxDQUFDLFFBQVEsTUFBSyxLQUFxRSxPQUFsRWYsTUFBTWUsT0FBTyxDQUFDLGdCQUFnQixLQUFLQyxXQUFXLE1BQU0sZUFBYztZQUNySHJQLFNBQVNzUCxJQUFJLENBQUM1TyxXQUFXLENBQUN1TztZQUMxQkEsS0FBS00sS0FBSztZQUNWdlAsU0FBU3NQLElBQUksQ0FBQ0UsV0FBVyxDQUFDUDtZQUMxQkYsSUFBSVUsZUFBZSxDQUFDWDtZQUVwQi9HLG9CQUFvQixDQUFDbkYsT0FBVTtvQkFBRSxHQUFHQSxJQUFJO29CQUFFLENBQUMySSxXQUFXLEVBQUU7Z0JBQUc7WUFDM0R0RCxxQkFBcUIsQ0FBQ3JGO29CQUVNQTt1QkFGSTtvQkFDOUIsR0FBR0EsSUFBSTtvQkFDUCxDQUFDMkksV0FBVyxFQUFFO3dCQUFDOEM7MkJBQVUsQ0FBQ3pMLENBQUFBLG1CQUFBQSxpQkFBQUEsMkJBQUFBLElBQU0sQ0FBQzJJLFdBQVcsY0FBbEIzSSw4QkFBQUEsbUJBQXNCLEVBQUUsRUFBRThNLE1BQU0sQ0FBQyxDQUFDQyxPQUFTQSxTQUFTdEI7cUJBQU8sQ0FBQ3VCLEtBQUssQ0FBQyxHQUFHO2dCQUNqRztZQUFBO1lBRUFqSSxvQkFBb0IsQ0FBQy9FLE9BQVU7b0JBQUUsR0FBR0EsSUFBSTtvQkFBRSxDQUFDMkksV0FBVyxFQUFFO2dCQUFVO1FBQ3BFLEVBQUUsT0FBT3pOLE9BQU87WUFDZDZKLG9CQUFvQixDQUFDL0UsT0FBVTtvQkFBRSxHQUFHQSxJQUFJO29CQUFFLENBQUMySSxXQUFXLEVBQUU7Z0JBQVE7WUFDaEUxRCxtQkFBbUIsQ0FBQ2pGLE9BQVU7b0JBQzVCLEdBQUdBLElBQUk7b0JBQ1AsQ0FBQzJJLFdBQVcsRUFBRXpOLE1BQU1zTixPQUFPLElBQUk7Z0JBQ2pDO1FBQ0Y7SUFDRjtJQUVBLE1BQU0yRSx5QkFBeUIsT0FBT2pHLFNBQVNDLFNBQVNzRTtRQUN0RCxNQUFNOUMsYUFBYTFCLGNBQWNDLFNBQVNDO1lBQ3ZCeE47UUFBbkIsTUFBTStOLGFBQWEvTixDQUFBQSw0QkFBQUEsZ0JBQWdCLENBQUN1TixRQUFRLGNBQXpCdk4sdUNBQUFBLDRCQUE2QnVOO1FBRWhELElBQUksQ0FBQ3VFLE9BQU87WUFDVmxHLGlCQUFpQixDQUFDdkYsT0FBVTtvQkFBRSxHQUFHQSxJQUFJO29CQUFFLENBQUMySSxXQUFXLEVBQUU7Z0JBQWdCO1lBQ3JFO1FBQ0Y7UUFFQXBELGlCQUFpQixDQUFDdkYsT0FBVTtnQkFBRSxHQUFHQSxJQUFJO2dCQUFFLENBQUMySSxXQUFXLEVBQUU7WUFBVTtRQUMvRGxELGdCQUFnQixDQUFDekYsT0FBVTtnQkFBRSxHQUFHQSxJQUFJO2dCQUFFLENBQUMySSxXQUFXLEVBQUU7WUFBSztRQUV6RCxJQUFJO1lBQ0YsTUFBTVosV0FBVyxNQUFNQyxNQUFNLHlCQUE4RDBELE9BQXJDQSxtQkFBbUJ2RSxVQUFTLFdBQTRDdUUsT0FBbkNBLG1CQUFtQkQsUUFBTyxXQUFnRCxPQUF2Q0MsbUJBQW1CNUQsT0FBT0osZUFBZ0I7Z0JBQ3RLUSxPQUFPO2dCQUNQeUQsUUFBUTtZQUNWO1lBRUEsSUFBSSxDQUFDNUQsU0FBU0ksRUFBRSxFQUFFO2dCQUNoQixNQUFNLElBQUlDLE1BQU07WUFDbEI7WUFFQSxNQUFNQyxVQUFVLE1BQU1OLFNBQVNPLElBQUk7WUFDbkMsSUFBSSxFQUFDRCxvQkFBQUEsOEJBQUFBLFFBQVNFLE1BQU0sR0FBRTtnQkFDcEIsTUFBTSxJQUFJSCxNQUFNO1lBQ2xCO1lBRUEsTUFBTXdELGlCQUFpQjNQLEtBQUtvTSxRQUFRRSxNQUFNO1lBQzFDLE1BQU1zRCxjQUFjLElBQUlDLE1BQU1GLGVBQWV6UCxNQUFNO1lBQ25ELElBQUssSUFBSUcsSUFBSSxHQUFHQSxJQUFJc1AsZUFBZXpQLE1BQU0sRUFBRUcsS0FBSyxFQUFHO2dCQUNqRHVQLFdBQVcsQ0FBQ3ZQLEVBQUUsR0FBR3NQLGVBQWVyUCxVQUFVLENBQUNEO1lBQzdDO1lBQ0EsTUFBTXlQLFlBQVksSUFBSTFQLFdBQVd3UDtZQUNqQyxNQUFNRyxPQUFPLElBQUlDLEtBQUs7Z0JBQUNGO2FBQVUsRUFBRTtnQkFBRTdLLE1BQU07WUFBMEI7WUFFckUsTUFBTWdMLGNBQWNDLElBQUlDLGVBQWUsQ0FBQ0o7WUFDeEMsTUFBTUssT0FBT2pQLFNBQVNDLGFBQWEsQ0FBQztZQUNwQ2dQLEtBQUtDLElBQUksR0FBR0o7WUFDWkcsS0FBS0UsUUFBUSxHQUFHLEdBQW1DZCxPQUFoQ3RFLFFBQVFxRixPQUFPLENBQUMsUUFBUSxNQUFLLEtBQWdFLE9BQTdEZixNQUFNZSxPQUFPLENBQUMsZ0JBQWdCLEtBQUtDLFdBQVcsTUFBTSxVQUFTO1lBQ2hIclAsU0FBU3NQLElBQUksQ0FBQzVPLFdBQVcsQ0FBQ3VPO1lBQzFCQSxLQUFLTSxLQUFLO1lBQ1Z2UCxTQUFTc1AsSUFBSSxDQUFDRSxXQUFXLENBQUNQO1lBQzFCRixJQUFJVSxlQUFlLENBQUNYO1lBRXBCdkcsaUJBQWlCLENBQUMzRixPQUFVO29CQUFFLEdBQUdBLElBQUk7b0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtnQkFBRztZQUN4RDlDLGtCQUFrQixDQUFDN0Y7b0JBRVNBO3VCQUZDO29CQUMzQixHQUFHQSxJQUFJO29CQUNQLENBQUMySSxXQUFXLEVBQUU7d0JBQUM4QzsyQkFBVSxDQUFDekwsQ0FBQUEsbUJBQUFBLGlCQUFBQSwyQkFBQUEsSUFBTSxDQUFDMkksV0FBVyxjQUFsQjNJLDhCQUFBQSxtQkFBc0IsRUFBRSxFQUFFOE0sTUFBTSxDQUFDLENBQUNDLE9BQVNBLFNBQVN0QjtxQkFBTyxDQUFDdUIsS0FBSyxDQUFDLEdBQUc7Z0JBQ2pHO1lBQUE7WUFFQXpILGlCQUFpQixDQUFDdkYsT0FBVTtvQkFBRSxHQUFHQSxJQUFJO29CQUFFLENBQUMySSxXQUFXLEVBQUU7Z0JBQVU7UUFDakUsRUFBRSxPQUFPek4sT0FBTztZQUNkcUssaUJBQWlCLENBQUN2RixPQUFVO29CQUFFLEdBQUdBLElBQUk7b0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtnQkFBUTtZQUM3RGxELGdCQUFnQixDQUFDekYsT0FBVTtvQkFDekIsR0FBR0EsSUFBSTtvQkFDUCxDQUFDMkksV0FBVyxFQUFFek4sTUFBTXNOLE9BQU8sSUFBSTtnQkFDakM7UUFDRjtJQUNGO0lBRUEsTUFBTTRFLDRCQUE0QixPQUFPbEcsU0FBU0MsU0FBU3NFO1FBQ3pELE1BQU05QyxhQUFhMUIsY0FBY0MsU0FBU0M7WUFDdkJ4TjtRQUFuQixNQUFNK04sYUFBYS9OLENBQUFBLDRCQUFBQSxnQkFBZ0IsQ0FBQ3VOLFFBQVEsY0FBekJ2Tix1Q0FBQUEsNEJBQTZCdU47UUFFaEQsSUFBSSxDQUFDdUUsT0FBTztZQUNWMUYsb0JBQW9CLENBQUMvRixPQUFVO29CQUFFLEdBQUdBLElBQUk7b0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtnQkFBZ0I7WUFDeEU7UUFDRjtRQUVBNUMsb0JBQW9CLENBQUMvRixPQUFVO2dCQUFFLEdBQUdBLElBQUk7Z0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtZQUFVO1FBQ2xFMUMsbUJBQW1CLENBQUNqRyxPQUFVO2dCQUFFLEdBQUdBLElBQUk7Z0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtZQUFLO1FBRTVELElBQUk7WUFDRixNQUFNWixXQUFXLE1BQU1DLE1BQU0sNEJBQWlFMEQsT0FBckNBLG1CQUFtQnZFLFVBQVMsV0FBNEN1RSxPQUFuQ0EsbUJBQW1CRCxRQUFPLFdBQWdELE9BQXZDQyxtQkFBbUI1RCxPQUFPSixlQUFnQjtnQkFDektRLE9BQU87Z0JBQ1B5RCxRQUFRO1lBQ1Y7WUFFQSxJQUFJLENBQUM1RCxTQUFTSSxFQUFFLEVBQUU7Z0JBQ2hCLE1BQU0sSUFBSUMsTUFBTTtZQUNsQjtZQUVBLE1BQU1DLFVBQVUsTUFBTU4sU0FBU08sSUFBSTtZQUNuQyxJQUFJLEVBQUNELG9CQUFBQSw4QkFBQUEsUUFBU0UsTUFBTSxHQUFFO2dCQUNwQixNQUFNLElBQUlILE1BQU07WUFDbEI7WUFFQSxNQUFNd0QsaUJBQWlCM1AsS0FBS29NLFFBQVFFLE1BQU07WUFDMUMsTUFBTXNELGNBQWMsSUFBSUMsTUFBTUYsZUFBZXpQLE1BQU07WUFDbkQsSUFBSyxJQUFJRyxJQUFJLEdBQUdBLElBQUlzUCxlQUFlelAsTUFBTSxFQUFFRyxLQUFLLEVBQUc7Z0JBQ2pEdVAsV0FBVyxDQUFDdlAsRUFBRSxHQUFHc1AsZUFBZXJQLFVBQVUsQ0FBQ0Q7WUFDN0M7WUFDQSxNQUFNeVAsWUFBWSxJQUFJMVAsV0FBV3dQO1lBQ2pDLE1BQU1HLE9BQU8sSUFBSUMsS0FBSztnQkFBQ0Y7YUFBVSxFQUFFO2dCQUNqQzdLLE1BQU07WUFDUjtZQUVBLE1BQU1nTCxjQUFjQyxJQUFJQyxlQUFlLENBQUNKO1lBQ3hDLE1BQU1LLE9BQU9qUCxTQUFTQyxhQUFhLENBQUM7WUFDcENnUCxLQUFLQyxJQUFJLEdBQUdKO1lBQ1pHLEtBQUtFLFFBQVEsR0FBRyxHQUFtQ2QsT0FBaEN0RSxRQUFRcUYsT0FBTyxDQUFDLFFBQVEsTUFBSyxLQUFxRSxPQUFsRWYsTUFBTWUsT0FBTyxDQUFDLGdCQUFnQixLQUFLQyxXQUFXLE1BQU0sZUFBYztZQUNySHJQLFNBQVNzUCxJQUFJLENBQUM1TyxXQUFXLENBQUN1TztZQUMxQkEsS0FBS00sS0FBSztZQUNWdlAsU0FBU3NQLElBQUksQ0FBQ0UsV0FBVyxDQUFDUDtZQUMxQkYsSUFBSVUsZUFBZSxDQUFDWDtZQUVwQi9GLG9CQUFvQixDQUFDbkcsT0FBVTtvQkFBRSxHQUFHQSxJQUFJO29CQUFFLENBQUMySSxXQUFXLEVBQUU7Z0JBQUc7WUFDM0R0QyxxQkFBcUIsQ0FBQ3JHO29CQUVNQTt1QkFGSTtvQkFDOUIsR0FBR0EsSUFBSTtvQkFDUCxDQUFDMkksV0FBVyxFQUFFO3dCQUFDOEM7MkJBQVUsQ0FBQ3pMLENBQUFBLG1CQUFBQSxpQkFBQUEsMkJBQUFBLElBQU0sQ0FBQzJJLFdBQVcsY0FBbEIzSSw4QkFBQUEsbUJBQXNCLEVBQUUsRUFBRThNLE1BQU0sQ0FBQyxDQUFDQyxPQUFTQSxTQUFTdEI7cUJBQU8sQ0FBQ3VCLEtBQUssQ0FBQyxHQUFHO2dCQUNqRztZQUFBO1lBRUFqSCxvQkFBb0IsQ0FBQy9GLE9BQVU7b0JBQUUsR0FBR0EsSUFBSTtvQkFBRSxDQUFDMkksV0FBVyxFQUFFO2dCQUFVO1FBQ3BFLEVBQUUsT0FBT3pOLE9BQU87WUFDZDZLLG9CQUFvQixDQUFDL0YsT0FBVTtvQkFBRSxHQUFHQSxJQUFJO29CQUFFLENBQUMySSxXQUFXLEVBQUU7Z0JBQVE7WUFDaEUxQyxtQkFBbUIsQ0FBQ2pHLE9BQVU7b0JBQzVCLEdBQUdBLElBQUk7b0JBQ1AsQ0FBQzJJLFdBQVcsRUFBRXpOLE1BQU1zTixPQUFPLElBQUk7Z0JBQ2pDO1FBQ0Y7SUFDRjtJQUVBLE1BQU02RSxxQkFBcUIsT0FBT25HLFNBQVNDLFNBQVNzRTtRQUNsRCxNQUFNOUMsYUFBYTFCLGNBQWNDLFNBQVNDO1lBQ3ZCeE47UUFBbkIsTUFBTStOLGFBQWEvTixDQUFBQSw0QkFBQUEsZ0JBQWdCLENBQUN1TixRQUFRLGNBQXpCdk4sdUNBQUFBLDRCQUE2QnVOO1FBRWhELElBQUksQ0FBQ3VFLE9BQU87WUFDVmxGLGFBQWEsQ0FBQ3ZHLE9BQVU7b0JBQUUsR0FBR0EsSUFBSTtvQkFBRSxDQUFDMkksV0FBVyxFQUFFO2dCQUFnQjtZQUNqRTtRQUNGO1FBRUFwQyxhQUFhLENBQUN2RyxPQUFVO2dCQUFFLEdBQUdBLElBQUk7Z0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtZQUFVO1FBQzNEbEMsWUFBWSxDQUFDekcsT0FBVTtnQkFBRSxHQUFHQSxJQUFJO2dCQUFFLENBQUMySSxXQUFXLEVBQUU7WUFBSztRQUVyRCxJQUFJO1lBQ0YsTUFBTVosV0FBVyxNQUFNQyxNQUFNLHFCQUEwRDBELE9BQXJDQSxtQkFBbUJ2RSxVQUFTLFdBQTRDdUUsT0FBbkNBLG1CQUFtQkQsUUFBTyxXQUFnRCxPQUF2Q0MsbUJBQW1CNUQsT0FBT0osZUFBZ0I7Z0JBQ2xLUSxPQUFPO2dCQUNQeUQsUUFBUTtZQUNWO1lBRUEsSUFBSSxDQUFDNUQsU0FBU0ksRUFBRSxFQUFFO2dCQUNoQixNQUFNLElBQUlDLE1BQU07WUFDbEI7WUFFQSxNQUFNQyxVQUFVLE1BQU1OLFNBQVNPLElBQUk7WUFDbkMsSUFBSSxFQUFDRCxvQkFBQUEsOEJBQUFBLFFBQVNFLE1BQU0sR0FBRTtnQkFDcEIsTUFBTSxJQUFJSCxNQUFNO1lBQ2xCO1lBRUEsTUFBTXdELGlCQUFpQjNQLEtBQUtvTSxRQUFRRSxNQUFNO1lBQzFDLE1BQU1zRCxjQUFjLElBQUlDLE1BQU1GLGVBQWV6UCxNQUFNO1lBQ25ELElBQUssSUFBSW1SLFFBQVEsR0FBR0EsUUFBUTFCLGVBQWV6UCxNQUFNLEVBQUVtUixTQUFTLEVBQUc7Z0JBQzdEekIsV0FBVyxDQUFDeUIsTUFBTSxHQUFHMUIsZUFBZXJQLFVBQVUsQ0FBQytRO1lBQ2pEO1lBQ0EsTUFBTXZCLFlBQVksSUFBSTFQLFdBQVd3UDtZQUNqQyxNQUFNRyxPQUFPLElBQUlDLEtBQUs7Z0JBQUNGO2FBQVUsRUFBRTtnQkFDakM3SyxNQUFNO1lBQ1I7WUFFQSxNQUFNZ0wsY0FBY0MsSUFBSUMsZUFBZSxDQUFDSjtZQUN4QyxNQUFNSyxPQUFPalAsU0FBU0MsYUFBYSxDQUFDO1lBQ3BDZ1AsS0FBS0MsSUFBSSxHQUFHSjtZQUNaRyxLQUFLRSxRQUFRLEdBQUcsR0FBbUNkLE9BQWhDdEUsUUFBUXFGLE9BQU8sQ0FBQyxRQUFRLE1BQUssS0FBOEQsT0FBM0RmLE1BQU1lLE9BQU8sQ0FBQyxnQkFBZ0IsS0FBS0MsV0FBVyxNQUFNLFFBQU87WUFDOUdyUCxTQUFTc1AsSUFBSSxDQUFDNU8sV0FBVyxDQUFDdU87WUFDMUJBLEtBQUtNLEtBQUs7WUFDVnZQLFNBQVNzUCxJQUFJLENBQUNFLFdBQVcsQ0FBQ1A7WUFDMUJGLElBQUlVLGVBQWUsQ0FBQ1g7WUFFcEJ2RixhQUFhLENBQUMzRyxPQUFVO29CQUFFLEdBQUdBLElBQUk7b0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtnQkFBRztZQUNwRDlCLGNBQWMsQ0FBQzdHO29CQUVhQTt1QkFGSDtvQkFDdkIsR0FBR0EsSUFBSTtvQkFDUCxDQUFDMkksV0FBVyxFQUFFO3dCQUFDOEM7MkJBQVUsQ0FBQ3pMLENBQUFBLG1CQUFBQSxpQkFBQUEsMkJBQUFBLElBQU0sQ0FBQzJJLFdBQVcsY0FBbEIzSSw4QkFBQUEsbUJBQXNCLEVBQUUsRUFBRThNLE1BQU0sQ0FBQyxDQUFDQyxPQUFTQSxTQUFTdEI7cUJBQU8sQ0FBQ3VCLEtBQUssQ0FBQyxHQUFHO2dCQUNqRztZQUFBO1lBRUF6RyxhQUFhLENBQUN2RyxPQUFVO29CQUFFLEdBQUdBLElBQUk7b0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtnQkFBVTtRQUM3RCxFQUFFLE9BQU96TixPQUFPO1lBQ2RxTCxhQUFhLENBQUN2RyxPQUFVO29CQUFFLEdBQUdBLElBQUk7b0JBQUUsQ0FBQzJJLFdBQVcsRUFBRTtnQkFBUTtZQUN6RGxDLFlBQVksQ0FBQ3pHLE9BQVU7b0JBQ3JCLEdBQUdBLElBQUk7b0JBQ1AsQ0FBQzJJLFdBQVcsRUFBRXpOLE1BQU1zTixPQUFPLElBQUk7Z0JBQ2pDO1FBQ0Y7SUFDRjtJQUVBLE1BQU0rRSxzQkFBc0IsQ0FBQzdFLGFBQWF2QixTQUFTRTtZQUc1Qi9ELGtDQUVFakosc0NBQUFBO1FBSnZCLE1BQU02TSxVQUFVd0IsWUFBWW5QLEVBQUU7UUFDOUIsTUFBTW9QLGFBQWExQixjQUFjQyxTQUFTQztZQUNyQjdEO1FBQXJCLE1BQU1rSyxlQUFlbEssQ0FBQUEsMkNBQUFBLG9DQUFBQSwrQ0FBQUEsbUNBQUFBLHVCQUF5QixDQUFDNEQsUUFBUSxjQUFsQzVELHVEQUFBQSxnQ0FBb0MsQ0FBQzZELFFBQVEsY0FBN0M3RCxzREFBQUEsMkNBQWlELENBQUM7UUFDdkUsTUFBTWlFLFdBQVdILGFBQWFGLFNBQVNDLFNBQVNFO1FBQ2hELE1BQU1vRyxTQUFTcEwsU0FBUWhJLCtCQUFBQSxtQkFBbUIsQ0FBQzZNLFFBQVEsY0FBNUI3TSxvREFBQUEsdUNBQUFBLDRCQUE4QixDQUFDOE0sUUFBUSxjQUF2QzlNLDJEQUFBQSxxQ0FBeUNvTixHQUFHLENBQUNKO1FBRXBFLElBQUlBLFdBQVcsY0FBY0EsV0FBVyxxQkFBcUI7Z0JBRzFDaE87WUFGakIsTUFBTXFVLGNBQWN2RyxRQUFRc0YsV0FBVztZQUN2QyxNQUFNa0IsWUFBWXRHLE9BQU9vRixXQUFXO1lBQ3BDLE1BQU1tQixZQUFXdlUsNkJBQUFBLDBEQUFhLENBQUNxVSxZQUFZLGNBQTFCclUsaURBQUFBLDBCQUE0QixDQUFDc1UsVUFBVTtZQUN4RCxNQUFNRSxpQkFDSkQsWUFDQ0EsQ0FBQUEsU0FBU2pFLFVBQVUsQ0FBQyxVQUNqQmlFLFdBQ0EsSUFBb0MsT0FBaENBLFNBQVNwQixPQUFPLENBQUMsV0FBVyxJQUFJO1lBRTFDakosMkJBQTJCLENBQUN2RDtvQkFDQ0E7Z0JBQTNCLE1BQU1rSixlQUFlO29CQUFFLEdBQUlsSixDQUFBQSxnQkFBQUEsaUJBQUFBLDJCQUFBQSxJQUFNLENBQUNrSCxRQUFRLGNBQWZsSCwyQkFBQUEsZ0JBQW1CLENBQUMsQ0FBQztnQkFBRTtvQkFFNUNrSjtnQkFETixNQUFNNEUsc0JBQXNCO29CQUMxQixHQUFJNUUsQ0FBQUEsd0JBQUFBLFlBQVksQ0FBQy9CLFFBQVEsY0FBckIrQixtQ0FBQUEsd0JBQXlCLENBQUMsQ0FBQztvQkFDL0IsQ0FBQzdCLE9BQU8sRUFBRTtnQkFDWjtnQkFFQSxJQUFJMEIsT0FBT2dGLE1BQU0sQ0FBQ0QscUJBQXFCRSxLQUFLLENBQUMsQ0FBQ0MsUUFBVUEsVUFBVSxRQUFRO29CQUN4RSxPQUFPL0UsWUFBWSxDQUFDL0IsUUFBUTtnQkFDOUIsT0FBTztvQkFDTCtCLFlBQVksQ0FBQy9CLFFBQVEsR0FBRzJHO2dCQUMxQjtnQkFFQSxNQUFNSSxZQUFZO29CQUNoQixHQUFHbE8sSUFBSTtvQkFDUCxDQUFDa0gsUUFBUSxFQUFFZ0M7Z0JBQ2I7Z0JBRUEsSUFBSUgsT0FBT0MsSUFBSSxDQUFDRSxjQUFjL00sTUFBTSxLQUFLLEdBQUc7b0JBQzFDLE9BQU8rUixTQUFTLENBQUNoSCxRQUFRO2dCQUMzQjtnQkFFQSxPQUFPZ0g7WUFDVDtZQUVBLElBQUlULFFBQVE7Z0JBQ1ZoSyxZQUFZLENBQUN6RDtvQkFDWCxJQUFJLEVBQUNBLGlCQUFBQSwyQkFBQUEsSUFBTSxDQUFDdUgsU0FBUyxHQUFFO3dCQUNyQixPQUFPdkg7b0JBQ1Q7b0JBQ0EsTUFBTUksVUFBVTt3QkFBRSxHQUFHSixJQUFJO29CQUFDO29CQUMxQixPQUFPSSxPQUFPLENBQUNtSCxTQUFTO29CQUN4QixPQUFPbkg7Z0JBQ1Q7Z0JBQ0F1RCxjQUFjLENBQUMzRDtvQkFDYixJQUFJLEVBQUNBLGlCQUFBQSwyQkFBQUEsSUFBTSxDQUFDdUgsU0FBUyxHQUFFO3dCQUNyQixPQUFPdkg7b0JBQ1Q7b0JBQ0EsTUFBTUksVUFBVTt3QkFBRSxHQUFHSixJQUFJO29CQUFDO29CQUMxQixPQUFPSSxPQUFPLENBQUNtSCxTQUFTO29CQUN4QixPQUFPbkg7Z0JBQ1Q7Z0JBQ0F5RCxZQUFZLENBQUM3RDtvQkFDWCxJQUFJLEVBQUNBLGlCQUFBQSwyQkFBQUEsSUFBTSxDQUFDdUgsU0FBUyxHQUFFO3dCQUNyQixPQUFPdkg7b0JBQ1Q7b0JBQ0EsTUFBTUksVUFBVTt3QkFBRSxHQUFHSixJQUFJO29CQUFDO29CQUMxQixPQUFPSSxPQUFPLENBQUNtSCxTQUFTO29CQUN4QixPQUFPbkg7Z0JBQ1Q7WUFDRjtZQUVBLElBQUl5TixrQkFBa0IsYUFBa0IsYUFBYTtnQkFDbkRNLE9BQU9DLElBQUksQ0FBQ1AsZ0JBQWdCLFVBQVU7WUFDeEM7WUFFQTtRQUNGO1FBRUEsTUFBTTFOLFlBQVksRUFBQ3FOLHlCQUFBQSxtQ0FBQUEsWUFBYyxDQUFDbkcsT0FBTztRQUV6QzlELDJCQUEyQixDQUFDdkQ7Z0JBQ0NBO1lBQTNCLE1BQU1rSixlQUFlO2dCQUFFLEdBQUlsSixDQUFBQSxnQkFBQUEsaUJBQUFBLDJCQUFBQSxJQUFNLENBQUNrSCxRQUFRLGNBQWZsSCwyQkFBQUEsZ0JBQW1CLENBQUMsQ0FBQztZQUFFO2dCQUU1Q2tKO1lBRE4sTUFBTTRFLHNCQUFzQjtnQkFDMUIsR0FBSTVFLENBQUFBLHdCQUFBQSxZQUFZLENBQUMvQixRQUFRLGNBQXJCK0IsbUNBQUFBLHdCQUF5QixDQUFDLENBQUM7Z0JBQy9CLENBQUM3QixPQUFPLEVBQUVsSDtZQUNaO1lBRUEsSUFBSTRJLE9BQU9nRixNQUFNLENBQUNELHFCQUFxQkUsS0FBSyxDQUFDLENBQUNDLFFBQVVBLFVBQVUsUUFBUTtnQkFDeEUsT0FBTy9FLFlBQVksQ0FBQy9CLFFBQVE7WUFDOUIsT0FBTztnQkFDTCtCLFlBQVksQ0FBQy9CLFFBQVEsR0FBRzJHO1lBQzFCO1lBRUEsTUFBTXpFLGNBQWM7Z0JBQ2xCLEdBQUdySixJQUFJO2dCQUNQLENBQUNrSCxRQUFRLEVBQUVnQztZQUNiO1lBRUEsSUFBSUgsT0FBT0MsSUFBSSxDQUFDRSxjQUFjL00sTUFBTSxLQUFLLEdBQUc7Z0JBQzFDLE9BQU9rTixXQUFXLENBQUNuQyxRQUFRO1lBQzdCO1lBRUEsT0FBT21DO1FBQ1Q7UUFFQSxJQUFJbEosV0FBVztZQUNiLElBQUlzTixRQUFRO2dCQUNWbkcsZ0JBQWdCSixTQUFTQyxTQUFTRTtZQUNwQztZQUNBLElBQUlBLFdBQVcsMEJBQTBCO29CQUN6Qm5EO2dCQUFkLE1BQU11SCxTQUFRdkgsaUNBQUFBLGtCQUFrQixDQUFDeUUsV0FBVyxjQUE5QnpFLHFEQUFBQSwrQkFBZ0NtSyxJQUFJO2dCQUNsRDdDLDRCQUE0QnRFLFNBQVNDLFNBQVNzRTtZQUNoRDtZQUNBLElBQUlwRSxXQUFXLGdCQUFnQjtvQkFDZjNDO2dCQUFkLE1BQU0rRyxTQUFRL0csNEJBQUFBLGFBQWEsQ0FBQ2lFLFdBQVcsY0FBekJqRSxnREFBQUEsMEJBQTJCMkosSUFBSTtnQkFDN0NwQix1QkFBdUIvRixTQUFTQyxTQUFTc0U7WUFDM0M7WUFDQSxJQUFJcEUsV0FBVyxlQUFlO29CQUNkbkM7Z0JBQWQsTUFBTXVHLFNBQVF2RywrQkFBQUEsZ0JBQWdCLENBQUN5RCxXQUFXLGNBQTVCekQsbURBQUFBLDZCQUE4Qm1KLElBQUk7Z0JBQ2hEbkIsMEJBQTBCaEcsU0FBU0MsU0FBU3NFO1lBQzlDO1lBQ0EsSUFBSXBFLFdBQVcscUJBQXFCO29CQUNwQjNCO2dCQUFkLE1BQU0rRixTQUFRL0YsNEJBQUFBLGFBQWEsQ0FBQ2lELFdBQVcsY0FBekJqRCxnREFBQUEsMEJBQTJCMkksSUFBSTtnQkFDN0NsQix1QkFBdUJqRyxTQUFTQyxTQUFTc0U7WUFDM0M7WUFDQSxJQUFJcEUsV0FBVyx3QkFBd0I7b0JBQ3ZCbkI7Z0JBQWQsTUFBTXVGLFNBQVF2RiwrQkFBQUEsZ0JBQWdCLENBQUN5QyxXQUFXLGNBQTVCekMsbURBQUFBLDZCQUE4Qm1JLElBQUk7Z0JBQ2hEakIsMEJBQTBCbEcsU0FBU0MsU0FBU3NFO1lBQzlDO1lBQ0EsSUFBSXBFLFdBQVcsaUJBQWlCO29CQUNoQlg7Z0JBQWQsTUFBTStFLFNBQVEvRSx3QkFBQUEsU0FBUyxDQUFDaUMsV0FBVyxjQUFyQmpDLDRDQUFBQSxzQkFBdUIySCxJQUFJO2dCQUN6Q2hCLG1CQUFtQm5HLFNBQVNDLFNBQVNzRTtZQUN2QztRQUNGLE9BQU87WUFDTCxJQUFJZ0MsUUFBUTtnQkFDVmhLLFlBQVksQ0FBQ3pEO29CQUNYLE1BQU1JLFVBQVU7d0JBQUUsR0FBR0osSUFBSTtvQkFBQztvQkFDMUIsT0FBT0ksT0FBTyxDQUFDbUgsU0FBUztvQkFDeEIsT0FBT25IO2dCQUNUO2dCQUNBdUQsY0FBYyxDQUFDM0Q7b0JBQ2IsTUFBTUksVUFBVTt3QkFBRSxHQUFHSixJQUFJO29CQUFDO29CQUMxQixPQUFPSSxPQUFPLENBQUNtSCxTQUFTO29CQUN4QixPQUFPbkg7Z0JBQ1Q7Z0JBQ0F5RCxZQUFZLENBQUM3RDtvQkFDWCxNQUFNSSxVQUFVO3dCQUFFLEdBQUdKLElBQUk7b0JBQUM7b0JBQzFCLE9BQU9JLE9BQU8sQ0FBQ21ILFNBQVM7b0JBQ3hCLE9BQU9uSDtnQkFDVDtZQUNGO1lBRUEsSUFBSWlILFdBQVcsMEJBQTBCO2dCQUN2Q3RELHNCQUFzQixDQUFDL0Q7b0JBQ3JCLE1BQU0sRUFBRSxDQUFDMkksV0FBVyxFQUFFMkYsUUFBUSxFQUFFLEdBQUdDLE1BQU0sR0FBR3ZPO29CQUM1QyxPQUFPdU87Z0JBQ1Q7Z0JBQ0F0SyxxQkFBcUIsQ0FBQ2pFO29CQUNwQixNQUFNLEVBQUUsQ0FBQzJJLFdBQVcsRUFBRTJGLFFBQVEsRUFBRSxHQUFHQyxNQUFNLEdBQUd2TztvQkFDNUMsT0FBT3VPO2dCQUNUO2dCQUNBcEssc0JBQXNCLENBQUNuRTtvQkFDckIsTUFBTSxFQUFFLENBQUMySSxXQUFXLEVBQUUyRixRQUFRLEVBQUUsR0FBR0MsTUFBTSxHQUFHdk87b0JBQzVDLE9BQU91TztnQkFDVDtZQUNGO1lBQ0EsSUFBSWxILFdBQVcsZ0JBQWdCO2dCQUM3QjlDLGlCQUFpQixDQUFDdkU7b0JBQ2hCLE1BQU0sRUFBRSxDQUFDMkksV0FBVyxFQUFFMkYsUUFBUSxFQUFFLEdBQUdDLE1BQU0sR0FBR3ZPO29CQUM1QyxPQUFPdU87Z0JBQ1Q7Z0JBQ0E5SixnQkFBZ0IsQ0FBQ3pFO29CQUNmLE1BQU0sRUFBRSxDQUFDMkksV0FBVyxFQUFFMkYsUUFBUSxFQUFFLEdBQUdDLE1BQU0sR0FBR3ZPO29CQUM1QyxPQUFPdU87Z0JBQ1Q7Z0JBQ0E1SixpQkFBaUIsQ0FBQzNFO29CQUNoQixNQUFNLEVBQUUsQ0FBQzJJLFdBQVcsRUFBRTJGLFFBQVEsRUFBRSxHQUFHQyxNQUFNLEdBQUd2TztvQkFDNUMsT0FBT3VPO2dCQUNUO2dCQUNBMUosa0JBQWtCLENBQUM3RTtvQkFDakIsTUFBTSxFQUFFLENBQUMySSxXQUFXLEVBQUUyRixRQUFRLEVBQUUsR0FBR0MsTUFBTSxHQUFHdk87b0JBQzVDLE9BQU91TztnQkFDVDtZQUNGO1lBQ0EsSUFBSWxILFdBQVcsZUFBZTtnQkFDNUJ0QyxvQkFBb0IsQ0FBQy9FO29CQUNuQixNQUFNLEVBQUUsQ0FBQzJJLFdBQVcsRUFBRTJGLFFBQVEsRUFBRSxHQUFHQyxNQUFNLEdBQUd2TztvQkFDNUMsT0FBT3VPO2dCQUNUO2dCQUNBdEosbUJBQW1CLENBQUNqRjtvQkFDbEIsTUFBTSxFQUFFLENBQUMySSxXQUFXLEVBQUUyRixRQUFRLEVBQUUsR0FBR0MsTUFBTSxHQUFHdk87b0JBQzVDLE9BQU91TztnQkFDVDtnQkFDQXBKLG9CQUFvQixDQUFDbkY7b0JBQ25CLE1BQU0sRUFBRSxDQUFDMkksV0FBVyxFQUFFMkYsUUFBUSxFQUFFLEdBQUdDLE1BQU0sR0FBR3ZPO29CQUM1QyxPQUFPdU87Z0JBQ1Q7Z0JBQ0FsSixxQkFBcUIsQ0FBQ3JGO29CQUNwQixNQUFNLEVBQUUsQ0FBQzJJLFdBQVcsRUFBRTJGLFFBQVEsRUFBRSxHQUFHQyxNQUFNLEdBQUd2TztvQkFDNUMsT0FBT3VPO2dCQUNUO1lBQ0Y7WUFDQSxJQUFJbEgsV0FBVyxxQkFBcUI7Z0JBQ2xDOUIsaUJBQWlCLENBQUN2RjtvQkFDaEIsTUFBTSxFQUFFLENBQUMySSxXQUFXLEVBQUUyRixRQUFRLEVBQUUsR0FBR0MsTUFBTSxHQUFHdk87b0JBQzVDLE9BQU91TztnQkFDVDtnQkFDQTlJLGdCQUFnQixDQUFDekY7b0JBQ2YsTUFBTSxFQUFFLENBQUMySSxXQUFXLEVBQUUyRixRQUFRLEVBQUUsR0FBR0MsTUFBTSxHQUFHdk87b0JBQzVDLE9BQU91TztnQkFDVDtnQkFDQTVJLGlCQUFpQixDQUFDM0Y7b0JBQ2hCLE1BQU0sRUFBRSxDQUFDMkksV0FBVyxFQUFFMkYsUUFBUSxFQUFFLEdBQUdDLE1BQU0sR0FBR3ZPO29CQUM1QyxPQUFPdU87Z0JBQ1Q7Z0JBQ0ExSSxrQkFBa0IsQ0FBQzdGO29CQUNqQixNQUFNLEVBQUUsQ0FBQzJJLFdBQVcsRUFBRTJGLFFBQVEsRUFBRSxHQUFHQyxNQUFNLEdBQUd2TztvQkFDNUMsT0FBT3VPO2dCQUNUO1lBQ0Y7WUFDQSxJQUFJbEgsV0FBVyx3QkFBd0I7Z0JBQ3JDdEIsb0JBQW9CLENBQUMvRjtvQkFDbkIsTUFBTSxFQUFFLENBQUMySSxXQUFXLEVBQUUyRixRQUFRLEVBQUUsR0FBR0MsTUFBTSxHQUFHdk87b0JBQzVDLE9BQU91TztnQkFDVDtnQkFDQXRJLG1CQUFtQixDQUFDakc7b0JBQ2xCLE1BQU0sRUFBRSxDQUFDMkksV0FBVyxFQUFFMkYsUUFBUSxFQUFFLEdBQUdDLE1BQU0sR0FBR3ZPO29CQUM1QyxPQUFPdU87Z0JBQ1Q7Z0JBQ0FwSSxvQkFBb0IsQ0FBQ25HO29CQUNuQixNQUFNLEVBQUUsQ0FBQzJJLFdBQVcsRUFBRTJGLFFBQVEsRUFBRSxHQUFHQyxNQUFNLEdBQUd2TztvQkFDNUMsT0FBT3VPO2dCQUNUO2dCQUNBbEkscUJBQXFCLENBQUNyRztvQkFDcEIsTUFBTSxFQUFFLENBQUMySSxXQUFXLEVBQUUyRixRQUFRLEVBQUUsR0FBR0MsTUFBTSxHQUFHdk87b0JBQzVDLE9BQU91TztnQkFDVDtZQUNGO1lBQ0EsSUFBSWxILFdBQVcsaUJBQWlCO2dCQUM5QmQsYUFBYSxDQUFDdkc7b0JBQ1osTUFBTSxFQUFFLENBQUMySSxXQUFXLEVBQUUyRixRQUFRLEVBQUUsR0FBR0MsTUFBTSxHQUFHdk87b0JBQzVDLE9BQU91TztnQkFDVDtnQkFDQTlILFlBQVksQ0FBQ3pHO29CQUNYLE1BQU0sRUFBRSxDQUFDMkksV0FBVyxFQUFFMkYsUUFBUSxFQUFFLEdBQUdDLE1BQU0sR0FBR3ZPO29CQUM1QyxPQUFPdU87Z0JBQ1Q7Z0JBQ0E1SCxhQUFhLENBQUMzRztvQkFDWixNQUFNLEVBQUUsQ0FBQzJJLFdBQVcsRUFBRTJGLFFBQVEsRUFBRSxHQUFHQyxNQUFNLEdBQUd2TztvQkFDNUMsT0FBT3VPO2dCQUNUO2dCQUNBMUgsY0FBYyxDQUFDN0c7b0JBQ2IsTUFBTSxFQUFFLENBQUMySSxXQUFXLEVBQUUyRixRQUFRLEVBQUUsR0FBR0MsTUFBTSxHQUFHdk87b0JBQzVDLE9BQU91TztnQkFDVDtZQUNGO1FBQ0Y7SUFDRjtJQUVBLE1BQU1wVCxRQUFRd0UsYUFDVjtRQUNFakIsWUFBWTtRQUNaRixNQUFNO1FBQ05nQyxPQUFPO1FBQ1BsQyxhQUFhO1FBQ2JtQyxRQUFRO1FBQ1JqRCxRQUFRO0lBQ1YsSUFDQTtRQUNFa0IsWUFBWTtRQUNaRixNQUFNO1FBQ05nQyxPQUFPO1FBQ1BsQyxhQUFhO1FBQ2JtQyxRQUFRO1FBQ1JqRCxRQUFRO0lBQ1Y7SUFFSixxQkFDRSw4REFBQ1M7UUFDQ1gsT0FBTztZQUNMc0QsV0FBVztZQUNYbEQsT0FBTztZQUNQa0IsU0FBUztZQUNUbUMsZUFBZTtZQUNmRixZQUFZO1lBQ1pDLGdCQUFnQjtZQUNoQjBOLGlCQUFpQnJULE1BQU11RCxVQUFVO1lBQ2pDSCxPQUFPcEQsTUFBTXFELElBQUk7WUFDakJ3QyxVQUFVO1lBQ1Z5TixZQUNFO1lBQ0Z0USxTQUFTO1lBQ1Q0RCxXQUFXO1FBQ2I7OzBCQUVBLDhEQUFDZDtnQkFDQ0MsTUFBSztnQkFDTEMsU0FBUyxJQUFNdkIsY0FBYyxDQUFDRDtnQkFDOUIwQixjQUFZLGFBQTJDLE9BQTlCMUIsYUFBYSxVQUFVLFFBQU87Z0JBQ3ZEckMsT0FBTztvQkFDTDBELFVBQVU7b0JBQ1ZNLEtBQUs7b0JBQ0xDLE9BQU87b0JBQ1AzQyxTQUFTO29CQUNUaUMsWUFBWTtvQkFDWmhDLEtBQUs7b0JBQ0xWLFNBQVM7b0JBQ1RWLGNBQWM7b0JBQ2RXLFFBQVE7b0JBQ1JDLGFBQWFsRCxNQUFNbUQsV0FBVztvQkFDOUJJLFlBQVl2RCxNQUFNcUYsS0FBSztvQkFDdkJqQyxPQUFPcEQsTUFBTXFELElBQUk7b0JBQ2pCaUQsUUFBUTtvQkFDUkQsWUFBWTtvQkFDWkksWUFBWTtnQkFDZDs7a0NBRUEsOERBQUNGO2tDQUFNL0IsYUFBYSxTQUFTOzs7Ozs7a0NBQzdCLDhEQUFDK0I7d0JBQ0NwRSxPQUFPOzRCQUNMMEQsVUFBVTs0QkFDVnRELE9BQU87NEJBQ1BDLFFBQVE7NEJBQ1JGLGNBQWM7NEJBQ2RpQixZQUFZaUIsYUFBYXhFLE1BQU1zRixNQUFNLEdBQUc7NEJBQ3hDckMsUUFBUTs0QkFDUkMsYUFBYWxELE1BQU1tRCxXQUFXOzRCQUM5QnNELFlBQVk7d0JBQ2Q7a0NBRUEsNEVBQUNGOzRCQUNDcEUsT0FBTztnQ0FDTDBELFVBQVU7Z0NBQ1ZNLEtBQUs7Z0NBQ0xLLE1BQU1oQyxhQUFhLFNBQVM7Z0NBQzVCakMsT0FBTztnQ0FDUEMsUUFBUTtnQ0FDUkYsY0FBYztnQ0FDZGlCLFlBQVlpQixhQUFhLFlBQVk7Z0NBQ3JDcEMsV0FBVztnQ0FDWHFFLFlBQVk7NEJBQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUlOLDhEQUFDWDtnQkFDQ0MsTUFBSztnQkFDTEMsU0FBUyxJQUFNL0IsT0FBT2lCLElBQUksQ0FBQztnQkFDM0IvQyxPQUFPO29CQUNMb1IsV0FBVztvQkFDWEMsY0FBYztvQkFDZHhRLFNBQVM7b0JBQ1RWLGNBQWM7b0JBQ2RXLFFBQVE7b0JBQ1JDLGFBQWFsRCxNQUFNbUQsV0FBVztvQkFDOUJJLFlBQVl2RCxNQUFNcUMsTUFBTSxHQUFHLDRCQUE0QjtvQkFDdkRlLE9BQU9wRCxNQUFNcUMsTUFBTSxHQUFHLFlBQVk7b0JBQ2xDaUIsVUFBVTtvQkFDVitDLFlBQVk7b0JBQ1pDLFFBQVE7b0JBQ1JHLFlBQVk7Z0JBQ2Q7MEJBQ0Q7Ozs7OzswQkFJRCw4REFBQ0M7Z0JBQ0N2RSxPQUFPO29CQUNMbUIsVUFBVTtvQkFDVitDLFlBQVk7b0JBQ1ptTixjQUFjO29CQUNkQyxlQUFlO2dCQUNqQjswQkFDRDs7Ozs7OzBCQUtELDhEQUFDQztnQkFDQ3ZSLE9BQU87b0JBQ0xtQixVQUFVO29CQUNWK0MsWUFBWTtvQkFDWm1OLGNBQWM7b0JBQ2RDLGVBQWU7Z0JBQ2pCOzBCQUNEOzs7Ozs7MEJBS0QsOERBQUMzUTtnQkFDQ1gsT0FBTztvQkFDTHNCLFNBQVM7b0JBQ1RtQyxlQUFlO29CQUNmbEMsS0FBSztvQkFDTEosVUFBVTtvQkFDVkMsWUFBWXZELE1BQU1xRixLQUFLO29CQUN2QnBDLFFBQVE7b0JBQ1JDLGFBQWFsRCxNQUFNbUQsV0FBVztvQkFDOUJILFNBQVM7b0JBQ1RWLGNBQWM7b0JBQ2RDLE9BQU87b0JBQ1BvUixVQUFVO29CQUNWL00sV0FBVztvQkFDWHhFLFdBQVdvQyxhQUNQLHNDQUNBO2dCQUNOOzBCQUVDckcsY0FBYzJJLEdBQUcsQ0FBQyxDQUFDeUc7b0JBQ2xCLE1BQU1xRyxVQUFVakksYUFBYSxDQUFDNEIsWUFBWW5QLEVBQUUsQ0FBQztvQkFDN0MsSUFBSSxDQUFDd1YsU0FBUzt3QkFDWixPQUFPO29CQUNUO29CQUVBLE1BQU0sRUFBRWhJLFFBQVEsRUFBRUMsU0FBUyxFQUFFLEdBQUcrSDt3QkFDRjNMO29CQUE5QixNQUFNNEwsd0JBQXdCNUwsQ0FBQUEsbUNBQUFBLDZCQUFBQSx1Q0FBQUEsZ0JBQWtCLENBQUNzRixZQUFZblAsRUFBRSxDQUFDLGNBQWxDNkosOENBQUFBLG1DQUFzQyxDQUFDO29CQUVyRSxxQkFDRSw4REFBQ25GO3dCQUVDWCxPQUFPOzRCQUFFc0IsU0FBUzs0QkFBUW1DLGVBQWU7NEJBQVVsQyxLQUFLO3dCQUFNOzswQ0FFOUQsOERBQUNyRjtnQ0FBTThELE9BQU87b0NBQUVzQixTQUFTO29DQUFRaUMsWUFBWTtvQ0FBVWhDLEtBQUs7Z0NBQU87O2tEQUNqRSw4REFBQ3NEO3dDQUNDakIsTUFBSzt3Q0FDTGtCLFNBQVMyRTt3Q0FDVHpFLFVBQVUsSUFBTTBFLFVBQVUsQ0FBQ0Q7d0NBQzNCekosT0FBTzs0Q0FBRWlGLGFBQWFwSCxNQUFNc0YsTUFBTTt3Q0FBQzs7Ozs7O29DQUVwQ2lJLFlBQVlsUCxLQUFLOzs7Ozs7OzRCQUduQnVOLDBCQUNDLDhEQUFDOUk7Z0NBQ0NYLE9BQU87b0NBQ0wwRSxhQUFhO29DQUNicEQsU0FBUztvQ0FDVHFRLHFCQUFxQjtvQ0FDckJwUSxLQUFLO29DQUNMSixVQUFVO29DQUNWRixPQUFPcEQsTUFBTXFELElBQUk7Z0NBQ25COzBDQUVDa0ssWUFBWWhQLFFBQVEsQ0FBQ3VJLEdBQUcsQ0FBQyxDQUFDa0Y7d0NBSXZCN0Q7b0NBSEYsTUFBTXVGLGFBQWF4RyxRQUFRMk0scUJBQXFCLENBQUM3SCxRQUFRO29DQUN6RCxNQUFNd0IsYUFBYTFCLGNBQWN5QixZQUFZblAsRUFBRSxFQUFFNE47d0NBRS9DN0Q7b0NBREYsTUFBTTRMLGNBQ0o1TCxDQUFBQSxrREFBQUEsb0NBQUFBLCtDQUFBQSwwQ0FBQUEsdUJBQXlCLENBQUNvRixZQUFZblAsRUFBRSxDQUFDLGNBQXpDK0osOERBQUFBLHVDQUEyQyxDQUFDNkQsUUFBUSxjQUFwRDdELDZEQUFBQSxrREFBd0QsQ0FBQztvQ0FFM0QscUJBQ0UsOERBQUNyRjt3Q0FFQ1gsT0FBTzs0Q0FBRXNCLFNBQVM7NENBQVFtQyxlQUFlOzRDQUFVbEMsS0FBSzt3Q0FBTTs7MERBRTlELDhEQUFDckY7Z0RBQ0M4RCxPQUFPO29EQUNMc0IsU0FBUztvREFDVGlDLFlBQVk7b0RBQ1poQyxLQUFLO29EQUNMSCxZQUFZaUIsYUFDUmtKLGFBQ0UsNkJBQ0EsMkJBQ0ZBLGFBQ0EsWUFDQTtvREFDSnBMLGNBQWM7b0RBQ2RVLFNBQVM7b0RBQ1RDLFFBQVE7b0RBQ1JDLGFBQWFzQixhQUNUa0osYUFDRSxZQUNBLFlBQ0ZBLGFBQ0EsWUFDQTtvREFDSmpILFlBQVk7Z0RBQ2Q7O2tFQUVBLDhEQUFDTzt3REFDQ2pCLE1BQUs7d0RBQ0xrQixTQUFTeUc7d0RBQ1R2RyxVQUFVLElBQU1tRyx1QkFBdUJDLGFBQWF2Qjt3REFDcEQ3SixPQUFPOzREQUFFaUYsYUFBYXBILE1BQU1zRixNQUFNO3dEQUFDOzs7Ozs7b0RBRXBDMEc7Ozs7Ozs7NENBR0YwQiw0QkFDQyw4REFBQzVLO2dEQUNDWCxPQUFPO29EQUNMc0IsU0FBUztvREFDVG1DLGVBQWU7b0RBQ2ZsQyxLQUFLO29EQUNMbUQsYUFBYTtvREFDYm1OLGNBQWM7Z0RBQ2hCOzBEQUVDL1UsZ0JBQWdCNkgsR0FBRyxDQUFDLENBQUNvRjt3REFJbEJoTjtvREFIRixNQUFNK1UsbUJBQW1CL00sUUFBUTZNLFdBQVcsQ0FBQzdILE9BQU87b0RBQ3BELE1BQU1FLFdBQVdILGFBQWFzQixZQUFZblAsRUFBRSxFQUFFNE4sU0FBU0U7b0RBQ3ZELE1BQU1nSSxVQUNKaFYsc0NBQUFBLG1CQUFtQixDQUFDcU8sWUFBWW5QLEVBQUUsQ0FBQyxjQUFuQ2MsMERBQUFBLG1DQUFxQyxDQUFDOE0sUUFBUTtvREFDaEQsTUFBTXNHLFNBQVNwTCxRQUFRZ04sbUJBQUFBLDZCQUFBQSxPQUFRNUgsR0FBRyxDQUFDSjtvREFDbkMsTUFBTWlJLGFBQWFqSSxXQUFXO29EQUM5QixNQUFNa0kscUJBQXFCbEksV0FBVztvREFDdEMsTUFBTW1JLGdCQUFnQi9CLFVBQVUsQ0FBQzZCLGNBQWMsQ0FBQ0M7b0RBQ2hELE1BQU1FLG9CQUFvQjNMLGtCQUFrQixDQUFDNkUsV0FBVztvREFDeEQsTUFBTStHLDJCQUEyQjFMLGlCQUFpQixDQUFDMkUsV0FBVzt3REFDM0N6RTtvREFBbkIsTUFBTXlMLGFBQWF6TCxDQUFBQSxpQ0FBQUEsa0JBQWtCLENBQUN5RSxXQUFXLGNBQTlCekUsNENBQUFBLGlDQUFrQzt3REFDaENFO29EQUFyQixNQUFNd0wsZUFBZXhMLENBQUFBLGtDQUFBQSxtQkFBbUIsQ0FBQ3VFLFdBQVcsY0FBL0J2RSw2Q0FBQUEsa0NBQW1DLEVBQUU7b0RBQzFELE1BQU15TCxlQUFldkwsYUFBYSxDQUFDcUUsV0FBVztvREFDOUMsTUFBTW1ILHNCQUFzQnRMLFlBQVksQ0FBQ21FLFdBQVc7d0RBQy9CakU7b0RBQXJCLE1BQU1xTCxlQUFlckwsQ0FBQUEsNEJBQUFBLGFBQWEsQ0FBQ2lFLFdBQVcsY0FBekJqRSx1Q0FBQUEsNEJBQTZCO3dEQUM1QkU7b0RBQXRCLE1BQU1vTCxnQkFBZ0JwTCxDQUFBQSw2QkFBQUEsY0FBYyxDQUFDK0QsV0FBVyxjQUExQi9ELHdDQUFBQSw2QkFBOEIsRUFBRTtvREFDdEQsTUFBTXFMLGtCQUFrQm5MLGdCQUFnQixDQUFDNkQsV0FBVztvREFDcEQsTUFBTXVILHlCQUF5QmxMLGVBQWUsQ0FBQzJELFdBQVc7d0RBQ2xDekQ7b0RBQXhCLE1BQU1pTCxrQkFBa0JqTCxDQUFBQSwrQkFBQUEsZ0JBQWdCLENBQUN5RCxXQUFXLGNBQTVCekQsMENBQUFBLCtCQUFnQzt3REFDL0JFO29EQUF6QixNQUFNZ0wsbUJBQW1CaEwsQ0FBQUEsZ0NBQUFBLGlCQUFpQixDQUFDdUQsV0FBVyxjQUE3QnZELDJDQUFBQSxnQ0FBaUMsRUFBRTtvREFDNUQsTUFBTWlMLGVBQWUvSyxhQUFhLENBQUNxRCxXQUFXO29EQUM5QyxNQUFNMkgsc0JBQXNCOUssWUFBWSxDQUFDbUQsV0FBVzt3REFDL0JqRDtvREFBckIsTUFBTTZLLGVBQWU3SyxDQUFBQSw0QkFBQUEsYUFBYSxDQUFDaUQsV0FBVyxjQUF6QmpELHVDQUFBQSw0QkFBNkI7d0RBQzVCRTtvREFBdEIsTUFBTTRLLGdCQUFnQjVLLENBQUFBLDZCQUFBQSxjQUFjLENBQUMrQyxXQUFXLGNBQTFCL0Msd0NBQUFBLDZCQUE4QixFQUFFO29EQUN0RCxNQUFNNkssa0JBQWtCM0ssZ0JBQWdCLENBQUM2QyxXQUFXO29EQUNwRCxNQUFNK0gseUJBQXlCMUssZUFBZSxDQUFDMkMsV0FBVzt3REFDbEN6QztvREFBeEIsTUFBTXlLLGtCQUFrQnpLLENBQUFBLCtCQUFBQSxnQkFBZ0IsQ0FBQ3lDLFdBQVcsY0FBNUJ6QywwQ0FBQUEsK0JBQWdDO3dEQUMvQkU7b0RBQXpCLE1BQU13SyxtQkFBbUJ4SyxDQUFBQSxnQ0FBQUEsaUJBQWlCLENBQUN1QyxXQUFXLGNBQTdCdkMsMkNBQUFBLGdDQUFpQyxFQUFFO29EQUM1RCxNQUFNeUssV0FBV3ZLLFNBQVMsQ0FBQ3FDLFdBQVc7b0RBQ3RDLE1BQU1tSSxrQkFBa0J0SyxRQUFRLENBQUNtQyxXQUFXO3dEQUMzQmpDO29EQUFqQixNQUFNcUssV0FBV3JLLENBQUFBLHdCQUFBQSxTQUFTLENBQUNpQyxXQUFXLGNBQXJCakMsbUNBQUFBLHdCQUF5Qjt3REFDeEJFO29EQUFsQixNQUFNb0ssWUFBWXBLLENBQUFBLHlCQUFBQSxVQUFVLENBQUMrQixXQUFXLGNBQXRCL0Isb0NBQUFBLHlCQUEwQixFQUFFO29EQUU5QyxxQkFDRSw4REFBQzNJO3dEQUVDWCxPQUFPOzREQUNMc0IsU0FBUzs0REFDVG1DLGVBQWU7NERBQ2ZsQyxLQUFLO3dEQUNQOzswRUFFQSw4REFBQ3JGO2dFQUNDOEQsT0FBTztvRUFDTHNCLFNBQVM7b0VBQ1RpQyxZQUFZO29FQUNaaEMsS0FBSztvRUFDTEosVUFBVTtvRUFDVkYsT0FBT3BELE1BQU1xRCxJQUFJO2dFQUNuQjs7a0ZBRUEsOERBQUMyRDt3RUFDQ2pCLE1BQUs7d0VBQ0xrQixTQUFTZ047d0VBQ1Q5TSxVQUFVLElBQ1JpTCxvQkFBb0I3RSxhQUFhdkIsU0FBU0U7d0VBRTVDL0osT0FBTzs0RUFBRWlGLGFBQWFwSCxNQUFNc0YsTUFBTTt3RUFBQzs7Ozs7O29FQUVwQzRHOzs7Ozs7OzREQUdGK0gsb0JBQW9CSSwrQkFDbkIsOERBQUN6VTtnRUFDQ0MsWUFBWXdJLFFBQVEsQ0FBQytELFNBQVM7Z0VBQzlCdE0sV0FBV29ILFFBQVFxQixVQUFVLENBQUM2RCxTQUFTO2dFQUN2Q3JNLE9BQU8wSSxRQUFRLENBQUMyRCxTQUFTO2dFQUN6QnBNLE9BQU9BO2dFQUNQM0IsT0FBTyxHQUF3QjJOLE9BQXJCdUIsWUFBWWxQLEtBQUssRUFBQyxLQUFjNk4sT0FBWEYsU0FBUSxLQUFVLE9BQVBFOzs7Ozs7NERBSTdDK0gsb0JBQW9CL0gsV0FBVywwQ0FDOUIsOERBQUNwSjtnRUFDQ1gsT0FBTztvRUFDTHNCLFNBQVM7b0VBQ1RtQyxlQUFlO29FQUNmbEMsS0FBSztvRUFDTG1ELGFBQWE7Z0VBQ2Y7O2tGQUVBLDhEQUFDL0Q7d0VBQ0NYLE9BQU87NEVBQ0xzQixTQUFTOzRFQUNUQyxLQUFLOzRFQUNMZ0MsWUFBWTt3RUFDZDs7MEZBRUEsOERBQUNzQjtnRkFDQ2pCLE1BQUs7Z0ZBQ0wrTSxPQUFPMEI7Z0ZBQ1ByTixVQUFVLENBQUMyTztvRkFDVCxNQUFNLEVBQUVoRCxLQUFLLEVBQUUsR0FBR2dELE1BQU1DLE1BQU07b0ZBQzlCL00sc0JBQXNCLENBQUNuRSxPQUFVOzRGQUMvQixHQUFHQSxJQUFJOzRGQUNQLENBQUMySSxXQUFXLEVBQUVzRjt3RkFDaEI7b0ZBQ0EsSUFBSW5LLGtCQUFrQixDQUFDNkUsV0FBVyxLQUFLLGlCQUFpQjt3RkFDdEQ1RSxzQkFBc0IsQ0FBQy9ELE9BQVU7Z0dBQy9CLEdBQUdBLElBQUk7Z0dBQ1AsQ0FBQzJJLFdBQVcsRUFBRTs0RkFDaEI7b0ZBQ0Y7Z0ZBQ0Y7Z0ZBQ0F3SSxhQUFZO2dGQUNaN1QsT0FBTztvRkFDTDhULE1BQU07b0ZBQ05qVCxTQUFTO29GQUNUVixjQUFjO29GQUNkVyxRQUFRO29GQUNSQyxhQUFhbEQsTUFBTW1ELFdBQVc7b0ZBQzlCSSxZQUFZdkQsTUFBTXFDLE1BQU0sR0FBRyxZQUFZO29GQUN2Q2UsT0FBT3BELE1BQU1xRCxJQUFJO2dGQUNuQjs7Ozs7OzBGQUVGLDhEQUFDeUM7Z0ZBQ0NDLE1BQUs7Z0ZBQ0xDLFNBQVMsSUFDUHFLLDRCQUNFOUMsWUFBWW5QLEVBQUUsRUFDZDROLFNBQ0F3SSxXQUFXdEIsSUFBSTtnRkFHbkIvUSxPQUFPO29GQUNMYSxTQUFTO29GQUNUVixjQUFjO29GQUNkVyxRQUFRO29GQUNSTSxZQUFZdkQsTUFBTXNGLE1BQU07b0ZBQ3hCbEMsT0FBT3BELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTtvRkFDbENnRSxZQUFZO29GQUNaQyxRQUFRO2dGQUNWO2dGQUNBNFAsVUFBVTVCLHNCQUFzQjswRkFFL0JBLHNCQUFzQixZQUNuQixnQkFDQTs7Ozs7Ozs7Ozs7O29FQUdQQSxzQkFBc0IsaUNBQ3JCLDhEQUFDL047d0VBQ0NwRSxPQUFPOzRFQUNMbUIsVUFBVTs0RUFDVkYsT0FBTzt3RUFDVDtrRkFDRDs7Ozs7O29FQUlGa1Isc0JBQXNCLHlCQUNyQiw4REFBQy9OO3dFQUNDcEUsT0FBTzs0RUFDTG1CLFVBQVU7NEVBQ1ZGLE9BQU87d0VBQ1Q7OzRFQUNEOzRFQUNtQ21SLHFDQUFBQSxzQ0FBQUEsMkJBQTRCOzs7Ozs7O29FQUdqRUQsc0JBQXNCLDJCQUNyQiw4REFBQy9OO3dFQUNDcEUsT0FBTzs0RUFDTG1CLFVBQVU7NEVBQ1ZGLE9BQU9wRCxNQUFNcUMsTUFBTSxHQUFHLFlBQVk7d0VBQ3BDO2tGQUNEOzs7Ozs7b0VBSUYsQ0FBQ2lTLG1DQUNBLDhEQUFDL047d0VBQ0NwRSxPQUFPOzRFQUNMbUIsVUFBVTs0RUFDVkYsT0FBT3BELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTt3RUFDcEM7a0ZBQ0Q7Ozs7OztvRUFJRm9TLGFBQWF6VCxNQUFNLEdBQUcsbUJBQ3JCLDhEQUFDOEI7d0VBQ0NYLE9BQU87NEVBQ0xzQixTQUFTOzRFQUNUQyxLQUFLOzRFQUNMeVMsVUFBVTs0RUFDVnBULFdBQVc7d0VBQ2I7a0ZBRUMwUixhQUFhM04sR0FBRyxDQUFDLENBQUNzUCw0QkFDakIsOERBQUN0UTtnRkFFQ0MsTUFBSztnRkFDTEMsU0FBUztvRkFDUGdELHNCQUFzQixDQUFDbkUsT0FBVTs0RkFDL0IsR0FBR0EsSUFBSTs0RkFDUCxDQUFDMkksV0FBVyxFQUFFNEk7d0ZBQ2hCO29GQUNBL0YsNEJBQ0U5QyxZQUFZblAsRUFBRSxFQUNkNE4sU0FDQW9LO2dGQUVKO2dGQUNBalUsT0FBTztvRkFDTGEsU0FBUztvRkFDVFYsY0FBYztvRkFDZFcsUUFBUTtvRkFDUkMsYUFBYWxELE1BQU1tRCxXQUFXO29GQUM5QkksWUFBWXZELE1BQU1xQyxNQUFNLEdBQ3BCLFlBQ0E7b0ZBQ0plLE9BQU9wRCxNQUFNcUQsSUFBSTtvRkFDakJDLFVBQVU7b0ZBQ1ZnRCxRQUFRO2dGQUNWO2dGQUNBNFAsVUFBVTVCLHNCQUFzQjswRkFFL0I4QjsrRUEzQklBOzs7Ozs7Ozs7Ozs7Ozs7OzREQW1DaEJuQyxvQkFBb0IvSCxXQUFXLGdDQUM5Qiw4REFBQ3BKO2dFQUNDWCxPQUFPO29FQUNMc0IsU0FBUztvRUFDVG1DLGVBQWU7b0VBQ2ZsQyxLQUFLO29FQUNMbUQsYUFBYTtnRUFDZjs7a0ZBRUEsOERBQUMvRDt3RUFDQ1gsT0FBTzs0RUFDTHNCLFNBQVM7NEVBQ1RDLEtBQUs7NEVBQ0xnQyxZQUFZO3dFQUNkOzswRkFFQSw4REFBQ3NCO2dGQUNDakIsTUFBSztnRkFDTCtNLE9BQU84QjtnRkFDUHpOLFVBQVUsQ0FBQzJPO29GQUNULE1BQU0sRUFBRWhELEtBQUssRUFBRSxHQUFHZ0QsTUFBTUMsTUFBTTtvRkFDOUJ2TSxpQkFBaUIsQ0FBQzNFLE9BQVU7NEZBQzFCLEdBQUdBLElBQUk7NEZBQ1AsQ0FBQzJJLFdBQVcsRUFBRXNGO3dGQUNoQjtvRkFDQSxJQUFJM0osYUFBYSxDQUFDcUUsV0FBVyxLQUFLLGlCQUFpQjt3RkFDakRwRSxpQkFBaUIsQ0FBQ3ZFLE9BQVU7Z0dBQzFCLEdBQUdBLElBQUk7Z0dBQ1AsQ0FBQzJJLFdBQVcsRUFBRTs0RkFDaEI7b0ZBQ0Y7Z0ZBQ0Y7Z0ZBQ0F3SSxhQUFZO2dGQUNaN1QsT0FBTztvRkFDTDhULE1BQU07b0ZBQ05qVCxTQUFTO29GQUNUVixjQUFjO29GQUNkVyxRQUFRO29GQUNSQyxhQUFhbEQsTUFBTW1ELFdBQVc7b0ZBQzlCSSxZQUFZdkQsTUFBTXFDLE1BQU0sR0FBRyxZQUFZO29GQUN2Q2UsT0FBT3BELE1BQU1xRCxJQUFJO2dGQUNuQjs7Ozs7OzBGQUVGLDhEQUFDeUM7Z0ZBQ0NDLE1BQUs7Z0ZBQ0xDLFNBQVMsSUFDUDhMLHVCQUNFdkUsWUFBWW5QLEVBQUUsRUFDZDROLFNBQ0E0SSxhQUFhMUIsSUFBSTtnRkFHckIvUSxPQUFPO29GQUNMYSxTQUFTO29GQUNUVixjQUFjO29GQUNkVyxRQUFRO29GQUNSTSxZQUFZdkQsTUFBTXNGLE1BQU07b0ZBQ3hCbEMsT0FBT3BELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTtvRkFDbENnRSxZQUFZO29GQUNaQyxRQUFRO2dGQUNWO2dGQUNBNFAsVUFBVXhCLGlCQUFpQjswRkFFMUJBLGlCQUFpQixZQUNkLGdCQUNBOzs7Ozs7Ozs7Ozs7b0VBR1BBLGlCQUFpQixpQ0FDaEIsOERBQUNuTzt3RUFDQ3BFLE9BQU87NEVBQ0xtQixVQUFVOzRFQUNWRixPQUFPO3dFQUNUO2tGQUNEOzs7Ozs7b0VBSUZzUixpQkFBaUIseUJBQ2hCLDhEQUFDbk87d0VBQ0NwRSxPQUFPOzRFQUNMbUIsVUFBVTs0RUFDVkYsT0FBTzt3RUFDVDs7NEVBQ0Q7NEVBQzBCdVIsZ0NBQUFBLGlDQUFBQSxzQkFBdUI7Ozs7Ozs7b0VBR25ERCxpQkFBaUIsMkJBQ2hCLDhEQUFDbk87d0VBQ0NwRSxPQUFPOzRFQUNMbUIsVUFBVTs0RUFDVkYsT0FBT3BELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTt3RUFDcEM7a0ZBQ0Q7Ozs7OztvRUFJRixDQUFDcVMsOEJBQ0EsOERBQUNuTzt3RUFDQ3BFLE9BQU87NEVBQ0xtQixVQUFVOzRFQUNWRixPQUFPcEQsTUFBTXFDLE1BQU0sR0FBRyxZQUFZO3dFQUNwQztrRkFDRDs7Ozs7O29FQUlGd1MsY0FBYzdULE1BQU0sR0FBRyxtQkFDdEIsOERBQUM4Qjt3RUFDQ1gsT0FBTzs0RUFDTHNCLFNBQVM7NEVBQ1RDLEtBQUs7NEVBQ0x5UyxVQUFVOzRFQUNWcFQsV0FBVzt3RUFDYjtrRkFFQzhSLGNBQWMvTixHQUFHLENBQUMsQ0FBQ3NQLDRCQUNsQiw4REFBQ3RRO2dGQUVDQyxNQUFLO2dGQUNMQyxTQUFTO29GQUNQd0QsaUJBQWlCLENBQUMzRSxPQUFVOzRGQUMxQixHQUFHQSxJQUFJOzRGQUNQLENBQUMySSxXQUFXLEVBQUU0STt3RkFDaEI7b0ZBQ0F0RSx1QkFDRXZFLFlBQVluUCxFQUFFLEVBQ2Q0TixTQUNBb0s7Z0ZBRUo7Z0ZBQ0FqVSxPQUFPO29GQUNMYSxTQUFTO29GQUNUVixjQUFjO29GQUNkVyxRQUFRO29GQUNSQyxhQUFhbEQsTUFBTW1ELFdBQVc7b0ZBQzlCSSxZQUFZdkQsTUFBTXFDLE1BQU0sR0FDcEIsWUFDQTtvRkFDSmUsT0FBT3BELE1BQU1xRCxJQUFJO29GQUNqQkMsVUFBVTtvRkFDVmdELFFBQVE7Z0ZBQ1Y7Z0ZBQ0E0UCxVQUFVeEIsaUJBQWlCOzBGQUUxQjBCOytFQTNCSUE7Ozs7Ozs7Ozs7Ozs7Ozs7NERBbUNoQm5DLG9CQUFvQi9ILFdBQVcsK0JBQzlCLDhEQUFDcEo7Z0VBQ0NYLE9BQU87b0VBQ0xzQixTQUFTO29FQUNUbUMsZUFBZTtvRUFDZmxDLEtBQUs7b0VBQ0xtRCxhQUFhO2dFQUNmOztrRkFFQSw4REFBQy9EO3dFQUNDWCxPQUFPOzRFQUNMc0IsU0FBUzs0RUFDVEMsS0FBSzs0RUFDTGdDLFlBQVk7d0VBQ2Q7OzBGQUVBLDhEQUFDc0I7Z0ZBQ0NqQixNQUFLO2dGQUNMK00sT0FBT2tDO2dGQUNQN04sVUFBVSxDQUFDMk87b0ZBQ1QsTUFBTSxFQUFFaEQsS0FBSyxFQUFFLEdBQUdnRCxNQUFNQyxNQUFNO29GQUM5Qi9MLG9CQUFvQixDQUFDbkYsT0FBVTs0RkFDN0IsR0FBR0EsSUFBSTs0RkFDUCxDQUFDMkksV0FBVyxFQUFFc0Y7d0ZBQ2hCO29GQUNBLElBQUluSixnQkFBZ0IsQ0FBQzZELFdBQVcsS0FBSyxpQkFBaUI7d0ZBQ3BENUQsb0JBQW9CLENBQUMvRSxPQUFVO2dHQUM3QixHQUFHQSxJQUFJO2dHQUNQLENBQUMySSxXQUFXLEVBQUU7NEZBQ2hCO29GQUNGO2dGQUNGO2dGQUNBd0ksYUFBWTtnRkFDWjdULE9BQU87b0ZBQ0w4VCxNQUFNO29GQUNOalQsU0FBUztvRkFDVFYsY0FBYztvRkFDZFcsUUFBUTtvRkFDUkMsYUFBYWxELE1BQU1tRCxXQUFXO29GQUM5QkksWUFBWXZELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTtvRkFDdkNlLE9BQU9wRCxNQUFNcUQsSUFBSTtnRkFDbkI7Ozs7OzswRkFFRiw4REFBQ3lDO2dGQUNDQyxNQUFLO2dGQUNMQyxTQUFTLElBQ1ArTCwwQkFDRXhFLFlBQVluUCxFQUFFLEVBQ2Q0TixTQUNBZ0osZ0JBQWdCOUIsSUFBSTtnRkFHeEIvUSxPQUFPO29GQUNMYSxTQUFTO29GQUNUVixjQUFjO29GQUNkVyxRQUFRO29GQUNSTSxZQUFZdkQsTUFBTXNGLE1BQU07b0ZBQ3hCbEMsT0FBT3BELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTtvRkFDbENnRSxZQUFZO29GQUNaQyxRQUFRO2dGQUNWO2dGQUNBNFAsVUFBVXBCLG9CQUFvQjswRkFFN0JBLG9CQUFvQixZQUNqQixnQkFDQTs7Ozs7Ozs7Ozs7O29FQUdQQSxvQkFBb0IsaUNBQ25CLDhEQUFDdk87d0VBQ0NwRSxPQUFPOzRFQUNMbUIsVUFBVTs0RUFDVkYsT0FBTzt3RUFDVDtrRkFDRDs7Ozs7O29FQUlGMFIsb0JBQW9CLHlCQUNuQiw4REFBQ3ZPO3dFQUNDcEUsT0FBTzs0RUFDTG1CLFVBQVU7NEVBQ1ZGLE9BQU87d0VBQ1Q7OzRFQUNEOzRFQUNrQzJSLG1DQUFBQSxvQ0FBQUEseUJBQTBCOzs7Ozs7O29FQUc5REQsb0JBQW9CLDJCQUNuQiw4REFBQ3ZPO3dFQUNDcEUsT0FBTzs0RUFDTG1CLFVBQVU7NEVBQ1ZGLE9BQU9wRCxNQUFNcUMsTUFBTSxHQUFHLFlBQVk7d0VBQ3BDO2tGQUNEOzs7Ozs7b0VBSUYsQ0FBQ3lTLGlDQUNBLDhEQUFDdk87d0VBQ0NwRSxPQUFPOzRFQUNMbUIsVUFBVTs0RUFDVkYsT0FBT3BELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTt3RUFDcEM7a0ZBQ0Q7Ozs7OztvRUFJRjRTLGlCQUFpQmpVLE1BQU0sR0FBRyxtQkFDekIsOERBQUM4Qjt3RUFDQ1gsT0FBTzs0RUFDTHNCLFNBQVM7NEVBQ1RDLEtBQUs7NEVBQ0x5UyxVQUFVOzRFQUNWcFQsV0FBVzt3RUFDYjtrRkFFQ2tTLGlCQUFpQm5PLEdBQUcsQ0FBQyxDQUFDc1AsNEJBQ3JCLDhEQUFDdFE7Z0ZBRUNDLE1BQUs7Z0ZBQ0xDLFNBQVM7b0ZBQ1BnRSxvQkFBb0IsQ0FBQ25GLE9BQVU7NEZBQzdCLEdBQUdBLElBQUk7NEZBQ1AsQ0FBQzJJLFdBQVcsRUFBRTRJO3dGQUNoQjtvRkFDQXJFLDBCQUNFeEUsWUFBWW5QLEVBQUUsRUFDZDROLFNBQ0FvSztnRkFFSjtnRkFDQWpVLE9BQU87b0ZBQ0xhLFNBQVM7b0ZBQ1RWLGNBQWM7b0ZBQ2RXLFFBQVE7b0ZBQ1JDLGFBQWFsRCxNQUFNbUQsV0FBVztvRkFDOUJJLFlBQVl2RCxNQUFNcUMsTUFBTSxHQUNwQixZQUNBO29GQUNKZSxPQUFPcEQsTUFBTXFELElBQUk7b0ZBQ2pCQyxVQUFVO29GQUNWZ0QsUUFBUTtnRkFDVjtnRkFDQTRQLFVBQVVwQixvQkFBb0I7MEZBRTdCc0I7K0VBM0JJQTs7Ozs7Ozs7Ozs7Ozs7Ozs0REFtQ2hCbkMsb0JBQW9CL0gsV0FBVyxxQ0FDOUIsOERBQUNwSjtnRUFDQ1gsT0FBTztvRUFDTHNCLFNBQVM7b0VBQ1RtQyxlQUFlO29FQUNmbEMsS0FBSztvRUFDTG1ELGFBQWE7Z0VBQ2Y7O2tGQUVBLDhEQUFDL0Q7d0VBQ0NYLE9BQU87NEVBQ0xzQixTQUFTOzRFQUNUQyxLQUFLOzRFQUNMZ0MsWUFBWTt3RUFDZDs7MEZBRUEsOERBQUNzQjtnRkFDQ2pCLE1BQUs7Z0ZBQ0wrTSxPQUFPc0M7Z0ZBQ1BqTyxVQUFVLENBQUMyTztvRkFDVCxNQUFNLEVBQUVoRCxLQUFLLEVBQUUsR0FBR2dELE1BQU1DLE1BQU07b0ZBQzlCdkwsaUJBQWlCLENBQUMzRixPQUFVOzRGQUMxQixHQUFHQSxJQUFJOzRGQUNQLENBQUMySSxXQUFXLEVBQUVzRjt3RkFDaEI7b0ZBQ0EsSUFBSTNJLGFBQWEsQ0FBQ3FELFdBQVcsS0FBSyxpQkFBaUI7d0ZBQ2pEcEQsaUJBQWlCLENBQUN2RixPQUFVO2dHQUMxQixHQUFHQSxJQUFJO2dHQUNQLENBQUMySSxXQUFXLEVBQUU7NEZBQ2hCO29GQUNGO2dGQUNGO2dGQUNBd0ksYUFBWTtnRkFDWjdULE9BQU87b0ZBQ0w4VCxNQUFNO29GQUNOalQsU0FBUztvRkFDVFYsY0FBYztvRkFDZFcsUUFBUTtvRkFDUkMsYUFBYWxELE1BQU1tRCxXQUFXO29GQUM5QkksWUFBWXZELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTtvRkFDdkNlLE9BQU9wRCxNQUFNcUQsSUFBSTtnRkFDbkI7Ozs7OzswRkFFRiw4REFBQ3lDO2dGQUNDQyxNQUFLO2dGQUNMQyxTQUFTLElBQ1BnTSx1QkFDRXpFLFlBQVluUCxFQUFFLEVBQ2Q0TixTQUNBb0osYUFBYWxDLElBQUk7Z0ZBR3JCL1EsT0FBTztvRkFDTGEsU0FBUztvRkFDVFYsY0FBYztvRkFDZFcsUUFBUTtvRkFDUk0sWUFBWXZELE1BQU1zRixNQUFNO29GQUN4QmxDLE9BQU9wRCxNQUFNcUMsTUFBTSxHQUFHLFlBQVk7b0ZBQ2xDZ0UsWUFBWTtvRkFDWkMsUUFBUTtnRkFDVjtnRkFDQTRQLFVBQVVoQixpQkFBaUI7MEZBRTFCQSxpQkFBaUIsWUFBWSxnQkFBZ0I7Ozs7Ozs7Ozs7OztvRUFHakRBLGlCQUFpQixpQ0FDaEIsOERBQUMzTzt3RUFDQ3BFLE9BQU87NEVBQ0xtQixVQUFVOzRFQUNWRixPQUFPO3dFQUNUO2tGQUNEOzs7Ozs7b0VBSUY4UixpQkFBaUIseUJBQ2hCLDhEQUFDM087d0VBQ0NwRSxPQUFPOzRFQUNMbUIsVUFBVTs0RUFDVkYsT0FBTzt3RUFDVDs7NEVBQ0Q7NEVBQytCK1IsZ0NBQUFBLGlDQUFBQSxzQkFBdUI7Ozs7Ozs7b0VBR3hERCxpQkFBaUIsMkJBQ2hCLDhEQUFDM087d0VBQ0NwRSxPQUFPOzRFQUNMbUIsVUFBVTs0RUFDVkYsT0FBT3BELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTt3RUFDcEM7a0ZBQ0Q7Ozs7OztvRUFJRixDQUFDNlMsOEJBQ0EsOERBQUMzTzt3RUFDQ3BFLE9BQU87NEVBQ0xtQixVQUFVOzRFQUNWRixPQUFPcEQsTUFBTXFDLE1BQU0sR0FBRyxZQUFZO3dFQUNwQztrRkFDRDs7Ozs7O29FQUlGZ1QsY0FBY3JVLE1BQU0sR0FBRyxtQkFDdEIsOERBQUM4Qjt3RUFDQ1gsT0FBTzs0RUFDTHNCLFNBQVM7NEVBQ1RDLEtBQUs7NEVBQ0x5UyxVQUFVOzRFQUNWcFQsV0FBVzt3RUFDYjtrRkFFQ3NTLGNBQWN2TyxHQUFHLENBQUMsQ0FBQ3NQLDRCQUNsQiw4REFBQ3RRO2dGQUVDQyxNQUFLO2dGQUNMQyxTQUFTO29GQUNQd0UsaUJBQWlCLENBQUMzRixPQUFVOzRGQUMxQixHQUFHQSxJQUFJOzRGQUNQLENBQUMySSxXQUFXLEVBQUU0STt3RkFDaEI7b0ZBQ0FwRSx1QkFDRXpFLFlBQVluUCxFQUFFLEVBQ2Q0TixTQUNBb0s7Z0ZBRUo7Z0ZBQ0FqVSxPQUFPO29GQUNMYSxTQUFTO29GQUNUVixjQUFjO29GQUNkVyxRQUFRO29GQUNSQyxhQUFhbEQsTUFBTW1ELFdBQVc7b0ZBQzlCSSxZQUFZdkQsTUFBTXFDLE1BQU0sR0FDcEIsWUFDQTtvRkFDSmUsT0FBT3BELE1BQU1xRCxJQUFJO29GQUNqQkMsVUFBVTtvRkFDVmdELFFBQVE7Z0ZBQ1Y7Z0ZBQ0E0UCxVQUFVaEIsaUJBQWlCOzBGQUUxQmtCOytFQTNCSUE7Ozs7Ozs7Ozs7Ozs7Ozs7NERBbUNoQm5DLG9CQUFvQi9ILFdBQVcsd0NBQzlCLDhEQUFDcEo7Z0VBQ0NYLE9BQU87b0VBQ0xzQixTQUFTO29FQUNUbUMsZUFBZTtvRUFDZmxDLEtBQUs7b0VBQ0xtRCxhQUFhO2dFQUNmOztrRkFFQSw4REFBQy9EO3dFQUNDWCxPQUFPOzRFQUNMc0IsU0FBUzs0RUFDVEMsS0FBSzs0RUFDTGdDLFlBQVk7d0VBQ2Q7OzBGQUVBLDhEQUFDc0I7Z0ZBQ0NqQixNQUFLO2dGQUNMK00sT0FBTzBDO2dGQUNQck8sVUFBVSxDQUFDMk87b0ZBQ1QsTUFBTSxFQUFFaEQsS0FBSyxFQUFFLEdBQUdnRCxNQUFNQyxNQUFNO29GQUM5Qi9LLG9CQUFvQixDQUFDbkcsT0FBVTs0RkFDN0IsR0FBR0EsSUFBSTs0RkFDUCxDQUFDMkksV0FBVyxFQUFFc0Y7d0ZBQ2hCO29GQUNBLElBQUluSSxnQkFBZ0IsQ0FBQzZDLFdBQVcsS0FBSyxpQkFBaUI7d0ZBQ3BENUMsb0JBQW9CLENBQUMvRixPQUFVO2dHQUM3QixHQUFHQSxJQUFJO2dHQUNQLENBQUMySSxXQUFXLEVBQUU7NEZBQ2hCO29GQUNGO2dGQUNGO2dGQUNBd0ksYUFBWTtnRkFDWjdULE9BQU87b0ZBQ0w4VCxNQUFNO29GQUNOalQsU0FBUztvRkFDVFYsY0FBYztvRkFDZFcsUUFBUTtvRkFDUkMsYUFBYWxELE1BQU1tRCxXQUFXO29GQUM5QkksWUFBWXZELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTtvRkFDdkNlLE9BQU9wRCxNQUFNcUQsSUFBSTtnRkFDbkI7Ozs7OzswRkFFRiw4REFBQ3lDO2dGQUNDQyxNQUFLO2dGQUNMQyxTQUFTLElBQ1BpTSwwQkFDRTFFLFlBQVluUCxFQUFFLEVBQ2Q0TixTQUNBd0osZ0JBQWdCdEMsSUFBSTtnRkFHeEIvUSxPQUFPO29GQUNMYSxTQUFTO29GQUNUVixjQUFjO29GQUNkVyxRQUFRO29GQUNSTSxZQUFZdkQsTUFBTXNGLE1BQU07b0ZBQ3hCbEMsT0FBT3BELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTtvRkFDbENnRSxZQUFZO29GQUNaQyxRQUFRO2dGQUNWO2dGQUNBNFAsVUFBVVosb0JBQW9COzBGQUU3QkEsb0JBQW9CLFlBQ2pCLGdCQUNBOzs7Ozs7Ozs7Ozs7b0VBR1BBLG9CQUFvQixpQ0FDbkIsOERBQUMvTzt3RUFDQ3BFLE9BQU87NEVBQ0xtQixVQUFVOzRFQUNWRixPQUFPO3dFQUNUO2tGQUNEOzs7Ozs7b0VBSUZrUyxvQkFBb0IseUJBQ25CLDhEQUFDL087d0VBQ0NwRSxPQUFPOzRFQUNMbUIsVUFBVTs0RUFDVkYsT0FBTzt3RUFDVDs7NEVBQ0Q7NEVBQ2tDbVMsbUNBQUFBLG9DQUFBQSx5QkFBMEI7Ozs7Ozs7b0VBRzlERCxvQkFBb0IsMkJBQ25CLDhEQUFDL087d0VBQ0NwRSxPQUFPOzRFQUNMbUIsVUFBVTs0RUFDVkYsT0FBT3BELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTt3RUFDcEM7a0ZBQ0Q7Ozs7OztvRUFJRixDQUFDaVQsaUNBQ0EsOERBQUMvTzt3RUFDQ3BFLE9BQU87NEVBQ0xtQixVQUFVOzRFQUNWRixPQUFPcEQsTUFBTXFDLE1BQU0sR0FBRyxZQUFZO3dFQUNwQztrRkFDRDs7Ozs7O29FQUlGb1QsaUJBQWlCelUsTUFBTSxHQUFHLG1CQUN6Qiw4REFBQzhCO3dFQUNDWCxPQUFPOzRFQUNMc0IsU0FBUzs0RUFDVEMsS0FBSzs0RUFDTHlTLFVBQVU7NEVBQ1ZwVCxXQUFXO3dFQUNiO2tGQUVDMFMsaUJBQWlCM08sR0FBRyxDQUFDLENBQUNzUCw0QkFDckIsOERBQUN0UTtnRkFFQ0MsTUFBSztnRkFDTEMsU0FBUztvRkFDUGdGLG9CQUFvQixDQUFDbkcsT0FBVTs0RkFDN0IsR0FBR0EsSUFBSTs0RkFDUCxDQUFDMkksV0FBVyxFQUFFNEk7d0ZBQ2hCO29GQUNBbkUsMEJBQ0UxRSxZQUFZblAsRUFBRSxFQUNkNE4sU0FDQW9LO2dGQUVKO2dGQUNBalUsT0FBTztvRkFDTGEsU0FBUztvRkFDVFYsY0FBYztvRkFDZFcsUUFBUTtvRkFDUkMsYUFBYWxELE1BQU1tRCxXQUFXO29GQUM5QkksWUFBWXZELE1BQU1xQyxNQUFNLEdBQ3BCLFlBQ0E7b0ZBQ0plLE9BQU9wRCxNQUFNcUQsSUFBSTtvRkFDakJDLFVBQVU7b0ZBQ1ZnRCxRQUFRO2dGQUNWO2dGQUNBNFAsVUFBVVosb0JBQW9COzBGQUU3QmM7K0VBM0JJQTs7Ozs7Ozs7Ozs7Ozs7Ozs0REFtQ2hCbkMsb0JBQW9CL0gsV0FBVyxpQ0FDOUIsOERBQUNwSjtnRUFDQ1gsT0FBTztvRUFDTHNCLFNBQVM7b0VBQ1RtQyxlQUFlO29FQUNmbEMsS0FBSztvRUFDTG1ELGFBQWE7Z0VBQ2Y7O2tGQUVBLDhEQUFDL0Q7d0VBQ0NYLE9BQU87NEVBQ0xzQixTQUFTOzRFQUNUQyxLQUFLOzRFQUNMZ0MsWUFBWTt3RUFDZDs7MEZBRUEsOERBQUNzQjtnRkFDQ2pCLE1BQUs7Z0ZBQ0wrTSxPQUFPOEM7Z0ZBQ1B6TyxVQUFVLENBQUMyTztvRkFDVCxNQUFNLEVBQUVoRCxLQUFLLEVBQUUsR0FBR2dELE1BQU1DLE1BQU07b0ZBQzlCdkssYUFBYSxDQUFDM0csT0FBVTs0RkFDdEIsR0FBR0EsSUFBSTs0RkFDUCxDQUFDMkksV0FBVyxFQUFFc0Y7d0ZBQ2hCO29GQUNBLElBQUkzSCxTQUFTLENBQUNxQyxXQUFXLEtBQUssaUJBQWlCO3dGQUM3Q3BDLGFBQWEsQ0FBQ3ZHLE9BQVU7Z0dBQ3RCLEdBQUdBLElBQUk7Z0dBQ1AsQ0FBQzJJLFdBQVcsRUFBRTs0RkFDaEI7b0ZBQ0Y7Z0ZBQ0Y7Z0ZBQ0F3SSxhQUFZO2dGQUNaN1QsT0FBTztvRkFDTDhULE1BQU07b0ZBQ05qVCxTQUFTO29GQUNUVixjQUFjO29GQUNkVyxRQUFRO29GQUNSQyxhQUFhbEQsTUFBTW1ELFdBQVc7b0ZBQzlCSSxZQUFZdkQsTUFBTXFDLE1BQU0sR0FBRyxZQUFZO29GQUN2Q2UsT0FBT3BELE1BQU1xRCxJQUFJO2dGQUNuQjs7Ozs7OzBGQUVGLDhEQUFDeUM7Z0ZBQ0NDLE1BQUs7Z0ZBQ0xDLFNBQVMsSUFDUGtNLG1CQUNFM0UsWUFBWW5QLEVBQUUsRUFDZDROLFNBQ0E0SixTQUFTMUMsSUFBSTtnRkFHakIvUSxPQUFPO29GQUNMYSxTQUFTO29GQUNUVixjQUFjO29GQUNkVyxRQUFRO29GQUNSTSxZQUFZdkQsTUFBTXNGLE1BQU07b0ZBQ3hCbEMsT0FBT3BELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTtvRkFDbENnRSxZQUFZO29GQUNaQyxRQUFRO2dGQUNWO2dGQUNBNFAsVUFBVVIsYUFBYTswRkFFdEJBLGFBQWEsWUFBWSxnQkFBZ0I7Ozs7Ozs7Ozs7OztvRUFHN0NBLGFBQWEsaUNBQ1osOERBQUNuUDt3RUFDQ3BFLE9BQU87NEVBQ0xtQixVQUFVOzRFQUNWRixPQUFPO3dFQUNUO2tGQUNEOzs7Ozs7b0VBSUZzUyxhQUFhLHlCQUNaLDhEQUFDblA7d0VBQ0NwRSxPQUFPOzRFQUNMbUIsVUFBVTs0RUFDVkYsT0FBTzt3RUFDVDs7NEVBQ0Q7NEVBQzJCdVMsNEJBQUFBLDZCQUFBQSxrQkFBbUI7Ozs7Ozs7b0VBR2hERCxhQUFhLDJCQUNaLDhEQUFDblA7d0VBQ0NwRSxPQUFPOzRFQUNMbUIsVUFBVTs0RUFDVkYsT0FBT3BELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTt3RUFDcEM7a0ZBQ0Q7Ozs7OztvRUFJRixDQUFDcVQsMEJBQ0EsOERBQUNuUDt3RUFDQ3BFLE9BQU87NEVBQ0xtQixVQUFVOzRFQUNWRixPQUFPcEQsTUFBTXFDLE1BQU0sR0FBRyxZQUFZO3dFQUNwQztrRkFDRDs7Ozs7O29FQUlGd1QsVUFBVTdVLE1BQU0sR0FBRyxtQkFDbEIsOERBQUM4Qjt3RUFDQ1gsT0FBTzs0RUFDTHNCLFNBQVM7NEVBQ1RDLEtBQUs7NEVBQ0x5UyxVQUFVOzRFQUNWcFQsV0FBVzt3RUFDYjtrRkFFQzhTLFVBQVUvTyxHQUFHLENBQUMsQ0FBQ3NQLDRCQUNkLDhEQUFDdFE7Z0ZBRUNDLE1BQUs7Z0ZBQ0xDLFNBQVM7b0ZBQ1B3RixhQUFhLENBQUMzRyxPQUFVOzRGQUN0QixHQUFHQSxJQUFJOzRGQUNQLENBQUMySSxXQUFXLEVBQUU0STt3RkFDaEI7b0ZBQ0FsRSxtQkFDRTNFLFlBQVluUCxFQUFFLEVBQ2Q0TixTQUNBb0s7Z0ZBRUo7Z0ZBQ0FqVSxPQUFPO29GQUNMYSxTQUFTO29GQUNUVixjQUFjO29GQUNkVyxRQUFRO29GQUNSQyxhQUFhbEQsTUFBTW1ELFdBQVc7b0ZBQzlCSSxZQUFZdkQsTUFBTXFDLE1BQU0sR0FDcEIsWUFDQTtvRkFDSmUsT0FBT3BELE1BQU1xRCxJQUFJO29GQUNqQkMsVUFBVTtvRkFDVmdELFFBQVE7Z0ZBQ1Y7Z0ZBQ0E0UCxVQUFVUixhQUFhOzBGQUV0QlU7K0VBM0JJQTs7Ozs7Ozs7Ozs7Ozs7Ozs0REFtQ2hCbkMsb0JBQ0MsQ0FBQzNCLFVBQ0RwRyxXQUFXLDRCQUNYQSxXQUFXLGtCQUNYQSxXQUFXLGlCQUNYQSxXQUFXLHVCQUNYQSxXQUFXLDBCQUNYQSxXQUFXLGlDQUNYLDhEQUFDM0Y7Z0VBQ0NwRSxPQUFPO29FQUNMbUIsVUFBVTtvRUFDVkYsT0FBT3BELE1BQU1xQyxNQUFNLEdBQUcsWUFBWTtvRUFDbEN3RSxhQUFhO2dFQUNmOzBFQUNEOzs7Ozs7O3VEQTM4QkVxRjs7Ozs7Z0RBaTlCWDs7Ozs7Ozt1Q0FwaUNDLEdBQXFCRixPQUFsQnVCLFlBQVluUCxFQUFFLEVBQUMsS0FBVyxPQUFSNE47Ozs7O2dDQXlpQ2hDOzs7Ozs7O3VCQXprQ0N1QixZQUFZblAsRUFBRTs7Ozs7Z0JBOGtDekI7Ozs7Ozs7Ozs7OztBQUlSO0lBeHFFZ0JxSjs7UUFDQ3hKLGtEQUFTQTs7O01BRFZ3SiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9pbmRleC5qc3g/N2ZmZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L3JvdXRlclwiO1xuaW1wb3J0IHsgU1VCSkVDVF9GSUxFUyB9IGZyb20gXCIuLi9saWIvY29udGVudE1hcFwiO1xuXG5jb25zdCBHUkFERV9DT05GSUdTID0gW1xuICB7XG4gICAgaWQ6IFwiZ3JhZGUxMlwiLFxuICAgIGxhYmVsOiBcIkdyYWRlIDEyXCIsXG4gICAgbnVtYmVyOiAxMixcbiAgICBzdWJqZWN0czogW1wiTWF0aHNcIiwgXCJQaHlzaWNzXCIsIFwiQ2hlbWlzdHJ5XCIsIFwiQmlvbG9neVwiXSxcbiAgfSxcbiAge1xuICAgIGlkOiBcImdyYWRlMTFcIixcbiAgICBsYWJlbDogXCJHcmFkZSAxMVwiLFxuICAgIG51bWJlcjogMTEsXG4gICAgc3ViamVjdHM6IFtcIk1hdGhzXCIsIFwiUGh5c2ljc1wiLCBcIkNoZW1pc3RyeVwiLCBcIkJpb2xvZ3lcIl0sXG4gIH0sXG4gIHtcbiAgICBpZDogXCJncmFkZTEwXCIsXG4gICAgbGFiZWw6IFwiR3JhZGUgMTBcIixcbiAgICBudW1iZXI6IDEwLFxuICAgIHN1YmplY3RzOiBbXCJNYXRoc1wiLCBcIlBoeXNpY3NcIiwgXCJDaGVtaXN0cnlcIiwgXCJCaW9sb2d5XCJdLFxuICB9LFxuICB7XG4gICAgaWQ6IFwiZ3JhZGU5XCIsXG4gICAgbGFiZWw6IFwiR3JhZGUgOVwiLFxuICAgIG51bWJlcjogOSxcbiAgICBzdWJqZWN0czogW1wiTWF0aHNcIiwgXCJQaHlzaWNzXCIsIFwiQ2hlbWlzdHJ5XCIsIFwiQmlvbG9neVwiXSxcbiAgfSxcbiAge1xuICAgIGlkOiBcImdyYWRlOFwiLFxuICAgIGxhYmVsOiBcIkdyYWRlIDhcIixcbiAgICBudW1iZXI6IDgsXG4gICAgc3ViamVjdHM6IFtcIk1hdGhzXCIsIFwiUGh5c2ljc1wiLCBcIkNoZW1pc3RyeVwiLCBcIkJpb2xvZ3lcIl0sXG4gIH0sXG4gIHtcbiAgICBpZDogXCJncmFkZTdcIixcbiAgICBsYWJlbDogXCJHcmFkZSA3XCIsXG4gICAgbnVtYmVyOiA3LFxuICAgIHN1YmplY3RzOiBbXCJNYXRoc1wiLCBcIlBoeXNpY3NcIiwgXCJDaGVtaXN0cnlcIiwgXCJCaW9sb2d5XCJdLFxuICB9LFxuICB7XG4gICAgaWQ6IFwiZ3JhZGU2XCIsXG4gICAgbGFiZWw6IFwiR3JhZGUgNlwiLFxuICAgIG51bWJlcjogNixcbiAgICBzdWJqZWN0czogW1wiTWF0aHNcIiwgXCJQaHlzaWNzXCIsIFwiQ2hlbWlzdHJ5XCIsIFwiQmlvbG9neVwiXSxcbiAgfSxcbl07XG5jb25zdCBHUkFERV9OVU1CRVJfTUFQID0gR1JBREVfQ09ORklHUy5yZWR1Y2UoKGFjY3VtdWxhdG9yLCBjb25maWcpID0+IHtcbiAgYWNjdW11bGF0b3JbY29uZmlnLmlkXSA9IGNvbmZpZy5udW1iZXI7XG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn0sIHt9KTtcbmNvbnN0IEdSQURFX0NPTkZJR19CWV9JRCA9IEdSQURFX0NPTkZJR1MucmVkdWNlKChhY2N1bXVsYXRvciwgY29uZmlnKSA9PiB7XG4gIGFjY3VtdWxhdG9yW2NvbmZpZy5pZF0gPSBjb25maWc7XG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn0sIHt9KTtcbmNvbnN0IEdSQURFX0dST1VQUyA9IFtcbiAge1xuICAgIGlkOiBcImhpZ2hlclNlY29uZGFyeVwiLFxuICAgIHRpdGxlOiBcIkhpZ2hlciBTZWNvbmRhcnlcIixcbiAgICBzdWJ0aXRsZTogXCJHcmFkZSAxMiBhbmQgR3JhZGUgMTFcIixcbiAgICBncmFkZUlkczogW1wiZ3JhZGUxMlwiLCBcImdyYWRlMTFcIl0sXG4gIH0sXG4gIHtcbiAgICBpZDogXCJzZWNvbmRhcnlcIixcbiAgICB0aXRsZTogXCJTZWNvbmRhcnlcIixcbiAgICBzdWJ0aXRsZTogXCJHcmFkZXMgMTAgdG8gNlwiLFxuICAgIGdyYWRlSWRzOiBbXCJncmFkZTEwXCIsIFwiZ3JhZGU5XCIsIFwiZ3JhZGU4XCIsIFwiZ3JhZGU3XCIsIFwiZ3JhZGU2XCJdLFxuICB9LFxuXTtcbmNvbnN0IFNVQkpFQ1RfQUNUSU9OUyA9IFtcbiAgXCJTeWxsYWJ1c1wiLFxuICBcIkxlc3NvbiBQbGFuXCIsXG4gIFwiR2VuZXJhdGUgcHJlc2VudGF0aW9uc1wiLFxuICBcIlJlYWRpbmcgTWF0ZXJpYWxzXCIsXG4gIFwiR2VuZXJhdGUgUERGXCIsXG4gIFwiR2VuZXJhdGUgV2ViIFBhZ2VcIixcbiAgXCJHZW5lcmF0ZSBDb25jZXB0IE1hcFwiLFxuICBcIkdlbmVyYXRlIE1DUXNcIixcbl07XG5jb25zdCBTVUJKRUNUX1BERl9BQ1RJT05TID0ge1xuICBncmFkZTEyOiB7XG4gICAgTWF0aHM6IG5ldyBTZXQoW1wiU3lsbGFidXNcIiwgXCJSZWFkaW5nIE1hdGVyaWFsc1wiXSksXG4gIH0sXG4gIGdyYWRlMTE6IHt9LFxuICBncmFkZTEwOiB7fSxcbiAgZ3JhZGU5OiB7fSxcbiAgZ3JhZGU4OiB7fSxcbiAgZ3JhZGU3OiB7fSxcbiAgZ3JhZGU2OiB7fSxcbn07XG5cbi8vIFJlbmRlcnMgc3ViamVjdCBQREZzIG9udG8gY2FudmFzZXMgb25jZSB0aGUgZGF0YSBpcyBhdmFpbGFibGUuXG5mdW5jdGlvbiBQZGZDb250ZW50Vmlld2VyKHsgYmFzZTY0RGF0YSwgaXNMb2FkaW5nLCBlcnJvciwgdGhlbWUsIGxhYmVsIH0pIHtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmKG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGV0IGNhbmNlbGVkID0gZmFsc2U7XG5cbiAgICBjb25zdCByZW5kZXJQZGYgPSBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIWJhc2U2NERhdGEgfHwgIWNvbnRhaW5lclJlZi5jdXJyZW50KSB7XG4gICAgICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCkge1xuICAgICAgICAgIGNvbnRhaW5lclJlZi5jdXJyZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBbeyBnZXREb2N1bWVudCwgR2xvYmFsV29ya2VyT3B0aW9ucyB9LCB3b3JrZXJNb2R1bGVdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBpbXBvcnQoXCJwZGZqcy1kaXN0L2J1aWxkL3BkZlwiKSxcbiAgICAgICAgaW1wb3J0KFwicGRmanMtZGlzdC9idWlsZC9wZGYud29ya2VyLmVudHJ5XCIpLFxuICAgICAgXSk7XG5cbiAgICAgIGlmIChjYW5jZWxlZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCB3b3JrZXJTcmMgPSB3b3JrZXJNb2R1bGU/LmRlZmF1bHQgPz8gd29ya2VyTW9kdWxlO1xuICAgICAgR2xvYmFsV29ya2VyT3B0aW9ucy53b3JrZXJTcmMgPSB3b3JrZXJTcmM7XG5cbiAgICAgIGNvbnN0IGJpbmFyeVN0cmluZyA9IGF0b2IoYmFzZTY0RGF0YSk7XG4gICAgICBjb25zdCBsZW4gPSBiaW5hcnlTdHJpbmcubGVuZ3RoO1xuICAgICAgY29uc3QgYnl0ZXMgPSBuZXcgVWludDhBcnJheShsZW4pO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgICBieXRlc1tpXSA9IGJpbmFyeVN0cmluZy5jaGFyQ29kZUF0KGkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwZGZEb2MgPSBhd2FpdCBnZXREb2N1bWVudCh7IGRhdGE6IGJ5dGVzIH0pLnByb21pc2U7XG4gICAgICBpZiAoY2FuY2VsZWQgfHwgIWNvbnRhaW5lclJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRhaW5lclJlZi5jdXJyZW50O1xuICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgIGZvciAobGV0IHBhZ2VOdW1iZXIgPSAxOyBwYWdlTnVtYmVyIDw9IHBkZkRvYy5udW1QYWdlczsgcGFnZU51bWJlciArPSAxKSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSBhd2FpdCBwZGZEb2MuZ2V0UGFnZShwYWdlTnVtYmVyKTtcbiAgICAgICAgaWYgKGNhbmNlbGVkIHx8ICFjb250YWluZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0ID0gcGFnZS5nZXRWaWV3cG9ydCh7IHNjYWxlOiAxLjEgfSk7XG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy5zdHlsZS5ib3hTaGFkb3cgPSB0aGVtZS5pc0RhcmtcbiAgICAgICAgICA/IFwiMCAxMHB4IDI1cHggcmdiYSgxNSwgMjMsIDQyLCAwLjYpXCJcbiAgICAgICAgICA6IFwiMCAxMnB4IDI0cHggcmdiYSgxNSwgMjMsIDQyLCAwLjEyKVwiO1xuICAgICAgICBjYW52YXMuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIxMnB4XCI7XG4gICAgICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gXCJhdXRvXCI7XG5cbiAgICAgICAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSB2aWV3cG9ydC5oZWlnaHQ7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHZpZXdwb3J0LndpZHRoO1xuXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW52YXMpO1xuICAgICAgICBhd2FpdCBwYWdlLnJlbmRlcih7IGNhbnZhc0NvbnRleHQ6IGNvbnRleHQsIHZpZXdwb3J0IH0pLnByb21pc2U7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJlbmRlclBkZigpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNhbmNlbGVkID0gdHJ1ZTtcbiAgICAgIGlmIChjb250YWluZXJSZWYuY3VycmVudCkge1xuICAgICAgICBjb250YWluZXJSZWYuY3VycmVudC5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtiYXNlNjREYXRhLCB0aGVtZS5pc0RhcmtdKTtcblxuICBpZiAoaXNMb2FkaW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBtYXJnaW5Ub3A6IFwiMTJweFwiLFxuICAgICAgICAgIHBhZGRpbmc6IFwiMTZweFwiLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxMnB4XCIsXG4gICAgICAgICAgYm9yZGVyOiBcIjFweCBkYXNoZWRcIixcbiAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWUucGFuZWxCb3JkZXIsXG4gICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgZm9udFNpemU6IFwiMC45NXJlbVwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7YExvYWRpbmcgJHtsYWJlbH3igKZgfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChlcnJvcikge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgbWFyZ2luVG9wOiBcIjEycHhcIixcbiAgICAgICAgICBwYWRkaW5nOiBcIjE2cHhcIixcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTJweFwiLFxuICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcbiAgICAgICAgICBib3JkZXJDb2xvcjogXCIjZjg3MTcxXCIsXG4gICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgZm9udFNpemU6IFwiMC45NXJlbVwiLFxuICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmlzRGFyayA/IFwicmdiYSgyNDgsIDExMywgMTEzLCAwLjE1KVwiIDogXCIjZmVlMmUyXCIsXG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtgVW5hYmxlIHRvIGxvYWQgJHtsYWJlbH0uIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuYH1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBpZiAoIWJhc2U2NERhdGEpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgcmVmPXtjb250YWluZXJSZWZ9XG4gICAgICBzdHlsZT17e1xuICAgICAgICBkaXNwbGF5OiBcImdyaWRcIixcbiAgICAgICAgZ2FwOiBcIjE4cHhcIixcbiAgICAgICAgbWFyZ2luVG9wOiBcIjE2cHhcIixcbiAgICAgICAgb3ZlcmZsb3dYOiBcImF1dG9cIixcbiAgICAgICAgcGFkZGluZ0JvdHRvbTogXCIxMnB4XCIsXG4gICAgICB9fVxuICAgIC8+XG4gICk7XG59XG5cbmNvbnN0IENPVU5UUllfT1BUSU9OUyA9IFtcbiAgeyBpZDogXCJpbmRpYVwiLCBsYWJlbDogXCJJbmRpYVwiIH0sXG4gIHsgaWQ6IFwidXNhXCIsIGxhYmVsOiBcIlVTQVwiIH0sXG5dO1xuY29uc3QgSU5ESUFfU0NIT09MX09QVElPTlMgPSBbXG4gIHsgaWQ6IFwiY2JzZVwiLCBsYWJlbDogXCJDQlNFXCIgfSxcbiAgeyBpZDogXCJzdGF0ZUJvYXJkc1wiLCBsYWJlbDogXCJTdGF0ZSBib2FyZHNcIiB9LFxuXTtcbmNvbnN0IElORElBX0NPTExFR0VfT1BUSU9OUyA9IFtcbiAgeyBpZDogXCJlbmdpbmVlcmluZ1wiLCBsYWJlbDogXCJFbmdpbmVlcmluZ1wiIH0sXG4gIHsgaWQ6IFwibWVkaWNhbFwiLCBsYWJlbDogXCJNZWRpY2FsXCIgfSxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhvbWUoKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBbYWN0aXZlQ291bnRyaWVzLCBzZXRBY3RpdmVDb3VudHJpZXNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbaW5kaWFTY2hvb2xTZWxlY3Rpb25zLCBzZXRJbmRpYVNjaG9vbFNlbGVjdGlvbnNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbaW5kaWFDb2xsZWdlU2VsZWN0aW9ucywgc2V0SW5kaWFDb2xsZWdlU2VsZWN0aW9uc10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtpc0RhcmtNb2RlLCBzZXRJc0RhcmtNb2RlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJvdXRlci5wcmVmZXRjaChcIi9jYnNlXCIpO1xuICB9LCBbcm91dGVyXSk7XG5cbiAgY29uc3QgdG9nZ2xlQ291bnRyeSA9IChjb3VudHJ5SWQpID0+IHtcbiAgICBzZXRBY3RpdmVDb3VudHJpZXMoKHByZXYpID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgW2NvdW50cnlJZF06ICFwcmV2W2NvdW50cnlJZF0sXG4gICAgfSkpO1xuXG4gICAgaWYgKGNvdW50cnlJZCA9PT0gXCJpbmRpYVwiICYmIGFjdGl2ZUNvdW50cmllc1tjb3VudHJ5SWRdKSB7XG4gICAgICBzZXRJbmRpYVNjaG9vbFNlbGVjdGlvbnMoe30pO1xuICAgICAgc2V0SW5kaWFDb2xsZWdlU2VsZWN0aW9ucyh7fSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZUluZGlhU2Nob29sT3B0aW9uID0gKG9wdGlvbklkKSA9PiB7XG4gICAgc2V0SW5kaWFTY2hvb2xTZWxlY3Rpb25zKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBuZXh0VmFsdWUgPSAhcHJldltvcHRpb25JZF07XG4gICAgICBjb25zdCB1cGRhdGVkID0ge1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbb3B0aW9uSWRdOiBuZXh0VmFsdWUsXG4gICAgICB9O1xuXG4gICAgICBpZiAoIW5leHRWYWx1ZSkge1xuICAgICAgICBkZWxldGUgdXBkYXRlZFtvcHRpb25JZF07XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25JZCA9PT0gXCJjYnNlXCIgJiYgbmV4dFZhbHVlKSB7XG4gICAgICAgIHJvdXRlci5wdXNoKFwiL2Nic2VcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZUluZGlhQ29sbGVnZU9wdGlvbiA9IChvcHRpb25JZCkgPT4ge1xuICAgIHNldEluZGlhQ29sbGVnZVNlbGVjdGlvbnMoKHByZXYpID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgW29wdGlvbklkXTogIXByZXZbb3B0aW9uSWRdLFxuICAgIH0pKTtcbiAgfTtcblxuICBjb25zdCB0aGVtZSA9IGlzRGFya01vZGVcbiAgICA/IHtcbiAgICAgICAgYXBwQmFja2dyb3VuZDogXCIjMGYxNzJhXCIsXG4gICAgICAgIHBhbmVsOiBcIiMxMTE4MjdcIixcbiAgICAgICAgdGV4dDogXCIjZTJlOGYwXCIsXG4gICAgICAgIGFjY2VudDogXCIjMzhiZGY4XCIsXG4gICAgICAgIGJvcmRlcjogXCIjMWYyOTM3XCIsXG4gICAgICAgIHNlY29uZGFyeVRleHQ6IFwiI2NiZDVmNVwiLFxuICAgICAgfVxuICAgIDoge1xuICAgICAgICBhcHBCYWNrZ3JvdW5kOiBcIiNmMWY1ZjlcIixcbiAgICAgICAgcGFuZWw6IFwiI2ZmZmZmZlwiLFxuICAgICAgICB0ZXh0OiBcIiMwZjE3MmFcIixcbiAgICAgICAgYWNjZW50OiBcIiMyNTYzZWJcIixcbiAgICAgICAgYm9yZGVyOiBcIiNjYmQ1ZjVcIixcbiAgICAgICAgc2Vjb25kYXJ5VGV4dDogXCIjNDc1NTY5XCIsXG4gICAgICB9O1xuXG4gIHJldHVybiAoXG4gICAgPG1haW5cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIG1pbkhlaWdodDogXCIxMDB2aFwiLFxuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXG4gICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmFwcEJhY2tncm91bmQsXG4gICAgICAgIHBhZGRpbmc6IFwiNDBweCAxNnB4XCIsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICB3aWR0aDogXCJtaW4oNDgwcHgsIDEwMCUpXCIsXG4gICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICBnYXA6IFwiMjBweFwiLFxuICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLnBhbmVsLFxuICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0LFxuICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxOHB4XCIsXG4gICAgICAgICAgcGFkZGluZzogXCIzMnB4XCIsXG4gICAgICAgICAgYm94U2hhZG93OiBcIjAgMjJweCA0NHB4IHJnYmEoMTUsIDIzLCA0MiwgMC4wOClcIixcbiAgICAgICAgICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNEYXJrTW9kZSgocHJldmlvdXMpID0+ICFwcmV2aW91cyl9XG4gICAgICAgICAgYXJpYS1sYWJlbD17YFN3aXRjaCB0byAke2lzRGFya01vZGUgPyBcImxpZ2h0XCIgOiBcImRhcmtcIn0gbW9kZWB9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgICAgICB0b3A6IFwiMThweFwiLFxuICAgICAgICAgICAgcmlnaHQ6IFwiMThweFwiLFxuICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgZ2FwOiBcIjEwcHhcIixcbiAgICAgICAgICAgIHBhZGRpbmc6IFwiNnB4IDE2cHhcIixcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI5OTk5cHhcIixcbiAgICAgICAgICAgIGJvcmRlcjogYDFweCBzb2xpZCAke3RoZW1lLmJvcmRlcn1gLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogaXNEYXJrTW9kZSA/IFwicmdiYSg1NiwgMTg5LCAyNDgsIDAuMSlcIiA6IFwiI2UwZjJmZVwiLFxuICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8c3Bhbj57aXNEYXJrTW9kZSA/IFwiRGFya1wiIDogXCJMaWdodFwifTwvc3Bhbj5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcbiAgICAgICAgICAgICAgd2lkdGg6IFwiMzhweFwiLFxuICAgICAgICAgICAgICBoZWlnaHQ6IFwiMjBweFwiLFxuICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOTk5OXB4XCIsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IGlzRGFya01vZGUgPyB0aGVtZS5hY2NlbnQgOiBcIiNiZmRiZmVcIixcbiAgICAgICAgICAgICAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgICAgICAgICAgICAgYm9yZGVyOiBgMXB4IHNvbGlkICR7dGhlbWUuYm9yZGVyfWAsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgICB0b3A6IFwiMnB4XCIsXG4gICAgICAgICAgICAgICAgbGVmdDogaXNEYXJrTW9kZSA/IFwiMjBweFwiIDogXCIycHhcIixcbiAgICAgICAgICAgICAgICB3aWR0aDogXCIxNHB4XCIsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBcIjE0cHhcIixcbiAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNTAlXCIsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaXNEYXJrTW9kZSA/IFwiIzBmMTcyYVwiIDogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogXCJsZWZ0IDAuMnMgZWFzZVwiLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8aDFcbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICBmb250U2l6ZTogXCIxLjlyZW1cIixcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgV2VsY29tZSB0byB0ZWFjaHdpc2VhaS5tcGFpYXBwcy5jb21cbiAgICAgICAgPC9oMT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIiwgZ2FwOiBcIjEycHhcIiB9fT5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZm9udFNpemU6IFwiMXJlbVwiLFxuICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICBDb3VudHJpZXNcbiAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgZ2FwOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiNnB4XCIsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtDT1VOVFJZX09QVElPTlMubWFwKChjb3VudHJ5KSA9PiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtjb3VudHJ5LmlkfSBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIiwgZ2FwOiBcIjhweFwiIH19PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgZ2FwOiBcIjhweFwiIH19PlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e0Jvb2xlYW4oYWN0aXZlQ291bnRyaWVzW2NvdW50cnkuaWRdKX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHRvZ2dsZUNvdW50cnkoY291bnRyeS5pZCl9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGFjY2VudENvbG9yOiB0aGVtZS5hY2NlbnQsIHRyYW5zZm9ybTogXCJzY2FsZSgxLjA1KVwiIH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNjAwLCBjb2xvcjogdGhlbWUudGV4dCB9fT57Y291bnRyeS5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgIHtjb3VudHJ5LmlkID09PSBcImluZGlhXCIgJiYgYWN0aXZlQ291bnRyaWVzLmluZGlhID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nTGVmdDogXCIyNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsIGdhcDogXCI2cHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA1MDAsIGNvbG9yOiB0aGVtZS50ZXh0IH19PlNjaG9vbHM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogXCI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7SU5ESUFfU0NIT09MX09QVElPTlMubWFwKChzY2hvb2xPcHRpb24pID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtzY2hvb2xPcHRpb24uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIGdhcDogXCI4cHhcIiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Qm9vbGVhbihpbmRpYVNjaG9vbFNlbGVjdGlvbnNbc2Nob29sT3B0aW9uLmlkXSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gdG9nZ2xlSW5kaWFTY2hvb2xPcHRpb24oc2Nob29sT3B0aW9uLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGFjY2VudENvbG9yOiB0aGVtZS5hY2NlbnQsIHRyYW5zZm9ybTogXCJzY2FsZSgxLjAyKVwiIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyBmb250V2VpZ2h0OiA1MDAsIGNvbG9yOiB0aGVtZS50ZXh0IH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NjaG9vbE9wdGlvbi5sYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIiwgZ2FwOiBcIjZweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDUwMCwgY29sb3I6IHRoZW1lLnRleHQgfX0+Q29sbGVnZXM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogXCI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiMjBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7SU5ESUFfQ09MTEVHRV9PUFRJT05TLm1hcCgoY29sbGVnZU9wdGlvbikgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2NvbGxlZ2VPcHRpb24uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogXCJmbGV4XCIsIGFsaWduSXRlbXM6IFwiY2VudGVyXCIsIGdhcDogXCI4cHhcIiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17Qm9vbGVhbihpbmRpYUNvbGxlZ2VTZWxlY3Rpb25zW2NvbGxlZ2VPcHRpb24uaWRdKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiB0b2dnbGVJbmRpYUNvbGxlZ2VPcHRpb24oY29sbGVnZU9wdGlvbi5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBhY2NlbnRDb2xvcjogdGhlbWUuYWNjZW50LCB0cmFuc2Zvcm06IFwic2NhbGUoMS4wMilcIiB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgZm9udFdlaWdodDogNTAwLCBjb2xvcjogdGhlbWUudGV4dCB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb2xsZWdlT3B0aW9uLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbWFpbj5cbiAgKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBDYnNlRGFzaGJvYXJkKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgW2dyYWRlMTIsIHNldEdyYWRlMTJdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZ3JhZGUxMSwgc2V0R3JhZGUxMV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtncmFkZTEwLCBzZXRHcmFkZTEwXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2dyYWRlOSwgc2V0R3JhZGU5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2dyYWRlOCwgc2V0R3JhZGU4XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2dyYWRlNywgc2V0R3JhZGU3XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2dyYWRlNiwgc2V0R3JhZGU2XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzRGFya01vZGUsIHNldElzRGFya01vZGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2VsZWN0ZWRTdWJqZWN0cywgc2V0U2VsZWN0ZWRTdWJqZWN0c10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtzdWJqZWN0QWN0aW9uU2VsZWN0aW9ucywgc2V0U3ViamVjdEFjdGlvblNlbGVjdGlvbnNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbcGRmQ2FjaGUsIHNldFBkZkNhY2hlXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW3BkZkxvYWRpbmcsIHNldFBkZkxvYWRpbmddID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbcGRmRXJyb3IsIHNldFBkZkVycm9yXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW3ByZXNlbnRhdGlvblN0YXR1cywgc2V0UHJlc2VudGF0aW9uU3RhdHVzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW3ByZXNlbnRhdGlvbkVycm9yLCBzZXRQcmVzZW50YXRpb25FcnJvcl0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtwcmVzZW50YXRpb25Ub3BpY3MsIHNldFByZXNlbnRhdGlvblRvcGljc10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtwcmVzZW50YXRpb25IaXN0b3J5LCBzZXRQcmVzZW50YXRpb25IaXN0b3J5XSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW2hhbmRvdXRTdGF0dXMsIHNldEhhbmRvdXRTdGF0dXNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbaGFuZG91dEVycm9yLCBzZXRIYW5kb3V0RXJyb3JdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbaGFuZG91dFRvcGljcywgc2V0SGFuZG91dFRvcGljc10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtoYW5kb3V0SGlzdG9yeSwgc2V0SGFuZG91dEhpc3RvcnldID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbGVzc29uUGxhblN0YXR1cywgc2V0TGVzc29uUGxhblN0YXR1c10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtsZXNzb25QbGFuRXJyb3IsIHNldExlc3NvblBsYW5FcnJvcl0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtsZXNzb25QbGFuVG9waWNzLCBzZXRMZXNzb25QbGFuVG9waWNzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW2xlc3NvblBsYW5IaXN0b3J5LCBzZXRMZXNzb25QbGFuSGlzdG9yeV0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFt3ZWJQYWdlU3RhdHVzLCBzZXRXZWJQYWdlU3RhdHVzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW3dlYlBhZ2VFcnJvciwgc2V0V2ViUGFnZUVycm9yXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW3dlYlBhZ2VUb3BpY3MsIHNldFdlYlBhZ2VUb3BpY3NdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbd2ViUGFnZUhpc3RvcnksIHNldFdlYlBhZ2VIaXN0b3J5XSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW2NvbmNlcHRNYXBTdGF0dXMsIHNldENvbmNlcHRNYXBTdGF0dXNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbY29uY2VwdE1hcEVycm9yLCBzZXRDb25jZXB0TWFwRXJyb3JdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbY29uY2VwdE1hcFRvcGljcywgc2V0Q29uY2VwdE1hcFRvcGljc10gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFtjb25jZXB0TWFwSGlzdG9yeSwgc2V0Q29uY2VwdE1hcEhpc3RvcnldID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWNxU3RhdHVzLCBzZXRNY3FTdGF0dXNdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbbWNxRXJyb3IsIHNldE1jcUVycm9yXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21jcVRvcGljcywgc2V0TWNxVG9waWNzXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW21jcUhpc3RvcnksIHNldE1jcUhpc3RvcnldID0gdXNlU3RhdGUoe30pO1xuXG4gIGNvbnN0IGdyYWRlQ29udHJvbHMgPSB7XG4gICAgZ3JhZGUxMjogeyBpc0FjdGl2ZTogZ3JhZGUxMiwgc2V0QWN0aXZlOiBzZXRHcmFkZTEyIH0sXG4gICAgZ3JhZGUxMTogeyBpc0FjdGl2ZTogZ3JhZGUxMSwgc2V0QWN0aXZlOiBzZXRHcmFkZTExIH0sXG4gICAgZ3JhZGUxMDogeyBpc0FjdGl2ZTogZ3JhZGUxMCwgc2V0QWN0aXZlOiBzZXRHcmFkZTEwIH0sXG4gICAgZ3JhZGU5OiB7IGlzQWN0aXZlOiBncmFkZTksIHNldEFjdGl2ZTogc2V0R3JhZGU5IH0sXG4gICAgZ3JhZGU4OiB7IGlzQWN0aXZlOiBncmFkZTgsIHNldEFjdGl2ZTogc2V0R3JhZGU4IH0sXG4gICAgZ3JhZGU3OiB7IGlzQWN0aXZlOiBncmFkZTcsIHNldEFjdGl2ZTogc2V0R3JhZGU3IH0sXG4gICAgZ3JhZGU2OiB7IGlzQWN0aXZlOiBncmFkZTYsIHNldEFjdGl2ZTogc2V0R3JhZGU2IH0sXG4gIH07XG5cbiAgY29uc3QgZ2V0U3ViamVjdEtleSA9IChncmFkZUlkLCBzdWJqZWN0KSA9PiBgJHtncmFkZUlkfTo6JHtzdWJqZWN0fWA7XG4gIGNvbnN0IGdldEFjdGlvbktleSA9IChncmFkZUlkLCBzdWJqZWN0LCBhY3Rpb24pID0+IGAke2dyYWRlSWR9Ojoke3N1YmplY3R9Ojoke2FjdGlvbn1gO1xuXG4gIGNvbnN0IGZldGNoUGRmQ29udGVudCA9IGFzeW5jIChncmFkZUlkLCBzdWJqZWN0LCBhY3Rpb24pID0+IHtcbiAgICBjb25zdCBjYWNoZUtleSA9IGdldEFjdGlvbktleShncmFkZUlkLCBzdWJqZWN0LCBhY3Rpb24pO1xuXG4gICAgaWYgKHBkZkNhY2hlW2NhY2hlS2V5XSB8fCBwZGZMb2FkaW5nW2NhY2hlS2V5XSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBkZkFjdGlvbnMgPSBTVUJKRUNUX1BERl9BQ1RJT05TW2dyYWRlSWRdPy5bc3ViamVjdF07XG4gICAgaWYgKCFwZGZBY3Rpb25zIHx8ICFwZGZBY3Rpb25zLmhhcyhhY3Rpb24pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHNldFBkZkxvYWRpbmcoKHByZXYpID0+ICh7IC4uLnByZXYsIFtjYWNoZUtleV06IHRydWUgfSkpO1xuICAgICAgc2V0UGRmRXJyb3IoKHByZXYpID0+ICh7IC4uLnByZXYsIFtjYWNoZUtleV06IG51bGwgfSkpO1xuXG4gICAgICBjb25zdCBncmFkZVBhcmFtID0gR1JBREVfTlVNQkVSX01BUFtncmFkZUlkXSA/PyBncmFkZUlkO1xuICAgICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh7XG4gICAgICAgIHN1YmplY3QsXG4gICAgICAgIHR5cGU6IGFjdGlvbixcbiAgICAgICAgZ3JhZGU6IFN0cmluZyhncmFkZVBhcmFtKSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9zeWxsYWJ1cz8ke3BhcmFtcy50b1N0cmluZygpfWAsIHtcbiAgICAgICAgY2FjaGU6IFwibm8tc3RvcmVcIixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBmZXRjaCBjb250ZW50XCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgc2V0UGRmQ2FjaGUoKHByZXYpID0+ICh7IC4uLnByZXYsIFtjYWNoZUtleV06IHBheWxvYWQ/LmJhc2U2NCA/PyBudWxsIH0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgc2V0UGRmRXJyb3IoKHByZXYpID0+ICh7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIFtjYWNoZUtleV06IGVycm9yLm1lc3NhZ2UgfHwgXCJVbmtub3duIGVycm9yXCIsXG4gICAgICB9KSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldFBkZkxvYWRpbmcoKHByZXYpID0+ICh7IC4uLnByZXYsIFtjYWNoZUtleV06IGZhbHNlIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdG9nZ2xlU3ViamVjdFNlbGVjdGlvbiA9IChncmFkZUNvbmZpZywgc3ViamVjdCkgPT4ge1xuICAgIGNvbnN0IGdyYWRlSWQgPSBncmFkZUNvbmZpZy5pZDtcbiAgICBjb25zdCBzdWJqZWN0S2V5ID0gZ2V0U3ViamVjdEtleShncmFkZUlkLCBzdWJqZWN0KTtcbiAgICBzZXRTZWxlY3RlZFN1YmplY3RzKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCBncmFkZVN1YmplY3RzID0geyAuLi4ocHJldj8uW2dyYWRlSWRdID8/IHt9KSB9O1xuICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IEJvb2xlYW4oZ3JhZGVTdWJqZWN0c1tzdWJqZWN0XSk7XG5cbiAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgIGRlbGV0ZSBncmFkZVN1YmplY3RzW3N1YmplY3RdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JhZGVTdWJqZWN0c1tzdWJqZWN0XSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5leHRTZWxlY3RlZCA9IHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW2dyYWRlSWRdOiBncmFkZVN1YmplY3RzLFxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC5rZXlzKGdyYWRlU3ViamVjdHMpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWxldGUgbmV4dFNlbGVjdGVkW2dyYWRlSWRdO1xuICAgICAgfVxuXG4gICAgICBzZXRTdWJqZWN0QWN0aW9uU2VsZWN0aW9ucygocHJldkFjdGlvbnMpID0+IHtcbiAgICAgICAgY29uc3QgZ3JhZGVBY3Rpb25zID0geyAuLi4ocHJldkFjdGlvbnM/LltncmFkZUlkXSA/PyB7fSkgfTtcbiAgICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgICAgICBkZWxldGUgZ3JhZGVBY3Rpb25zW3N1YmplY3RdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGluaXRpYWxBY3Rpb25zU3RhdGUgPSBTVUJKRUNUX0FDVElPTlMucmVkdWNlKFxuICAgICAgICAgICAgKGFjYywgYWN0aW9uKSA9PiAoeyAuLi5hY2MsIFthY3Rpb25dOiBmYWxzZSB9KSxcbiAgICAgICAgICAgIHt9XG4gICAgICAgICAgKTtcbiAgICAgICAgICBncmFkZUFjdGlvbnNbc3ViamVjdF0gPSBpbml0aWFsQWN0aW9uc1N0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dEFjdGlvbnMgPSB7XG4gICAgICAgICAgLi4ucHJldkFjdGlvbnMsXG4gICAgICAgICAgW2dyYWRlSWRdOiBncmFkZUFjdGlvbnMsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGdyYWRlQWN0aW9ucykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZGVsZXRlIG5leHRBY3Rpb25zW2dyYWRlSWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRBY3Rpb25zO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICAgIGNvbnN0IGFjdGlvblByZWZpeCA9IGAke2dyYWRlSWR9Ojoke3N1YmplY3R9OjpgO1xuXG4gICAgICAgIHNldFBkZkNhY2hlKChwcmV2Q2FjaGUpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkQ2FjaGUgPSB7IC4uLnByZXZDYWNoZSB9O1xuICAgICAgICAgIE9iamVjdC5rZXlzKHVwZGF0ZWRDYWNoZSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYWN0aW9uUHJlZml4KSkge1xuICAgICAgICAgICAgICBkZWxldGUgdXBkYXRlZENhY2hlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWRDYWNoZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0UGRmTG9hZGluZygocHJldkxvYWRpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkTG9hZGluZyA9IHsgLi4ucHJldkxvYWRpbmcgfTtcbiAgICAgICAgICBPYmplY3Qua2V5cyh1cGRhdGVkTG9hZGluZykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYWN0aW9uUHJlZml4KSkge1xuICAgICAgICAgICAgICBkZWxldGUgdXBkYXRlZExvYWRpbmdba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZExvYWRpbmc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFBkZkVycm9yKChwcmV2RXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkRXJyb3IgPSB7IC4uLnByZXZFcnJvciB9O1xuICAgICAgICAgIE9iamVjdC5rZXlzKHVwZGF0ZWRFcnJvcikuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoYWN0aW9uUHJlZml4KSkge1xuICAgICAgICAgICAgICBkZWxldGUgdXBkYXRlZEVycm9yW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWRFcnJvcjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0UHJlc2VudGF0aW9uU3RhdHVzKChwcmV2U3RhdHVzKSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldlN0YXR1cyB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRQcmVzZW50YXRpb25FcnJvcigocHJldlByZXNlbnRhdGlvbkVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldlByZXNlbnRhdGlvbkVycm9yIH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFByZXNlbnRhdGlvblRvcGljcygocHJldlRvcGljcykgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZUb3BpY3MgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0UHJlc2VudGF0aW9uSGlzdG9yeSgocHJldkhpc3RvcnkpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2SGlzdG9yeSB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRIYW5kb3V0U3RhdHVzKChwcmV2SGFuZG91dFN0YXR1cykgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZIYW5kb3V0U3RhdHVzIH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldEhhbmRvdXRFcnJvcigocHJldkhhbmRvdXRFcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZIYW5kb3V0RXJyb3IgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0SGFuZG91dFRvcGljcygocHJldkhhbmRvdXRUb3BpY3MpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2SGFuZG91dFRvcGljcyB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRIYW5kb3V0SGlzdG9yeSgocHJldkhhbmRvdXRIaXN0b3J5KSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldkhhbmRvdXRIaXN0b3J5IH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldExlc3NvblBsYW5TdGF0dXMoKHByZXZMZXNzb25QbGFuU3RhdHVzKSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldkxlc3NvblBsYW5TdGF0dXMgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0TGVzc29uUGxhbkVycm9yKChwcmV2TGVzc29uUGxhbkVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldkxlc3NvblBsYW5FcnJvciB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRMZXNzb25QbGFuVG9waWNzKChwcmV2TGVzc29uUGxhblRvcGljcykgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZMZXNzb25QbGFuVG9waWNzIH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldExlc3NvblBsYW5IaXN0b3J5KChwcmV2TGVzc29uUGxhbkhpc3RvcnkpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2TGVzc29uUGxhbkhpc3RvcnkgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0V2ViUGFnZVN0YXR1cygocHJldldlYlBhZ2VTdGF0dXMpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2V2ViUGFnZVN0YXR1cyB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRXZWJQYWdlRXJyb3IoKHByZXZXZWJQYWdlRXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2V2ViUGFnZUVycm9yIH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFdlYlBhZ2VUb3BpY3MoKHByZXZXZWJQYWdlVG9waWNzKSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldldlYlBhZ2VUb3BpY3MgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0V2ViUGFnZUhpc3RvcnkoKHByZXZXZWJQYWdlSGlzdG9yeSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZXZWJQYWdlSGlzdG9yeSB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRDb25jZXB0TWFwU3RhdHVzKChwcmV2Q29uY2VwdE1hcFN0YXR1cykgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZDb25jZXB0TWFwU3RhdHVzIH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldENvbmNlcHRNYXBFcnJvcigocHJldkNvbmNlcHRNYXBFcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZDb25jZXB0TWFwRXJyb3IgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0Q29uY2VwdE1hcFRvcGljcygocHJldkNvbmNlcHRNYXBUb3BpY3MpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2Q29uY2VwdE1hcFRvcGljcyB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRDb25jZXB0TWFwSGlzdG9yeSgocHJldkNvbmNlcHRNYXBIaXN0b3J5KSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldkNvbmNlcHRNYXBIaXN0b3J5IH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldE1jcVN0YXR1cygocHJldk1jcVN0YXR1cykgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZNY3FTdGF0dXMgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0TWNxRXJyb3IoKHByZXZNY3FFcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXZNY3FFcnJvciB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW3N1YmplY3RLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcblxuICAgICAgICBzZXRNY3FUb3BpY3MoKHByZXZNY3FUb3BpY3MpID0+IHtcbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2TWNxVG9waWNzIH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbc3ViamVjdEtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldE1jcUhpc3RvcnkoKHByZXZNY3FIaXN0b3J5KSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldk1jcUhpc3RvcnkgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtzdWJqZWN0S2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXh0U2VsZWN0ZWQ7XG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgdHJpZ2dlclByZXNlbnRhdGlvbkRvd25sb2FkID0gYXN5bmMgKGdyYWRlSWQsIHN1YmplY3QsIHRvcGljKSA9PiB7XG4gICAgY29uc3Qgc3ViamVjdEtleSA9IGdldFN1YmplY3RLZXkoZ3JhZGVJZCwgc3ViamVjdCk7XG4gICAgY29uc3QgZ3JhZGVQYXJhbSA9IEdSQURFX05VTUJFUl9NQVBbZ3JhZGVJZF0gPz8gZ3JhZGVJZDtcblxuICAgIGlmICghdG9waWMpIHtcbiAgICAgIHNldFByZXNlbnRhdGlvblN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcIm1pc3NpbmctdG9waWNcIiB9KSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0UHJlc2VudGF0aW9uU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwibG9hZGluZ1wiIH0pKTtcbiAgICBzZXRQcmVzZW50YXRpb25FcnJvcigocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBudWxsIH0pKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL3ByZXNlbnRhdGlvbj9zdWJqZWN0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHN1YmplY3QpfSZ0b3BpYz0ke2VuY29kZVVSSUNvbXBvbmVudCh0b3BpYyl9JmdyYWRlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhncmFkZVBhcmFtKSl9YCwge1xuICAgICAgICBjYWNoZTogXCJuby1zdG9yZVwiLFxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2VuZXJhdGUgcHJlc2VudGF0aW9uXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKCFwYXlsb2FkPy5iYXNlNjQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBwcmVzZW50YXRpb24gY29udGVudFwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnl0ZUNoYXJhY3RlcnMgPSBhdG9iKHBheWxvYWQuYmFzZTY0KTtcbiAgICAgIGNvbnN0IGJ5dGVOdW1iZXJzID0gbmV3IEFycmF5KGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGJ5dGVOdW1iZXJzW2ldID0gYnl0ZUNoYXJhY3RlcnMuY2hhckNvZGVBdChpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZU51bWJlcnMpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtieXRlQXJyYXldLCB7XG4gICAgICAgIHR5cGU6IFwiYXBwbGljYXRpb24vdm5kLm9wZW54bWxmb3JtYXRzLW9mZmljZWRvY3VtZW50LnByZXNlbnRhdGlvbm1sLnByZXNlbnRhdGlvblwiLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRvd25sb2FkVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgIGxpbmsuaHJlZiA9IGRvd25sb2FkVXJsO1xuICAgICAgbGluay5kb3dubG9hZCA9IGAke3N1YmplY3QucmVwbGFjZSgvXFxzKy9nLCBcIl9cIil9XyR7dG9waWMucmVwbGFjZSgvW15hLXowLTldKy9naSwgXCJfXCIpLnRvTG93ZXJDYXNlKCkgfHwgXCJwcmVzZW50YXRpb25cIn0ucHB0eGA7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgbGluay5jbGljaygpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoZG93bmxvYWRVcmwpO1xuXG4gICAgICBzZXRQcmVzZW50YXRpb25Ub3BpY3MoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJcIiB9KSk7XG4gICAgICBzZXRQcmVzZW50YXRpb25IaXN0b3J5KChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbc3ViamVjdEtleV06IFt0b3BpYywgLi4uKHByZXY/LltzdWJqZWN0S2V5XSA/PyBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSB0b3BpYyldLnNsaWNlKDAsIDUpLFxuICAgICAgfSkpO1xuXG4gICAgICBzZXRQcmVzZW50YXRpb25TdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJzdWNjZXNzXCIgfSkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBzZXRQcmVzZW50YXRpb25TdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJlcnJvclwiIH0pKTtcbiAgICAgIHNldFByZXNlbnRhdGlvbkVycm9yKChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbc3ViamVjdEtleV06IGVycm9yLm1lc3NhZ2UgfHwgXCJVbmFibGUgdG8gZ2VuZXJhdGUgcHJlc2VudGF0aW9uXCIsXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHRyaWdnZXJIYW5kb3V0RG93bmxvYWQgPSBhc3luYyAoZ3JhZGVJZCwgc3ViamVjdCwgdG9waWMpID0+IHtcbiAgICBjb25zdCBzdWJqZWN0S2V5ID0gZ2V0U3ViamVjdEtleShncmFkZUlkLCBzdWJqZWN0KTtcbiAgICBjb25zdCBncmFkZVBhcmFtID0gR1JBREVfTlVNQkVSX01BUFtncmFkZUlkXSA/PyBncmFkZUlkO1xuXG4gICAgaWYgKCF0b3BpYykge1xuICAgICAgc2V0SGFuZG91dFN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcIm1pc3NpbmctdG9waWNcIiB9KSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0SGFuZG91dFN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcImxvYWRpbmdcIiB9KSk7XG4gICAgc2V0SGFuZG91dEVycm9yKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IG51bGwgfSkpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9hcGkvcGRmP3N1YmplY3Q9JHtlbmNvZGVVUklDb21wb25lbnQoc3ViamVjdCl9JnRvcGljPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRvcGljKX0mZ3JhZGU9JHtlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGdyYWRlUGFyYW0pKX1gLCB7XG4gICAgICAgIGNhY2hlOiBcIm5vLXN0b3JlXCIsXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBnZW5lcmF0ZSBQREZcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoIXBheWxvYWQ/LmJhc2U2NCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIFBERiBjb250ZW50XCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBieXRlQ2hhcmFjdGVycyA9IGF0b2IocGF5bG9hZC5iYXNlNjQpO1xuICAgICAgY29uc3QgYnl0ZU51bWJlcnMgPSBuZXcgQXJyYXkoYnl0ZUNoYXJhY3RlcnMubGVuZ3RoKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnl0ZUNoYXJhY3RlcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYnl0ZU51bWJlcnNbaV0gPSBieXRlQ2hhcmFjdGVycy5jaGFyQ29kZUF0KGkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBieXRlQXJyYXkgPSBuZXcgVWludDhBcnJheShieXRlTnVtYmVycyk7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2J5dGVBcnJheV0sIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9wZGZcIiB9KTtcblxuICAgICAgY29uc3QgZG93bmxvYWRVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgbGluay5ocmVmID0gZG93bmxvYWRVcmw7XG4gICAgICBsaW5rLmRvd25sb2FkID0gYCR7c3ViamVjdC5yZXBsYWNlKC9cXHMrL2csIFwiX1wiKX1fJHt0b3BpYy5yZXBsYWNlKC9bXmEtejAtOV0rL2dpLCBcIl9cIikudG9Mb3dlckNhc2UoKSB8fCBcImhhbmRvdXRcIn0ucGRmYDtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChkb3dubG9hZFVybCk7XG5cbiAgICAgIHNldEhhbmRvdXRUb3BpY3MoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJcIiB9KSk7XG4gICAgICBzZXRIYW5kb3V0SGlzdG9yeSgocHJldikgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW3N1YmplY3RLZXldOiBbdG9waWMsIC4uLihwcmV2Py5bc3ViamVjdEtleV0gPz8gW10pLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gdG9waWMpXS5zbGljZSgwLCA1KSxcbiAgICAgIH0pKTtcblxuICAgICAgc2V0SGFuZG91dFN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcInN1Y2Nlc3NcIiB9KSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHNldEhhbmRvdXRTdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJlcnJvclwiIH0pKTtcbiAgICAgIHNldEhhbmRvdXRFcnJvcigocHJldikgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW3N1YmplY3RLZXldOiBlcnJvci5tZXNzYWdlIHx8IFwiVW5hYmxlIHRvIGdlbmVyYXRlIFBERlwiLFxuICAgICAgfSkpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB0cmlnZ2VyTGVzc29uUGxhbkRvd25sb2FkID0gYXN5bmMgKGdyYWRlSWQsIHN1YmplY3QsIHRvcGljKSA9PiB7XG4gICAgY29uc3Qgc3ViamVjdEtleSA9IGdldFN1YmplY3RLZXkoZ3JhZGVJZCwgc3ViamVjdCk7XG4gICAgY29uc3QgZ3JhZGVQYXJhbSA9IEdSQURFX05VTUJFUl9NQVBbZ3JhZGVJZF0gPz8gZ3JhZGVJZDtcblxuICAgIGlmICghdG9waWMpIHtcbiAgICAgIHNldExlc3NvblBsYW5TdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJtaXNzaW5nLXRvcGljXCIgfSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldExlc3NvblBsYW5TdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJsb2FkaW5nXCIgfSkpO1xuICAgIHNldExlc3NvblBsYW5FcnJvcigocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBudWxsIH0pKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvYXBpL2xlc3Nvbi1wbGFuP3N1YmplY3Q9JHtlbmNvZGVVUklDb21wb25lbnQoc3ViamVjdCl9JnRvcGljPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRvcGljKX0mZ3JhZGU9JHtlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGdyYWRlUGFyYW0pKX1gLCB7XG4gICAgICAgIGNhY2hlOiBcIm5vLXN0b3JlXCIsXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBnZW5lcmF0ZSBsZXNzb24gcGxhblwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIGlmICghcGF5bG9hZD8uYmFzZTY0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1pc3NpbmcgbGVzc29uIHBsYW4gY29udGVudFwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnl0ZUNoYXJhY3RlcnMgPSBhdG9iKHBheWxvYWQuYmFzZTY0KTtcbiAgICAgIGNvbnN0IGJ5dGVOdW1iZXJzID0gbmV3IEFycmF5KGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGJ5dGVOdW1iZXJzW2ldID0gYnl0ZUNoYXJhY3RlcnMuY2hhckNvZGVBdChpKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZU51bWJlcnMpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtieXRlQXJyYXldLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vcGRmXCIgfSk7XG5cbiAgICAgIGNvbnN0IGRvd25sb2FkVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICAgIGNvbnN0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgIGxpbmsuaHJlZiA9IGRvd25sb2FkVXJsO1xuICAgICAgbGluay5kb3dubG9hZCA9IGAke3N1YmplY3QucmVwbGFjZSgvXFxzKy9nLCBcIl9cIil9XyR7dG9waWMucmVwbGFjZSgvW15hLXowLTldKy9naSwgXCJfXCIpLnRvTG93ZXJDYXNlKCkgfHwgXCJsZXNzb25fcGxhblwifS5wZGZgO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGRvd25sb2FkVXJsKTtcblxuICAgICAgc2V0TGVzc29uUGxhblRvcGljcygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcIlwiIH0pKTtcbiAgICAgIHNldExlc3NvblBsYW5IaXN0b3J5KChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbc3ViamVjdEtleV06IFt0b3BpYywgLi4uKHByZXY/LltzdWJqZWN0S2V5XSA/PyBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSB0b3BpYyldLnNsaWNlKDAsIDUpLFxuICAgICAgfSkpO1xuXG4gICAgICBzZXRMZXNzb25QbGFuU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwic3VjY2Vzc1wiIH0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgc2V0TGVzc29uUGxhblN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcImVycm9yXCIgfSkpO1xuICAgICAgc2V0TGVzc29uUGxhbkVycm9yKChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbc3ViamVjdEtleV06IGVycm9yLm1lc3NhZ2UgfHwgXCJVbmFibGUgdG8gZ2VuZXJhdGUgbGVzc29uIHBsYW5cIixcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdHJpZ2dlcldlYlBhZ2VEb3dubG9hZCA9IGFzeW5jIChncmFkZUlkLCBzdWJqZWN0LCB0b3BpYykgPT4ge1xuICAgIGNvbnN0IHN1YmplY3RLZXkgPSBnZXRTdWJqZWN0S2V5KGdyYWRlSWQsIHN1YmplY3QpO1xuICAgIGNvbnN0IGdyYWRlUGFyYW0gPSBHUkFERV9OVU1CRVJfTUFQW2dyYWRlSWRdID8/IGdyYWRlSWQ7XG5cbiAgICBpZiAoIXRvcGljKSB7XG4gICAgICBzZXRXZWJQYWdlU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwibWlzc2luZy10b3BpY1wiIH0pKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRXZWJQYWdlU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwibG9hZGluZ1wiIH0pKTtcbiAgICBzZXRXZWJQYWdlRXJyb3IoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogbnVsbCB9KSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS93ZWItcGFnZT9zdWJqZWN0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHN1YmplY3QpfSZ0b3BpYz0ke2VuY29kZVVSSUNvbXBvbmVudCh0b3BpYyl9JmdyYWRlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhncmFkZVBhcmFtKSl9YCwge1xuICAgICAgICBjYWNoZTogXCJuby1zdG9yZVwiLFxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2VuZXJhdGUgd2ViIHBhZ2VcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoIXBheWxvYWQ/LmJhc2U2NCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIHdlYiBwYWdlIGNvbnRlbnRcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ5dGVDaGFyYWN0ZXJzID0gYXRvYihwYXlsb2FkLmJhc2U2NCk7XG4gICAgICBjb25zdCBieXRlTnVtYmVycyA9IG5ldyBBcnJheShieXRlQ2hhcmFjdGVycy5sZW5ndGgpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlQ2hhcmFjdGVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBieXRlTnVtYmVyc1tpXSA9IGJ5dGVDaGFyYWN0ZXJzLmNoYXJDb2RlQXQoaSk7XG4gICAgICB9XG4gICAgICBjb25zdCBieXRlQXJyYXkgPSBuZXcgVWludDhBcnJheShieXRlTnVtYmVycyk7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2J5dGVBcnJheV0sIHsgdHlwZTogXCJ0ZXh0L2h0bWw7Y2hhcnNldD11dGYtOFwiIH0pO1xuXG4gICAgICBjb25zdCBkb3dubG9hZFVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICBsaW5rLmhyZWYgPSBkb3dubG9hZFVybDtcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBgJHtzdWJqZWN0LnJlcGxhY2UoL1xccysvZywgXCJfXCIpfV8ke3RvcGljLnJlcGxhY2UoL1teYS16MC05XSsvZ2ksIFwiX1wiKS50b0xvd2VyQ2FzZSgpIHx8IFwibGVzc29uXCJ9Lmh0bWxgO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGRvd25sb2FkVXJsKTtcblxuICAgICAgc2V0V2ViUGFnZVRvcGljcygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcIlwiIH0pKTtcbiAgICAgIHNldFdlYlBhZ2VIaXN0b3J5KChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbc3ViamVjdEtleV06IFt0b3BpYywgLi4uKHByZXY/LltzdWJqZWN0S2V5XSA/PyBbXSkuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSB0b3BpYyldLnNsaWNlKDAsIDUpLFxuICAgICAgfSkpO1xuXG4gICAgICBzZXRXZWJQYWdlU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwic3VjY2Vzc1wiIH0pKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgc2V0V2ViUGFnZVN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcImVycm9yXCIgfSkpO1xuICAgICAgc2V0V2ViUGFnZUVycm9yKChwcmV2KSA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBbc3ViamVjdEtleV06IGVycm9yLm1lc3NhZ2UgfHwgXCJVbmFibGUgdG8gZ2VuZXJhdGUgd2ViIHBhZ2VcIixcbiAgICAgIH0pKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgdHJpZ2dlckNvbmNlcHRNYXBEb3dubG9hZCA9IGFzeW5jIChncmFkZUlkLCBzdWJqZWN0LCB0b3BpYykgPT4ge1xuICAgIGNvbnN0IHN1YmplY3RLZXkgPSBnZXRTdWJqZWN0S2V5KGdyYWRlSWQsIHN1YmplY3QpO1xuICAgIGNvbnN0IGdyYWRlUGFyYW0gPSBHUkFERV9OVU1CRVJfTUFQW2dyYWRlSWRdID8/IGdyYWRlSWQ7XG5cbiAgICBpZiAoIXRvcGljKSB7XG4gICAgICBzZXRDb25jZXB0TWFwU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwibWlzc2luZy10b3BpY1wiIH0pKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRDb25jZXB0TWFwU3RhdHVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBbc3ViamVjdEtleV06IFwibG9hZGluZ1wiIH0pKTtcbiAgICBzZXRDb25jZXB0TWFwRXJyb3IoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogbnVsbCB9KSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9jb25jZXB0LW1hcD9zdWJqZWN0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHN1YmplY3QpfSZ0b3BpYz0ke2VuY29kZVVSSUNvbXBvbmVudCh0b3BpYyl9JmdyYWRlPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyhncmFkZVBhcmFtKSl9YCwge1xuICAgICAgICBjYWNoZTogXCJuby1zdG9yZVwiLFxuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZ2VuZXJhdGUgY29uY2VwdCBtYXBcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoIXBheWxvYWQ/LmJhc2U2NCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNaXNzaW5nIGNvbmNlcHQgbWFwIGNvbnRlbnRcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJ5dGVDaGFyYWN0ZXJzID0gYXRvYihwYXlsb2FkLmJhc2U2NCk7XG4gICAgICBjb25zdCBieXRlTnVtYmVycyA9IG5ldyBBcnJheShieXRlQ2hhcmFjdGVycy5sZW5ndGgpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlQ2hhcmFjdGVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBieXRlTnVtYmVyc1tpXSA9IGJ5dGVDaGFyYWN0ZXJzLmNoYXJDb2RlQXQoaSk7XG4gICAgICB9XG4gICAgICBjb25zdCBieXRlQXJyYXkgPSBuZXcgVWludDhBcnJheShieXRlTnVtYmVycyk7XG4gICAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2J5dGVBcnJheV0sIHtcbiAgICAgICAgdHlwZTogXCJhcHBsaWNhdGlvbi9wZGZcIixcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBkb3dubG9hZFVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICBsaW5rLmhyZWYgPSBkb3dubG9hZFVybDtcbiAgICAgIGxpbmsuZG93bmxvYWQgPSBgJHtzdWJqZWN0LnJlcGxhY2UoL1xccysvZywgXCJfXCIpfV8ke3RvcGljLnJlcGxhY2UoL1teYS16MC05XSsvZ2ksIFwiX1wiKS50b0xvd2VyQ2FzZSgpIHx8IFwiY29uY2VwdF9tYXBcIn0ucGRmYDtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChkb3dubG9hZFVybCk7XG5cbiAgICAgIHNldENvbmNlcHRNYXBUb3BpY3MoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJcIiB9KSk7XG4gICAgICBzZXRDb25jZXB0TWFwSGlzdG9yeSgocHJldikgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW3N1YmplY3RLZXldOiBbdG9waWMsIC4uLihwcmV2Py5bc3ViamVjdEtleV0gPz8gW10pLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gdG9waWMpXS5zbGljZSgwLCA1KSxcbiAgICAgIH0pKTtcblxuICAgICAgc2V0Q29uY2VwdE1hcFN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcInN1Y2Nlc3NcIiB9KSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHNldENvbmNlcHRNYXBTdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJlcnJvclwiIH0pKTtcbiAgICAgIHNldENvbmNlcHRNYXBFcnJvcigocHJldikgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW3N1YmplY3RLZXldOiBlcnJvci5tZXNzYWdlIHx8IFwiVW5hYmxlIHRvIGdlbmVyYXRlIGNvbmNlcHQgbWFwXCIsXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHRyaWdnZXJNY3FEb3dubG9hZCA9IGFzeW5jIChncmFkZUlkLCBzdWJqZWN0LCB0b3BpYykgPT4ge1xuICAgIGNvbnN0IHN1YmplY3RLZXkgPSBnZXRTdWJqZWN0S2V5KGdyYWRlSWQsIHN1YmplY3QpO1xuICAgIGNvbnN0IGdyYWRlUGFyYW0gPSBHUkFERV9OVU1CRVJfTUFQW2dyYWRlSWRdID8/IGdyYWRlSWQ7XG5cbiAgICBpZiAoIXRvcGljKSB7XG4gICAgICBzZXRNY3FTdGF0dXMoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogXCJtaXNzaW5nLXRvcGljXCIgfSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldE1jcVN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcImxvYWRpbmdcIiB9KSk7XG4gICAgc2V0TWNxRXJyb3IoKHByZXYpID0+ICh7IC4uLnByZXYsIFtzdWJqZWN0S2V5XTogbnVsbCB9KSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgL2FwaS9tY3FzP3N1YmplY3Q9JHtlbmNvZGVVUklDb21wb25lbnQoc3ViamVjdCl9JnRvcGljPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHRvcGljKX0mZ3JhZGU9JHtlbmNvZGVVUklDb21wb25lbnQoU3RyaW5nKGdyYWRlUGFyYW0pKX1gLCB7XG4gICAgICAgIGNhY2hlOiBcIm5vLXN0b3JlXCIsXG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBnZW5lcmF0ZSBNQ1FzXCIpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgaWYgKCFwYXlsb2FkPy5iYXNlNjQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWlzc2luZyBNQ1EgY29udGVudFwiKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYnl0ZUNoYXJhY3RlcnMgPSBhdG9iKHBheWxvYWQuYmFzZTY0KTtcbiAgICAgIGNvbnN0IGJ5dGVOdW1iZXJzID0gbmV3IEFycmF5KGJ5dGVDaGFyYWN0ZXJzLmxlbmd0aCk7XG4gICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYnl0ZUNoYXJhY3RlcnMubGVuZ3RoOyBpbmRleCArPSAxKSB7XG4gICAgICAgIGJ5dGVOdW1iZXJzW2luZGV4XSA9IGJ5dGVDaGFyYWN0ZXJzLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgICAgfVxuICAgICAgY29uc3QgYnl0ZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnl0ZU51bWJlcnMpO1xuICAgICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtieXRlQXJyYXldLCB7XG4gICAgICAgIHR5cGU6IFwiYXBwbGljYXRpb24vcGRmXCIsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZG93bmxvYWRVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICAgICAgY29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgbGluay5ocmVmID0gZG93bmxvYWRVcmw7XG4gICAgICBsaW5rLmRvd25sb2FkID0gYCR7c3ViamVjdC5yZXBsYWNlKC9cXHMrL2csIFwiX1wiKX1fJHt0b3BpYy5yZXBsYWNlKC9bXmEtejAtOV0rL2dpLCBcIl9cIikudG9Mb3dlckNhc2UoKSB8fCBcIm1jcXNcIn0ucGRmYDtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChkb3dubG9hZFVybCk7XG5cbiAgICAgIHNldE1jcVRvcGljcygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcIlwiIH0pKTtcbiAgICAgIHNldE1jcUhpc3RvcnkoKHByZXYpID0+ICh7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIFtzdWJqZWN0S2V5XTogW3RvcGljLCAuLi4ocHJldj8uW3N1YmplY3RLZXldID8/IFtdKS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IHRvcGljKV0uc2xpY2UoMCwgNSksXG4gICAgICB9KSk7XG5cbiAgICAgIHNldE1jcVN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcInN1Y2Nlc3NcIiB9KSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHNldE1jcVN0YXR1cygocHJldikgPT4gKHsgLi4ucHJldiwgW3N1YmplY3RLZXldOiBcImVycm9yXCIgfSkpO1xuICAgICAgc2V0TWNxRXJyb3IoKHByZXYpID0+ICh7XG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgIFtzdWJqZWN0S2V5XTogZXJyb3IubWVzc2FnZSB8fCBcIlVuYWJsZSB0byBnZW5lcmF0ZSBNQ1FzXCIsXG4gICAgICB9KSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHRvZ2dsZVN1YmplY3RBY3Rpb24gPSAoZ3JhZGVDb25maWcsIHN1YmplY3QsIGFjdGlvbikgPT4ge1xuICAgIGNvbnN0IGdyYWRlSWQgPSBncmFkZUNvbmZpZy5pZDtcbiAgICBjb25zdCBzdWJqZWN0S2V5ID0gZ2V0U3ViamVjdEtleShncmFkZUlkLCBzdWJqZWN0KTtcbiAgICBjb25zdCBzdWJqZWN0U3RhdGUgPSBzdWJqZWN0QWN0aW9uU2VsZWN0aW9ucz8uW2dyYWRlSWRdPy5bc3ViamVjdF0gPz8ge307XG4gICAgY29uc3QgY2FjaGVLZXkgPSBnZXRBY3Rpb25LZXkoZ3JhZGVJZCwgc3ViamVjdCwgYWN0aW9uKTtcbiAgICBjb25zdCBoYXNQZGYgPSBCb29sZWFuKFNVQkpFQ1RfUERGX0FDVElPTlNbZ3JhZGVJZF0/LltzdWJqZWN0XT8uaGFzKGFjdGlvbikpO1xuXG4gICAgaWYgKGFjdGlvbiA9PT0gXCJTeWxsYWJ1c1wiIHx8IGFjdGlvbiA9PT0gXCJSZWFkaW5nIE1hdGVyaWFsc1wiKSB7XG4gICAgICBjb25zdCBzdWJqZWN0U2x1ZyA9IHN1YmplY3QudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IGFjdGlvbktleSA9IGFjdGlvbi50b0xvd2VyQ2FzZSgpO1xuICAgICAgY29uc3QgZmlsZU5hbWUgPSBTVUJKRUNUX0ZJTEVTW3N1YmplY3RTbHVnXT8uW2FjdGlvbktleV07XG4gICAgICBjb25zdCBub3JtYWxpemVkUGF0aCA9XG4gICAgICAgIGZpbGVOYW1lICYmXG4gICAgICAgIChmaWxlTmFtZS5zdGFydHNXaXRoKFwiaHR0cFwiKVxuICAgICAgICAgID8gZmlsZU5hbWVcbiAgICAgICAgICA6IGAvJHtmaWxlTmFtZS5yZXBsYWNlKC9eWy9cXFxcXSsvLCBcIlwiKX1gKTtcblxuICAgICAgc2V0U3ViamVjdEFjdGlvblNlbGVjdGlvbnMoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgZ3JhZGVBY3Rpb25zID0geyAuLi4ocHJldj8uW2dyYWRlSWRdID8/IHt9KSB9O1xuICAgICAgICBjb25zdCB1cGRhdGVkU3ViamVjdFN0YXRlID0ge1xuICAgICAgICAgIC4uLihncmFkZUFjdGlvbnNbc3ViamVjdF0gPz8ge30pLFxuICAgICAgICAgIFthY3Rpb25dOiBmYWxzZSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoT2JqZWN0LnZhbHVlcyh1cGRhdGVkU3ViamVjdFN0YXRlKS5ldmVyeSgodmFsdWUpID0+IHZhbHVlID09PSBmYWxzZSkpIHtcbiAgICAgICAgICBkZWxldGUgZ3JhZGVBY3Rpb25zW3N1YmplY3RdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdyYWRlQWN0aW9uc1tzdWJqZWN0XSA9IHVwZGF0ZWRTdWJqZWN0U3RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSB7XG4gICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICBbZ3JhZGVJZF06IGdyYWRlQWN0aW9ucyxcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoT2JqZWN0LmtleXMoZ3JhZGVBY3Rpb25zKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBkZWxldGUgbmV4dFN0YXRlW2dyYWRlSWRdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaGFzUGRmKSB7XG4gICAgICAgIHNldFBkZkNhY2hlKChwcmV2KSA9PiB7XG4gICAgICAgICAgaWYgKCFwcmV2Py5bY2FjaGVLZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldiB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW2NhY2hlS2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFBkZkxvYWRpbmcoKHByZXYpID0+IHtcbiAgICAgICAgICBpZiAoIXByZXY/LltjYWNoZUtleV0pIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2IH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbY2FjaGVLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0UGRmRXJyb3IoKHByZXYpID0+IHtcbiAgICAgICAgICBpZiAoIXByZXY/LltjYWNoZUtleV0pIHtcbiAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB1cGRhdGVkID0geyAuLi5wcmV2IH07XG4gICAgICAgICAgZGVsZXRlIHVwZGF0ZWRbY2FjaGVLZXldO1xuICAgICAgICAgIHJldHVybiB1cGRhdGVkO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vcm1hbGl6ZWRQYXRoICYmIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgd2luZG93Lm9wZW4obm9ybWFsaXplZFBhdGgsIFwiX2JsYW5rXCIsIFwibm9vcGVuZXIsbm9yZWZlcnJlclwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRWYWx1ZSA9ICFzdWJqZWN0U3RhdGU/LlthY3Rpb25dO1xuXG4gICAgc2V0U3ViamVjdEFjdGlvblNlbGVjdGlvbnMoKHByZXYpID0+IHtcbiAgICAgIGNvbnN0IGdyYWRlQWN0aW9ucyA9IHsgLi4uKHByZXY/LltncmFkZUlkXSA/PyB7fSkgfTtcbiAgICAgIGNvbnN0IHVwZGF0ZWRTdWJqZWN0U3RhdGUgPSB7XG4gICAgICAgIC4uLihncmFkZUFjdGlvbnNbc3ViamVjdF0gPz8ge30pLFxuICAgICAgICBbYWN0aW9uXTogbmV4dFZhbHVlLFxuICAgICAgfTtcblxuICAgICAgaWYgKE9iamVjdC52YWx1ZXModXBkYXRlZFN1YmplY3RTdGF0ZSkuZXZlcnkoKHZhbHVlKSA9PiB2YWx1ZSA9PT0gZmFsc2UpKSB7XG4gICAgICAgIGRlbGV0ZSBncmFkZUFjdGlvbnNbc3ViamVjdF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncmFkZUFjdGlvbnNbc3ViamVjdF0gPSB1cGRhdGVkU3ViamVjdFN0YXRlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXh0QWN0aW9ucyA9IHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgW2dyYWRlSWRdOiBncmFkZUFjdGlvbnMsXG4gICAgICB9O1xuXG4gICAgICBpZiAoT2JqZWN0LmtleXMoZ3JhZGVBY3Rpb25zKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZGVsZXRlIG5leHRBY3Rpb25zW2dyYWRlSWRdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV4dEFjdGlvbnM7XG4gICAgfSk7XG5cbiAgICBpZiAobmV4dFZhbHVlKSB7XG4gICAgICBpZiAoaGFzUGRmKSB7XG4gICAgICAgIGZldGNoUGRmQ29udGVudChncmFkZUlkLCBzdWJqZWN0LCBhY3Rpb24pO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGlvbiA9PT0gXCJHZW5lcmF0ZSBwcmVzZW50YXRpb25zXCIpIHtcbiAgICAgICAgY29uc3QgdG9waWMgPSBwcmVzZW50YXRpb25Ub3BpY3Nbc3ViamVjdEtleV0/LnRyaW0oKTtcbiAgICAgICAgdHJpZ2dlclByZXNlbnRhdGlvbkRvd25sb2FkKGdyYWRlSWQsIHN1YmplY3QsIHRvcGljKTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3Rpb24gPT09IFwiR2VuZXJhdGUgUERGXCIpIHtcbiAgICAgICAgY29uc3QgdG9waWMgPSBoYW5kb3V0VG9waWNzW3N1YmplY3RLZXldPy50cmltKCk7XG4gICAgICAgIHRyaWdnZXJIYW5kb3V0RG93bmxvYWQoZ3JhZGVJZCwgc3ViamVjdCwgdG9waWMpO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGlvbiA9PT0gXCJMZXNzb24gUGxhblwiKSB7XG4gICAgICAgIGNvbnN0IHRvcGljID0gbGVzc29uUGxhblRvcGljc1tzdWJqZWN0S2V5XT8udHJpbSgpO1xuICAgICAgICB0cmlnZ2VyTGVzc29uUGxhbkRvd25sb2FkKGdyYWRlSWQsIHN1YmplY3QsIHRvcGljKTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3Rpb24gPT09IFwiR2VuZXJhdGUgV2ViIFBhZ2VcIikge1xuICAgICAgICBjb25zdCB0b3BpYyA9IHdlYlBhZ2VUb3BpY3Nbc3ViamVjdEtleV0/LnRyaW0oKTtcbiAgICAgICAgdHJpZ2dlcldlYlBhZ2VEb3dubG9hZChncmFkZUlkLCBzdWJqZWN0LCB0b3BpYyk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uID09PSBcIkdlbmVyYXRlIENvbmNlcHQgTWFwXCIpIHtcbiAgICAgICAgY29uc3QgdG9waWMgPSBjb25jZXB0TWFwVG9waWNzW3N1YmplY3RLZXldPy50cmltKCk7XG4gICAgICAgIHRyaWdnZXJDb25jZXB0TWFwRG93bmxvYWQoZ3JhZGVJZCwgc3ViamVjdCwgdG9waWMpO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGlvbiA9PT0gXCJHZW5lcmF0ZSBNQ1FzXCIpIHtcbiAgICAgICAgY29uc3QgdG9waWMgPSBtY3FUb3BpY3Nbc3ViamVjdEtleV0/LnRyaW0oKTtcbiAgICAgICAgdHJpZ2dlck1jcURvd25sb2FkKGdyYWRlSWQsIHN1YmplY3QsIHRvcGljKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGhhc1BkZikge1xuICAgICAgICBzZXRQZGZDYWNoZSgocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHVwZGF0ZWQgPSB7IC4uLnByZXYgfTtcbiAgICAgICAgICBkZWxldGUgdXBkYXRlZFtjYWNoZUtleV07XG4gICAgICAgICAgcmV0dXJuIHVwZGF0ZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRQZGZMb2FkaW5nKChwcmV2KSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldiB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW2NhY2hlS2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFBkZkVycm9yKChwcmV2KSA9PiB7XG4gICAgICAgICAgY29uc3QgdXBkYXRlZCA9IHsgLi4ucHJldiB9O1xuICAgICAgICAgIGRlbGV0ZSB1cGRhdGVkW2NhY2hlS2V5XTtcbiAgICAgICAgICByZXR1cm4gdXBkYXRlZDtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3Rpb24gPT09IFwiR2VuZXJhdGUgcHJlc2VudGF0aW9uc1wiKSB7XG4gICAgICAgIHNldFByZXNlbnRhdGlvblN0YXR1cygocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFByZXNlbnRhdGlvbkVycm9yKChwcmV2KSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBbc3ViamVjdEtleV06IF9yZW1vdmVkLCAuLi5yZXN0IH0gPSBwcmV2O1xuICAgICAgICAgIHJldHVybiByZXN0O1xuICAgICAgICB9KTtcbiAgICAgICAgc2V0UHJlc2VudGF0aW9uVG9waWNzKChwcmV2KSA9PiB7XG4gICAgICAgICAgY29uc3QgeyBbc3ViamVjdEtleV06IF9yZW1vdmVkLCAuLi5yZXN0IH0gPSBwcmV2O1xuICAgICAgICAgIHJldHVybiByZXN0O1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChhY3Rpb24gPT09IFwiR2VuZXJhdGUgUERGXCIpIHtcbiAgICAgICAgc2V0SGFuZG91dFN0YXR1cygocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldEhhbmRvdXRFcnJvcigocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldEhhbmRvdXRUb3BpY3MoKHByZXYpID0+IHtcbiAgICAgICAgICBjb25zdCB7IFtzdWJqZWN0S2V5XTogX3JlbW92ZWQsIC4uLnJlc3QgfSA9IHByZXY7XG4gICAgICAgICAgcmV0dXJuIHJlc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRIYW5kb3V0SGlzdG9yeSgocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uID09PSBcIkxlc3NvbiBQbGFuXCIpIHtcbiAgICAgICAgc2V0TGVzc29uUGxhblN0YXR1cygocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldExlc3NvblBsYW5FcnJvcigocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldExlc3NvblBsYW5Ub3BpY3MoKHByZXYpID0+IHtcbiAgICAgICAgICBjb25zdCB7IFtzdWJqZWN0S2V5XTogX3JlbW92ZWQsIC4uLnJlc3QgfSA9IHByZXY7XG4gICAgICAgICAgcmV0dXJuIHJlc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRMZXNzb25QbGFuSGlzdG9yeSgocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uID09PSBcIkdlbmVyYXRlIFdlYiBQYWdlXCIpIHtcbiAgICAgICAgc2V0V2ViUGFnZVN0YXR1cygocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFdlYlBhZ2VFcnJvcigocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFdlYlBhZ2VUb3BpY3MoKHByZXYpID0+IHtcbiAgICAgICAgICBjb25zdCB7IFtzdWJqZWN0S2V5XTogX3JlbW92ZWQsIC4uLnJlc3QgfSA9IHByZXY7XG4gICAgICAgICAgcmV0dXJuIHJlc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRXZWJQYWdlSGlzdG9yeSgocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uID09PSBcIkdlbmVyYXRlIENvbmNlcHQgTWFwXCIpIHtcbiAgICAgICAgc2V0Q29uY2VwdE1hcFN0YXR1cygocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldENvbmNlcHRNYXBFcnJvcigocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldENvbmNlcHRNYXBUb3BpY3MoKHByZXYpID0+IHtcbiAgICAgICAgICBjb25zdCB7IFtzdWJqZWN0S2V5XTogX3JlbW92ZWQsIC4uLnJlc3QgfSA9IHByZXY7XG4gICAgICAgICAgcmV0dXJuIHJlc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRDb25jZXB0TWFwSGlzdG9yeSgocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoYWN0aW9uID09PSBcIkdlbmVyYXRlIE1DUXNcIikge1xuICAgICAgICBzZXRNY3FTdGF0dXMoKHByZXYpID0+IHtcbiAgICAgICAgICBjb25zdCB7IFtzdWJqZWN0S2V5XTogX3JlbW92ZWQsIC4uLnJlc3QgfSA9IHByZXY7XG4gICAgICAgICAgcmV0dXJuIHJlc3Q7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRNY3FFcnJvcigocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldE1jcVRvcGljcygocHJldikgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgW3N1YmplY3RLZXldOiBfcmVtb3ZlZCwgLi4ucmVzdCB9ID0gcHJldjtcbiAgICAgICAgICByZXR1cm4gcmVzdDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNldE1jcUhpc3RvcnkoKHByZXYpID0+IHtcbiAgICAgICAgICBjb25zdCB7IFtzdWJqZWN0S2V5XTogX3JlbW92ZWQsIC4uLnJlc3QgfSA9IHByZXY7XG4gICAgICAgICAgcmV0dXJuIHJlc3Q7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCB0aGVtZSA9IGlzRGFya01vZGVcbiAgICA/IHtcbiAgICAgICAgYmFja2dyb3VuZDogXCIjMGIxMTIwXCIsXG4gICAgICAgIHRleHQ6IFwiI2UyZThmMFwiLFxuICAgICAgICBwYW5lbDogXCIjMTExODI3XCIsXG4gICAgICAgIHBhbmVsQm9yZGVyOiBcIiMxZjI5MzdcIixcbiAgICAgICAgYWNjZW50OiBcIiMzOGJkZjhcIixcbiAgICAgICAgaXNEYXJrOiB0cnVlLFxuICAgICAgfVxuICAgIDoge1xuICAgICAgICBiYWNrZ3JvdW5kOiBcIiNmZmZmZmZcIixcbiAgICAgICAgdGV4dDogXCIjMGYxNzJhXCIsXG4gICAgICAgIHBhbmVsOiBcIiNmOGZhZmNcIixcbiAgICAgICAgcGFuZWxCb3JkZXI6IFwiI2UyZThmMFwiLFxuICAgICAgICBhY2NlbnQ6IFwiIzI1NjNlYlwiLFxuICAgICAgICBpc0Rhcms6IGZhbHNlLFxuICAgICAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIG1pbkhlaWdodDogXCIxMDB2aFwiLFxuICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICBqdXN0aWZ5Q29udGVudDogXCJmbGV4LXN0YXJ0XCIsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWUuYmFja2dyb3VuZCxcbiAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgIGZvbnRGYW1pbHk6XG4gICAgICAgICAgXCJzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgJ1NlZ29lIFVJJywgUm9ib3RvLCBzYW5zLXNlcmlmXCIsXG4gICAgICAgIHBhZGRpbmc6IFwiNjBweCAyMHB4IDQwcHhcIixcbiAgICAgICAgdGV4dEFsaWduOiBcImNlbnRlclwiLFxuICAgICAgfX1cbiAgICA+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0RhcmtNb2RlKCFpc0RhcmtNb2RlKX1cbiAgICAgICAgYXJpYS1sYWJlbD17YFN3aXRjaCB0byAke2lzRGFya01vZGUgPyBcImxpZ2h0XCIgOiBcImRhcmtcIn0gbW9kZWB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICB0b3A6IFwiMjRweFwiLFxuICAgICAgICAgIHJpZ2h0OiBcIjE2cHhcIixcbiAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgIGdhcDogXCIxMnB4XCIsXG4gICAgICAgICAgcGFkZGluZzogXCI4cHggMTZweFwiLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogXCI5OTk5cHhcIixcbiAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLnBhbmVsLFxuICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0LFxuICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgIHRyYW5zaXRpb246IFwiYmFja2dyb3VuZCAwLjJzIGVhc2UsIGJvcmRlci1jb2xvciAwLjJzIGVhc2VcIixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4+e2lzRGFya01vZGUgPyBcIkRhcmtcIiA6IFwiTGlnaHRcIn08L3NwYW4+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiBcInJlbGF0aXZlXCIsXG4gICAgICAgICAgICB3aWR0aDogXCI0MnB4XCIsXG4gICAgICAgICAgICBoZWlnaHQ6IFwiMjJweFwiLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjk5OTlweFwiLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogaXNEYXJrTW9kZSA/IHRoZW1lLmFjY2VudCA6IFwiI2NiZDVmNVwiLFxuICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZFwiLFxuICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogXCJiYWNrZ3JvdW5kIDAuMnMgZWFzZVwiLFxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgICAgICAgdG9wOiBcIjJweFwiLFxuICAgICAgICAgICAgICBsZWZ0OiBpc0RhcmtNb2RlID8gXCIyMnB4XCIgOiBcIjJweFwiLFxuICAgICAgICAgICAgICB3aWR0aDogXCIxNnB4XCIsXG4gICAgICAgICAgICAgIGhlaWdodDogXCIxNnB4XCIsXG4gICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI1MCVcIixcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogaXNEYXJrTW9kZSA/IFwiIzBiMTEyMFwiIDogXCIjZjhmYWZjXCIsXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogXCIwIDJweCA0cHggcmdiYSgxNSwgMjMsIDQyLCAwLjI1KVwiLFxuICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBcImxlZnQgMC4ycyBlYXNlLCBiYWNrZ3JvdW5kIDAuMnMgZWFzZVwiLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKFwiL1wiKX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBhbGlnblNlbGY6IFwiZmxleC1lbmRcIixcbiAgICAgICAgICBtYXJnaW5Cb3R0b206IFwiMTZweFwiLFxuICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDE0cHhcIixcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOTk5OXB4XCIsXG4gICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZFwiLFxuICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZS5wYW5lbEJvcmRlcixcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyBcInJnYmEoMzAsIDY0LCAxNzUsIDAuMjUpXCIgOiBcIiNlZmY2ZmZcIixcbiAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjYmZkYmZlXCIgOiBcIiMxZDRlZDhcIixcbiAgICAgICAgICBmb250U2l6ZTogXCIwLjlyZW1cIixcbiAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIixcbiAgICAgICAgICB0cmFuc2l0aW9uOiBcImJhY2tncm91bmQgMC4ycyBlYXNlLCBjb2xvciAwLjJzIGVhc2VcIixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAg4oaQIEJhY2sgdG8gQm9hcmQgU2VsZWN0aW9uXG4gICAgICA8L2J1dHRvbj5cbiAgICAgIHsvKiBXZWxjb21lIE1lc3NhZ2UgKi99XG4gICAgICA8aDFcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBmb250U2l6ZTogXCIxLjZyZW1cIixcbiAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjEycHhcIixcbiAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBcIjAuMDFlbVwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICBXZWxjb21lIHRvIHRlYWNod2lzZWFpLm1wYWlhcHBzLmNvbVxuICAgICAgPC9oMT5cblxuICAgICAgey8qIENCU0UgSGVhZGluZyAqL31cbiAgICAgIDxoMlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGZvbnRTaXplOiBcIjEuMzVyZW1cIixcbiAgICAgICAgICBmb250V2VpZ2h0OiA3MDAsXG4gICAgICAgICAgbWFyZ2luQm90dG9tOiBcIjEwcHhcIixcbiAgICAgICAgICBsZXR0ZXJTcGFjaW5nOiBcIjAuMDJlbVwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICBDQlNFXG4gICAgICA8L2gyPlxuXG4gICAgICB7LyogQ2hlY2tib3hlcyAqL31cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgIGdhcDogXCI4cHhcIixcbiAgICAgICAgICBmb250U2l6ZTogXCIxLjJyZW1cIixcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5wYW5lbCxcbiAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgIHBhZGRpbmc6IFwiMTZweCAyNHB4XCIsXG4gICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjE0cHhcIixcbiAgICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICAgICAgbWF4V2lkdGg6IFwiNzIwcHhcIixcbiAgICAgICAgICB0ZXh0QWxpZ246IFwibGVmdFwiLFxuICAgICAgICAgIGJveFNoYWRvdzogaXNEYXJrTW9kZVxuICAgICAgICAgICAgPyBcIjAgMjBweCAzNXB4IHJnYmEoMTUsIDIzLCA0MiwgMC41KVwiXG4gICAgICAgICAgICA6IFwiMCAxOHB4IDMwcHggcmdiYSgxNSwgMjMsIDQyLCAwLjA4KVwiLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7R1JBREVfQ09ORklHUy5tYXAoKGdyYWRlQ29uZmlnKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29udHJvbCA9IGdyYWRlQ29udHJvbHNbZ3JhZGVDb25maWcuaWRdO1xuICAgICAgICAgIGlmICghY29udHJvbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgeyBpc0FjdGl2ZSwgc2V0QWN0aXZlIH0gPSBjb250cm9sO1xuICAgICAgICAgIGNvbnN0IHNlbGVjdGVkR3JhZGVTdWJqZWN0cyA9IHNlbGVjdGVkU3ViamVjdHM/LltncmFkZUNvbmZpZy5pZF0gPz8ge307XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBrZXk9e2dyYWRlQ29uZmlnLmlkfVxuICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIiwgZ2FwOiBcIjhweFwiIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgYWxpZ25JdGVtczogXCJjZW50ZXJcIiwgZ2FwOiBcIjEwcHhcIiB9fT5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXtpc0FjdGl2ZX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoKSA9PiBzZXRBY3RpdmUoIWlzQWN0aXZlKX1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGFjY2VudENvbG9yOiB0aGVtZS5hY2NlbnQgfX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIHtncmFkZUNvbmZpZy5sYWJlbH1cbiAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICB7aXNBY3RpdmUgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBcIjMwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJncmlkXCIsXG4gICAgICAgICAgICAgICAgICAgIGdyaWRUZW1wbGF0ZUNvbHVtbnM6IFwicmVwZWF0KDIsIG1pbm1heCgwLCAxZnIpKVwiLFxuICAgICAgICAgICAgICAgICAgICBnYXA6IFwiOHB4IDE4cHhcIixcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMXJlbVwiLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2dyYWRlQ29uZmlnLnN1YmplY3RzLm1hcCgoc3ViamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gQm9vbGVhbihzZWxlY3RlZEdyYWRlU3ViamVjdHNbc3ViamVjdF0pO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJqZWN0S2V5ID0gZ2V0U3ViamVjdEtleShncmFkZUNvbmZpZy5pZCwgc3ViamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFjdGlvblN0YXRlID1cbiAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0QWN0aW9uU2VsZWN0aW9ucz8uW2dyYWRlQ29uZmlnLmlkXT8uW3N1YmplY3RdID8/IHt9O1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtgJHtncmFkZUNvbmZpZy5pZH0tJHtzdWJqZWN0fWB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBcImZsZXhcIiwgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIiwgZ2FwOiBcIjZweFwiIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogaXNEYXJrTW9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJyZ2JhKDU2LCAxODksIDI0OCwgMC4yNSlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwicmdiYSgxNSwgMjMsIDQyLCAwLjM1KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCIjYmZkYmZlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCIjZWVmMmZmXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweCAxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBpc0RhcmtNb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiMzOGJkZjhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiIzFlMjkzYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCIjNjBhNWZhXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCIjYzdkMmZlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogXCJiYWNrZ3JvdW5kIDAuMnMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMnMgZWFzZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2lzU2VsZWN0ZWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IHRvZ2dsZVN1YmplY3RTZWxlY3Rpb24oZ3JhZGVDb25maWcsIHN1YmplY3QpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGFjY2VudENvbG9yOiB0aGVtZS5hY2NlbnQgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3N1YmplY3R9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7aXNTZWxlY3RlZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjRweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiMzJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ1JpZ2h0OiBcIjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7U1VCSkVDVF9BQ1RJT05TLm1hcCgoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGlvblNlbGVjdGVkID0gQm9vbGVhbihhY3Rpb25TdGF0ZVthY3Rpb25dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhY2hlS2V5ID0gZ2V0QWN0aW9uS2V5KGdyYWRlQ29uZmlnLmlkLCBzdWJqZWN0LCBhY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGRmU2V0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgU1VCSkVDVF9QREZfQUNUSU9OU1tncmFkZUNvbmZpZy5pZF0/LltzdWJqZWN0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc1BkZiA9IEJvb2xlYW4ocGRmU2V0Py5oYXMoYWN0aW9uKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1N5bGxhYnVzID0gYWN0aW9uID09PSBcIlN5bGxhYnVzXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1JlYWRpbmdNYXRlcmlhbHMgPSBhY3Rpb24gPT09IFwiUmVhZGluZyBNYXRlcmlhbHNcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNob3dJbmxpbmVQZGYgPSBoYXNQZGYgJiYgIWlzU3lsbGFidXMgJiYgIWlzUmVhZGluZ01hdGVyaWFscztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXNlbnRhdGlvblN0YXRlID0gcHJlc2VudGF0aW9uU3RhdHVzW3N1YmplY3RLZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJlc2VudGF0aW9uRXJyb3JNZXNzYWdlID0gcHJlc2VudGF0aW9uRXJyb3Jbc3ViamVjdEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3BpY1ZhbHVlID0gcHJlc2VudGF0aW9uVG9waWNzW3N1YmplY3RLZXldID8/IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWNlbnRUb3BpY3MgPSBwcmVzZW50YXRpb25IaXN0b3J5W3N1YmplY3RLZXldID8/IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFuZG91dFN0YXRlID0gaGFuZG91dFN0YXR1c1tzdWJqZWN0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRvdXRFcnJvck1lc3NhZ2UgPSBoYW5kb3V0RXJyb3Jbc3ViamVjdEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kb3V0VmFsdWUgPSBoYW5kb3V0VG9waWNzW3N1YmplY3RLZXldID8/IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYW5kb3V0UmVjZW50ID0gaGFuZG91dEhpc3Rvcnlbc3ViamVjdEtleV0gPz8gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsZXNzb25QbGFuU3RhdGUgPSBsZXNzb25QbGFuU3RhdHVzW3N1YmplY3RLZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVzc29uUGxhbkVycm9yTWVzc2FnZSA9IGxlc3NvblBsYW5FcnJvcltzdWJqZWN0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlc3NvblBsYW5WYWx1ZSA9IGxlc3NvblBsYW5Ub3BpY3Nbc3ViamVjdEtleV0gPz8gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlc3NvblBsYW5SZWNlbnQgPSBsZXNzb25QbGFuSGlzdG9yeVtzdWJqZWN0S2V5XSA/PyBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHdlYlBhZ2VTdGF0ZSA9IHdlYlBhZ2VTdGF0dXNbc3ViamVjdEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB3ZWJQYWdlRXJyb3JNZXNzYWdlID0gd2ViUGFnZUVycm9yW3N1YmplY3RLZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2ViUGFnZVZhbHVlID0gd2ViUGFnZVRvcGljc1tzdWJqZWN0S2V5XSA/PyBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2ViUGFnZVJlY2VudCA9IHdlYlBhZ2VIaXN0b3J5W3N1YmplY3RLZXldID8/IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29uY2VwdE1hcFN0YXRlID0gY29uY2VwdE1hcFN0YXR1c1tzdWJqZWN0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbmNlcHRNYXBFcnJvck1lc3NhZ2UgPSBjb25jZXB0TWFwRXJyb3Jbc3ViamVjdEtleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb25jZXB0TWFwVmFsdWUgPSBjb25jZXB0TWFwVG9waWNzW3N1YmplY3RLZXldID8/IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb25jZXB0TWFwUmVjZW50ID0gY29uY2VwdE1hcEhpc3Rvcnlbc3ViamVjdEtleV0gPz8gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtY3FTdGF0ZSA9IG1jcVN0YXR1c1tzdWJqZWN0S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1jcUVycm9yTWVzc2FnZSA9IG1jcUVycm9yW3N1YmplY3RLZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbWNxVmFsdWUgPSBtY3FUb3BpY3Nbc3ViamVjdEtleV0gPz8gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1jcVJlY2VudCA9IG1jcUhpc3Rvcnlbc3ViamVjdEtleV0gPz8gW107XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2FjdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuOTJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtpc0FjdGlvblNlbGVjdGVkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVTdWJqZWN0QWN0aW9uKGdyYWRlQ29uZmlnLCBzdWJqZWN0LCBhY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYWNjZW50Q29sb3I6IHRoZW1lLmFjY2VudCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHthY3Rpb259XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0FjdGlvblNlbGVjdGVkICYmIHNob3dJbmxpbmVQZGYgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFBkZkNvbnRlbnRWaWV3ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFzZTY0RGF0YT17cGRmQ2FjaGVbY2FjaGVLZXldfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmc9e0Jvb2xlYW4ocGRmTG9hZGluZ1tjYWNoZUtleV0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcj17cGRmRXJyb3JbY2FjaGVLZXldfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsPXtgJHtncmFkZUNvbmZpZy5sYWJlbH0gJHtzdWJqZWN0fSAke2FjdGlvbn1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzQWN0aW9uU2VsZWN0ZWQgJiYgYWN0aW9uID09PSBcIkdlbmVyYXRlIHByZXNlbnRhdGlvbnNcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt0b3BpY1ZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFByZXNlbnRhdGlvblRvcGljcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdWJqZWN0S2V5XTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXNlbnRhdGlvblN0YXR1c1tzdWJqZWN0S2V5XSA9PT0gXCJtaXNzaW5nLXRvcGljXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQcmVzZW50YXRpb25TdGF0dXMoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHRvcGljXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweCAxMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyBcIiMwZjE3MmFcIiA6IFwiI2Y4ZmFmY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJQcmVzZW50YXRpb25Eb3dubG9hZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkZUNvbmZpZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvcGljVmFsdWUudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjMGIxMTIwXCIgOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtwcmVzZW50YXRpb25TdGF0ZSA9PT0gXCJsb2FkaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ByZXNlbnRhdGlvblN0YXRlID09PSBcImxvYWRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiR2VuZXJhdGluZ+KAplwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJHZW5lcmF0ZVwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ByZXNlbnRhdGlvblN0YXRlID09PSBcIm1pc3NpbmctdG9waWNcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2Y5NzMxNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbnRlciBhIHRvcGljIHRvIGNvbnRpbnVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3ByZXNlbnRhdGlvblN0YXRlID09PSBcImVycm9yXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNmODcxNzFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5hYmxlIHRvIGdlbmVyYXRlIHByZXNlbnRhdGlvbjoge3ByZXNlbnRhdGlvbkVycm9yTWVzc2FnZSA/PyBcIlVua25vd24gZXJyb3JcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtwcmVzZW50YXRpb25TdGF0ZSA9PT0gXCJzdWNjZXNzXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiMzOGJkZjhcIiA6IFwiIzI1NjNlYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQcmVzZW50YXRpb24gZG93bmxvYWRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshcHJlc2VudGF0aW9uU3RhdGUgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiM5NGEzYjhcIiA6IFwiIzQ3NTU2OVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBlIGEgdG9waWMgYW5kIGNsaWNrIEdlbmVyYXRlIHRvIGRvd25sb2FkIGEgUFBUWC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWNlbnRUb3BpY3MubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogXCI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWNlbnRUb3BpY3MubWFwKChyZWNlbnRUb3BpYykgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtyZWNlbnRUb3BpY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRQcmVzZW50YXRpb25Ub3BpY3MoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdWJqZWN0S2V5XTogcmVjZW50VG9waWMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyUHJlc2VudGF0aW9uRG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlQ29uZmlnLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlbnRUb3BpY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjRweCAxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOTk5OXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWUucGFuZWxCb3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiMxZTI5M2JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiI2UyZThmMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjc4cmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3ByZXNlbnRhdGlvblN0YXRlID09PSBcImxvYWRpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWNlbnRUb3BpY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNBY3Rpb25TZWxlY3RlZCAmJiBhY3Rpb24gPT09IFwiR2VuZXJhdGUgUERGXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17aGFuZG91dFZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEhhbmRvdXRUb3BpY3MoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3ViamVjdEtleV06IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYW5kb3V0U3RhdHVzW3N1YmplY3RLZXldID09PSBcIm1pc3NpbmctdG9waWNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEhhbmRvdXRTdGF0dXMoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHRvcGljXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweCAxMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyBcIiMwZjE3MmFcIiA6IFwiI2Y4ZmFmY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJIYW5kb3V0RG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGVDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kb3V0VmFsdWUudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjMGIxMTIwXCIgOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtoYW5kb3V0U3RhdGUgPT09IFwibG9hZGluZ1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtoYW5kb3V0U3RhdGUgPT09IFwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJHZW5lcmF0aW5n4oCmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkdlbmVyYXRlXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aGFuZG91dFN0YXRlID09PSBcIm1pc3NpbmctdG9waWNcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2Y5NzMxNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbnRlciBhIHRvcGljIHRvIGNvbnRpbnVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2hhbmRvdXRTdGF0ZSA9PT0gXCJlcnJvclwiICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZjg3MTcxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVuYWJsZSB0byBnZW5lcmF0ZSBQREY6IHtoYW5kb3V0RXJyb3JNZXNzYWdlID8/IFwiVW5rbm93biBlcnJvclwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2hhbmRvdXRTdGF0ZSA9PT0gXCJzdWNjZXNzXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiMzOGJkZjhcIiA6IFwiIzI1NjNlYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQREYgZG93bmxvYWRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshaGFuZG91dFN0YXRlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjOTRhM2I4XCIgOiBcIiM0NzU1NjlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwZSBhIHRvcGljIGFuZCBjbGljayBHZW5lcmF0ZSB0byBkb3dubG9hZCBhIFBERiBoYW5kb3V0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2hhbmRvdXRSZWNlbnQubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogXCI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtoYW5kb3V0UmVjZW50Lm1hcCgocmVjZW50VG9waWMpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cmVjZW50VG9waWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SGFuZG91dFRvcGljcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiByZWNlbnRUb3BpYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJIYW5kb3V0RG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlQ29uZmlnLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlbnRUb3BpY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjRweCAxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOTk5OXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWUucGFuZWxCb3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiMxZTI5M2JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiI2UyZThmMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjc4cmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2hhbmRvdXRTdGF0ZSA9PT0gXCJsb2FkaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVjZW50VG9waWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzQWN0aW9uU2VsZWN0ZWQgJiYgYWN0aW9uID09PSBcIkxlc3NvbiBQbGFuXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17bGVzc29uUGxhblZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldExlc3NvblBsYW5Ub3BpY3MoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3ViamVjdEtleV06IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZXNzb25QbGFuU3RhdHVzW3N1YmplY3RLZXldID09PSBcIm1pc3NpbmctdG9waWNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldExlc3NvblBsYW5TdGF0dXMoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHRvcGljXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweCAxMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyBcIiMwZjE3MmFcIiA6IFwiI2Y4ZmFmY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJMZXNzb25QbGFuRG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGVDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXNzb25QbGFuVmFsdWUudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjMGIxMTIwXCIgOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtsZXNzb25QbGFuU3RhdGUgPT09IFwibG9hZGluZ1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtsZXNzb25QbGFuU3RhdGUgPT09IFwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJHZW5lcmF0aW5n4oCmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkdlbmVyYXRlXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGVzc29uUGxhblN0YXRlID09PSBcIm1pc3NpbmctdG9waWNcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2Y5NzMxNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbnRlciBhIHRvcGljIHRvIGNvbnRpbnVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xlc3NvblBsYW5TdGF0ZSA9PT0gXCJlcnJvclwiICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZjg3MTcxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVuYWJsZSB0byBnZW5lcmF0ZSBsZXNzb24gcGxhbjoge2xlc3NvblBsYW5FcnJvck1lc3NhZ2UgPz8gXCJVbmtub3duIGVycm9yXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGVzc29uUGxhblN0YXRlID09PSBcInN1Y2Nlc3NcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLmlzRGFyayA/IFwiIzM4YmRmOFwiIDogXCIjMjU2M2ViXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIExlc3NvbiBwbGFuIGRvd25sb2FkZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IWxlc3NvblBsYW5TdGF0ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLmlzRGFyayA/IFwiIzk0YTNiOFwiIDogXCIjNDc1NTY5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cGUgYSB0b3BpYyBhbmQgY2xpY2sgR2VuZXJhdGUgdG8gZG93bmxvYWQgYSBsZXNzb24gcGxhbiBQREYuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bGVzc29uUGxhblJlY2VudC5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4V3JhcDogXCJ3cmFwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogXCI0cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2xlc3NvblBsYW5SZWNlbnQubWFwKChyZWNlbnRUb3BpYykgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtyZWNlbnRUb3BpY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRMZXNzb25QbGFuVG9waWNzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3ViamVjdEtleV06IHJlY2VudFRvcGljLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlckxlc3NvblBsYW5Eb3dubG9hZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGVDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VudFRvcGljXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiNHB4IDEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI5OTk5cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZS5wYW5lbEJvcmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmlzRGFya1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiIzFlMjkzYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCIjZTJlOGYwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuNzhyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bGVzc29uUGxhblN0YXRlID09PSBcImxvYWRpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyZWNlbnRUb3BpY31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aXNBY3Rpb25TZWxlY3RlZCAmJiBhY3Rpb24gPT09IFwiR2VuZXJhdGUgV2ViIFBhZ2VcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXt3ZWJQYWdlVmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0V2ViUGFnZVRvcGljcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdWJqZWN0S2V5XTogdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdlYlBhZ2VTdGF0dXNbc3ViamVjdEtleV0gPT09IFwibWlzc2luZy10b3BpY1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0V2ViUGFnZVN0YXR1cygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3ViamVjdEtleV06IG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJTZWFyY2ggdG9waWNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleDogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDEycHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWUucGFuZWxCb3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmlzRGFyayA/IFwiIzBmMTcyYVwiIDogXCIjZjhmYWZjXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS50ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpZ2dlcldlYlBhZ2VEb3dubG9hZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmFkZUNvbmZpZy5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlBhZ2VWYWx1ZS50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCI4cHggMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiMwYjExMjBcIiA6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3dlYlBhZ2VTdGF0ZSA9PT0gXCJsb2FkaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3dlYlBhZ2VTdGF0ZSA9PT0gXCJsb2FkaW5nXCIgPyBcIkdlbmVyYXRpbmfigKZcIiA6IFwiR2VuZXJhdGVcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt3ZWJQYWdlU3RhdGUgPT09IFwibWlzc2luZy10b3BpY1wiICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZjk3MzE2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVudGVyIGEgdG9waWMgdG8gY29udGludWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7d2ViUGFnZVN0YXRlID09PSBcImVycm9yXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBcIiNmODcxNzFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVW5hYmxlIHRvIGdlbmVyYXRlIHdlYiBwYWdlOiB7d2ViUGFnZUVycm9yTWVzc2FnZSA/PyBcIlVua25vd24gZXJyb3JcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt3ZWJQYWdlU3RhdGUgPT09IFwic3VjY2Vzc1wiICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjMzhiZGY4XCIgOiBcIiMyNTYzZWJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2ViIHBhZ2UgZG93bmxvYWRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHshd2ViUGFnZVN0YXRlICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjOTRhM2I4XCIgOiBcIiM0NzU1NjlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVHlwZSBhIHRvcGljIGFuZCBjbGljayBHZW5lcmF0ZSB0byBkb3dubG9hZCBhbiBIVE1MIHdlYiBwYWdlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3dlYlBhZ2VSZWNlbnQubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogXCI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt3ZWJQYWdlUmVjZW50Lm1hcCgocmVjZW50VG9waWMpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cmVjZW50VG9waWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0V2ViUGFnZVRvcGljcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiByZWNlbnRUb3BpYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJXZWJQYWdlRG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlQ29uZmlnLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlbnRUb3BpY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjRweCAxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOTk5OXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWUucGFuZWxCb3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiMxZTI5M2JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiI2UyZThmMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjc4cmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3dlYlBhZ2VTdGF0ZSA9PT0gXCJsb2FkaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVjZW50VG9waWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzQWN0aW9uU2VsZWN0ZWQgJiYgYWN0aW9uID09PSBcIkdlbmVyYXRlIENvbmNlcHQgTWFwXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXhEaXJlY3Rpb246IFwiY29sdW1uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmdMZWZ0OiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjhweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25JdGVtczogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y29uY2VwdE1hcFZhbHVlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbmNlcHRNYXBUb3BpY3MoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3ViamVjdEtleV06IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25jZXB0TWFwU3RhdHVzW3N1YmplY3RLZXldID09PSBcIm1pc3NpbmctdG9waWNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbmNlcHRNYXBTdGF0dXMoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIHRvcGljXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZsZXg6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjhweCAxMnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCIxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lLnBhbmVsQm9yZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmsgPyBcIiMwZjE3MmFcIiA6IFwiI2Y4ZmFmY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJDb25jZXB0TWFwRG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGVDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25jZXB0TWFwVmFsdWUudHJpbSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiOHB4IDE2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuYWNjZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUuaXNEYXJrID8gXCIjMGIxMTIwXCIgOiBcIiNmZmZmZmZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFdlaWdodDogNjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtjb25jZXB0TWFwU3RhdGUgPT09IFwibG9hZGluZ1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb25jZXB0TWFwU3RhdGUgPT09IFwibG9hZGluZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJHZW5lcmF0aW5n4oCmXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcIkdlbmVyYXRlXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29uY2VwdE1hcFN0YXRlID09PSBcIm1pc3NpbmctdG9waWNcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2Y5NzMxNlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFbnRlciBhIHRvcGljIHRvIGNvbnRpbnVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbmNlcHRNYXBTdGF0ZSA9PT0gXCJlcnJvclwiICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZjg3MTcxXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFVuYWJsZSB0byBnZW5lcmF0ZSBjb25jZXB0IG1hcDoge2NvbmNlcHRNYXBFcnJvck1lc3NhZ2UgPz8gXCJVbmtub3duIGVycm9yXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29uY2VwdE1hcFN0YXRlID09PSBcInN1Y2Nlc3NcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLmlzRGFyayA/IFwiIzM4YmRmOFwiIDogXCIjMjU2M2ViXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbmNlcHQgbWFwIFBERiBkb3dubG9hZGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyFjb25jZXB0TWFwU3RhdGUgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiM5NGEzYjhcIiA6IFwiIzQ3NTU2OVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUeXBlIGEgdG9waWMgYW5kIGNsaWNrIEdlbmVyYXRlIHRvIGRvd25sb2FkIGEgY29uY2VwdCBtYXAgUERGLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NvbmNlcHRNYXBSZWNlbnQubGVuZ3RoID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdhcDogXCI2cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleFdyYXA6IFwid3JhcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5Ub3A6IFwiNHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb25jZXB0TWFwUmVjZW50Lm1hcCgocmVjZW50VG9waWMpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cmVjZW50VG9waWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29uY2VwdE1hcFRvcGljcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiByZWNlbnRUb3BpYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJDb25jZXB0TWFwRG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYWRlQ29uZmlnLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWNlbnRUb3BpY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBcIjRweCAxMHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiOTk5OXB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWUucGFuZWxCb3JkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5pc0RhcmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcIiMxZTI5M2JcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwiI2UyZThmMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjc4cmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2NvbmNlcHRNYXBTdGF0ZSA9PT0gXCJsb2FkaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVjZW50VG9waWN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2lzQWN0aW9uU2VsZWN0ZWQgJiYgYWN0aW9uID09PSBcIkdlbmVyYXRlIE1DUXNcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGlnbkl0ZW1zOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXttY3FWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRNY3FUb3BpY3MoKHByZXYpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc3ViamVjdEtleV06IHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtY3FTdGF0dXNbc3ViamVjdEtleV0gPT09IFwibWlzc2luZy10b3BpY1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0TWNxU3RhdHVzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdWJqZWN0S2V5XTogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCB0b3BpY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4OiBcIjFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCI4cHggMTJweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZS5wYW5lbEJvcmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogdGhlbWUuaXNEYXJrID8gXCIjMGYxNzJhXCIgOiBcIiNmOGZhZmNcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyTWNxRG93bmxvYWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGVDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtY3FWYWx1ZS50cmltKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogXCI4cHggMTZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiMTBweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiB0aGVtZS5hY2NlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiMwYjExMjBcIiA6IFwiI2ZmZmZmZlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e21jcVN0YXRlID09PSBcImxvYWRpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWNxU3RhdGUgPT09IFwibG9hZGluZ1wiID8gXCJHZW5lcmF0aW5n4oCmXCIgOiBcIkdlbmVyYXRlXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWNxU3RhdGUgPT09IFwibWlzc2luZy10b3BpY1wiICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMC44MnJlbVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogXCIjZjk3MzE2XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVudGVyIGEgdG9waWMgdG8gY29udGludWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7bWNxU3RhdGUgPT09IFwiZXJyb3JcIiAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFwiI2Y4NzE3MVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVbmFibGUgdG8gZ2VuZXJhdGUgTUNRczoge21jcUVycm9yTWVzc2FnZSA/PyBcIlVua25vd24gZXJyb3JcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHttY3FTdGF0ZSA9PT0gXCJzdWNjZXNzXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjgycmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZS5pc0RhcmsgPyBcIiMzOGJkZjhcIiA6IFwiIzI1NjNlYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNQ1Egc2V0IFBERiBkb3dubG9hZGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyFtY3FTdGF0ZSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuODJyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLmlzRGFyayA/IFwiIzk0YTNiOFwiIDogXCIjNDc1NTY5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFR5cGUgYSB0b3BpYyBhbmQgY2xpY2sgR2VuZXJhdGUgdG8gZG93bmxvYWQgYSBtdWx0aXBsZS1jaG9pY2UgcHJhY3RpY2UgUERGLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge21jcVJlY2VudC5sZW5ndGggPiAwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2FwOiBcIjZweFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmbGV4V3JhcDogXCJ3cmFwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpblRvcDogXCI0cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge21jcVJlY2VudC5tYXAoKHJlY2VudFRvcGljKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3JlY2VudFRvcGljfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldE1jcVRvcGljcygocHJldikgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3N1YmplY3RLZXldOiByZWNlbnRUb3BpYyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJNY3FEb3dubG9hZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGVDb25maWcuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY2VudFRvcGljXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFwiNHB4IDEwcHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI5OTk5cHhcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogXCIxcHggc29saWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZS5wYW5lbEJvcmRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IHRoZW1lLmlzRGFya1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwiIzFlMjkzYlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCIjZTJlOGYwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWUudGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjAuNzhyZW1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogXCJwb2ludGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17bWNxU3RhdGUgPT09IFwibG9hZGluZ1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlY2VudFRvcGljfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0FjdGlvblNlbGVjdGVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhaGFzUGRmICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24gIT09IFwiR2VuZXJhdGUgcHJlc2VudGF0aW9uc1wiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24gIT09IFwiR2VuZXJhdGUgUERGXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiAhPT0gXCJMZXNzb24gUGxhblwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb24gIT09IFwiR2VuZXJhdGUgV2ViIFBhZ2VcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uICE9PSBcIkdlbmVyYXRlIENvbmNlcHQgTWFwXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbiAhPT0gXCJHZW5lcmF0ZSBNQ1FzXCIgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogXCIwLjg4cmVtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lLmlzRGFyayA/IFwiIzk0YTNiOFwiIDogXCIjNDc1NTY5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZ0xlZnQ6IFwiNnB4XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlc291cmNlIGNvbWluZyBzb29uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cblxuIl0sIm5hbWVzIjpbInVzZUVmZmVjdCIsInVzZVJlZiIsInVzZVN0YXRlIiwidXNlUm91dGVyIiwiU1VCSkVDVF9GSUxFUyIsIkdSQURFX0NPTkZJR1MiLCJpZCIsImxhYmVsIiwibnVtYmVyIiwic3ViamVjdHMiLCJHUkFERV9OVU1CRVJfTUFQIiwicmVkdWNlIiwiYWNjdW11bGF0b3IiLCJjb25maWciLCJHUkFERV9DT05GSUdfQllfSUQiLCJHUkFERV9HUk9VUFMiLCJ0aXRsZSIsInN1YnRpdGxlIiwiZ3JhZGVJZHMiLCJTVUJKRUNUX0FDVElPTlMiLCJTVUJKRUNUX1BERl9BQ1RJT05TIiwiZ3JhZGUxMiIsIk1hdGhzIiwiU2V0IiwiZ3JhZGUxMSIsImdyYWRlMTAiLCJncmFkZTkiLCJncmFkZTgiLCJncmFkZTciLCJncmFkZTYiLCJQZGZDb250ZW50Vmlld2VyIiwiYmFzZTY0RGF0YSIsImlzTG9hZGluZyIsImVycm9yIiwidGhlbWUiLCJjb250YWluZXJSZWYiLCJjYW5jZWxlZCIsInJlbmRlclBkZiIsImN1cnJlbnQiLCJpbm5lckhUTUwiLCJnZXREb2N1bWVudCIsIkdsb2JhbFdvcmtlck9wdGlvbnMiLCJ3b3JrZXJNb2R1bGUiLCJQcm9taXNlIiwiYWxsIiwid29ya2VyU3JjIiwiZGVmYXVsdCIsImJpbmFyeVN0cmluZyIsImF0b2IiLCJsZW4iLCJsZW5ndGgiLCJieXRlcyIsIlVpbnQ4QXJyYXkiLCJpIiwiY2hhckNvZGVBdCIsInBkZkRvYyIsImRhdGEiLCJwcm9taXNlIiwiY29udGFpbmVyIiwicGFnZU51bWJlciIsIm51bVBhZ2VzIiwicGFnZSIsImdldFBhZ2UiLCJ2aWV3cG9ydCIsImdldFZpZXdwb3J0Iiwic2NhbGUiLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzdHlsZSIsImJveFNoYWRvdyIsImlzRGFyayIsImJvcmRlclJhZGl1cyIsIndpZHRoIiwiaGVpZ2h0IiwiY29udGV4dCIsImdldENvbnRleHQiLCJhcHBlbmRDaGlsZCIsInJlbmRlciIsImNhbnZhc0NvbnRleHQiLCJkaXYiLCJtYXJnaW5Ub3AiLCJwYWRkaW5nIiwiYm9yZGVyIiwiYm9yZGVyQ29sb3IiLCJwYW5lbEJvcmRlciIsImNvbG9yIiwidGV4dCIsImZvbnRTaXplIiwiYmFja2dyb3VuZCIsInJlZiIsImRpc3BsYXkiLCJnYXAiLCJvdmVyZmxvd1giLCJwYWRkaW5nQm90dG9tIiwiQ09VTlRSWV9PUFRJT05TIiwiSU5ESUFfU0NIT09MX09QVElPTlMiLCJJTkRJQV9DT0xMRUdFX09QVElPTlMiLCJIb21lIiwicm91dGVyIiwiYWN0aXZlQ291bnRyaWVzIiwic2V0QWN0aXZlQ291bnRyaWVzIiwiaW5kaWFTY2hvb2xTZWxlY3Rpb25zIiwic2V0SW5kaWFTY2hvb2xTZWxlY3Rpb25zIiwiaW5kaWFDb2xsZWdlU2VsZWN0aW9ucyIsInNldEluZGlhQ29sbGVnZVNlbGVjdGlvbnMiLCJpc0RhcmtNb2RlIiwic2V0SXNEYXJrTW9kZSIsInByZWZldGNoIiwidG9nZ2xlQ291bnRyeSIsImNvdW50cnlJZCIsInByZXYiLCJ0b2dnbGVJbmRpYVNjaG9vbE9wdGlvbiIsIm9wdGlvbklkIiwibmV4dFZhbHVlIiwidXBkYXRlZCIsInB1c2giLCJ0b2dnbGVJbmRpYUNvbGxlZ2VPcHRpb24iLCJhcHBCYWNrZ3JvdW5kIiwicGFuZWwiLCJhY2NlbnQiLCJzZWNvbmRhcnlUZXh0IiwibWFpbiIsIm1pbkhlaWdodCIsImFsaWduSXRlbXMiLCJqdXN0aWZ5Q29udGVudCIsImZsZXhEaXJlY3Rpb24iLCJwb3NpdGlvbiIsImJ1dHRvbiIsInR5cGUiLCJvbkNsaWNrIiwicHJldmlvdXMiLCJhcmlhLWxhYmVsIiwidG9wIiwicmlnaHQiLCJmb250V2VpZ2h0IiwiY3Vyc29yIiwic3BhbiIsImxlZnQiLCJ0cmFuc2l0aW9uIiwiaDEiLCJtYXJnaW4iLCJ0ZXh0QWxpZ24iLCJwYWRkaW5nTGVmdCIsIm1hcCIsImNvdW50cnkiLCJpbnB1dCIsImNoZWNrZWQiLCJCb29sZWFuIiwib25DaGFuZ2UiLCJhY2NlbnRDb2xvciIsInRyYW5zZm9ybSIsImluZGlhIiwic2Nob29sT3B0aW9uIiwiY29sbGVnZU9wdGlvbiIsIkNic2VEYXNoYm9hcmQiLCJzZXRHcmFkZTEyIiwic2V0R3JhZGUxMSIsInNldEdyYWRlMTAiLCJzZXRHcmFkZTkiLCJzZXRHcmFkZTgiLCJzZXRHcmFkZTciLCJzZXRHcmFkZTYiLCJzZWxlY3RlZFN1YmplY3RzIiwic2V0U2VsZWN0ZWRTdWJqZWN0cyIsInN1YmplY3RBY3Rpb25TZWxlY3Rpb25zIiwic2V0U3ViamVjdEFjdGlvblNlbGVjdGlvbnMiLCJwZGZDYWNoZSIsInNldFBkZkNhY2hlIiwicGRmTG9hZGluZyIsInNldFBkZkxvYWRpbmciLCJwZGZFcnJvciIsInNldFBkZkVycm9yIiwicHJlc2VudGF0aW9uU3RhdHVzIiwic2V0UHJlc2VudGF0aW9uU3RhdHVzIiwicHJlc2VudGF0aW9uRXJyb3IiLCJzZXRQcmVzZW50YXRpb25FcnJvciIsInByZXNlbnRhdGlvblRvcGljcyIsInNldFByZXNlbnRhdGlvblRvcGljcyIsInByZXNlbnRhdGlvbkhpc3RvcnkiLCJzZXRQcmVzZW50YXRpb25IaXN0b3J5IiwiaGFuZG91dFN0YXR1cyIsInNldEhhbmRvdXRTdGF0dXMiLCJoYW5kb3V0RXJyb3IiLCJzZXRIYW5kb3V0RXJyb3IiLCJoYW5kb3V0VG9waWNzIiwic2V0SGFuZG91dFRvcGljcyIsImhhbmRvdXRIaXN0b3J5Iiwic2V0SGFuZG91dEhpc3RvcnkiLCJsZXNzb25QbGFuU3RhdHVzIiwic2V0TGVzc29uUGxhblN0YXR1cyIsImxlc3NvblBsYW5FcnJvciIsInNldExlc3NvblBsYW5FcnJvciIsImxlc3NvblBsYW5Ub3BpY3MiLCJzZXRMZXNzb25QbGFuVG9waWNzIiwibGVzc29uUGxhbkhpc3RvcnkiLCJzZXRMZXNzb25QbGFuSGlzdG9yeSIsIndlYlBhZ2VTdGF0dXMiLCJzZXRXZWJQYWdlU3RhdHVzIiwid2ViUGFnZUVycm9yIiwic2V0V2ViUGFnZUVycm9yIiwid2ViUGFnZVRvcGljcyIsInNldFdlYlBhZ2VUb3BpY3MiLCJ3ZWJQYWdlSGlzdG9yeSIsInNldFdlYlBhZ2VIaXN0b3J5IiwiY29uY2VwdE1hcFN0YXR1cyIsInNldENvbmNlcHRNYXBTdGF0dXMiLCJjb25jZXB0TWFwRXJyb3IiLCJzZXRDb25jZXB0TWFwRXJyb3IiLCJjb25jZXB0TWFwVG9waWNzIiwic2V0Q29uY2VwdE1hcFRvcGljcyIsImNvbmNlcHRNYXBIaXN0b3J5Iiwic2V0Q29uY2VwdE1hcEhpc3RvcnkiLCJtY3FTdGF0dXMiLCJzZXRNY3FTdGF0dXMiLCJtY3FFcnJvciIsInNldE1jcUVycm9yIiwibWNxVG9waWNzIiwic2V0TWNxVG9waWNzIiwibWNxSGlzdG9yeSIsInNldE1jcUhpc3RvcnkiLCJncmFkZUNvbnRyb2xzIiwiaXNBY3RpdmUiLCJzZXRBY3RpdmUiLCJnZXRTdWJqZWN0S2V5IiwiZ3JhZGVJZCIsInN1YmplY3QiLCJnZXRBY3Rpb25LZXkiLCJhY3Rpb24iLCJmZXRjaFBkZkNvbnRlbnQiLCJjYWNoZUtleSIsInBkZkFjdGlvbnMiLCJoYXMiLCJncmFkZVBhcmFtIiwicGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwiZ3JhZGUiLCJTdHJpbmciLCJyZXNwb25zZSIsImZldGNoIiwidG9TdHJpbmciLCJjYWNoZSIsIm9rIiwiRXJyb3IiLCJwYXlsb2FkIiwianNvbiIsImJhc2U2NCIsIm1lc3NhZ2UiLCJ0b2dnbGVTdWJqZWN0U2VsZWN0aW9uIiwiZ3JhZGVDb25maWciLCJzdWJqZWN0S2V5IiwiZ3JhZGVTdWJqZWN0cyIsImlzU2VsZWN0ZWQiLCJuZXh0U2VsZWN0ZWQiLCJPYmplY3QiLCJrZXlzIiwicHJldkFjdGlvbnMiLCJncmFkZUFjdGlvbnMiLCJpbml0aWFsQWN0aW9uc1N0YXRlIiwiYWNjIiwibmV4dEFjdGlvbnMiLCJhY3Rpb25QcmVmaXgiLCJwcmV2Q2FjaGUiLCJ1cGRhdGVkQ2FjaGUiLCJmb3JFYWNoIiwia2V5Iiwic3RhcnRzV2l0aCIsInByZXZMb2FkaW5nIiwidXBkYXRlZExvYWRpbmciLCJwcmV2RXJyb3IiLCJ1cGRhdGVkRXJyb3IiLCJwcmV2U3RhdHVzIiwicHJldlByZXNlbnRhdGlvbkVycm9yIiwicHJldlRvcGljcyIsInByZXZIaXN0b3J5IiwicHJldkhhbmRvdXRTdGF0dXMiLCJwcmV2SGFuZG91dEVycm9yIiwicHJldkhhbmRvdXRUb3BpY3MiLCJwcmV2SGFuZG91dEhpc3RvcnkiLCJwcmV2TGVzc29uUGxhblN0YXR1cyIsInByZXZMZXNzb25QbGFuRXJyb3IiLCJwcmV2TGVzc29uUGxhblRvcGljcyIsInByZXZMZXNzb25QbGFuSGlzdG9yeSIsInByZXZXZWJQYWdlU3RhdHVzIiwicHJldldlYlBhZ2VFcnJvciIsInByZXZXZWJQYWdlVG9waWNzIiwicHJldldlYlBhZ2VIaXN0b3J5IiwicHJldkNvbmNlcHRNYXBTdGF0dXMiLCJwcmV2Q29uY2VwdE1hcEVycm9yIiwicHJldkNvbmNlcHRNYXBUb3BpY3MiLCJwcmV2Q29uY2VwdE1hcEhpc3RvcnkiLCJwcmV2TWNxU3RhdHVzIiwicHJldk1jcUVycm9yIiwicHJldk1jcVRvcGljcyIsInByZXZNY3FIaXN0b3J5IiwidHJpZ2dlclByZXNlbnRhdGlvbkRvd25sb2FkIiwidG9waWMiLCJlbmNvZGVVUklDb21wb25lbnQiLCJtZXRob2QiLCJieXRlQ2hhcmFjdGVycyIsImJ5dGVOdW1iZXJzIiwiQXJyYXkiLCJieXRlQXJyYXkiLCJibG9iIiwiQmxvYiIsImRvd25sb2FkVXJsIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwibGluayIsImhyZWYiLCJkb3dubG9hZCIsInJlcGxhY2UiLCJ0b0xvd2VyQ2FzZSIsImJvZHkiLCJjbGljayIsInJlbW92ZUNoaWxkIiwicmV2b2tlT2JqZWN0VVJMIiwiZmlsdGVyIiwiaXRlbSIsInNsaWNlIiwidHJpZ2dlckhhbmRvdXREb3dubG9hZCIsInRyaWdnZXJMZXNzb25QbGFuRG93bmxvYWQiLCJ0cmlnZ2VyV2ViUGFnZURvd25sb2FkIiwidHJpZ2dlckNvbmNlcHRNYXBEb3dubG9hZCIsInRyaWdnZXJNY3FEb3dubG9hZCIsImluZGV4IiwidG9nZ2xlU3ViamVjdEFjdGlvbiIsInN1YmplY3RTdGF0ZSIsImhhc1BkZiIsInN1YmplY3RTbHVnIiwiYWN0aW9uS2V5IiwiZmlsZU5hbWUiLCJub3JtYWxpemVkUGF0aCIsInVwZGF0ZWRTdWJqZWN0U3RhdGUiLCJ2YWx1ZXMiLCJldmVyeSIsInZhbHVlIiwibmV4dFN0YXRlIiwid2luZG93Iiwib3BlbiIsInRyaW0iLCJfcmVtb3ZlZCIsInJlc3QiLCJiYWNrZ3JvdW5kQ29sb3IiLCJmb250RmFtaWx5IiwiYWxpZ25TZWxmIiwibWFyZ2luQm90dG9tIiwibGV0dGVyU3BhY2luZyIsImgyIiwibWF4V2lkdGgiLCJjb250cm9sIiwic2VsZWN0ZWRHcmFkZVN1YmplY3RzIiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsImFjdGlvblN0YXRlIiwicGFkZGluZ1JpZ2h0IiwiaXNBY3Rpb25TZWxlY3RlZCIsInBkZlNldCIsImlzU3lsbGFidXMiLCJpc1JlYWRpbmdNYXRlcmlhbHMiLCJzaG93SW5saW5lUGRmIiwicHJlc2VudGF0aW9uU3RhdGUiLCJwcmVzZW50YXRpb25FcnJvck1lc3NhZ2UiLCJ0b3BpY1ZhbHVlIiwicmVjZW50VG9waWNzIiwiaGFuZG91dFN0YXRlIiwiaGFuZG91dEVycm9yTWVzc2FnZSIsImhhbmRvdXRWYWx1ZSIsImhhbmRvdXRSZWNlbnQiLCJsZXNzb25QbGFuU3RhdGUiLCJsZXNzb25QbGFuRXJyb3JNZXNzYWdlIiwibGVzc29uUGxhblZhbHVlIiwibGVzc29uUGxhblJlY2VudCIsIndlYlBhZ2VTdGF0ZSIsIndlYlBhZ2VFcnJvck1lc3NhZ2UiLCJ3ZWJQYWdlVmFsdWUiLCJ3ZWJQYWdlUmVjZW50IiwiY29uY2VwdE1hcFN0YXRlIiwiY29uY2VwdE1hcEVycm9yTWVzc2FnZSIsImNvbmNlcHRNYXBWYWx1ZSIsImNvbmNlcHRNYXBSZWNlbnQiLCJtY3FTdGF0ZSIsIm1jcUVycm9yTWVzc2FnZSIsIm1jcVZhbHVlIiwibWNxUmVjZW50IiwiZXZlbnQiLCJ0YXJnZXQiLCJwbGFjZWhvbGRlciIsImZsZXgiLCJkaXNhYmxlZCIsImZsZXhXcmFwIiwicmVjZW50VG9waWMiXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=webpack-internal:///./pages/index.jsx

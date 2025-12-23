export default function AccessibilityStyles() {
  return (
    <style jsx global>{`
      /* Focus visible styles for keyboard navigation */
      *:focus-visible {
        outline: 3px solid #6366f1;
        outline-offset: 2px;
        border-radius: 4px;
      }

      /* Remove outline for mouse users */
      *:focus:not(:focus-visible) {
        outline: none;
      }

      /* Skip to main content link */
      .skip-to-main {
        position: absolute;
        top: -100px;
        left: 0;
        background: #6366f1;
        color: white;
        padding: 12px 24px;
        text-decoration: none;
        font-weight: 600;
        border-radius: 0 0 8px 0;
        z-index: 100000;
        transition: top 0.2s;
      }

      .skip-to-main:focus {
        top: 0;
      }

      /* Ensure buttons have visible focus states */
      button:focus-visible {
        outline: 3px solid #6366f1;
        outline-offset: 2px;
      }

      /* Ensure links have visible focus states */
      a:focus-visible {
        outline: 3px solid #6366f1;
        outline-offset: 2px;
        border-radius: 4px;
      }

      /* Ensure inputs have visible focus states */
      input:focus-visible,
      textarea:focus-visible,
      select:focus-visible {
        outline: 3px solid #6366f1;
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        * {
          border-width: 2px !important;
        }
        
        button {
          border: 2px solid currentColor !important;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }

      /* Screen reader only content */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      /* Ensure adequate color contrast */
      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* Ensure touch targets are large enough (44x44px minimum) */
      button,
      a,
      input[type="button"],
      input[type="submit"],
      input[type="checkbox"],
      input[type="radio"] {
        min-width: 44px;
        min-height: 44px;
      }

      /* Exception for inline text links */
      p a,
      li a,
      span a {
        min-width: unset;
        min-height: unset;
      }
    `}</style>
  );
}

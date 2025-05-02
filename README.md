# Middleware: errors caught at root error boundary, not route error boundary

[Minimal repro](https://github.com/mpqmpqm/rr-middleware-boundary)

Under certain conditions route-level middleware errors are caught at `root.tsx` rather than at route-defined error boundaries.

Additionally, different errors are reported for document loads vs. client navigation.

**Please note**: Comment the `loader` in the `auth` layout on and off to see the expected behavior when no loader is defined for that layout and the unexpected behavior when a loader is defined.

## Issue template

### What version of React Router are you using?

7.5.3

### Steps to Reproduce

[Minimal repro](https://github.com/mpqmpqm/rr-middleware-boundary)

1. Starting at index, click `Account` link. `provideAccount` middleware throws and is caught by `root.tsx` error boundary.

   1. Reload the page to see different errors reported between client navigation and document load.

      Client navigation: `Cannot use 'in' operator to search for 'error' in undefined`.  
      vs. Document load: `Expect Error Boundary: account.tsx`

2. Comment out the `loader` in the `auth` layout and observe that errors are caught at the expected route error boundaries.

### Expected Behavior

Errors thrown in route-specific middleware should be caught by the route's error boundary. Errors should be consistent between document loads and client navigation.

### Actual Behavior

Errors thrown in route-specific middleware are caught by the root error boundary. Different errors are reported for document loads vs. client navigation.

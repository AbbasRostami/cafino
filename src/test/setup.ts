import "@testing-library/jest-dom";

(global as any).ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

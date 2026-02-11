import React, { createContext, useContext, useState, useRef, useLayoutEffect, useEffect } from 'react';
import ReactDOM from 'react-dom';

const PopoverContext = createContext(null);

export function Popover({ children, open: controlledOpen, onOpenChange }) {
  const [open, setOpen] = useState(!!controlledOpen);

  // triggerRef will be assigned by PopoverTrigger
  const triggerRef = useRef(null);

  useEffect(() => {
    if (typeof controlledOpen === 'boolean') setOpen(!!controlledOpen);
  }, [controlledOpen]);

  const setOpenState = (v) => {
    if (typeof onOpenChange === 'function') onOpenChange(v);
    setOpen(v);
  };

  return (
    <PopoverContext.Provider value={{ open, setOpen: setOpenState, triggerRef }}>
      {children}
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children }) {
  const ctx = useContext(PopoverContext);
  if (!ctx) return null;
  const { open, setOpen, triggerRef } = ctx;

  const child = React.Children.only(children);

  // Compose refs: keep child's ref if exists and also store in triggerRef
  const handleRef = (node) => {
    triggerRef.current = node;
    const childRef = child.ref;
    if (typeof childRef === 'function') childRef(node);
    else if (childRef && typeof childRef === 'object') {
      childRef.current = node;
    }
  };

  const onClick = (e) => {
    if (child.props.onClick) child.props.onClick(e);
    setOpen(!open);
  };

  return React.cloneElement(child, { ref: handleRef, onClick });
}

export function PopoverContent({ children, className = '', sideOffset = 8, align = 'end', style = {}, ...props }) {
  const ctx = useContext(PopoverContext);
  if (!ctx) return null;
  const { open, triggerRef, setOpen } = ctx;

  const contentRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [visible, setVisible] = useState(false);
  const [computedSide, setComputedSide] = useState('bottom');
  const [mounted, setMounted] = useState(open);
  const ANIMATION_MS = 200; // match CSS durations
  const measureAttempts = useRef(0);
  const MAX_MEASURE_ATTEMPTS = 6;

  const computePosition = () => {
    const trigger = triggerRef.current;
    const content = contentRef.current;
    if (!trigger || !content) {
      // if trigger not available, try again shortly (rare)
      if (measureAttempts.current < MAX_MEASURE_ATTEMPTS) {
        measureAttempts.current += 1;
        requestAnimationFrame(computePosition);
      }
      return false;
    }

    const rect = trigger.getBoundingClientRect();
    const cw = content.offsetWidth;
    const ch = content.offsetHeight;

    // If width is zero (styles not applied yet), retry a few times
    if (cw === 0 && measureAttempts.current < MAX_MEASURE_ATTEMPTS) {
      measureAttempts.current += 1;
      requestAnimationFrame(computePosition);
      return false;
    }

    // reset attempts on successful measurement
    measureAttempts.current = 0;

    // prefer below the trigger
    let top = rect.bottom + sideOffset;
    let left;
    let side = 'bottom';

    switch (align) {
      case 'start':
        left = rect.left;
        break;
      case 'center':
        left = rect.left + rect.width / 2 - cw / 2;
        break;
      case 'end':
      default:
        left = rect.right - cw;
        break;
    }

    // clamp to viewport
    const minLeft = 8;
    const maxLeft = window.innerWidth - cw - 8;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    // if doesn't fit below, try above
    if (top + ch > window.innerHeight - 8) {
      top = rect.top - ch - sideOffset;
      side = 'top';
    }

    // For fixed positioning we use viewport coordinates (no scroll added)
    setPos({ top: Math.max(8, top), left: Math.max(8, left) });
    setComputedSide(side);
    return true;
  };

  useLayoutEffect(() => {
    if (!open) {
      // start closing animation then unmount after duration
      setVisible(false);
      return;
    }

    // show off-screen to measure
    setVisible(false);
    measureAttempts.current = 0;
    let rafId;
    const attempt = () => {
      const ok = computePosition();
      if (ok) {
        setVisible(true);
      } else if (measureAttempts.current < MAX_MEASURE_ATTEMPTS) {
        rafId = requestAnimationFrame(attempt);
      } else {
        // fallback: make visible to allow user to interact, though placement may be imperfect
        setVisible(true);
      }
    };
    rafId = requestAnimationFrame(attempt);
    return () => cancelAnimationFrame(rafId);
  }, [open, align]);

  // mount/unmount to allow exit animation
  useEffect(() => {
    if (open) {
      setMounted(true);
    } else {
      const t = setTimeout(() => setMounted(false), ANIMATION_MS);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => computePosition();
    const onScroll = () => computePosition();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e) => {
      const target = e.target;
      if (contentRef.current && contentRef.current.contains(target)) return;
      if (triggerRef.current && triggerRef.current.contains(target)) return;
      setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, setOpen]);

  // If not mounted, render nothing
  if (!mounted) return null;

  // We keep the content mounted regardless of `open` to allow outgoing animation
  // Default classes to match original .tsx Radix popover styling and animations
  const defaultClasses = "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 origin-[var(--radix-popover-content-transform-origin)] rounded-md border shadow-md outline-hidden";

  // Final className: defaults first, caller classes after (caller can override defaults)
  // Animation classes fallback (explicit) to ensure they run even without Tailwind bracketed classes
  const baseAnimIn = 'animate-in fade-in-0 zoom-in-95';
  const baseAnimOut = 'animate-out fade-out-0 zoom-out-95';
  let slideClass = '';
  switch (computedSide) {
    case 'top':
      slideClass = 'slide-in-from-bottom-2';
      break;
    case 'left':
      slideClass = 'slide-in-from-right-2';
      break;
    case 'right':
      slideClass = 'slide-in-from-left-2';
      break;
    case 'bottom':
    default:
      slideClass = 'slide-in-from-top-2';
      break;
  }

  const animClasses = open ? `${baseAnimIn} ${slideClass}` : `${baseAnimOut}`;

  const finalClassName = `${defaultClasses} ${animClasses} ${className}`.trim();

  // Calculate transform origin based on side and align (matches Radix behavior)
  const horizontal = align === 'start' ? 'left' : align === 'center' ? 'center' : 'right';
  const vertical = computedSide === 'bottom' ? 'top' : 'bottom';
  const transformOrigin = `${vertical} ${horizontal}`;

  const contentStyle = {
    position: 'fixed',
    top: pos.top,
    left: pos.left,
    zIndex: 9999,
    background: '#ffffff',
    borderRadius: '0.375rem', // rounded-md
    border: '1px solid rgba(229,231,235)', // border-gray-200
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', // shadow-md
    maxHeight: '80vh',
    overflow: 'hidden',
    // ensure it's not affected by parent's opacity/transform
    willChange: 'transform',
    pointerEvents: visible ? 'auto' : 'none',
    opacity: visible ? 1 : 0,
    transition: 'opacity var(--animation-duration) var(--animation-easing), transform var(--animation-duration) var(--animation-easing)',
    ['--radix-popover-content-transform-origin']: transformOrigin,
    ...style,
  };

  const contentNode = (
    <div
      ref={contentRef}
      style={contentStyle}
      className={finalClassName}
      role="dialog"
      aria-hidden={!open}
      data-state={open ? 'open' : 'closed'}
      data-side={computedSide}
      {...props}
    >
      {/* internal scroll area should handle overflow; ensure pointer events */}
      <div style={{ maxHeight: '70vh', overflow: 'auto' }}>{children}</div>
    </div>
  );

  if (typeof document !== 'undefined') {
    return ReactDOM.createPortal(contentNode, document.body);
  }

  return contentNode;
}

export { PopoverContext };

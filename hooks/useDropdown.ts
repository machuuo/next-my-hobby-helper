import { useEffect, useRef, useState } from "react";

interface DropdownOptions {
  onClose?: () => void;
}

export const useDropdown = <T extends HTMLElement>(
  options: DropdownOptions
) => {
  const ref = useRef<T>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  const close = () => {
    setIsOpen(false);
    options.onClose?.();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, []);

  return { ref, isOpen, toggle, close };
};

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

interface CadreProps {
  size: "text" | "msg";
  componentChildren: ReactNode;
}

const Cadre = ({ size, componentChildren }: CadreProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, [componentChildren]);

  const classname =
    size === "text"
      ? "flex flex-col items-center justify-center "
      : "flex flex-col justify-end w-full overflow-y-auto p-4";
  return (
    <div ref={containerRef} className={classname}>
      {componentChildren}
      <div className="bottom"  />
    </div>
  );
};

export default Cadre;

import { useEffect, useState } from "react";

export function RotatingTagline() {
  const words = ["Your Platform", "Your Voice", "Your Stories"];

  const [index, setIndex] = useState(0);    
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true); 

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prev => !prev);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const typingSpeed = deleting ? 70 : 120;

    const timeout = setTimeout(() => {
      const word = words[index];

      if (!deleting && subIndex === word.length) {
        // pause before deleting
        setTimeout(() => setDeleting(true), 700);
        return;
      }

      if (deleting && subIndex === 0) {
        // move to next word
        setDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
        return;
      }

      setSubIndex(prev => prev + (deleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <div className="w-full flex justify-center py-10 pb-5 bg-slate-50">
      <h1 className="text-6xl font-bold text-gray-800 flex gap-3">
        <span>
          {words[index].substring(0, subIndex)}
        </span>

        <span
          style={{
            opacity: blink ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          |
        </span>
      </h1>
    </div>
  );
}

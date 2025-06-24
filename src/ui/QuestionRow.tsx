import React from "react";
import { type Question, type LikertScale } from "../const/questions";

type QuestionValue = LikertScale | string | string[] | undefined;

interface Props {
  q: Question;
  value: QuestionValue;
  onChange: (val: QuestionValue) => void;
}

const QuestionRow: React.FC<Props> = ({ q, value, onChange }) => {
  switch (q.scale) {
    case "demographic":
      if (q.id === "location") {
        const opts = ["US/Canada", "Asia", "Central/South America", "Other"] as const;
        return (
          <fieldset>
            <legend>{q.text}</legend>
            {opts.map((opt) => (
              <label key={opt} style={{ display: "block", marginBottom: 4 }}>
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  checked={value === opt}
                  onChange={() => onChange(opt)}
                />
                {opt}
              </label>
            ))}
          </fieldset>
        );
      }

      if (q.id === "tech") {
        const opts = [
          "Microservices",
          "Databases",
          "Modern frontend (CSR)",
          "Modern frontend (SSR)",
          "Legacy frontend (JSP)",
          "Experience/API layer"
        ] as const;

        const current: string[] = Array.isArray(value) ? value : [];

        const toggle = (opt: string) =>
          current.includes(opt)
            ? onChange(current.filter((o) => o !== opt))
            : onChange([...current, opt]);

        return (
          <fieldset>
            <legend>{q.text}</legend>
            {opts.map((opt) => (
              <label key={opt} style={{ display: "block", marginBottom: 4 }}>
                <input
                  type="checkbox"
                  name={`${q.id}_${opt}`}
                  value={opt}
                  checked={current.includes(opt)}
                  onChange={() => toggle(opt)}
                />
                {opt}
              </label>
            ))}
          </fieldset>
        );
      }
      break;
    case "text":
      return (
        <div>
          <label htmlFor={q.id}>{q.text}</label>
          <textarea
            id={q.id}
            rows={3}
            value={(value as string) || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      );
  }
  return null;
};

export default QuestionRow;
// src/components/DynamicFormField/DynamicFormField.tsx
import React from "react";
import type { DynamicFieldProps } from "./DynamicFormField.types";
import "./DynamicFormField.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const DynamicFormField: React.FC<DynamicFieldProps> = (props) => {


   const [open, setOpen] = React.useState(false);
      const containerRef = React.useRef<HTMLDivElement>(null);

      // Close when clicking outside
      React.useEffect(() => {
        const handleClick = (e: MouseEvent) => {
          if (
            containerRef.current &&
            !containerRef.current.contains(e.target as Node)
          ) {
            setOpen(false);
          }
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
      }, []);

  switch (props.type) {
    case "text": {
      return (
        <div className={`form-group ${props.className || ""}`}>
          {props.label && <label>{props.label}</label>}
          <input
            type="text"
            value={props.value ?? ""}
            onChange={(e) => props.onChange?.(e.target.value)}
            disabled={props.disabled}
            placeholder={props.placeholder ?? ""}
          />
        </div>
      );
    }

    case "textarea": {
      return (
        <div className={`form-group ${props.className || ""}`}>
          {props.label && <label>{props.label}</label>}
          <textarea
            rows={props.rows ?? 3}
            value={props.value ?? ""}
            onChange={(e) => props.onChange?.(e.target.value)}
            disabled={props.disabled}
          />
        </div>
      );
    }

    // case "select": {
    //   return (
    //     <div className={`form-group ${props.className || ""}`}>
    //       {props.label && <label>{props.label}</label>}
    //       <select
    //         value={props.value ?? ""}
    //         onChange={(e) => props.onChange?.(e.target.value)}
    //         disabled={props.disabled}
    //       >
    //         <option value="">-- Select --</option>

    //         {props.options?.map((opt) => (
    //           <option key={opt.value} value={opt.value}>
    //             {opt.label}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
    //   );
    // }
    case "select": {
      return (
        <div className="form-group" ref={containerRef}>
          {props.label && <label>{props.label}</label>}

          <div
            className={`custom-select-box ${props.disabled ? "disabled" : ""}`}
            onClick={() => !props.disabled && setOpen((prev) => !prev)}
          >
            <span className="selected-value">
              {props.options?.find((o) => o.value === props.value)?.label ||
                "-- Select --"}
            </span>
            <span className="arrow">
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </span>
          </div>

          {open && !props.disabled && (
            <ul className="custom-select-list overlay">
              {props.options?.map((opt) => (
                <li
                  key={opt.value}
                  className="custom-select-item"
                  onClick={() => {
                    setOpen(false);
                    props.onChange?.(opt.value);
                  }}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }


    case "combobox": {
      return (
        <div className={`form-group ${props.className || ""}`}>
          {props.label && <label>{props.label}</label>}

          <input
            list={`${props.name}-list`}
            value={props.value ?? ""}
            disabled={props.disabled}
            placeholder="Select or type"
            onChange={(e) => props.onChange?.(e.target.value)}
          />

          <datalist id={`${props.name}-list`}>
            {props.options?.map((o) => (
              <option key={o} value={o} />
            ))}
          </datalist>
        </div>
      );
    }

    case "file": {
      return (
        <div className={`form-group ${props.className || ""}`}>
          {props.label && <label>{props.label}</label>}
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                props.onFileSelect?.(file);
                props.onChange?.(file.name);
              }
            }}
          />
        </div>
      );
    }

    case "checkbox-with-text": {
      return (
        <div className={`form-group ${props.className || ""}`}>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={props.checked}
              onChange={(e) => props.onChange?.(e.target.checked)}
            />
            <span>{props.label}</span>
          </label>

          {props.checked && (
            <input
              type="text"
              value={props.textField.value}
              onChange={(e) => props.onTextFieldChange?.(e.target.value)}
              placeholder={props.textField.placeholder ?? ""}
            />
          )}
        </div>
      );
    }

    case "empty":
      return <div className={`form-group ${props.className || ""}`} />;

    case "custom":
      return <div className={`form-group custom-field`}>{props.render}</div>;

    default:
      return null;
  }
};

export default DynamicFormField;

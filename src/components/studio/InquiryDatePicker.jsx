import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarDays,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import {
  INQUIRY_WEEKDAY_LABELS,
  buildInquiryCalendarWeeks,
  formatInquiryDateDisplay,
  isSelectableInquiryDate,
  parseInquiryDate,
  toInquiryDateString,
} from '../../utils/projectInquirySchedule';

const POPOVER_ESTIMATED_HEIGHT = 300;

const InquiryDatePicker = ({ value, onChange, id, error, errorId }) => {
  const fallbackId = useId();
  const triggerId = id ?? fallbackId;
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => parseInquiryDate(value) ?? new Date());
  const [popoverStyle, setPopoverStyle] = useState(null);

  useEffect(() => {
    if (value) {
      setViewDate(parseInquiryDate(value));
    }
  }, [value]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const updatePosition = () => {
      if (!triggerRef.current) {
        return;
      }

      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const openAbove = spaceBelow < POPOVER_ESTIMATED_HEIGHT && rect.top > POPOVER_ESTIMATED_HEIGHT;

      setPopoverStyle({
        position: 'fixed',
        left: `${Math.max(12, Math.min(rect.left, window.innerWidth - 272))}px`,
        top: openAbove ? `${rect.top - POPOVER_ESTIMATED_HEIGHT - 8}px` : `${rect.bottom + 8}px`,
        zIndex: 130,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      const target = event.target;
      if (
        triggerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const viewYear = viewDate.getFullYear();
  const viewMonth = viewDate.getMonth();
  const weeks = buildInquiryCalendarWeeks(viewYear, viewMonth);
  const monthLabel = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const todayString = toInquiryDateString(new Date());

  const shiftMonth = (delta) => {
    setViewDate((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
  };

  const handleSelectDate = (date) => {
    if (!isSelectableInquiryDate(date)) {
      return;
    }

    onChange(toInquiryDateString(date));
    setOpen(false);
  };

  const popover =
    open && popoverStyle
      ? createPortal(
          <div
            ref={popoverRef}
            className="gp-inquiry-date-picker__popover"
            style={popoverStyle}
            role="dialog"
            aria-label="Choose a date"
          >
            <div className="gp-inquiry-date-picker__header">
              <button
                type="button"
                className="gp-inquiry-date-picker__nav"
                onClick={() => shiftMonth(-1)}
                aria-label="Previous month"
              >
                <FontAwesomeIcon icon={faChevronLeft} aria-hidden />
              </button>
              <p className="gp-inquiry-date-picker__month">{monthLabel}</p>
              <button
                type="button"
                className="gp-inquiry-date-picker__nav"
                onClick={() => shiftMonth(1)}
                aria-label="Next month"
              >
                <FontAwesomeIcon icon={faChevronRight} aria-hidden />
              </button>
            </div>

            <div className="gp-inquiry-date-picker__weekdays" aria-hidden>
              {INQUIRY_WEEKDAY_LABELS.map((label) => (
                <span key={label} className="gp-inquiry-date-picker__weekday">
                  {label}
                </span>
              ))}
            </div>

            <div className="gp-inquiry-date-picker__grid">
              {weeks.map((week, weekIndex) =>
                week.map((date, dayIndex) => {
                  if (!date) {
                    return (
                      <span
                        key={`empty-${weekIndex}-${dayIndex}`}
                        className="gp-inquiry-date-picker__day gp-inquiry-date-picker__day--empty"
                        aria-hidden
                      />
                    );
                  }

                  const dateString = toInquiryDateString(date);
                  const selectable = isSelectableInquiryDate(date);
                  const isSelected = value === dateString;
                  const isToday = todayString === dateString;

                  return (
                    <button
                      key={dateString}
                      type="button"
                      className={[
                        'gp-inquiry-date-picker__day',
                        isSelected ? 'gp-inquiry-date-picker__day--selected' : '',
                        isToday ? 'gp-inquiry-date-picker__day--today' : '',
                        !selectable ? 'gp-inquiry-date-picker__day--disabled' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => handleSelectDate(date)}
                      disabled={!selectable}
                      aria-label={date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      aria-pressed={isSelected}
                    >
                      {date.getDate()}
                    </button>
                  );
                }),
              )}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="gp-inquiry-date-picker">
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        className={[
          'gp-inquiry-date-picker__trigger',
          value ? '' : 'gp-inquiry-date-picker__trigger--placeholder',
        ]
          .filter(Boolean)
          .join(' ')}
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error && errorId ? errorId : undefined}
      >
        <span className="gp-inquiry-date-picker__value">
          {value ? formatInquiryDateDisplay(value) : 'Select a date'}
        </span>
        <FontAwesomeIcon
          icon={faCalendarDays}
          className="gp-inquiry-date-picker__icon"
          aria-hidden
        />
      </button>
      {popover}
      {error ? (
        <span id={errorId} className="gp-inquiry-modal__field-error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
};

export default InquiryDatePicker;
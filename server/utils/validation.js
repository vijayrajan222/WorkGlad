export const trimString = (value) => (typeof value === "string" ? value.trim() : "");

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const validateText = (value, label, min = 1, max = 100) => {
  const trimmed = trimString(value);

  if (trimmed.length < min || trimmed.length > max) {
    return {
      value: trimmed,
      error: `${label} must be between ${min} and ${max} characters`,
    };
  }

  return { value: trimmed };
};

export const validateNumber = (value, label, min = 0, max = 10000000) => {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    return {
      value: parsed,
      error: `${label} must be between ${min} and ${max}`,
    };
  }

  return { value: parsed };
};

export const validateDate = (value, label) => {
  const date = new Date(value);

  if (!value || Number.isNaN(date.getTime())) {
    return {
      value: date,
      error: `${label} is invalid`,
    };
  }

  return { value: date };
};

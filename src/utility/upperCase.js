export default function extractUppercase(s) {
    return s
      .split("")
      .filter(function (c) {
        return c === c.toUpperCase() && c !== c.toLowerCase();
      })
      .join("");
  }
  